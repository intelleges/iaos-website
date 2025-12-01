import { Request, Response } from "express";
import crypto from "crypto";
import { getDb } from "../db";
import { emailEvents, emailStatus } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

/**
 * SendGrid Event Webhook Handler
 * 
 * Receives email events from SendGrid and updates analytics database.
 * 
 * Event types: delivered, open, click, bounce, dropped, spam_report, unsubscribe, etc.
 * 
 * SendGrid webhook documentation:
 * https://docs.sendgrid.com/for-developers/tracking-events/event
 */

interface SendGridEvent {
  email: string;
  timestamp: number;
  event: string;
  reason?: string;
  sg_event_id?: string;
  sg_message_id?: string;
  url?: string; // for click events
  bounce_classification?: string;
  [key: string]: any;
}

/**
 * Verify SendGrid webhook signature
 * https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features
 */
function verifySignature(
  publicKey: string,
  payload: string,
  signature: string,
  timestamp: string
): boolean {
  try {
    const timestampedPayload = timestamp + payload;
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(timestampedPayload);
    return verifier.verify(publicKey, signature, "base64");
  } catch (error) {
    console.error("[SendGrid Webhook] Signature verification error:", error);
    return false;
  }
}

/**
 * Process a single SendGrid event
 */
async function processEvent(event: SendGridEvent): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const email = event.email?.toLowerCase();
  if (!email) {
    console.warn("[SendGrid Webhook] Event missing email address:", event);
    return;
  }

  const eventType = event.event;
  const timestamp = new Date(event.timestamp * 1000);
  const reason = event.reason || event.bounce_classification || undefined;
  const sgEventId = event.sg_event_id;
  const sgMessageId = event.sg_message_id;

  // Check for duplicate events using sg_event_id
  if (sgEventId) {
    const [existing] = await db
      .select()
      .from(emailEvents)
      .where(eq(emailEvents.sgEventId, sgEventId))
      .limit(1);

    if (existing) {
      console.log(`[SendGrid Webhook] Duplicate event ${sgEventId}, skipping`);
      return;
    }
  }

  // Insert event into emailEvents table
  await db.insert(emailEvents).values({
    email,
    eventType,
    reason,
    sgEventId,
    sgMessageId,
    timestamp,
  });

  console.log(`[SendGrid Webhook] Recorded ${eventType} event for ${email}`);

  // Update emailStatus aggregated counters
  await upsertEmailStatus(db, email, eventType, timestamp);

  // Automatic suppression for critical events
  await autoSuppressIfNeeded(db, email, eventType, timestamp, reason);
}

/**
 * Update or create emailStatus record with aggregated event counters
 */
async function upsertEmailStatus(
  db: any,
  email: string,
  eventType: string,
  timestamp: Date
): Promise<void> {
  // Check if record exists
  const [existing] = await db
    .select()
    .from(emailStatus)
    .where(eq(emailStatus.email, email))
    .limit(1);

  if (existing) {
    // Update existing record
    const updates: any = {
      lastEvent: eventType,
      lastEventAt: timestamp,
    };

    // Increment counters based on event type
    if (eventType === "delivered") {
      updates.delivered = sql`delivered + 1`;
    } else if (eventType === "open") {
      updates.opened = sql`opened + 1`;
    } else if (eventType === "click") {
      updates.clicked = sql`clicked + 1`;
    } else if (eventType === "bounce" || eventType === "dropped") {
      updates.bounce = 1; // Set to 1 (boolean flag)
    } else if (eventType === "spamreport") {
      updates.spam = 1;
    } else if (eventType === "unsubscribe") {
      updates.unsubscribed = 1;
    }

    await db
      .update(emailStatus)
      .set(updates)
      .where(eq(emailStatus.email, email));
  } else {
    // Create new record
    const newRecord: any = {
      email,
      lastEvent: eventType,
      lastEventAt: timestamp,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounce: 0,
      spam: 0,
      unsubscribed: 0,
    };

    // Set initial counter based on event type
    if (eventType === "delivered") {
      newRecord.delivered = 1;
    } else if (eventType === "open") {
      newRecord.opened = 1;
    } else if (eventType === "click") {
      newRecord.clicked = 1;
    } else if (eventType === "bounce" || eventType === "dropped") {
      newRecord.bounce = 1;
    } else if (eventType === "spamreport") {
      newRecord.spam = 1;
    } else if (eventType === "unsubscribe") {
      newRecord.unsubscribed = 1;
    }

    await db.insert(emailStatus).values(newRecord);
  }
}

/**
 * Automatically suppress email addresses for bounce, spam, and unsubscribe events
 */
async function autoSuppressIfNeeded(
  db: any,
  email: string,
  eventType: string,
  timestamp: Date,
  reason?: string
): Promise<void> {
  // Determine if this event should trigger suppression
  let shouldSuppress = false;
  let suppressionReason: "bounce" | "spam" | "unsubscribe" | null = null;

  if (eventType === "bounce" || eventType === "dropped") {
    shouldSuppress = true;
    suppressionReason = "bounce";
  } else if (eventType === "spamreport") {
    shouldSuppress = true;
    suppressionReason = "spam";
  } else if (eventType === "unsubscribe") {
    shouldSuppress = true;
    suppressionReason = "unsubscribe";
  }

  if (!shouldSuppress || !suppressionReason) {
    return; // No suppression needed
  }

  // Check if already suppressed
  const [existing] = await db
    .select()
    .from(emailStatus)
    .where(eq(emailStatus.email, email))
    .limit(1);

  if (existing && existing.isSuppressed === 1) {
    console.log(`[Suppression] Email ${email} already suppressed, skipping`);
    return;
  }

  // Suppress the email
  await db
    .update(emailStatus)
    .set({
      isSuppressed: 1,
      suppressionReason,
      suppressedAt: timestamp,
    })
    .where(eq(emailStatus.email, email));

  console.log(
    `[Suppression] Auto-suppressed ${email} due to ${eventType} event` +
      (reason ? ` (reason: ${reason})` : "")
  );
}

/**
 * Main webhook handler
 */
export async function handleSendGridWebhook(req: Request, res: Response): Promise<void> {
  try {
    // Optional: Verify signature if verification key is configured
    const verificationKey = process.env.SENDGRID_WEBHOOK_VERIFICATION_KEY;
    if (verificationKey) {
      const signature = req.headers["x-twilio-email-event-webhook-signature"] as string;
      const timestamp = req.headers["x-twilio-email-event-webhook-timestamp"] as string;
      const payload = JSON.stringify(req.body);

      if (!signature || !timestamp) {
        console.warn("[SendGrid Webhook] Missing signature headers");
        res.status(401).json({ error: "Missing signature headers" });
        return;
      }

      const isValid = verifySignature(verificationKey, payload, signature, timestamp);
      if (!isValid) {
        console.error("[SendGrid Webhook] Invalid signature");
        res.status(401).json({ error: "Invalid signature" });
        return;
      }
    }

    // Parse events array from request body
    const events: SendGridEvent[] = Array.isArray(req.body) ? req.body : [req.body];

    if (events.length === 0) {
      res.status(400).json({ error: "No events in payload" });
      return;
    }

    console.log(`[SendGrid Webhook] Processing ${events.length} events`);

    // Process each event
    const results = await Promise.allSettled(
      events.map(event => processEvent(event))
    );

    // Count successes and failures
    const succeeded = results.filter(r => r.status === "fulfilled").length;
    const failed = results.filter(r => r.status === "rejected").length;

    if (failed > 0) {
      console.error(`[SendGrid Webhook] ${failed} events failed to process`);
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Event ${index}:`, result.reason);
        }
      });
    }

    res.status(200).json({
      success: true,
      processed: succeeded,
      failed,
    });
  } catch (error) {
    console.error("[SendGrid Webhook] Handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
