import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter.js";
import { downloadsRouter } from "./routers/downloads.js";
import { qualificationRouter } from "./routers/qualification.js";
import { emailAnalyticsRouter } from "./routers/emailAnalytics.js";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { leads, downloads, documentDownloads, scheduledEmails } from "../drizzle/schema";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}
import { eq, and, gte, count } from "drizzle-orm";

const DOWNLOAD_LIMIT = 3;
const EMAIL_DELAY_HOURS = 2;

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  qualification: qualificationRouter,
  emailAnalytics: emailAnalyticsRouter,
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

  // Download protection endpoints (rate limiting for case studies)
  downloadProtection: router({
    // Validate if user can download (check rate limits)
    validate: publicProcedure
      .input(z.object({
        email: z.string().email(),
        resource: z.string().min(1),
      }))
      .query(async ({ input, ctx }) => {
        const forwarded = ctx.req.headers['x-forwarded-for'];
        const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : ctx.req.socket.remoteAddress || 'unknown';
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
        const forwarded = ctx.req.headers['x-forwarded-for'];
        const clientIp = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : ctx.req.socket.remoteAddress || 'unknown';
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

  // Document downloads with email automation (3-document lifetime limit)
  documentDownloads: router({
    // Check if user has reached 3-document lifetime limit
    checkLimit: publicProcedure
      .input(z.object({
        email: z.string().email(),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        const result = await db
          .select({ count: count() })
          .from(documentDownloads)
          .where(eq(documentDownloads.email, input.email.toLowerCase()));

        const downloadCount = Number(result[0]?.count || 0);
        
        return {
          email: input.email,
          downloadCount,
          limitReached: downloadCount >= DOWNLOAD_LIMIT,
          remainingDownloads: Math.max(0, DOWNLOAD_LIMIT - downloadCount),
        };
      }),

    // Record download and schedule follow-up email
    recordDownload: publicProcedure
      .input(z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        company: z.string().optional(),
        role: z.string().optional(),
        documentTitle: z.string().min(1),
        documentUrl: z.string().min(1),
        documentType: z.enum(['capability', 'protocol', 'whitepaper', 'case_study']),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        const normalizedEmail = input.email.toLowerCase();

        // Check limit
        const limitResult = await db
          .select({ count: count() })
          .from(documentDownloads)
          .where(eq(documentDownloads.email, normalizedEmail));

        const currentCount = Number(limitResult[0]?.count || 0);

        if (currentCount >= DOWNLOAD_LIMIT) {
          throw new Error(`Download limit of ${DOWNLOAD_LIMIT} reached`);
        }

        // Record download
        const fullName = `${input.firstName} ${input.lastName}`;
        console.log(`[Download] ${input.documentTitle} → ${input.documentUrl} for ${normalizedEmail}`);
        await db.insert(documentDownloads).values({
          email: normalizedEmail,
          name: fullName,
          company: input.company || null,
          role: input.role || null,
          documentTitle: input.documentTitle,
          documentUrl: input.documentUrl,
          documentType: input.documentType,
          downloadedAt: new Date(),
          followUpEmailSent: 0,
          followUpEmailSentAt: null,
        });

        // Schedule follow-up email
        const scheduledFor = new Date();
        scheduledFor.setHours(scheduledFor.getHours() + EMAIL_DELAY_HOURS);

        const calendlyUrl = `${process.env.CALENDLY_URL || 'https://calendly.com/intelleges/demo'}?email=${encodeURIComponent(normalizedEmail)}&name=${encodeURIComponent(fullName)}&a1=${encodeURIComponent(input.documentTitle)}&a2=${encodeURIComponent(input.documentType)}`;
        
        const htmlContent = generateFollowUpEmail(fullName, input.documentTitle, calendlyUrl, normalizedEmail, input.documentType);

        await db.insert(scheduledEmails).values({
          recipientEmail: normalizedEmail,
          recipientName: fullName,
          emailType: 'document_followup',
          subject: `Thank you for downloading ${input.documentTitle}`,
          htmlContent,
          scheduledFor,
          sent: 0,
          sentAt: null,
          failed: 0,
          failureReason: null,
          retryCount: 0,
          metadata: JSON.stringify({ documentTitle: input.documentTitle, documentType: input.documentType }),
          createdAt: new Date(),
        });

        return {
          success: true,
          downloadCount: currentCount + 1,
          remainingDownloads: DOWNLOAD_LIMIT - (currentCount + 1),
        };
      }),
  }),

  // Contact form submission with multi-channel notifications
  contact: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Valid email is required"),
        company: z.string().min(1, "Company name is required"),
        phone: z.string().min(1, "Phone number is required"),
        role: z.string().optional(),
        plan: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error('Database not available');
        }

        try {
          // 1. Write to leads database table
          const fullName = `${input.firstName} ${input.lastName}`;
          await db.insert(leads).values({
            name: fullName,
            email: input.email,
            company: input.company,
          });

          // 2. Send email notifications to sales team
          const recipients = [
            "john@intelleges.com",
            "team@intelleges.com",
            "sales@intelleges.com",
          ];

          const emailPromises = recipients.map((recipient) =>
            sgMail.send({
              to: recipient,
              from: process.env.SENDGRID_FROM_EMAIL || "noreply@intelleges.com",
              subject: `New Contact Form Submission - ${input.company}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${input.email}</p>
                <p><strong>Company:</strong> ${input.company}</p>
                <p><strong>Phone:</strong> ${input.phone}</p>
                ${input.role ? `<p><strong>Role:</strong> ${input.role}</p>` : ""}
                ${input.plan ? `<p><strong>Interested Plan:</strong> ${input.plan}</p>` : ""}
                <p><strong>Message:</strong></p>
                <p>${input.message.replace(/\n/g, "<br>")}</p>
                <hr>
                <p><small>Source: Contact Form | Submitted: ${new Date().toISOString()}</small></p>
              `,
            })
          );

          await Promise.allSettled(emailPromises);

          return {
            success: true,
            leadId: 0,
            message: "Thank you for contacting us! We'll be in touch soon.",
          };
        } catch (error: any) {
          console.error("Contact form submission error:", error);
          throw new Error("Failed to submit contact form. Please try again.");
        }
      }),
  }),
});

function generateFollowUpEmail(userName: string, documentTitle: string, calendlyUrl: string, email?: string, documentType?: string): string {
  // Build personalized welcome page URL
  const baseUrl = process.env.FRONTEND_URL || 'https://intelleges.com';
  const welcomeParams = new URLSearchParams();
  if (email) welcomeParams.append('email', email);
  const nameParts = userName.split(' ');
  if (nameParts.length > 0) welcomeParams.append('firstName', nameParts[0]);
  if (nameParts.length > 1) welcomeParams.append('lastName', nameParts.slice(1).join(' '));
  welcomeParams.append('documentTitle', documentTitle);
  if (documentType) welcomeParams.append('documentType', documentType);
  welcomeParams.append('utm_source', 'email');
  welcomeParams.append('utm_medium', 'followup');
  welcomeParams.append('utm_campaign', 'document_download');
  const welcomeUrl = `${baseUrl}/welcome?${welcomeParams.toString()}`;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for downloading ${documentTitle}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://intelleges.com/logo.png" alt="Intelleges" style="height: 40px;">
  </div>
  <h2 style="color: #0A3A67; font-weight: 300; font-size: 24px;">Hi ${userName},</h2>
  <p style="font-size: 16px; margin-bottom: 20px;">
    Thank you for downloading <strong>"${documentTitle}"</strong> from Intelleges.
  </p>
  <p style="font-size: 16px; margin-bottom: 20px;">
    This topic is of great interest to our leadership team. Our subject matter experts have helped dozens of enterprises streamline their compliance processes, reduce supplier management overhead, and make confident, risk-aware decisions.
  </p>
  <p style="font-size: 16px; margin-bottom: 30px;">
    <strong>We've curated additional resources specifically for you based on this download.</strong>
  </p>
  <div style="text-align: center; margin: 40px 0;">
    <a href="${welcomeUrl}" style="display: inline-block; background-color: #0A3A67; color: white; padding: 14px 32px; text-decoration: none; border-radius: 25px; font-weight: 500; font-size: 16px;">
      View Your Personalized Resources
    </a>
  </div>
  <p style="font-size: 14px; color: #666; text-align: center; margin-top: 20px;">
    Or <a href="${calendlyUrl}" style="color: #0A3A67; text-decoration: underline;">schedule a meeting directly</a>
  </p>
  <p style="font-size: 14px; color: #666; margin-top: 40px;">
    Our team is ready to show you how Intelleges makes data and document collection simple—easy, a no-brainer.
  </p>
  <hr style="border: none; border-top: 1px solid #E0E0E0; margin: 30px 0;">
  <p style="font-size: 14px; color: #666;">
    Best regards,<br>
    <strong>The Intelleges Team</strong>
  </p>
  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E0E0E0; font-size: 12px; color: #999; text-align: center;">
    <p>
      Intelleges | ISO 27001 Certified | Battelle Supplier of the Year<br>
      <a href="https://intelleges.com" style="color: #0A3A67; text-decoration: none;">intelleges.com</a>
    </p>
  </div>
</body>
</html>
  `.trim();
}

export type AppRouter = typeof appRouter;
