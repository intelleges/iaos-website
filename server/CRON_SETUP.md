# Email Processor Cron Job Setup

## Overview

The email processor (`emailProcessor.ts`) sends scheduled follow-up emails to users who download documents. It should run every hour to process pending emails.

## Cron Job Configuration

### Option 1: System Crontab (Recommended for Production)

Add this line to your crontab (`crontab -e`):

```bash
0 * * * * cd /home/ubuntu/intelleges-marketing-site && node dist/emailProcessor.js >> /var/log/intelleges-email-processor.log 2>&1
```

This runs the processor every hour at the top of the hour (e.g., 1:00, 2:00, 3:00).

### Option 2: PM2 Cron (Alternative)

If using PM2 for process management:

```bash
pm2 start dist/emailProcessor.js --cron "0 * * * *" --name "email-processor" --no-autorestart
```

### Option 3: Node-Cron (Development)

For development/testing, you can use node-cron in your main server:

```typescript
import cron from 'node-cron';
import { processScheduledEmails } from './emailProcessor';

// Run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled email processor...');
  await processScheduledEmails();
});
```

## Environment Variables Required

Ensure these are set in your `.env` file:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
CALENDLY_URL=https://calendly.com/intelleges/demo
```

## Testing the Processor

Run manually to test:

```bash
cd /home/ubuntu/intelleges-marketing-site
node dist/emailProcessor.js
```

## Monitoring

Check logs:

```bash
tail -f /var/log/intelleges-email-processor.log
```

## Email Schedule

- **Immediate**: User downloads document and receives confirmation
- **2 hours later**: Automated follow-up email with Calendly link (sent by this processor)
- **Day 3**: Additional nurture email (if implemented)
- **Day 7**: Final nurture email (if implemented)

## Troubleshooting

1. **Emails not sending**: Check SendGrid API key and logs
2. **Database connection errors**: Verify DATABASE_URL environment variable
3. **Cron not running**: Check crontab syntax and permissions
4. **Failed emails**: Check `scheduledEmails` table for `failed = 1` records
