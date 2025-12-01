# SendGrid Webhook Setup Guide

This guide explains how to configure SendGrid to send email events to your Intelleges webhook endpoint for real-time analytics tracking.

---

## Overview

The SendGrid webhook integration automatically tracks email deliverability and engagement events:

- **delivered** - Email successfully delivered to recipient's inbox
- **open** - Recipient opened the email
- **click** - Recipient clicked a link in the email
- **bounce** - Email bounced (hard or soft bounce)
- **dropped** - SendGrid dropped the email (invalid address, spam, etc.)
- **spamreport** - Recipient marked email as spam
- **unsubscribe** - Recipient unsubscribed from emails

All events are stored in the `emailEvents` table and aggregated in the `emailStatus` table for the Email Analytics Dashboard at `/admin/email-analytics`.

---

## Step 1: Get Your Webhook URL

Your webhook endpoint is:

```
https://YOUR_DOMAIN.manus.space/api/webhooks/sendgrid
```

Replace `YOUR_DOMAIN` with your actual Manus project domain.

**Example:**
```
https://intelleges-marketing.manus.space/api/webhooks/sendgrid
```

---

## Step 2: Configure SendGrid Webhook

1. **Log in to SendGrid** at https://app.sendgrid.com

2. **Navigate to Settings → Mail Settings → Event Webhook**
   - Or go directly to: https://app.sendgrid.com/settings/mail_settings

3. **Click "Edit" next to Event Webhook**

4. **Enable the Event Webhook** by toggling the switch to ON

5. **Enter your webhook URL** in the "HTTP Post URL" field:
   ```
   https://YOUR_DOMAIN.manus.space/api/webhooks/sendgrid
   ```

6. **Select the events to track** (check all boxes):
   - ☑ Delivered
   - ☑ Opened
   - ☑ Clicked
   - ☑ Bounced
   - ☑ Dropped
   - ☑ Spam Reports
   - ☑ Unsubscribes

7. **Optional: Enable Signature Verification** (recommended for production)
   - Check "Enable Signed Event Webhook Requests"
   - Copy the "Verification Key" (public key)
   - Add it to your environment variables as `SENDGRID_WEBHOOK_VERIFICATION_KEY`

8. **Click "Save"**

---

## Step 3: Test the Webhook

SendGrid provides a "Test Your Integration" button that sends sample events to your webhook.

1. In the Event Webhook settings, click **"Test Your Integration"**

2. SendGrid will send sample events to your webhook URL

3. Check your Email Analytics Dashboard at `/admin/email-analytics` to verify events appear

4. Check server logs for webhook processing messages:
   ```
   [SendGrid Webhook] Processing 5 events
   [SendGrid Webhook] Recorded delivered event for test@example.com
   [SendGrid Webhook] Recorded open event for test@example.com
   ```

---

## Step 4: Environment Variables (Optional)

### Signature Verification

For production security, enable signature verification:

1. In SendGrid Event Webhook settings, enable "Enable Signed Event Webhook Requests"

2. Copy the "Verification Key" (a long public key string)

3. Add to your environment variables:
   ```
   SENDGRID_WEBHOOK_VERIFICATION_KEY="-----BEGIN PUBLIC KEY-----
   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
   -----END PUBLIC KEY-----"
   ```

4. Restart your server to apply the change

Without this key, the webhook will still work but won't verify request signatures (less secure).

---

## Step 5: Monitor Events

After configuration, all email events will automatically flow into your analytics dashboard:

1. **Visit** `/admin/email-analytics` to see real-time metrics

2. **Overview KPIs** update automatically:
   - Total tracked emails
   - Delivery rate
   - Open rate
   - Click rate
   - Bounce rate
   - Spam reports
   - Unsubscribes

3. **Search and filter** emails by status (bounced, opened, clicked, etc.)

4. **Click any email row** to see its complete event timeline

---

## Troubleshooting

### Webhook Not Receiving Events

1. **Check webhook URL** - Ensure it's publicly accessible (not localhost)

2. **Check SendGrid logs** - Go to Activity → Event Webhook Logs to see delivery attempts

3. **Check server logs** - Look for `[SendGrid Webhook]` messages

4. **Test manually** with curl:
   ```bash
   curl -X POST https://YOUR_DOMAIN.manus.space/api/webhooks/sendgrid \
     -H "Content-Type: application/json" \
     -d '[{
       "email": "test@example.com",
       "timestamp": 1234567890,
       "event": "delivered",
       "sg_event_id": "test-event-123",
       "sg_message_id": "test-msg-456"
     }]'
   ```

### Events Not Appearing in Dashboard

1. **Check database** - Verify `emailEvents` and `emailStatus` tables exist

2. **Check for errors** - Look for error messages in server logs

3. **Verify authentication** - Ensure you're logged in to access `/admin/email-analytics`

### Signature Verification Failing

1. **Check key format** - Verification key must include `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`

2. **Check environment variable** - Ensure `SENDGRID_WEBHOOK_VERIFICATION_KEY` is set correctly

3. **Restart server** - Changes to environment variables require server restart

---

## Event Schema Reference

### SendGrid Event Format

```json
[
  {
    "email": "user@example.com",
    "timestamp": 1234567890,
    "event": "delivered",
    "sg_event_id": "abc123",
    "sg_message_id": "xyz789",
    "reason": "Optional reason for bounce/drop",
    "url": "https://example.com/link" 
  }
]
```

### Database Tables

**emailEvents** - Raw event log
- `id` - Auto-increment primary key
- `email` - Recipient email address
- `eventType` - Event name (delivered, open, click, etc.)
- `reason` - Optional reason (for bounces/drops)
- `sgEventId` - SendGrid event ID (for deduplication)
- `sgMessageId` - SendGrid message ID
- `timestamp` - When event occurred
- `createdAt` - When record was created

**emailStatus** - Aggregated metrics per email
- `id` - Auto-increment primary key
- `email` - Recipient email address (unique)
- `lastEvent` - Most recent event type
- `lastEventAt` - Timestamp of most recent event
- `delivered` - Count of delivered emails
- `opened` - Count of opens
- `clicked` - Count of clicks
- `bounce` - Boolean flag (1 if ever bounced)
- `spam` - Boolean flag (1 if marked as spam)
- `unsubscribed` - Boolean flag (1 if unsubscribed)
- `createdAt` - When record was created

---

## Next Steps

1. **Build "Do Not Email" suppression** - Automatically exclude bounced/spam/unsubscribed emails from future campaigns

2. **Add email health indicators** - Show engagement badges next to email addresses in lead views

3. **Create email performance reports** - Weekly digest of deliverability metrics

4. **Implement re-engagement campaigns** - Target emails that opened but didn't click

---

## Support

For SendGrid webhook issues, consult:
- SendGrid Event Webhook Docs: https://docs.sendgrid.com/for-developers/tracking-events/event
- SendGrid Support: https://support.sendgrid.com
