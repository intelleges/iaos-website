# SendGrid Production Configuration Guide

This guide walks you through configuring SendGrid webhooks in production to enable real-time email event tracking and automatic email suppression.

## Overview

The Intelleges marketing site uses SendGrid webhooks to:
- Track email deliverability, opens, clicks, bounces, and spam reports
- Automatically suppress bounced, spam-reported, and unsubscribed email addresses
- Provide real-time email analytics in the admin dashboard
- Protect sender reputation by preventing emails to problematic addresses

## Prerequisites

- SendGrid account with API access
- Production deployment URL (e.g., `https://yourdomain.manus.space`)
- Admin access to SendGrid dashboard
- Database access to verify webhook events

## Step 1: Configure Webhook in SendGrid Dashboard

### 1.1 Navigate to Webhook Settings

1. Log in to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Go to **Settings** → **Mail Settings** → **Event Webhook**
3. Click **Create New Webhook** (or edit existing webhook)

### 1.2 Set Webhook URL

Enter your production webhook endpoint:

```
https://yourdomain.manus.space/api/webhooks/sendgrid
```

**Important:** Replace `yourdomain.manus.space` with your actual production domain.

### 1.3 Enable Required Event Types

Check the following event types (all are required for full functionality):

- ✅ **Delivered** - Email successfully delivered to recipient's inbox
- ✅ **Opened** - Recipient opened the email
- ✅ **Clicked** - Recipient clicked a link in the email
- ✅ **Bounced** - Email bounced (hard or soft bounce)
- ✅ **Dropped** - SendGrid dropped the email (invalid address, suppression list)
- ✅ **Spam Report** - Recipient marked email as spam
- ✅ **Unsubscribe** - Recipient unsubscribed from emails

**Do NOT enable:**
- ❌ Deferred - Creates excessive noise in analytics
- ❌ Processed - Not needed for analytics

### 1.4 Configure Webhook Settings

- **HTTP POST URL**: `https://yourdomain.manus.space/api/webhooks/sendgrid`
- **Authorization Method**: None (signature verification handled in code)
- **Event Notification Version**: v3 (default)
- **Send Test Notification**: Click to verify webhook is reachable

### 1.5 Enable Signature Verification (Recommended)

1. In SendGrid webhook settings, click **Generate Verification Key**
2. Copy the generated public key (starts with `-----BEGIN PUBLIC KEY-----`)
3. Save the key - you'll need it in Step 2

## Step 2: Add Webhook Verification Key to Environment Variables

### 2.1 Add Environment Variable

Add the SendGrid webhook verification key to your production environment:

**Variable Name:**
```
SENDGRID_WEBHOOK_VERIFICATION_KEY
```

**Variable Value:**
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE... (your actual key)
-----END PUBLIC KEY-----
```

**How to add:**
- In Manus: Go to Project Settings → Secrets → Add New Secret
- In other platforms: Add to environment variables or secrets manager

### 2.2 Restart Application

After adding the environment variable, restart your application to apply changes:

```bash
# If using Manus, restart is automatic
# If self-hosting, restart your Node.js process
pm2 restart intelleges-marketing-site
# or
systemctl restart intelleges-marketing-site
```

## Step 3: Test Webhook Integration

### 3.1 Send Test Email

Send a test email using your application (e.g., download a whitepaper):

1. Go to your production site
2. Fill out an email capture form
3. Submit the form to trigger a follow-up email

### 3.2 Verify Webhook Events

Check that webhook events are being received:

**Option A: Check Application Logs**
```bash
# Look for webhook log messages
grep "SendGrid Webhook" /var/log/app.log

# Expected output:
[SendGrid Webhook] Processing 1 events
[SendGrid Webhook] Recorded delivered event for user@example.com
```

**Option B: Check Database**
```sql
-- Check emailEvents table for recent events
SELECT * FROM emailEvents 
ORDER BY createdAt DESC 
LIMIT 10;

-- Check emailStatus table for aggregated stats
SELECT email, lastEvent, lastEventAt, delivered, opened, clicked, bounce, spam, unsubscribed
FROM emailStatus 
ORDER BY lastEventAt DESC 
LIMIT 10;
```

**Option C: Check Admin Dashboard**
1. Log in to your site as admin
2. Go to `/admin/email-analytics`
3. Verify that test email appears in the table
4. Click on the email to see event timeline

### 3.3 Test Suppression System

Test that automatic suppression works:

**Option A: Simulate Bounce Event**
```bash
# Use the test webhook script
cd /home/ubuntu/intelleges-marketing-site
node test-webhook.mjs bounce test@example.com
```

**Option B: Check Suppression in Database**
```sql
-- Check if email was suppressed
SELECT email, isSuppressed, suppressionReason, suppressedAt
FROM emailStatus
WHERE email = 'test@example.com';

-- Expected: isSuppressed = 1, suppressionReason = 'bounce'
```

**Option C: Verify Form Blocking**
1. Try to submit email capture form with suppressed email
2. Should see error: "This email address cannot receive communications (reason: bounce)"

## Step 4: Monitor Webhook Health

### 4.1 Check Webhook Status in SendGrid

1. Go to SendGrid Dashboard → Settings → Event Webhook
2. Check webhook status indicator (should be green)
3. View recent delivery attempts and response codes

**Healthy webhook:**
- Status: Active (green)
- Recent responses: 200 OK
- Delivery rate: >95%

**Unhealthy webhook:**
- Status: Failing (red)
- Recent responses: 4xx or 5xx errors
- Delivery rate: <90%

### 4.2 Monitor Application Logs

Set up log monitoring for webhook errors:

```bash
# Monitor webhook errors in real-time
tail -f /var/log/app.log | grep "SendGrid Webhook"

# Count webhook errors in last hour
grep "SendGrid Webhook.*error" /var/log/app.log | grep "$(date +%Y-%m-%d\ %H)" | wc -l
```

### 4.3 Set Up Alerts (Optional)

Configure alerts for webhook failures:

**Option A: SendGrid Alerts**
1. Go to SendGrid Dashboard → Settings → Alerts
2. Create alert for "Event Webhook Failures"
3. Set threshold: >10 failures in 1 hour
4. Add email recipients

**Option B: Application Monitoring**
- Use monitoring tools (Datadog, New Relic, etc.)
- Set up alerts for error rate spikes
- Monitor database growth (emailEvents table)

## Step 5: Verify Suppression System

### 5.1 Check Suppression Statistics

Use the admin dashboard or API to check suppression stats:

**Admin Dashboard:**
1. Go to `/admin/email-analytics`
2. View suppression counts in overview cards
3. Filter by suppression status

**API Query:**
```typescript
// Get suppression statistics
const stats = await trpc.emailSuppression.getSuppressionStats.query();

console.log(stats);
// Output:
// {
//   total: 15,
//   byReason: {
//     bounce: 8,
//     spam: 3,
//     unsubscribe: 4,
//     manual: 0
//   }
// }
```

### 5.2 Test Manual Suppression

Test manual suppression/unsuppression:

```typescript
// Suppress an email manually
await trpc.emailSuppression.suppressEmail.mutate({
  email: "test@example.com",
  reason: "manual"
});

// Check suppression status
const status = await trpc.emailSuppression.checkEmailSuppression.query({
  email: "test@example.com"
});

console.log(status);
// Output: { isSuppressed: true, reason: "manual", suppressedAt: "2024-01-15T10:30:00Z" }

// Remove suppression
await trpc.emailSuppression.unsuppressEmail.mutate({
  email: "test@example.com"
});
```

## Troubleshooting

### Webhook Not Receiving Events

**Problem:** SendGrid shows webhook as failing or no events in database

**Solutions:**
1. Verify webhook URL is correct and publicly accessible
2. Check firewall rules allow incoming POST requests
3. Verify SSL certificate is valid (SendGrid requires HTTPS)
4. Check application logs for errors
5. Test webhook URL manually:
   ```bash
   curl -X POST https://yourdomain.manus.space/api/webhooks/sendgrid \
     -H "Content-Type: application/json" \
     -d '[{"email":"test@example.com","event":"delivered","timestamp":1234567890}]'
   ```

### Signature Verification Failing

**Problem:** Webhook returns 401 Unauthorized

**Solutions:**
1. Verify `SENDGRID_WEBHOOK_VERIFICATION_KEY` is set correctly
2. Check that public key includes header/footer lines:
   ```
   -----BEGIN PUBLIC KEY-----
   ...
   -----END PUBLIC KEY-----
   ```
3. Ensure no extra whitespace or line breaks in key
4. Restart application after adding key
5. Temporarily disable verification for testing:
   ```typescript
   // In server/webhooks/sendgrid.ts, comment out verification:
   // if (verificationKey) { ... }
   ```

### Suppression Not Working

**Problem:** Emails still being sent to suppressed addresses

**Solutions:**
1. Check database: `SELECT * FROM emailStatus WHERE isSuppressed = 1;`
2. Verify suppression check is in email scheduling code
3. Check application logs for suppression messages
4. Test suppression manually:
   ```typescript
   const check = await trpc.emailSuppression.checkEmailSuppression.query({
     email: "bounced@example.com"
   });
   console.log(check); // Should show isSuppressed: true
   ```

### Database Growing Too Large

**Problem:** emailEvents table growing rapidly

**Solutions:**
1. Implement data retention policy (delete events older than 90 days):
   ```sql
   DELETE FROM emailEvents 
   WHERE createdAt < DATE_SUB(NOW(), INTERVAL 90 DAY);
   ```
2. Archive old events to separate table or data warehouse
3. Add database index on `createdAt` for faster cleanup:
   ```sql
   CREATE INDEX idx_emailEvents_createdAt ON emailEvents(createdAt);
   ```

## Security Best Practices

### 1. Always Enable Signature Verification

- Prevents unauthorized webhook calls
- Protects against data injection attacks
- Required for production environments

### 2. Use HTTPS Only

- SendGrid requires HTTPS for webhooks
- Ensures data is encrypted in transit
- Prevents man-in-the-middle attacks

### 3. Rate Limit Webhook Endpoint

Add rate limiting to prevent abuse:

```typescript
// In server/_core/index.ts
import rateLimit from "express-rate-limit";

const webhookLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: "Too many webhook requests"
});

app.post("/api/webhooks/sendgrid", webhookLimiter, handleSendGridWebhook);
```

### 4. Monitor for Anomalies

- Set up alerts for unusual webhook activity
- Monitor for sudden spikes in bounce/spam rates
- Review suppression list regularly for false positives

## Maintenance

### Weekly Tasks

- [ ] Review email analytics dashboard
- [ ] Check suppression list for false positives
- [ ] Monitor webhook delivery rate in SendGrid

### Monthly Tasks

- [ ] Clean up old emailEvents records (>90 days)
- [ ] Review suppression statistics and trends
- [ ] Audit manual suppressions
- [ ] Check for SendGrid API updates

### Quarterly Tasks

- [ ] Review and update email templates
- [ ] Analyze email engagement trends
- [ ] Optimize email sending schedule
- [ ] Review sender reputation scores

## Support

If you encounter issues not covered in this guide:

1. Check application logs: `/var/log/app.log`
2. Review SendGrid webhook delivery logs
3. Contact SendGrid support: https://support.sendgrid.com
4. Contact Intelleges support: sales@intelleges.com

## Related Documentation

- [SENDGRID_WEBHOOK_SETUP.md](./SENDGRID_WEBHOOK_SETUP.md) - Original webhook setup guide
- [SendGrid Event Webhook Documentation](https://docs.sendgrid.com/for-developers/tracking-events/event)
- [SendGrid Webhook Security](https://docs.sendgrid.com/for-developers/tracking-events/getting-started-event-webhook-security-features)
