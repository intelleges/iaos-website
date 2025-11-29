import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { leads, downloads } from "../drizzle/schema";
import { eq, and, gte, count } from "drizzle-orm";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Download protection endpoints
  downloads: router({
    // Validate if user can download (check rate limits)
    validate: publicProcedure
      .input(z.object({
        email: z.string().email(),
        resource: z.string().min(1),
      }))
      .query(async ({ input, ctx }) => {
        const clientIp = ctx.req.headers['x-forwarded-for'] as string || ctx.req.socket.remoteAddress || 'unknown';
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        // Count downloads by email in last 24 hours
        const emailDownloads = await db
          .select({ count: count() })
          .from(downloads)
          .where(
            and(
              eq(downloads.email, input.email),
              gte(downloads.downloadedAt, oneDayAgo)
            )
          );

        // Count downloads by IP in last 24 hours
        const ipDownloads = await db
          .select({ count: count() })
          .from(downloads)
          .where(
            and(
              eq(downloads.ipAddress, clientIp),
              gte(downloads.downloadedAt, oneDayAgo)
            )
          );

        const emailCount = emailDownloads[0]?.count || 0;
        const ipCount = ipDownloads[0]?.count || 0;

        if (emailCount >= 3) {
          return {
            allowed: false,
            reason: 'email_limit',
            message: 'You have reached the maximum of 3 downloads per day for this email address.',
          };
        }

        if (ipCount >= 3) {
          return {
            allowed: false,
            reason: 'ip_limit',
            message: 'You have reached the maximum of 3 downloads per day from this location.',
          };
        }

        return {
          allowed: true,
          reason: null,
          message: null,
        };
      }),

    // Record a download
    record: publicProcedure
      .input(z.object({
        email: z.string().email(),
        resource: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        const clientIp = ctx.req.headers['x-forwarded-for'] as string || ctx.req.socket.remoteAddress || 'unknown';
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        await db.insert(downloads).values({
          email: input.email,
          resourceName: input.resource,
          resourceUrl: `/case-studies/${input.resource}`,
          ipAddress: clientIp,
          downloadedAt: new Date(),
        });

        return { success: true };
      }),
  }),

  // Lead capture endpoints
  leads: router({
    // Submit a new lead
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().min(1),
        resource: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        await db.insert(leads).values({
          name: input.name,
          email: input.email,
          company: input.company,
          emailVerified: 0,
          verificationToken: null,
          verificationExpiry: null,
          createdAt: new Date(),
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
