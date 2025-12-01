# Launch Day Monitoring Guide
**Intelleges Marketing Website**  
**Launch Date:** December 4, 2025  
**Version:** 1.0  
**Author:** Manus AI

---

## Executive Summary

This guide provides comprehensive monitoring and analytics configuration for the Intelleges marketing website launch on December 4, 2025. It covers real-time dashboards, alerting systems, performance monitoring, and incident response procedures to ensure a successful launch with immediate visibility into system health and user behavior.

**Monitoring Objectives:**
- Detect and respond to incidents within 5 minutes
- Track user engagement and conversion metrics in real-time
- Identify performance bottlenecks immediately
- Ensure 99.9% uptime during launch week

---

## Monitoring Stack Overview

The Intelleges website uses a multi-layered monitoring approach:

| Layer | Tool | Purpose | Alert Threshold |
|-------|------|---------|-----------------|
| **Uptime** | UptimeRobot / Pingdom | Site availability | > 1 min downtime |
| **Analytics** | Google Analytics 4 | User behavior & conversions | N/A (reporting only) |
| **Performance** | Lighthouse CI / WebPageTest | Page speed & Core Web Vitals | LCP > 2.5s |
| **Errors** | Sentry / Rollbar | Client & server errors | > 5% error rate |
| **Infrastructure** | Server logs / PM2 | Application health | CPU > 80%, Memory > 90% |
| **Database** | PostgreSQL logs | Query performance | Query time > 1s |
| **Email** | SendGrid Dashboard | Email delivery | Bounce rate > 5% |

---

## Phase 1: Pre-Launch Monitoring Setup

### 1.1 Uptime Monitoring Configuration

**Recommended Service:** UptimeRobot (free tier supports 50 monitors with 5-minute intervals)

**Setup Steps:**

1. Create account at https://uptimerobot.com
2. Add HTTP(S) monitor for homepage:
   - **Monitor Type:** HTTP(S)
   - **Friendly Name:** Intelleges Homepage
   - **URL:** https://intelleges.com
   - **Monitoring Interval:** 5 minutes
   - **Monitor Timeout:** 30 seconds
   - **Alert Contacts:** team@intelleges.com, SMS to on-call engineer

3. Add API health check monitor:
   - **Monitor Type:** HTTP(S)
   - **Friendly Name:** Intelleges API Health
   - **URL:** https://intelleges.com/api/health
   - **Monitoring Interval:** 5 minutes
   - **Expected Response:** Contains "ok"

4. Add database connectivity monitor:
   - **Monitor Type:** Keyword
   - **URL:** https://intelleges.com/api/health
   - **Keyword:** "database":"connected"
   - **Monitoring Interval:** 5 minutes

**Alert Configuration:**
- Send alert when down for 2 consecutive checks (10 minutes)
- Send recovery notification when back up
- Alert channels: Email + SMS + Slack webhook

**Verification:**
```bash
# Test that monitors can reach your site
curl -I https://intelleges.com
# Expected: HTTP/2 200 OK

curl https://intelleges.com/api/health
# Expected: {"status":"ok","database":"connected"}
```

---

### 1.2 Analytics Tracking Setup

**Google Analytics 4 Configuration:**

The website already has GA4 tracking code embedded. Verify it's configured correctly:

**Pre-Launch Checklist:**
- [ ] GA4 Measurement ID is set in environment variables (`VITE_ANALYTICS_WEBSITE_ID`)
- [ ] Analytics tracking code loads on all pages
- [ ] Page view events are firing correctly
- [ ] Custom events are configured:
  - `email_capture` - When user submits email in modal
  - `pdf_download` - When user downloads a document
  - `download_limit_reached` - When user hits 3-download limit
  - `calendly_opened` - When user clicks "Schedule a Meeting"
  - `contact_form_submit` - When user submits contact form

**Real-Time Dashboard Setup:**

1. Log into Google Analytics at https://analytics.google.com
2. Navigate to **Reports → Realtime**
3. Pin to favorites for quick access on launch day
4. Create custom Realtime report with these widgets:
   - **Users by Country** - Geographic distribution
   - **Users by Device** - Mobile vs Desktop split
   - **Page Views by Page Title** - Most viewed pages
   - **Events by Event Name** - Conversion tracking

**Conversion Goals:**

Mark these events as conversions in GA4:

1. Go to **Admin → Events**
2. Toggle "Mark as conversion" for:
   - `email_capture`
   - `pdf_download`
   - `calendly_opened`
   - `contact_form_submit`

**Verification:**
```bash
# Open website in browser with DevTools
# Network tab should show analytics requests:
# POST https://www.google-analytics.com/g/collect?...
# Status: 200 OK

# Realtime report should show your test session
```

---

### 1.3 Error Monitoring Setup

**Recommended Service:** Sentry (free tier supports 5,000 errors/month)

**Setup Steps:**

1. Create account at https://sentry.io
2. Create new project: **Intelleges Marketing Site**
3. Select platform: **React**
4. Copy DSN (Data Source Name)
5. Add to environment variables:
   ```bash
   VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   ```

6. Configure error tracking in `client/src/main.tsx`:
   ```typescript
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: "production",
     tracesSampleRate: 0.1, // 10% of transactions
     beforeSend(event) {
       // Filter out non-critical errors
       if (event.level === "warning") return null;
       return event;
     },
   });
   ```

**Alert Rules:**

Create alert rules in Sentry dashboard:

1. **Critical Errors Alert:**
   - Condition: Error count > 10 in 5 minutes
   - Action: Email + Slack notification
   - Severity: Critical

2. **New Error Type Alert:**
   - Condition: First seen error
   - Action: Email notification
   - Severity: Warning

3. **Error Rate Spike Alert:**
   - Condition: Error rate increases by 50% compared to previous hour
   - Action: Email + Slack notification
   - Severity: High

**Verification:**
```javascript
// Trigger test error in browser console
throw new Error("Sentry test error");

// Check Sentry dashboard for error report
```

---

### 1.4 Performance Monitoring Setup

**Lighthouse CI Configuration:**

Run automated Lighthouse audits on every deployment:

1. Install Lighthouse CI:
   ```bash
   npm install -g @lhci/cli
   ```

2. Create `.lighthouserc.json`:
   ```json
   {
     "ci": {
       "collect": {
         "url": ["https://intelleges.com"],
         "numberOfRuns": 3
       },
       "assert": {
         "preset": "lighthouse:recommended",
         "assertions": {
           "categories:performance": ["error", {"minScore": 0.9}],
           "categories:accessibility": ["error", {"minScore": 0.95}],
           "categories:seo": ["error", {"minScore": 0.9}],
           "first-contentful-paint": ["error", {"maxNumericValue": 1800}],
           "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
           "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
         }
       }
     }
   }
   ```

3. Run audit:
   ```bash
   lhci autorun --config=.lighthouserc.json
   ```

**WebPageTest Monitoring:**

Set up recurring tests at https://www.webpagetest.org:

1. Create account and navigate to **API → Create API Key**
2. Schedule recurring test:
   - **URL:** https://intelleges.com
   - **Location:** Dulles, VA (US East)
   - **Browser:** Chrome
   - **Connection:** Cable
   - **Frequency:** Every 6 hours
   - **Alert if:** LCP > 2.5s or FCP > 1.8s

**Core Web Vitals Targets:**

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Largest Contentful Paint (LCP)** | < 2.5s | > 3.0s |
| **First Input Delay (FID)** | < 100ms | > 200ms |
| **Cumulative Layout Shift (CLS)** | < 0.1 | > 0.25 |
| **First Contentful Paint (FCP)** | < 1.8s | > 2.5s |
| **Time to Interactive (TTI)** | < 3.8s | > 5.0s |

---

### 1.5 Infrastructure Monitoring

**PM2 Monitoring (if using PM2):**

Enable PM2 Plus for advanced monitoring:

```bash
# Install PM2 Plus
pm2 install pm2-server-monit

# Link to PM2 Plus dashboard
pm2 link <secret_key> <public_key>

# Monitor metrics
pm2 monit
```

**Key Metrics to Monitor:**

| Metric | Normal Range | Alert Threshold |
|--------|--------------|-----------------|
| **CPU Usage** | 10-40% | > 80% for 5 min |
| **Memory Usage** | 30-60% | > 90% for 5 min |
| **Event Loop Lag** | < 10ms | > 50ms |
| **Active Requests** | 0-100 | > 500 |
| **Response Time** | < 200ms | > 1000ms |

**Server Resource Monitoring:**

```bash
# Install monitoring tools
sudo apt-get install htop iotop nethogs

# Create monitoring script
cat > /usr/local/bin/server-health-check.sh << 'EOF'
#!/bin/bash
echo "=== Server Health Check ==="
echo "CPU Usage:"
top -bn1 | grep "Cpu(s)" | awk '{print $2}'
echo "Memory Usage:"
free -h | grep Mem | awk '{print $3 "/" $2}'
echo "Disk Usage:"
df -h | grep /dev/vda1 | awk '{print $5}'
echo "Network Connections:"
netstat -an | grep ESTABLISHED | wc -l
EOF

chmod +x /usr/local/bin/server-health-check.sh

# Run every 5 minutes via cron
*/5 * * * * /usr/local/bin/server-health-check.sh >> /var/log/server-health.log
```

---

### 1.6 Database Monitoring

**PostgreSQL Slow Query Logging:**

Enable slow query logging to identify performance bottlenecks:

```sql
-- Enable slow query logging (queries > 1 second)
ALTER SYSTEM SET log_min_duration_statement = 1000;
ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';
SELECT pg_reload_conf();

-- Verify settings
SHOW log_min_duration_statement;
```

**Database Health Check Script:**

```bash
# Create database monitoring script
cat > /usr/local/bin/db-health-check.sh << 'EOF'
#!/bin/bash
psql $DATABASE_URL << SQL
-- Active connections
SELECT count(*) as active_connections FROM pg_stat_activity WHERE state = 'active';

-- Long-running queries (> 5 minutes)
SELECT pid, now() - query_start as duration, query 
FROM pg_stat_activity 
WHERE state = 'active' AND now() - query_start > interval '5 minutes';

-- Database size
SELECT pg_size_pretty(pg_database_size(current_database()));

-- Table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC 
LIMIT 5;
SQL
EOF

chmod +x /usr/local/bin/db-health-check.sh

# Run every 15 minutes
*/15 * * * * /usr/local/bin/db-health-check.sh >> /var/log/db-health.log
```

---

### 1.7 Email Delivery Monitoring

**SendGrid Dashboard Setup:**

1. Log into SendGrid at https://app.sendgrid.com
2. Navigate to **Activity Feed** - Monitor email delivery in real-time
3. Navigate to **Stats → Overview** - View delivery metrics

**Key Metrics to Monitor:**

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Delivery Rate** | > 95% | < 90% |
| **Bounce Rate** | < 2% | > 5% |
| **Spam Report Rate** | < 0.1% | > 0.5% |
| **Open Rate** | > 20% | < 10% (indicates deliverability issues) |
| **Click Rate** | > 5% | N/A |

**Alert Configuration:**

Set up alerts in SendGrid dashboard:

1. Go to **Settings → Alerts**
2. Create alert: **High Bounce Rate**
   - Condition: Bounce rate > 5%
   - Frequency: Hourly
   - Recipients: team@intelleges.com

3. Create alert: **Spam Reports**
   - Condition: Spam report rate > 0.5%
   - Frequency: Immediately
   - Recipients: team@intelleges.com

**Verification:**
```bash
# Check scheduled emails are being processed
psql $DATABASE_URL -c "SELECT COUNT(*) FROM scheduledEmails WHERE sent=1 AND sentAt > NOW() - INTERVAL '1 hour';"

# Check SendGrid activity feed for recent sends
# Expected: Emails showing "Delivered" status
```

---

## Phase 2: Launch Day Monitoring

### 2.1 Launch Day Dashboard

Create a centralized monitoring dashboard with these panels:

**Panel 1: Site Status**
- Uptime status (green/red indicator)
- Current response time
- Active users (from GA4 Realtime)
- Error rate (from Sentry)

**Panel 2: User Engagement**
- Page views (last hour)
- New vs returning visitors
- Top pages by traffic
- Device breakdown (mobile/desktop/tablet)

**Panel 3: Conversions**
- Email captures (count)
- PDF downloads (count)
- Download limit hits (count)
- Calendly bookings (count)
- Contact form submissions (count)

**Panel 4: Performance**
- Average page load time
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- API response time

**Panel 5: Infrastructure**
- Server CPU usage
- Server memory usage
- Database connections
- Active requests

**Panel 6: Email System**
- Scheduled emails pending
- Emails sent (last hour)
- Email delivery rate
- Email bounce rate

**Dashboard Tools:**

- **Option A:** Google Data Studio - Free, integrates with GA4
- **Option B:** Grafana - Open source, highly customizable
- **Option C:** Datadog - Paid, comprehensive monitoring
- **Option D:** Simple HTML dashboard** - Custom built with auto-refresh

---

### 2.2 Launch Day Schedule

**T-Minus 2 Hours (10:00 AM EST):**
- [ ] Final smoke tests completed
- [ ] All monitoring systems verified active
- [ ] Team assembled in war room / Slack channel
- [ ] On-call engineer identified and available
- [ ] Rollback procedure reviewed and ready

**T-Minus 1 Hour (11:00 AM EST):**
- [ ] DNS changes initiated (if applicable)
- [ ] Monitoring dashboards open on screens
- [ ] Alert channels tested (email, SMS, Slack)
- [ ] Stakeholders notified of imminent launch

**Launch Time (12:00 PM EST):**
- [ ] Site goes live at https://intelleges.com
- [ ] Immediate smoke test: homepage, download flow, contact form
- [ ] Monitor dashboards for first 5 minutes intensely
- [ ] Verify analytics tracking is working
- [ ] Verify error monitoring is working
- [ ] Announce launch to team

**T-Plus 1 Hour (1:00 PM EST):**
- [ ] Review first hour metrics
- [ ] Check for any errors or warnings
- [ ] Verify email system is processing scheduled sends
- [ ] Monitor user behavior patterns
- [ ] Address any minor issues

**T-Plus 4 Hours (4:00 PM EST):**
- [ ] Review afternoon metrics
- [ ] Check performance trends
- [ ] Verify all systems stable
- [ ] Prepare end-of-day report

**End of Day 1 (5:00 PM EST):**
- [ ] Generate Day 1 summary report
- [ ] Document any issues encountered
- [ ] Plan fixes for Day 2 if needed
- [ ] Communicate status to stakeholders
- [ ] Set up overnight monitoring alerts

---

### 2.3 Metrics to Watch

**First Hour Metrics:**

| Metric | Expected | Action if Outside Range |
|--------|----------|-------------------------|
| **Unique Visitors** | 50-100 | If 0: Check analytics. If > 500: Verify server can handle load |
| **Page Views** | 200-500 | If 0: Check analytics. If > 2000: Monitor performance |
| **Error Rate** | < 1% | If > 5%: Investigate errors immediately |
| **Avg Page Load Time** | < 2s | If > 3s: Check server resources |
| **Email Captures** | 5-20 | If 0: Test modal functionality |
| **PDF Downloads** | 10-30 | If 0: Test download flow |
| **Bounce Rate** | < 60% | If > 80%: Check page content/UX |

**First Day Metrics:**

| Metric | Expected | Action if Outside Range |
|--------|----------|-------------------------|
| **Unique Visitors** | 500-1000 | If < 100: Review marketing channels |
| **Page Views** | 2000-5000 | If < 500: Review traffic sources |
| **Email Captures** | 50-150 | If < 20: Test modal, review messaging |
| **PDF Downloads** | 100-300 | If < 30: Review download flow |
| **Download Limit Hits** | 5-20 | If 0: Test limit enforcement |
| **Contact Form Submissions** | 10-30 | If 0: Test form functionality |
| **Uptime** | 100% | If < 99.9%: Investigate downtime |

---

### 2.4 Alert Response Procedures

**P0 Alert: Site Down**

**Symptoms:** Uptime monitor shows site unreachable, 502/503 errors

**Response:**
1. Immediately check server status: `pm2 status intelleges-app`
2. Check server resources: `htop` (CPU/memory)
3. Check application logs: `pm2 logs intelleges-app --lines 100`
4. If application crashed: `pm2 restart intelleges-app`
5. If server overloaded: Scale up resources or enable caching
6. If issue persists > 5 minutes: Execute rollback procedure
7. Notify team in Slack: "P0 ALERT: Site down. Investigating..."
8. Update status page (if applicable)

**P1 Alert: High Error Rate**

**Symptoms:** Sentry shows error rate > 5%, multiple users affected

**Response:**
1. Open Sentry dashboard and identify error type
2. Check if error is client-side (JavaScript) or server-side (API)
3. Review error stack trace and affected users
4. If critical feature broken (download, contact form): Fix forward or rollback
5. If cosmetic issue: Document and schedule fix for next deployment
6. Notify team in Slack: "P1 ALERT: High error rate. Error: [description]"

**P1 Alert: Slow Performance**

**Symptoms:** Page load time > 3s, LCP > 4s, users complaining

**Response:**
1. Check server resources: `htop` (CPU/memory/disk)
2. Check database performance: `psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity;"`
3. Check for slow queries in database logs
4. Enable caching if not already enabled
5. Optimize slow queries or add database indexes
6. If CDN available, verify it's serving static assets
7. Notify team in Slack: "P1 ALERT: Slow performance. Avg load time: Xs"

**P2 Alert: Email Delivery Issues**

**Symptoms:** SendGrid bounce rate > 5%, emails not sending

**Response:**
1. Check SendGrid dashboard for delivery status
2. Review bounce reasons (hard bounce vs soft bounce)
3. Check scheduled emails table: `psql $DATABASE_URL -c "SELECT * FROM scheduledEmails WHERE failed=1;"`
4. Verify SendGrid API key is valid
5. Check email processor cron job is running: `crontab -l`
6. Manually trigger email processor: `node server/workers/emailProcessor.js`
7. Notify team in Slack: "P2 ALERT: Email delivery issues. Bounce rate: X%"

---

## Phase 3: Post-Launch Monitoring

### 3.1 Week 1 Monitoring Schedule

**Daily Checks (Days 1-7):**
- [ ] 9:00 AM: Review overnight metrics and alerts
- [ ] 12:00 PM: Check midday traffic and conversions
- [ ] 3:00 PM: Review afternoon performance
- [ ] 6:00 PM: Generate end-of-day report
- [ ] 9:00 PM: Final check before overnight

**Weekly Report (Due December 11, 2025):**

Generate comprehensive report with these sections:

1. **Traffic Summary**
   - Total unique visitors
   - Total page views
   - Top 10 pages by traffic
   - Traffic sources breakdown
   - Device breakdown (mobile/desktop/tablet)
   - Geographic distribution

2. **Conversion Metrics**
   - Email capture rate
   - PDF download rate
   - Contact form submission rate
   - Calendly booking rate
   - Download limit hit rate

3. **Performance Metrics**
   - Average page load time
   - Core Web Vitals (LCP, FID, CLS)
   - Uptime percentage
   - Error rate

4. **User Behavior**
   - Average session duration
   - Pages per session
   - Bounce rate by page
   - Top exit pages

5. **Email System**
   - Total emails sent
   - Email delivery rate
   - Email open rate
   - Email click rate
   - Bounce rate
   - Suppression rate

6. **Issues & Resolutions**
   - List of incidents (P0, P1, P2)
   - Root causes
   - Resolutions
   - Time to resolution

7. **Recommendations**
   - Performance optimizations
   - UX improvements
   - Content updates
   - Feature enhancements

---

### 3.2 Ongoing Monitoring

**Monthly Reviews:**
- Review analytics trends
- Identify top-performing content
- Identify underperforming pages
- Review conversion funnel
- Optimize based on data

**Quarterly Audits:**
- Full Lighthouse audit
- Security audit
- Accessibility audit
- SEO audit
- Performance optimization review

**Annual Reviews:**
- Technology stack review
- Infrastructure scaling review
- Analytics platform review
- Monitoring tool review

---

## Appendix: Monitoring Tools Reference

### Quick Links

| Tool | Dashboard URL | Purpose |
|------|---------------|---------|
| **UptimeRobot** | https://uptimerobot.com/dashboard | Uptime monitoring |
| **Google Analytics** | https://analytics.google.com | User behavior analytics |
| **Sentry** | https://sentry.io | Error monitoring |
| **SendGrid** | https://app.sendgrid.com | Email delivery monitoring |
| **PM2 Plus** | https://app.pm2.io | Application monitoring |
| **Lighthouse CI** | Local reports | Performance audits |

### Alert Contacts

**Primary On-Call:** [To be assigned]  
**Secondary On-Call:** [To be assigned]  
**Escalation:** CTO (Manus) → COO (Claude) → CEO (Paula)

**Alert Channels:**
- **Email:** team@intelleges.com
- **SMS:** [On-call engineer phone]
- **Slack:** #intelleges-alerts channel

---

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Next Review:** December 4, 2025 (Launch Day)  
**Owner:** Manus (CTO)

**"Order enables excellence."** 🚀
