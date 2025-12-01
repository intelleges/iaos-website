import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { emailStatus } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Email Suppression Router
 * 
 * Manages the "Do Not Email" suppression system to protect sender reputation
 * and comply with email best practices. Automatically blocks bounced, spam-reported,
 * and unsubscribed email addresses from receiving future communications.
 */
export const emailSuppressionRouter = router({
  /**
   * Check if an email address is suppressed
   * Returns suppression status, reason, and timestamp
   */
  checkEmailSuppression: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input }) => {
      const { email } = input;

      // Look up email status in database
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const status = await db
        .select()
        .from(emailStatus)
        .where(eq(emailStatus.email, email.toLowerCase()))
        .limit(1);

      if (status.length === 0) {
        // Email not found - not suppressed
        return {
          isSuppressed: false,
          reason: null,
          suppressedAt: null,
        };
      }

      const record = status[0];
      return {
        isSuppressed: record.isSuppressed === 1,
        reason: record.suppressionReason,
        suppressedAt: record.suppressedAt,
      };
    }),

  /**
   * Manually suppress an email address
   * Used by admins to block specific emails
   */
  suppressEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        reason: z.enum(["bounce", "spam", "unsubscribe", "manual"]),
      })
    )
    .mutation(async ({ input }) => {
      const { email, reason } = input;
      const now = new Date();

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Check if email status record exists
      const existing = await db
        .select()
        .from(emailStatus)
        .where(eq(emailStatus.email, email.toLowerCase()))
        .limit(1);

      if (existing.length === 0) {
        // Create new record with suppression
        await db.insert(emailStatus).values({
          email: email.toLowerCase(),
          isSuppressed: 1,
          suppressionReason: reason,
          suppressedAt: now,
          lastEvent: "suppressed",
          lastEventAt: now,
        });

        console.log(`[Suppression] Created new suppressed record for ${email} (reason: ${reason})`);
      } else {
        // Update existing record
        await db
          .update(emailStatus)
          .set({
            isSuppressed: 1,
            suppressionReason: reason,
            suppressedAt: now,
            lastEvent: "suppressed",
            lastEventAt: now,
          })
          .where(eq(emailStatus.email, email.toLowerCase()));

        console.log(`[Suppression] Updated suppression for ${email} (reason: ${reason})`);
      }

      return {
        success: true,
        message: `Email ${email} has been suppressed (reason: ${reason})`,
      };
    }),

  /**
   * Remove suppression from an email address
   * Used by admins to unblock emails (e.g., false positives)
   */
  unsuppressEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;

      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      // Update email status to remove suppression
      await db
        .update(emailStatus)
        .set({
          isSuppressed: 0,
          suppressionReason: null,
          suppressedAt: null,
        })
        .where(eq(emailStatus.email, email.toLowerCase()));

      console.log(`[Suppression] Removed suppression for ${email}`);

      return {
        success: true,
        message: `Email ${email} has been unsuppressed`,
      };
    }),

  /**
   * Get suppression statistics
   * Returns counts of suppressed emails by reason
   */
  getSuppressionStats: publicProcedure.query(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const allSuppressed = await db
      .select()
      .from(emailStatus)
      .where(eq(emailStatus.isSuppressed, 1));

    const stats = {
      total: allSuppressed.length,
      byReason: {
        bounce: allSuppressed.filter((r: typeof allSuppressed[0]) => r.suppressionReason === "bounce").length,
        spam: allSuppressed.filter((r: typeof allSuppressed[0]) => r.suppressionReason === "spam").length,
        unsubscribe: allSuppressed.filter((r: typeof allSuppressed[0]) => r.suppressionReason === "unsubscribe").length,
        manual: allSuppressed.filter((r: typeof allSuppressed[0]) => r.suppressionReason === "manual").length,
      },
    };

    return stats;
  }),
});
