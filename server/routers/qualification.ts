import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { enrichCompanyFromApollo } from "../lib/enrichment";
import { scoreLead, getQualificationExplanation } from "../lib/qualification";
import { getDb } from "../db";
import { leadQualificationAttempts } from "../../drizzle/schema";
import { desc } from "drizzle-orm";

export const qualificationRouter = router({
  /**
   * Qualify a lead for Calendly access
   * 
   * Flow:
   * 1. Enrich company data from Apollo.io
   * 2. Score lead based on enrichment + input
   * 3. Persist attempt to database
   * 4. Return qualified boolean + score
   */
  qualifyLead: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        company: z.string().min(1, "Company is required"),
        title: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      console.log("[Qualification] Processing lead:", {
        email: input.email,
        company: input.company,
      });

      // Step 1: Enrich from Apollo (if configured)
      const enrichment = await enrichCompanyFromApollo(input.email, input.company);

      if (enrichment) {
        console.log("[Qualification] Enrichment data:", enrichment);
      } else {
        console.warn("[Qualification] No enrichment data available");
      }

      // Step 2: Score lead
      const result = scoreLead({
        name: input.name,
        email: input.email,
        company: input.company,
        title: input.title,
        enrichment,
      });

      console.log("[Qualification] Scoring result:", {
        score: result.score,
        qualified: result.qualified,
        reasons: result.reasons,
      });

      // Step 3: Persist attempt to database
      try {
        const reasonsJson = JSON.stringify(result.reasons);
        const rawEnrichmentJson = enrichment ? JSON.stringify(enrichment) : null;

        await db.insert(leadQualificationAttempts).values({
          name: input.name,
          email: input.email,
          company: input.company,
          title: input.title ?? null,
          website: result.derived.website ?? null,
          country: result.derived.country ?? null,
          industry: result.derived.industry ?? null,
          employeeCount: result.derived.employeeCount ?? null,
          revenueBand: result.derived.revenueBand ?? null,
          score: result.score,
          qualified: result.qualified ? 1 : 0,
          reasons: reasonsJson,
          rawEnrichment: rawEnrichmentJson,
        });

        console.log("[Qualification] Attempt logged to database");
      } catch (dbError) {
        console.error("[Qualification] Failed to log attempt:", dbError);
        // Don't fail the request if logging fails
      }

      // Step 4: Return result to frontend
      return {
        qualified: result.qualified,
        score: result.score,
        reasons: result.reasons,
        explanation: getQualificationExplanation(result),
        enrichment: result.derived,
      };
    }),

  /**
   * Get recent qualification attempts (for admin dashboard)
   */
  getRecentAttempts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const attempts = await db
        .select()
        .from(leadQualificationAttempts)
        .orderBy(desc(leadQualificationAttempts.createdAt))
        .limit(input.limit);

      return attempts.map(attempt => ({
        ...attempt,
        reasons: JSON.parse(attempt.reasons),
        rawEnrichment: attempt.rawEnrichment ? JSON.parse(attempt.rawEnrichment) : null,
      }));
    }),
});
