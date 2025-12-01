/**
 * Test script to simulate SendGrid webhook events
 * 
 * Usage:
 *   node test-webhook.mjs
 * 
 * This sends sample email events to your local webhook endpoint
 * to verify the integration is working correctly.
 */

const WEBHOOK_URL = process.env.WEBHOOK_URL || "http://localhost:3000/api/webhooks/sendgrid";

// Sample SendGrid events
const sampleEvents = [
  {
    email: "john.doe@boeing.com",
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    event: "delivered",
    sg_event_id: `test-delivered-${Date.now()}-1`,
    sg_message_id: `test-msg-${Date.now()}-1`,
  },
  {
    email: "john.doe@boeing.com",
    timestamp: Math.floor(Date.now() / 1000) - 1800, // 30 min ago
    event: "open",
    sg_event_id: `test-open-${Date.now()}-2`,
    sg_message_id: `test-msg-${Date.now()}-1`,
  },
  {
    email: "john.doe@boeing.com",
    timestamp: Math.floor(Date.now() / 1000) - 900, // 15 min ago
    event: "click",
    sg_event_id: `test-click-${Date.now()}-3`,
    sg_message_id: `test-msg-${Date.now()}-1`,
    url: "https://intelleges.com/demo",
  },
  {
    email: "jane.smith@lockheedmartin.com",
    timestamp: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
    event: "delivered",
    sg_event_id: `test-delivered-${Date.now()}-4`,
    sg_message_id: `test-msg-${Date.now()}-2`,
  },
  {
    email: "jane.smith@lockheedmartin.com",
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    event: "open",
    sg_event_id: `test-open-${Date.now()}-5`,
    sg_message_id: `test-msg-${Date.now()}-2`,
  },
  {
    email: "bounced@invalid-domain.com",
    timestamp: Math.floor(Date.now() / 1000) - 600, // 10 min ago
    event: "bounce",
    sg_event_id: `test-bounce-${Date.now()}-6`,
    sg_message_id: `test-msg-${Date.now()}-3`,
    reason: "550 5.1.1 The email account that you tried to reach does not exist",
    bounce_classification: "invalid",
  },
  {
    email: "spam@example.com",
    timestamp: Math.floor(Date.now() / 1000) - 300, // 5 min ago
    event: "spamreport",
    sg_event_id: `test-spam-${Date.now()}-7`,
    sg_message_id: `test-msg-${Date.now()}-4`,
  },
  {
    email: "unsubscribe@example.com",
    timestamp: Math.floor(Date.now() / 1000) - 120, // 2 min ago
    event: "unsubscribe",
    sg_event_id: `test-unsubscribe-${Date.now()}-8`,
    sg_message_id: `test-msg-${Date.now()}-5`,
  },
];

async function sendWebhookEvents() {
  console.log(`\n🚀 Sending ${sampleEvents.length} test events to ${WEBHOOK_URL}\n`);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleEvents),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Webhook request successful!\n");
      console.log("Response:", result);
      console.log(`\n✨ Processed: ${result.processed} events`);
      if (result.failed > 0) {
        console.log(`⚠️  Failed: ${result.failed} events`);
      }
    } else {
      console.error("❌ Webhook request failed!\n");
      console.error("Status:", response.status);
      console.error("Response:", result);
    }
  } catch (error) {
    console.error("❌ Error sending webhook request:\n");
    console.error(error.message);
    console.error("\nMake sure your server is running on", WEBHOOK_URL);
  }

  console.log("\n📊 Check your Email Analytics Dashboard at /admin/email-analytics\n");
}

sendWebhookEvents();
