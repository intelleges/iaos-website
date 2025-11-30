/**
 * Background Email Processor
 * 
 * Processes scheduled emails from the scheduledEmails table.
 * Run this script via cron job every hour to send pending emails.
 * 
 * Usage: node dist/emailProcessor.js
 */

import { getDb } from "./db";
import { scheduledEmails } from "../drizzle/schema";
import { lte, eq, and } from "drizzle-orm";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@intelleges.com";
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || "Intelleges";

sgMail.setApiKey(SENDGRID_API_KEY);

async function processScheduledEmails() {
  console.log("[Email Processor] Starting email processing run...");
  
  const db = await getDb();
  if (!db) {
    console.error("[Email Processor] Database not available");
    return;
  }

  try {
    // Find all emails scheduled for now or earlier that haven't been sent
    const now = new Date();
    const pendingEmails = await db
      .select()
      .from(scheduledEmails)
      .where(
        and(
          lte(scheduledEmails.scheduledFor, now),
          eq(scheduledEmails.sent, 0),
          eq(scheduledEmails.failed, 0)
        )
      )
      .limit(50); // Process max 50 emails per run

    console.log(`[Email Processor] Found ${pendingEmails.length} pending emails`);

    for (const email of pendingEmails) {
      try {
        console.log(`[Email Processor] Sending email to ${email.recipientEmail}...`);

        // Send email via SendGrid
        await sgMail.send({
          to: email.recipientEmail,
          from: {
            email: SENDGRID_FROM_EMAIL,
            name: SENDGRID_FROM_NAME,
          },
          subject: email.subject,
          html: email.htmlContent,
        });

        // Mark as sent
        await db
          .update(scheduledEmails)
          .set({
            sent: 1,
            sentAt: new Date(),
          })
          .where(eq(scheduledEmails.id, email.id));

        console.log(`[Email Processor] ✓ Successfully sent email to ${email.recipientEmail}`);

      } catch (error: any) {
        console.error(`[Email Processor] ✗ Failed to send email to ${email.recipientEmail}:`, error.message);

        // Mark as failed
        await db
          .update(scheduledEmails)
          .set({
            failed: 1,
            failureReason: error.message || "Unknown error",
            retryCount: email.retryCount + 1,
          })
          .where(eq(scheduledEmails.id, email.id));
      }
    }

    console.log("[Email Processor] Email processing run complete");

  } catch (error: any) {
    console.error("[Email Processor] Error during email processing:", error);
  }
}

// Run immediately if called directly
if (require.main === module) {
  processScheduledEmails()
    .then(() => {
      console.log("[Email Processor] Exiting...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[Email Processor] Fatal error:", error);
      process.exit(1);
    });
}

export { processScheduledEmails };
