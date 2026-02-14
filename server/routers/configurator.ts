// server/routers/configurator.ts
// ============================================================================
// ENTERPRISE CONFIGURATOR — tRPC Router
// INT.DOC.91 v1.1 — Section 3.3
//
// Add to your router composition in server/routers.ts:
//   import { configuratorRouter } from "./routers/configurator";
//   export const appRouter = router({
//     ...existing routers,
//     configurator: configuratorRouter,
//   });
// ============================================================================

import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
const db = getDb();
import { enterpriseProposals, proposalEvents } from "../../drizzle/proposalSchema";
import { eq, desc } from "drizzle-orm";
import { generateProposalPdf } from "../services/proposalPdf";
import { sendProposalConfirmation, sendInternalNotification } from "../services/proposalEmail";
import { pricingConfig } from "../../client/src/lib/pricingConfig";

// ============================================================================
// Input Validation Schemas
// ============================================================================
const submitProposalInput = z.object({
  // Contact info
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  phone: z.string().optional(),

  // Configuration
  configuration: z.object({
    tier: z.string(),
    users: z.number().int().positive(),
    suppliers: z.number().int(),
    groups: z.number().int(),
    protocols: z.array(z.string()),
    multiJurisdiction: z.boolean(),
  }),
});

// ============================================================================
// Router
// ============================================================================
export const configuratorRouter = router({
  // --------------------------------------------------------------------------
  // PUBLIC: Submit a proposal from the configurator
  // --------------------------------------------------------------------------
  submitProposal: publicProcedure
    .input(submitProposalInput)
    .mutation(async ({ input }) => {
      const { fullName, email, company, role, phone, configuration } = input;

      // Resolve tier details from pricingConfig
      const tier = pricingConfig.tiers.find((t) => t.key === configuration.tier);
      if (!tier) {
        throw new Error(`Invalid tier: ${configuration.tier}`);
      }

      // 1. INSERT proposal
      const [result] = await db.insert(enterpriseProposals).values({
        status: "DRAFT",
        tierKey: tier.key,
        tierName: tier.name,
        priceAnnual: tier.priceAnnual.toString(),
        configUsers: configuration.users,
        configSuppliers: configuration.suppliers,
        configGroups: configuration.groups,
        configProtocols: configuration.protocols,
        multiJurisdiction: configuration.multiJurisdiction,
        contactName: fullName,
        contactEmail: email,
        contactCompany: company,
        contactRole: role,
        contactPhone: phone || null,
      });

      const proposalId = result.insertId;

      // 2. Log CREATED event
      await db.insert(proposalEvents).values({
        proposalId,
        eventType: "CREATED",
        metadata: {
          source: "enterprise-configurator",
          tierKey: tier.key,
          protocolCount: configuration.protocols.length,
        },
      });

      // 3. Generate PDF
      let pdfUrl: string | null = null;
      try {
        pdfUrl = await generateProposalPdf({
          proposalId,
          contactName: fullName,
          contactEmail: email,
          contactCompany: company,
          contactRole: role,
          tier,
          configuration,
        });

        // Update proposal with PDF URL
        await db
          .update(enterpriseProposals)
          .set({ pdfUrl, status: "SENT" })
          .where(eq(enterpriseProposals.id, proposalId));
      } catch (err) {
        console.error("PDF generation failed:", err);
        // Non-fatal: proposal still saved, email sent without PDF
      }

      // 4. Send confirmation email to prospect
      try {
        await sendProposalConfirmation({
          to: email,
          contactName: fullName,
          tier,
          configuration,
          proposalId,
          pdfUrl,
        });

        // Log SENT event
        await db.insert(proposalEvents).values({
          proposalId,
          eventType: "SENT",
          metadata: { emailTo: email, pdfAttached: !!pdfUrl },
        });
      } catch (err) {
        console.error("Email send failed:", err);
        // Non-fatal: proposal still saved
      }

      // 5. Send internal notification to sales team
      try {
        await sendInternalNotification({
          proposalId,
          contactName: fullName,
          contactEmail: email,
          contactCompany: company,
          tier,
          configuration,
        });
      } catch (err) {
        console.error("Internal notification failed:", err);
      }

      return {
        success: true,
        proposalId,
        tier: tier.name,
        message: `Proposal created. Confirmation sent to ${email}.`,
      };
    }),

  // --------------------------------------------------------------------------
  // PUBLIC: Get proposal by ID (for status page / customer link)
  // --------------------------------------------------------------------------
  getProposal: publicProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .query(async ({ input }) => {
      const [proposal] = await db
        .select()
        .from(enterpriseProposals)
        .where(eq(enterpriseProposals.id, input.id))
        .limit(1);

      if (!proposal) {
        throw new Error("Proposal not found");
      }

      return {
        id: proposal.id,
        status: proposal.status,
        tierName: proposal.tierName,
        priceAnnual: proposal.priceAnnual,
        contactCompany: proposal.contactCompany,
        configProtocols: proposal.configProtocols,
        createdAt: proposal.createdAt,
      };
    }),

  // --------------------------------------------------------------------------
  // ADMIN: List all proposals (for internal admin panel)
  // TODO: Add auth middleware when admin panel is built
  // --------------------------------------------------------------------------
  listProposals: publicProcedure
    .input(
      z.object({
        status: z.string().optional(),
        limit: z.number().int().min(1).max(100).optional().default(50),
        offset: z.number().int().min(0).optional().default(0),
      })
    )
    .query(async ({ input }) => {
      // Base query
      let query = db
        .select()
        .from(enterpriseProposals)
        .orderBy(desc(enterpriseProposals.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      // TODO: Add status filter when drizzle supports conditional where cleanly
      const proposals = await query;

      return {
        proposals,
        count: proposals.length,
      };
    }),

  // --------------------------------------------------------------------------
  // ADMIN: Update proposal status
  // --------------------------------------------------------------------------
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        status: z.enum(["DRAFT", "SENT", "ACCEPTED", "PAID", "PROVISIONED", "REJECTED"]),
        metadata: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const updateData: Record<string, unknown> = { status: input.status };

      // Set timestamp fields based on status
      if (input.status === "PAID") {
        updateData.paidAt = new Date();
      } else if (input.status === "PROVISIONED") {
        updateData.provisionedAt = new Date();
      }

      await db
        .update(enterpriseProposals)
        .set(updateData)
        .where(eq(enterpriseProposals.id, input.id));

      // Log event
      await db.insert(proposalEvents).values({
        proposalId: input.id,
        eventType: input.status,
        metadata: input.metadata || {},
      });

      return { success: true, id: input.id, status: input.status };
    }),
});

export type ConfiguratorRouter = typeof configuratorRouter;
