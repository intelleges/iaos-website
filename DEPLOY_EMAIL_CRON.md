# Email Automation Cron Job - Ready to Deploy

**Quick deployment guide for automated follow-up emails**

---

## What This Does

Sends automated follow-up emails 2 hours after document downloads with Calendly booking link.

---

## Option 1: Railway (Recommended - Easiest)

### Step 1: Create New Service

1. Log in to https://railway.app/
2. Select your project
3. Click **New** → **Empty Service**
4. Name: **Email Processor**

### Step 2: Connect Repository

1. Click **Settings** → **Source**
2. Connect your GitHub repo
3. **Root Directory:** `/`
4. **Build Command:** `pnpm install`
5. **Start Command:** `node --loader tsx server/emailProcessor.ts`

### Step 3: Copy Environment Variables

Copy these from your main service:

```bash
DATABASE_URL=mysql://...
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
```

### Step 4: Enable Cron Schedule

1. Click **Settings** → **Cron**
2. Enable **Cron Schedule**
3. Schedule: `*/15 * * * *` (every 15 minutes)
4. Save

### Step 5: Deploy

Railway will auto-deploy. Check logs for:
```
[Email Processor] Starting email processing run...
[Email Processor] Found X emails to send
[Email Processor] Successfully sent email to...
```

**Done! ✅**

---

## Option 2: Heroku Scheduler

### Step 1: Add Scheduler Add-on

```bash
heroku addons:create scheduler:standard
```

### Step 2: Configure Job

```bash
heroku addons:open scheduler
```

In dashboard:
- **Job:** `node --loader tsx server/emailProcessor.ts`
- **Frequency:** Every 10 minutes
- **Dyno:** Standard-1X

**Done! ✅**

---

## Option 3: Vercel Cron (If using Vercel)

### Step 1: Create `vercel.json`

Already exists in project root:

```json
{
  "crons": [{
    "path": "/api/cron/email-processor",
    "schedule": "*/15 * * * *"
  }]
}
```

### Step 2: Create API Route

File: `server/api/cron/email-processor.ts`

```typescript
import { emailProcessor } from '../../emailProcessor';

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  await emailProcessor();
  res.status(200).json({ success: true });
}
```

### Step 3: Add Environment Variable

```bash
CRON_SECRET=your-random-secret-key
```

**Done! ✅**

---

## Option 4: AWS Lambda + EventBridge

### Step 1: Package Lambda

```bash
cd server
zip -r emailProcessor.zip emailProcessor.ts node_modules
```

### Step 2: Create Lambda Function

1. Go to https://console.aws.amazon.com/lambda/
2. Create function: **intelleges-email-processor**
3. Runtime: Node.js 20.x
4. Upload `emailProcessor.zip`

### Step 3: Add Environment Variables

```
DATABASE_URL=mysql://...
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
```

### Step 4: Create EventBridge Rule

1. Go to https://console.aws.amazon.com/events/
2. Create rule: **email-processor-schedule**
3. Schedule: Rate expression → `15 minutes`
4. Target: Your Lambda function

**Done! ✅**

---

## Monitoring & Testing

### Check Database for Pending Emails

```sql
SELECT * FROM scheduled_emails 
WHERE status = 'pending' 
AND scheduled_send_time < NOW()
ORDER BY scheduled_send_time;
```

### Manual Test Run

```bash
cd /path/to/project
node --loader tsx server/emailProcessor.ts
```

Expected output:
```
[Email Processor] Starting email processing run...
[Email Processor] Found 2 emails to send
[Email Processor] Successfully sent email to john@example.com (ID: 123)
[Email Processor] Email processing complete. Sent: 2, Failed: 0
```

### Check Sent Emails

```sql
SELECT * FROM scheduled_emails 
WHERE status = 'sent' 
ORDER BY sent_at DESC 
LIMIT 10;
```

### Check Failed Emails

```sql
SELECT * FROM scheduled_emails 
WHERE status = 'failed' 
ORDER BY updated_at DESC;
```

---

## Troubleshooting

### No emails being sent

1. Check `scheduled_send_time` is in the past
2. Verify `status = 'pending'`
3. Check SendGrid API key is valid
4. Review processor logs

### Emails sent multiple times

1. Ensure cron runs every 15+ minutes
2. Check status updates to 'sent'
3. Verify database transaction commits

### SendGrid errors

1. Verify API key has send permissions
2. Check sender email is verified
3. Review SendGrid activity logs at https://app.sendgrid.com/

---

## Email Content

The automated email includes:

**Subject:** "Your Compliance Resource + Next Steps"

**Body:**
- Thank you message
- Link to downloaded document
- Calendly booking link
- Contact information

**Template:** `server/emailProcessor.ts` (line ~80)

---

## Already Implemented

✅ Email processor script (`server/emailProcessor.ts`)  
✅ Database schema for `scheduled_emails` table  
✅ 2-hour delay logic  
✅ SendGrid integration  
✅ Error handling and retry logic  
✅ Logging and monitoring  

**You only need to deploy the cron job!**

---

## Quick Start Checklist

- [ ] Choose deployment option (Railway recommended)
- [ ] Copy environment variables
- [ ] Configure cron schedule (*/15 * * * *)
- [ ] Deploy and verify logs
- [ ] Test with a document download
- [ ] Verify email received after 2 hours

---

## Support

Issues? Check:
1. Environment variables are set
2. Database connection works
3. SendGrid API key is valid
4. Cron schedule is active
5. Logs for error messages
