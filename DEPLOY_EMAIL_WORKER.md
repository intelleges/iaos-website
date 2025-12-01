# Email Automation Worker Deployment Guide

## Overview

The email automation worker processes scheduled emails from the `scheduledEmails` database table and sends them via SendGrid. It should run as a cron job every 5-10 minutes to ensure timely delivery of follow-up emails.

## Prerequisites

- SendGrid account with API key
- Railway account (recommended) or any cron job hosting service
- Access to production database (DATABASE_URL)
- Environment variables configured

## Required Environment Variables

```
DATABASE_URL=mysql://user:pass@host:port/database
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
```

## Deployment Options

### Option 1: Railway Scheduled Worker (Recommended)

Railway provides native support for scheduled workers with cron expressions.

**Steps:**

1. **Create New Service**
   - Go to your Railway project
   - Click "New" → "Empty Service"
   - Name it "Email Worker"

2. **Configure Build**
   - Connect to your GitHub repository
   - Set build command: `pnpm install && pnpm build`
   - Set root directory: `/`

3. **Configure Cron Schedule**
   - In service settings, enable "Cron"
   - Set schedule: `*/10 * * * *` (every 10 minutes)
   - Set start command: `node dist/server/workers/emailWorker.js`

4. **Add Environment Variables**
   - Copy all environment variables from your main service
   - Ensure DATABASE_URL, SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_FROM_NAME are set

5. **Deploy**
   - Railway will automatically build and schedule the worker
   - Check logs to verify successful email processing

**Railway Cron Syntax:**
```
*/10 * * * *  # Every 10 minutes
*/5 * * * *   # Every 5 minutes
0 * * * *     # Every hour
0 */2 * * *   # Every 2 hours
```

### Option 2: Heroku Scheduler

Heroku provides a Scheduler add-on for running periodic tasks.

**Steps:**

1. **Install Scheduler Add-on**
   ```bash
   heroku addons:create scheduler:standard
   ```

2. **Configure Job**
   ```bash
   heroku addons:open scheduler
   ```
   - Add new job
   - Set frequency: Every 10 minutes
   - Set command: `node dist/server/workers/emailWorker.js`

3. **Verify Environment Variables**
   ```bash
   heroku config
   ```
   Ensure all required variables are set.

### Option 3: AWS Lambda + EventBridge

Use AWS Lambda for serverless execution with EventBridge for scheduling.

**Steps:**

1. **Create Lambda Function**
   - Runtime: Node.js 18.x
   - Upload deployment package (built code + node_modules)
   - Set handler: `dist/server/workers/emailWorker.handler`

2. **Configure EventBridge Rule**
   - Create new rule
   - Schedule expression: `rate(10 minutes)`
   - Target: Your Lambda function

3. **Set Environment Variables**
   - Add all required variables in Lambda configuration
   - Ensure DATABASE_URL uses SSL for TiDB Cloud

4. **Configure VPC (if needed)**
   - If database requires VPC access, configure Lambda VPC settings

### Option 4: Cron Job on VPS/Server

Run as a traditional cron job on your own server.

**Steps:**

1. **Build the Project**
   ```bash
   pnpm install
   pnpm build
   ```

2. **Create Cron Job**
   ```bash
   crontab -e
   ```
   
   Add line:
   ```
   */10 * * * * cd /path/to/project && node dist/server/workers/emailWorker.js >> /var/log/email-worker.log 2>&1
   ```

3. **Set Environment Variables**
   - Create `.env` file in project root with all required variables
   - Or export them in your shell profile

4. **Monitor Logs**
   ```bash
   tail -f /var/log/email-worker.log
   ```

## Email Worker Logic

The worker performs the following steps:

1. **Query Pending Emails**
   - Selects emails where `scheduledFor <= NOW()` and `sent = 0`
   - Limits to 50 emails per run to avoid timeouts

2. **Send Each Email**
   - Sends via SendGrid API
   - Marks as sent in database (`sent = 1`, `sentAt = NOW()`)
   - Logs success/failure

3. **Error Handling**
   - Continues processing remaining emails if one fails
   - Logs errors for monitoring
   - Does not retry failed emails (manual intervention required)

## Monitoring

### Success Metrics
- Check `scheduledEmails` table for `sent = 1` records
- Monitor SendGrid dashboard for delivery rates
- Check worker logs for successful processing

### Failure Detection
- Emails with `scheduledFor` in the past but `sent = 0`
- Error messages in worker logs
- SendGrid bounces/blocks

### Database Query for Monitoring
```sql
-- Pending emails (should be processed soon)
SELECT * FROM scheduledEmails 
WHERE sent = 0 AND scheduledFor <= NOW() 
ORDER BY scheduledFor ASC;

-- Recently sent emails
SELECT * FROM scheduledEmails 
WHERE sent = 1 AND sentAt >= DATE_SUB(NOW(), INTERVAL 1 HOUR) 
ORDER BY sentAt DESC;

-- Failed/stuck emails (scheduled over 1 hour ago but not sent)
SELECT * FROM scheduledEmails 
WHERE sent = 0 AND scheduledFor < DATE_SUB(NOW(), INTERVAL 1 HOUR) 
ORDER BY scheduledFor ASC;
```

## Troubleshooting

### Worker Not Running
- Check cron schedule configuration
- Verify service is deployed and active
- Check environment variables are set

### Emails Not Sending
- Verify SendGrid API key is valid
- Check SendGrid account status (not suspended)
- Verify `SENDGRID_FROM_EMAIL` is verified in SendGrid
- Check database connection (DATABASE_URL)

### Database Connection Errors
- Ensure DATABASE_URL is correct
- For TiDB Cloud, ensure SSL is enabled
- Check database firewall rules allow worker IP

### SendGrid Errors
- **401 Unauthorized**: Invalid API key
- **403 Forbidden**: Sender email not verified
- **429 Too Many Requests**: Rate limit exceeded (reduce frequency)

## Testing

### Manual Test Run
```bash
# Set environment variables
export DATABASE_URL="mysql://..."
export SENDGRID_API_KEY="SG...."
export SENDGRID_FROM_EMAIL="noreply@intelleges.com"
export SENDGRID_FROM_NAME="Intelleges"

# Run worker
node dist/server/workers/emailWorker.js
```

### Create Test Email
```sql
INSERT INTO scheduledEmails (
  recipientEmail, 
  recipientName, 
  emailType, 
  subject, 
  htmlContent, 
  scheduledFor, 
  sent, 
  createdAt
) VALUES (
  'test@example.com',
  'Test User',
  'test',
  'Test Email from Worker',
  '<p>This is a test email from the email automation worker.</p>',
  NOW(),
  0,
  NOW()
);
```

Then run the worker and verify the email is sent.

## Production Checklist

- [ ] SendGrid API key configured
- [ ] Sender email verified in SendGrid
- [ ] DATABASE_URL configured with SSL
- [ ] Cron schedule configured (every 10 minutes)
- [ ] Worker logs accessible for monitoring
- [ ] Test email sent successfully
- [ ] Monitoring queries bookmarked
- [ ] Alert system configured for failures (optional)

## Cost Considerations

### Railway
- Scheduled workers count toward monthly usage
- ~$5-10/month for light usage

### Heroku
- Scheduler add-on: Free tier available
- Dyno hours consumed per run

### AWS Lambda
- Free tier: 1M requests/month
- ~$0.20 per 1M requests after free tier

### SendGrid
- Free tier: 100 emails/day
- Essentials plan: $19.95/month for 50K emails

## Next Steps

1. Choose deployment platform
2. Configure environment variables
3. Deploy worker
4. Test with sample email
5. Monitor for 24 hours
6. Set up alerts (optional)

## Support

For issues with:
- **SendGrid**: Check SendGrid documentation or support
- **Railway**: Check Railway documentation or Discord
- **Database**: Check TiDB Cloud documentation or support
- **Worker Logic**: Review worker logs and database state
