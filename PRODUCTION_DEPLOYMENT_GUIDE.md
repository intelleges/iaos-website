# Production Deployment Guide

**Complete step-by-step instructions for deploying Intelleges marketing site to production**

---

## Table of Contents

1. [Analytics Tracking Configuration](#1-analytics-tracking-configuration)
2. [Document PDF Upload & Configuration](#2-document-pdf-upload--configuration)
3. [Email Automation Cron Job Setup](#3-email-automation-cron-job-setup)

---

## 1. Analytics Tracking Configuration

### Overview
Configure Google Analytics 4, Google Tag Manager, LinkedIn Insight Tag, and Apollo.io tracking for complete marketing attribution and conversion tracking.

### Step 1: Create Tracking Accounts

#### Google Analytics 4 (GA4)
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** → **Create Property**
3. Enter property name: **Intelleges Marketing Site**
4. Select timezone and currency
5. Click **Create** → **Web** → Add your domain
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

#### Google Tag Manager (GTM)
1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **Create Account**
3. Account name: **Intelleges**
4. Container name: **Intelleges Website**
5. Target platform: **Web**
6. Copy your **Container ID** (format: `GTM-XXXXXXX`)

#### LinkedIn Insight Tag
1. Go to [LinkedIn Campaign Manager](https://www.linkedin.com/campaignmanager/)
2. Navigate to **Account Assets** → **Insight Tag**
3. Click **Install my Insight Tag**
4. Copy your **Partner ID** (format: `1234567`)

#### Apollo.io Visitor Tracking
1. Log in to [Apollo.io](https://app.apollo.io/)
2. Navigate to **Settings** → **Integrations** → **Website Visitor Tracking**
3. Click **Get Tracking Code**
4. Copy your **Tracking ID** (format: `apollo_XXXXXXXXXXXX`)

### Step 2: Update Environment Variables

Add the following to your production environment variables (Railway, Vercel, or your hosting platform):

```bash
# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
VITE_GTM_CONTAINER_ID=GTM-XXXXXXX

# LinkedIn Insight Tag
VITE_LINKEDIN_PARTNER_ID=1234567

# Apollo.io Tracking
VITE_APOLLO_TRACKING_ID=apollo_XXXXXXXXXXXX
```

### Step 3: Update Analytics Configuration File

Edit `client/src/lib/analytics.ts` and replace placeholder IDs:

```typescript
// Replace these with your actual tracking IDs
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX';
const GTM_CONTAINER_ID = import.meta.env.VITE_GTM_CONTAINER_ID || 'GTM-XXXXXXX';
const LINKEDIN_PARTNER_ID = import.meta.env.VITE_LINKEDIN_PARTNER_ID || '1234567';
const APOLLO_TRACKING_ID = import.meta.env.VITE_APOLLO_TRACKING_ID || 'apollo_XXXXXXXXXXXX';
```

### Step 4: Configure Google Tag Manager

1. Log in to [Google Tag Manager](https://tagmanager.google.com/)
2. Select your container
3. **Add GA4 Configuration Tag:**
   - Click **Tags** → **New**
   - Tag type: **Google Analytics: GA4 Configuration**
   - Measurement ID: Your GA4 ID
   - Trigger: **All Pages**
   - Save and name it **GA4 Config**

4. **Add Conversion Tracking Tags:**

   **Lead Form Submission:**
   - Tag type: **Google Analytics: GA4 Event**
   - Event name: `lead_form_submit`
   - Trigger: Custom Event `lead_form_submit`

   **Email Capture:**
   - Tag type: **Google Analytics: GA4 Event**
   - Event name: `email_capture`
   - Trigger: Custom Event `email_capture`

   **Calendly Opened:**
   - Tag type: **Google Analytics: GA4 Event**
   - Event name: `calendly_opened`
   - Trigger: Custom Event `calendly_opened`

   **PDF Downloaded:**
   - Tag type: **Google Analytics: GA4 Event**
   - Event name: `pdf_download`
   - Trigger: Custom Event `pdf_download`

5. **Publish Container:**
   - Click **Submit** → **Publish**
   - Version name: **Initial Production Setup**

### Step 5: Verify Analytics Installation

1. Deploy your site with updated environment variables
2. Open your site in a browser
3. Open browser DevTools → **Console**
4. Look for analytics initialization messages
5. Verify in Google Analytics **Realtime** report
6. Check GTM **Preview Mode** to see tag firing

### Step 6: Set Up Conversion Goals in GA4

1. Go to **Admin** → **Events**
2. Mark these as **Conversion Events:**
   - `lead_form_submit`
   - `email_capture`
   - `calendly_booked`
   - `pdf_download`

---

## 2. Document PDF Upload & Configuration

### Overview
Upload the 2 new one-pager PDFs (Compliance Maturity Model and Current Compliance Landscape) to S3 and update the download mappings.

### Step 1: Prepare PDF Files

Ensure you have the following PDFs ready:
- **Compliance Maturity Model** (recommended filename: `intelleges-compliance-maturity-model.pdf`)
- **Current Compliance Landscape** (recommended filename: `intelleges-compliance-landscape-2025.pdf`)

### Step 2: Upload to S3

#### Option A: Using AWS Console

1. Log in to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Navigate to your bucket (e.g., `intelleges-marketing-assets`)
3. Create folder structure: `documents/one-pagers/`
4. Click **Upload** → **Add files**
5. Select your 2 PDF files
6. **Permissions:** Set to **Public Read** (or use CloudFront CDN)
7. Click **Upload**
8. Copy the **Object URL** for each file

#### Option B: Using AWS CLI

```bash
# Upload Compliance Maturity Model
aws s3 cp intelleges-compliance-maturity-model.pdf \
  s3://intelleges-marketing-assets/documents/one-pagers/compliance-maturity-model.pdf \
  --acl public-read \
  --content-type application/pdf

# Upload Compliance Landscape
aws s3 cp intelleges-compliance-landscape-2025.pdf \
  s3://intelleges-marketing-assets/documents/one-pagers/compliance-landscape-2025.pdf \
  --acl public-read \
  --content-type application/pdf

# Get URLs
aws s3 presign s3://intelleges-marketing-assets/documents/one-pagers/compliance-maturity-model.pdf --expires-in 0
aws s3 presign s3://intelleges-marketing-assets/documents/one-pagers/compliance-landscape-2025.pdf --expires-in 0
```

#### Option C: Using CloudFront CDN (Recommended)

If you have CloudFront configured:

```
https://cdn.intelleges.com/documents/one-pagers/compliance-maturity-model.pdf
https://cdn.intelleges.com/documents/one-pagers/compliance-landscape-2025.pdf
```

### Step 3: Update Download Mappings

Edit `client/src/config/downloadMappings.ts`:

```typescript
// Find the Strategic Documents section (around line 140)
{
  id: 'compliance-maturity-model',
  title: 'Compliance Maturity Model',
  description: 'Framework for assessing and improving organizational compliance maturity across five progressive levels.',
  category: 'Strategic Documents',
  s3Key: 'https://YOUR-CDN-URL/documents/one-pagers/compliance-maturity-model.pdf', // ← UPDATE THIS
  fileSize: '2.1 MB',
  pages: 2,
  lastUpdated: '2025-11-30',
},
{
  id: 'compliance-landscape',
  title: 'Current Compliance Landscape',
  description: 'Comprehensive overview of the evolving regulatory environment and emerging compliance challenges in 2025.',
  category: 'Strategic Documents',
  s3Key: 'https://YOUR-CDN-URL/documents/one-pagers/compliance-landscape-2025.pdf', // ← UPDATE THIS
  fileSize: '1.8 MB',
  pages: 2,
  lastUpdated: '2025-11-30',
},
```

### Step 4: Update File Metadata (Optional)

If you want to display accurate file sizes and page counts:

```bash
# Get file size
ls -lh compliance-maturity-model.pdf | awk '{print $5}'

# Get page count (requires pdfinfo)
pdfinfo compliance-maturity-model.pdf | grep Pages | awk '{print $2}'
```

Update the `fileSize` and `pages` fields in `downloadMappings.ts` accordingly.

### Step 5: Test Downloads

1. Deploy updated code to production
2. Navigate to `/resources` page
3. Scroll to **Featured Compliance Frameworks** section
4. Click **Download** on each document
5. Verify email capture modal appears
6. Complete form and verify PDF downloads correctly
7. Check that download tracking is recorded in database

---

## 3. Email Automation Cron Job Setup

### Overview
Deploy the background email processor that sends automated follow-up emails 2 hours after document downloads.

### Architecture

The email processor (`server/emailProcessor.ts`) queries the `scheduled_emails` table for pending emails and sends them via SendGrid. It should run every 15 minutes.

### Option A: Railway Scheduled Worker (Recommended)

#### Step 1: Create New Railway Service

1. Log in to [Railway](https://railway.app/)
2. Select your project
3. Click **New** → **Empty Service**
4. Name it: **Email Processor**

#### Step 2: Configure Service

1. Click **Settings** → **Source**
2. Connect to your GitHub repository
3. **Root Directory:** `/` (same as main app)
4. **Build Command:** `pnpm install`
5. **Start Command:** `node --loader tsx server/emailProcessor.ts`

#### Step 3: Set Environment Variables

Copy all environment variables from your main service:

```bash
DATABASE_URL=mysql://...
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
```

#### Step 4: Configure Cron Schedule

1. Click **Settings** → **Cron**
2. Enable **Cron Schedule**
3. Schedule: `*/15 * * * *` (every 15 minutes)
4. Save changes

#### Step 5: Deploy and Monitor

1. Railway will automatically deploy
2. Check **Deployments** tab for build logs
3. Monitor **Logs** tab for email processing activity
4. Look for messages like:
   ```
   [Email Processor] Starting email processing run...
   [Email Processor] Found 3 emails to send
   [Email Processor] Successfully sent email to john@example.com
   ```

### Option B: Heroku Scheduler

#### Step 1: Add Heroku Scheduler

```bash
heroku addons:create scheduler:standard
```

#### Step 2: Configure Job

```bash
heroku addons:open scheduler
```

In the Scheduler dashboard:
- **Job:** `node --loader tsx server/emailProcessor.ts`
- **Frequency:** Every 10 minutes
- **Dyno size:** Standard-1X

### Option C: AWS Lambda + EventBridge

#### Step 1: Create Lambda Function

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
2. Click **Create function**
3. Name: `intelleges-email-processor`
4. Runtime: **Node.js 20.x**
5. Upload deployment package with `server/emailProcessor.ts` and dependencies

#### Step 2: Configure EventBridge Rule

1. Go to [EventBridge Console](https://console.aws.amazon.com/events/)
2. Click **Create rule**
3. Name: `email-processor-schedule`
4. Rule type: **Schedule**
5. Schedule pattern: **Rate expression** → `15 minutes`
6. Target: Your Lambda function

#### Step 3: Set Environment Variables

In Lambda configuration:
```
DATABASE_URL=mysql://...
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges
```

### Option D: Self-Hosted Cron (Linux Server)

#### Step 1: SSH to Server

```bash
ssh user@your-server.com
```

#### Step 2: Create Cron Job

```bash
crontab -e
```

Add this line:

```bash
*/15 * * * * cd /var/www/intelleges && node --loader tsx server/emailProcessor.ts >> /var/log/email-processor.log 2>&1
```

#### Step 3: Verify Cron Job

```bash
crontab -l
tail -f /var/log/email-processor.log
```

### Monitoring & Troubleshooting

#### Check Email Queue

```sql
-- View pending emails
SELECT * FROM scheduled_emails WHERE status = 'pending' ORDER BY scheduled_send_time;

-- View sent emails
SELECT * FROM scheduled_emails WHERE status = 'sent' ORDER BY sent_at DESC LIMIT 10;

-- View failed emails
SELECT * FROM scheduled_emails WHERE status = 'failed' ORDER BY updated_at DESC;
```

#### Common Issues

**No emails being sent:**
- Check `scheduled_send_time` is in the past
- Verify `status = 'pending'`
- Check SendGrid API key is valid
- Review processor logs for errors

**Emails sent multiple times:**
- Ensure cron job isn't running too frequently
- Check that status is updated to 'sent' after successful send
- Verify database transaction commits properly

**SendGrid errors:**
- Verify API key has send permissions
- Check sender email is verified in SendGrid
- Review SendGrid activity logs

#### Manual Testing

Run the processor manually to test:

```bash
cd /home/ubuntu/intelleges-marketing-site
node --loader tsx server/emailProcessor.ts
```

Expected output:
```
[Email Processor] Starting email processing run...
[Email Processor] Found 2 emails to send
[Email Processor] Successfully sent email to john@example.com (ID: 123)
[Email Processor] Successfully sent email to jane@example.com (ID: 124)
[Email Processor] Email processing complete. Sent: 2, Failed: 0
```

---

## Post-Deployment Checklist

### Analytics
- [ ] GA4 Measurement ID configured
- [ ] GTM Container ID configured
- [ ] LinkedIn Partner ID configured
- [ ] Apollo Tracking ID configured
- [ ] Conversion events firing in GA4
- [ ] GTM tags publishing correctly

### Documents
- [ ] Compliance Maturity Model PDF uploaded to S3
- [ ] Compliance Landscape PDF uploaded to S3
- [ ] Download URLs updated in downloadMappings.ts
- [ ] PDFs download correctly from website
- [ ] Email capture triggers on download

### Email Automation
- [ ] Cron job deployed and running
- [ ] Environment variables configured
- [ ] Test email sent successfully
- [ ] Scheduled emails processing every 15 minutes
- [ ] Failed emails logged and retried
- [ ] Email content renders correctly

### Final Verification
- [ ] All analytics tracking IDs visible in page source
- [ ] Download links return 200 status codes
- [ ] Email processor logs show successful sends
- [ ] Database shows emails marked as 'sent'
- [ ] No errors in production logs

---

## Support

For deployment assistance:

**Technical Support:** support@intelleges.com  
**Documentation:** Refer to `ANALYTICS_SETUP_GUIDE.md` and `CRON_SETUP.md`  
**Emergency Contact:** +1-917-818-0225

---

© 2025 Intelleges. All rights reserved.
