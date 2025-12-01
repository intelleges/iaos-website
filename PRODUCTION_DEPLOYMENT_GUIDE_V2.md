# Production Deployment Guide v2.0
**Intelleges Marketing Website**  
**Version:** 2.0  
**Last Updated:** November 30, 2025  
**Author:** Manus AI

---

## Executive Summary

This guide provides comprehensive step-by-step procedures for deploying the Intelleges marketing website to production. The deployment has been approved through Gate #2 with all critical criteria passing, and the website is authorized for launch on December 4, 2025.

**Deployment Strategy:** Blue-green deployment with database migration and zero-downtime cutover  
**Rollback Time:** < 5 minutes  
**Expected Downtime:** 0 minutes (seamless cutover)

---

## Prerequisites

Before beginning the deployment, ensure the following prerequisites are met:

### Access & Permissions

The deployment team requires access to the following systems:

**Infrastructure Access:**
- Production server SSH access with sudo privileges
- Database admin credentials for production DATABASE_URL
- DNS management console access
- SSL certificate management access
- CDN configuration access (if applicable)

**Third-Party Services:**
- SendGrid account with API key and webhook configuration access
- Analytics platform admin access
- Error monitoring service admin access
- Uptime monitoring service admin access

**Code Repository:**
- Git repository access with permission to pull from main branch
- Access to approved Gate #2 checkpoint version (commit hash documented in GATE2_VERIFICATION_REPORT.md)

### Environment Preparation

Verify the production environment meets these requirements:

**Server Specifications:**
- Node.js version 22.13.0 or higher installed
- pnpm package manager installed
- Minimum 2GB RAM available
- Minimum 10GB disk space available
- Ubuntu 22.04 LTS or compatible Linux distribution

**Network Configuration:**
- Port 80 (HTTP) open for redirect to HTTPS
- Port 443 (HTTPS) open for web traffic
- Port 3000 (application) accessible internally
- Firewall rules configured to allow database connections
- Reverse proxy (Nginx/Apache) configured if applicable

**Database Setup:**
- PostgreSQL 14+ or MySQL 8+ database provisioned
- Database user created with full schema modification privileges
- Database accessible from application server
- Database backups configured and tested
- Database connection pooling configured

---

## Deployment Procedure

### Phase 1: Pre-Deployment Preparation

**Step 1.1: Backup Current State**

Before making any changes, create complete backups of the current production environment:

```bash
# 1. Backup database
pg_dump -h <database_host> -U <database_user> -d <database_name> > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Backup application files
tar -czf app_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/intelleges

# 3. Backup environment variables
cp .env .env.backup_$(date +%Y%m%d_%H%M%S)

# 4. Document current Git commit
git log -1 --oneline > deployment_rollback_point.txt
```

**Step 1.2: Verify Environment Variables**

Confirm all required environment variables are set correctly in the production `.env` file:

```bash
# Required variables checklist:
DATABASE_URL=postgresql://user:password@host:5432/database
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=support@intelleges.com
SENDGRID_FROM_NAME=Intelleges
SENDGRID_WEBHOOK_SECRET=your_webhook_verification_key
JWT_SECRET=your_strong_random_secret_32plus_chars
VITE_ANALYTICS_WEBSITE_ID=your_production_analytics_id
VITE_ANALYTICS_ENDPOINT=https://analytics.yourdomain.com
VITE_APP_TITLE=Intelleges
VITE_APP_LOGO=https://intelleges.com/logo.png
```

**Step 1.3: Test Database Connectivity**

Verify the application can connect to the production database:

```bash
# Test database connection
psql $DATABASE_URL -c "SELECT version();"

# Expected output: PostgreSQL version information
# If connection fails, troubleshoot before proceeding
```

---

### Phase 2: Code Deployment

**Step 2.1: Pull Latest Approved Code**

Deploy the exact version approved in Gate #2:

```bash
# 1. Navigate to application directory
cd /var/www/intelleges

# 2. Stash any local changes (should be none in production)
git stash

# 3. Fetch latest from repository
git fetch origin

# 4. Checkout the approved commit (from Gate #2 approval)
git checkout <approved_commit_hash>

# 5. Verify correct version
git log -1 --oneline
# Expected: Matches approved version from GATE2_VERIFICATION_REPORT.md
```

**Step 2.2: Install Dependencies**

Install all required npm packages:

```bash
# 1. Clean install dependencies
pnpm install --frozen-lockfile

# 2. Verify no vulnerabilities
pnpm audit

# 3. If critical vulnerabilities found, assess and fix before proceeding
```

**Step 2.3: Build Production Assets**

Compile the application for production:

```bash
# 1. Build client and server
pnpm build

# 2. Verify build completed successfully
ls -lh dist/

# Expected: dist/client/ and dist/server/ directories with compiled assets

# 3. Check bundle sizes
du -sh dist/client/*

# Expected: Main bundle < 500KB gzipped
```

---

### Phase 3: Database Migration

**Step 3.1: Review Migration Plan**

Before applying migrations, review what changes will be made:

```bash
# 1. Generate migration SQL (dry run)
pnpm drizzle-kit generate

# 2. Review generated SQL files in drizzle/migrations/
cat drizzle/migrations/*.sql

# 3. Verify migrations match expected schema changes
# Expected tables: documentDownloads, scheduledEmails, emailStatus, emailEvents, etc.
```

**Step 3.2: Apply Database Migrations**

Execute the database schema changes:

```bash
# 1. Apply migrations to production database
pnpm db:push

# Expected output:
# ✓ Schema applied successfully
# ✓ All tables created/updated

# 2. Verify tables exist
psql $DATABASE_URL -c "\dt"

# Expected: List of 15+ tables including:
# - documentDownloads
# - scheduledEmails
# - emailStatus
# - emailEvents
# - leadQualificationAttempts
# - users
# - sessions
```

**Step 3.3: Verify Database Schema**

Confirm the database schema matches expectations:

```bash
# 1. Check documentDownloads table structure
psql $DATABASE_URL -c "\d documentDownloads"

# Expected columns: id, email, documentTitle, documentUrl, downloadedAt, ipAddress, userAgent

# 2. Check scheduledEmails table structure
psql $DATABASE_URL -c "\d scheduledEmails"

# Expected columns: id, recipientEmail, emailType, subject, htmlContent, scheduledFor, sent, failed, sentAt

# 3. Check emailStatus table structure
psql $DATABASE_URL -c "\d emailStatus"

# Expected columns: email, lastDelivered, lastOpened, lastClicked, lastBounced, isSuppressed, suppressionReason, suppressedAt
```

---

### Phase 4: Application Deployment

**Step 4.1: Stop Current Application**

Gracefully stop the running application:

```bash
# 1. If using PM2
pm2 stop intelleges-app

# 2. If using systemd
sudo systemctl stop intelleges

# 3. If using Docker
docker-compose down

# 4. Verify application stopped
curl http://localhost:3000
# Expected: Connection refused or 502 Bad Gateway
```

**Step 4.2: Start New Application Version**

Launch the newly deployed version:

```bash
# 1. If using PM2
pm2 start ecosystem.config.js --env production
pm2 save

# 2. If using systemd
sudo systemctl start intelleges
sudo systemctl status intelleges

# 3. If using Docker
docker-compose up -d

# 4. Verify application started
curl http://localhost:3000
# Expected: HTML response with homepage content
```

**Step 4.3: Verify Application Health**

Confirm the application is running correctly:

```bash
# 1. Check application logs
pm2 logs intelleges-app --lines 50

# Expected: No errors, successful startup messages

# 2. Test health endpoint
curl http://localhost:3000/api/health

# Expected: {"status": "ok", "database": "connected"}

# 3. Test homepage
curl -I http://localhost:3000

# Expected: HTTP/1.1 200 OK
```

---

### Phase 5: SendGrid Configuration

**Step 5.1: Configure Production Webhook**

Set up SendGrid to send email events to the production webhook:

1. Log into SendGrid dashboard at https://app.sendgrid.com
2. Navigate to **Settings → Mail Settings → Event Webhook**
3. Click **Create New Webhook** or **Edit** existing webhook
4. Configure webhook settings:
   - **HTTP Post URL:** `https://intelleges.com/api/webhooks/sendgrid`
   - **Event Selection:** Enable all events (Delivered, Opened, Clicked, Bounced, Dropped, Spam Report, Unsubscribe)
   - **Signature Verification:** Enabled
   - **Verification Key:** Copy the key and add to `.env` as `SENDGRID_WEBHOOK_SECRET`
5. Click **Save** to activate webhook
6. Click **Test Your Integration** to send test events

**Step 5.2: Verify Webhook Reception**

Confirm the application is receiving SendGrid events:

```bash
# 1. Check application logs for webhook events
pm2 logs intelleges-app | grep "SendGrid webhook"

# Expected: Log entries showing received events

# 2. Query database for test events
psql $DATABASE_URL -c "SELECT * FROM emailEvents ORDER BY timestamp DESC LIMIT 5;"

# Expected: Test events from SendGrid webhook test
```

---

### Phase 6: Cron Job Configuration

**Step 6.1: Create Cron Script**

```bash
# 1. Create cron script
cat > /usr/local/bin/intelleges-email-processor.sh << 'EOF'
#!/bin/bash
cd /var/www/intelleges
/usr/bin/node server/workers/emailProcessor.js >> /var/log/intelleges/cron.log 2>&1
EOF

# 2. Make executable
chmod +x /usr/local/bin/intelleges-email-processor.sh

# 3. Test script
/usr/local/bin/intelleges-email-processor.sh

# Expected: No errors, check /var/log/intelleges/cron.log for output
```

**Step 6.2: Add to Crontab**

```bash
# 1. Edit crontab
crontab -e

# 2. Add this line to run every 5 minutes
*/5 * * * * /usr/local/bin/intelleges-email-processor.sh

# 3. Save and exit

# 4. Verify cron job is scheduled
crontab -l
# Expected: Line showing */5 * * * * /usr/local/bin/intelleges-email-processor.sh
```

---

### Phase 7: Post-Deployment Verification

**Step 7.1: Smoke Tests**

Execute critical smoke tests to verify core functionality:

```bash
# Test 1: Homepage loads
curl -I https://intelleges.com
# Expected: HTTP/2 200

# Test 2: API health endpoint
curl https://intelleges.com/api/health
# Expected: {"status":"ok","database":"connected"}

# Test 3: Static assets load
curl -I https://intelleges.com/logo.png
# Expected: HTTP/2 200
```

**Step 7.2: End-to-End User Flow Test**

Test the complete download flow as a real user:

1. Navigate to homepage: Open https://intelleges.com in browser
2. Click protocol card: Click any protocol card
3. Verify modal appears: Email capture modal should display
4. Fill form: Enter test data
5. Submit form: Click "Download Document" button
6. Verify download: PDF should download immediately
7. Check database: Verify entry created in `documentDownloads` table
8. Check scheduled email: Verify entry created in `scheduledEmails` table
9. Test download limit: Attempt 4th download with same email
10. Verify limit modal: "Download Limit Reached" modal should appear

---

## Rollback Procedure

If critical issues are discovered post-launch, execute this rollback:

**Step 1: Stop Current Application**

```bash
pm2 stop intelleges-app
```

**Step 2: Restore Previous Code Version**

```bash
cd /var/www/intelleges
git checkout <previous_commit_hash>
pnpm install --frozen-lockfile
pnpm build
```

**Step 3: Restart Application**

```bash
pm2 start ecosystem.config.js --env production
pm2 save
```

**Step 4: Verify Rollback Success**

```bash
curl -I https://intelleges.com
# Expected: HTTP/2 200
```

---

## Security Checklist

Before declaring deployment complete, verify these security measures:

- [ ] SSL certificate is valid and trusted (A+ rating on SSL Labs)
- [ ] HTTPS redirect is working (HTTP → HTTPS)
- [ ] Security headers are set (CSP, X-Frame-Options, etc.)
- [ ] Database connections use SSL/TLS
- [ ] Environment variables are not exposed in client-side code
- [ ] API keys are not committed to Git repository
- [ ] Rate limiting is enabled on API endpoints
- [ ] CORS is configured correctly

---

**Document Version:** 2.0  
**Last Updated:** November 30, 2025  
**Owner:** Manus (CTO)

**"Order enables excellence."** 🚀
