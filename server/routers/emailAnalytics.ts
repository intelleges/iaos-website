import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { emailEvents, emailStatus } from "../../drizzle/schema";
import { and, desc, like, sql } from "drizzle-orm";

/**
 * Admin authorization check
 * Adjust this to match your auth model
 */
function assertAdmin(user: any) {
  // For now, allow any authenticated user
  // TODO: Add proper admin role check
  if (!user) {
    throw new Error("Not authorized - authentication required");
  }
  // Uncomment when admin roles are implemented:
  // if (!user.role || user.role !== "admin") {
  //   throw new Error("Not authorized - admin access required");
  // }
}

export const emailAnalyticsRouter = router({
  /**
   * High-level overview: aggregate counts and engagement rates
   */
  overview: protectedProcedure
    .output(
      z.object({
        totalTrackedEmails: z.number(),
        totalDelivered: z.number(),
        totalOpened: z.number(),
        totalClicked: z.number(),
        totalBounced: z.number(),
        totalSpam: z.number(),
        totalUnsubscribed: z.number(),
        openRate: z.number(),
        clickRate: z.number(),
        bounceRate: z.number(),
      })
    )
    .query(async ({ ctx }) => {
      assertAdmin(ctx.user);

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const [row] = await db
        .select({
          totalTrackedEmails: sql<number>`COUNT(*)`,
          totalDelivered: sql<number>`SUM(delivered)`,
          totalOpened: sql<number>`SUM(opened)`,
          totalClicked: sql<number>`SUM(clicked)`,
          totalBounced: sql<number>`SUM(bounce)`,
          totalSpam: sql<number>`SUM(spam)`,
          totalUnsubscribed: sql<number>`SUM(unsubscribed)`,
        })
        .from(emailStatus);

      const delivered = row.totalDelivered || 0;
      const opened = row.totalOpened || 0;
      const clicked = row.totalClicked || 0;
      const bounced = row.totalBounced || 0;

      const openRate = delivered > 0 ? opened / delivered : 0;
      const clickRate = delivered > 0 ? clicked / delivered : 0;
      const bounceRate = delivered + bounced > 0 ? bounced / (delivered + bounced) : 0;

      return {
        totalTrackedEmails: row.totalTrackedEmails || 0,
        totalDelivered: delivered,
        totalOpened: opened,
        totalClicked: clicked,
        totalBounced: bounced,
        totalSpam: row.totalSpam || 0,
        totalUnsubscribed: row.totalUnsubscribed || 0,
        openRate,
        clickRate,
        bounceRate,
      };
    }),

  /**
   * Paginated list of emailStatus rows with search and filtering
   */
  listStatus: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(25),
        offset: z.number().min(0).default(0),
        filterEvent: z
          .enum(["all", "bounced", "opened", "clicked", "spam", "unsubscribed"])
          .default("all"),
      })
    )
    .query(async ({ input, ctx }) => {
      assertAdmin(ctx.user);
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const whereClauses: any[] = [];

      if (input.search) {
        const pattern = `%${input.search}%`;
        whereClauses.push(like(emailStatus.email, pattern));
      }

      if (input.filterEvent === "bounced") {
        whereClauses.push(sql`bounce = 1`);
      } else if (input.filterEvent === "opened") {
        whereClauses.push(sql`opened = 1`);
      } else if (input.filterEvent === "clicked") {
        whereClauses.push(sql`clicked = 1`);
      } else if (input.filterEvent === "spam") {
        whereClauses.push(sql`spam = 1`);
      } else if (input.filterEvent === "unsubscribed") {
        whereClauses.push(sql`unsubscribed = 1`);
      }

      const whereClause =
        whereClauses.length > 0 ? and(...whereClauses) : undefined;

      const rows = await db
        .select()
        .from(emailStatus)
        .where(whereClause)
        .orderBy(desc(emailStatus.lastEventAt))
        .limit(input.limit)
        .offset(input.offset);

      const [{ count }] = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(emailStatus)
        .where(whereClause);

      return {
        rows,
        total: count || 0,
      };
    }),

  /**
   * Timeline of events for a single email (drilldown)
   */
  getEmailTimeline: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .query(async ({ input, ctx }) => {
      assertAdmin(ctx.user);

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const events = await db
        .select()
        .from(emailEvents)
        .where(sql`email = ${input.email}`)
        .orderBy(desc(emailEvents.timestamp));

      return events;
    }),
});
