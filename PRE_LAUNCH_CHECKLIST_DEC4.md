# Pre-Launch Checklist
**Intelleges Marketing Website**  
**Launch Date:** December 4, 2025  
**GTM Day 1:** December 4, 2025  
**Gate #2 Status:** ✅ Approved for Release

---

## Executive Summary

This comprehensive pre-launch checklist ensures the Intelleges marketing website is ready for production deployment on December 4, 2025. All critical systems have been verified through Gate #2 testing, and this checklist provides final verification steps before go-live.

**Approval Authority:** Juan Rene "John" Betancourt (Chairman)  
**Approval Date:** November 30, 2025  
**Current Completion:** 87.9% + P0 Fix Complete

---

## T-Minus 4 Days (November 30, 2025)

### Gate #2 Verification Status

The following criteria have been verified and passed during Gate #2 testing on November 30, 2025:

**Email Capture & Download System:**
- ✅ Email capture modal functions correctly with form validation
- ✅ Document downloads complete successfully (PDF trigger confirmed)
- ✅ Database entries created correctly (3 downloads + 3 scheduled emails verified)
- ✅ Download limits enforced correctly (4th download blocked as expected)
- ✅ Limit modal appears with professional messaging and Calendly redirect
- ✅ Follow-up emails scheduled correctly with 2-hour delay

**Database & Infrastructure:**
- ✅ Database migration applied successfully (`pnpm db:push` completed)
- ✅ All 15+ tables created and verified (documentDownloads, scheduledEmails, emailStatus, emailEvents, etc.)
- ✅ Query performance verified (50-100ms average response time)
- ✅ Dev server running stable on port 3000

### Outstanding Items Before Launch

**Priority 1 (Must Complete Before Launch):**
1. **SendGrid Production Webhook** - Configure webhook URL in SendGrid dashboard following SENDGRID_PRODUCTION_SETUP.md
2. **Cron Job Verification** - Verify scheduled email processor runs every 5 minutes
3. **Environment Variables** - Verify all production secrets are configured correctly
4. **SSL Certificate** - Verify SSL certificate is valid for intelleges.com domain
5. **Analytics** - Verify analytics tracking code is present on all pages
6. **Mobile Testing** - Complete mobile device testing checklist
7. **Performance Testing** - Run Lighthouse audit and verify scores meet targets

**Priority 2 (Post-Launch Acceptable):**
1. **Contact Form Backend** - Connect contact form to backend or email service (marked P2 in Gate #2 approval)
2. **Email Health Badges** - Add badges to lead qualification views and welcome pages
3. **Admin Suppression Controls** - Build UI for manual email suppression management

---

## T-Minus 3 Days (December 1, 2025)

### Technical Infrastructure Verification

**Database & Backend:**
- [ ] Run `pnpm db:push` against production DATABASE_URL to verify schema is current
- [ ] Execute test query against production database to verify connectivity
- [ ] Verify all database tables exist: `SHOW TABLES;`
- [ ] Verify database indexes are created for performance
- [ ] Test database connection pooling under load
- [ ] Verify database backup schedule is configured
- [ ] Document database rollback procedure

**SendGrid Email System:**
- [ ] Log into SendGrid dashboard at https://app.sendgrid.com
- [ ] Navigate to Settings → Mail Settings → Event Webhook
- [ ] Add webhook URL: `https://intelleges.com/api/webhooks/sendgrid`
- [ ] Enable all event types: delivered, opened, clicked, bounced, dropped, spam_report, unsubscribe
- [ ] Generate webhook verification key and add to environment variables as `SENDGRID_WEBHOOK_SECRET`
- [ ] Test webhook with SendGrid's test event feature
- [ ] Verify webhook logs show successful event processing
- [ ] Test email suppression system with bounced email simulation
- [ ] Verify suppression stats API returns correct counts
- [ ] Document SendGrid API key rotation procedure

**Cron Job Configuration:**
- [ ] Verify cron job is configured to run email processor every 5 minutes
- [ ] Test cron job manually: `node server/workers/emailProcessor.js`
- [ ] Verify scheduled emails are sent correctly after 2-hour delay
- [ ] Check cron logs for any errors or warnings
- [ ] Set up cron job monitoring and alerting
- [ ] Document cron job restart procedure

**Environment Variables:**
- [ ] Verify `DATABASE_URL` points to production database
- [ ] Verify `SENDGRID_API_KEY` is production key (not test key)
- [ ] Verify `SENDGRID_FROM_EMAIL` is verified sender (support@intelleges.com)
- [ ] Verify `SENDGRID_FROM_NAME` is set to "Intelleges"
- [ ] Verify `SENDGRID_WEBHOOK_SECRET` matches SendGrid dashboard
- [ ] Verify `JWT_SECRET` is strong random string (32+ characters)
- [ ] Verify `VITE_ANALYTICS_WEBSITE_ID` is production analytics ID
- [ ] Verify `VITE_APP_TITLE` is "Intelleges"
- [ ] Verify `VITE_APP_LOGO` points to production logo URL
- [ ] Document all environment variables in secure location

---

## T-Minus 2 Days (December 2, 2025)

### End-to-End Testing

**Critical User Flows:**

**Flow 1: Document Download (First-Time User)**
- [ ] Navigate to homepage as anonymous user
- [ ] Click on any protocol card (e.g., "Reps & Certs Compliance")
- [ ] Verify email capture modal appears
- [ ] Fill in form: First Name, Last Name, Email, Company
- [ ] Submit form and verify validation works
- [ ] Verify PDF download triggers immediately
- [ ] Verify database entry created in `documentDownloads` table
- [ ] Verify follow-up email scheduled in `scheduledEmails` table
- [ ] Wait 2 hours and verify follow-up email is sent
- [ ] Verify personalized welcome page link in email works
- [ ] Verify Calendly scheduling link in email works

**Flow 2: Download Limit Enforcement**
- [ ] Use same email from Flow 1
- [ ] Download 2 more documents (total 3)
- [ ] Verify all 3 downloads succeed
- [ ] Attempt 4th download with same email
- [ ] Verify download limit modal appears
- [ ] Verify modal shows "You've reached your download limit of 3 documents"
- [ ] Verify "Schedule a Meeting" button works
- [ ] Verify modal prevents download from proceeding

**Flow 3: Email Suppression System**
- [ ] Simulate bounced email event via SendGrid webhook
- [ ] Verify email is marked as suppressed in `emailStatus` table
- [ ] Attempt download with suppressed email
- [ ] Verify error message: "This email is blocked due to delivery issues"
- [ ] Verify download is prevented
- [ ] Test unsuppress functionality via admin API
- [ ] Verify email can download again after unsuppression

**Flow 4: Contact Form Submission**
- [ ] Navigate to /contact page
- [ ] Fill in contact form with test data
- [ ] Submit form and verify success message
- [ ] Verify form data is captured (localStorage or backend)
- [ ] Verify Calendly widget loads correctly
- [ ] Test Calendly scheduling flow end-to-end

**Flow 5: Client Login**
- [ ] Navigate to /login page
- [ ] Test login with credentials: john@intelleges.com / 012463.xX
- [ ] Verify reCAPTCHA challenge appears
- [ ] Complete reCAPTCHA and submit login
- [ ] Verify redirect to Railway dashboard
- [ ] Test SSO buttons (Google, Microsoft, Okta) display correctly

### Mobile Device Testing

**Devices to Test:**
- [ ] iPhone 12/13/14 (iOS Safari)
- [ ] iPhone SE (small screen)
- [ ] Samsung Galaxy S21/S22 (Android Chrome)
- [ ] iPad Air (tablet)
- [ ] iPad Mini (small tablet)

**Mobile Test Checklist (Per Device):**
- [ ] Homepage loads correctly without layout issues
- [ ] Header navigation collapses to hamburger menu below xl breakpoint (< 1280px)
- [ ] Hamburger menu opens smoothly with slide-in animation
- [ ] All navigation links work in mobile menu
- [ ] Logo is visible and sized correctly (h-8 on mobile)
- [ ] Protocol cards are tappable and hover effects work
- [ ] Email capture modal displays correctly on mobile
- [ ] Form fields are easy to tap (44px minimum height)
- [ ] Keyboard doesn't cover form fields when typing
- [ ] PDF downloads work on mobile browsers
- [ ] Download limit modal displays correctly on mobile
- [ ] Contact form works on mobile
- [ ] Calendly widget is responsive on mobile
- [ ] Footer links are tappable and spaced properly
- [ ] Page transitions work smoothly
- [ ] No horizontal scrolling on any page

### Cross-Browser Testing

**Browsers to Test:**
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (latest version)
- [ ] Edge (latest version)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Browser Test Checklist (Per Browser):**
- [ ] All pages load without console errors
- [ ] CSS animations work correctly
- [ ] Forms submit correctly
- [ ] PDFs download correctly
- [ ] Modals display correctly
- [ ] Navigation works correctly
- [ ] No layout shifts or broken styles

---

## T-Minus 1 Day (December 3, 2025)

### Performance Optimization

**Lighthouse Audit:**
- [ ] Run Lighthouse audit on homepage
- [ ] Verify Performance score ≥ 90
- [ ] Verify Accessibility score ≥ 95
- [ ] Verify Best Practices score ≥ 90
- [ ] Verify SEO score ≥ 90
- [ ] Fix any critical issues identified
- [ ] Re-run audit to confirm improvements

**Performance Targets:**
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.8s
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

**Image Optimization:**
- [ ] Verify all images are optimized (WebP format where possible)
- [ ] Verify lazy loading is enabled for below-fold images
- [ ] Verify logo images are properly sized
- [ ] Verify client logos are grayscale and optimized
- [ ] Verify no images exceed 500KB file size

**Code Optimization:**
- [ ] Run production build: `pnpm build`
- [ ] Verify bundle size is reasonable (< 500KB gzipped)
- [ ] Verify no unused dependencies in package.json
- [ ] Verify tree shaking is working correctly
- [ ] Verify code splitting is configured
- [ ] Verify CSS is minified and purged

### Security Audit

**SSL/TLS:**
- [ ] Verify SSL certificate is valid and trusted
- [ ] Verify certificate expiration date is > 30 days away
- [ ] Test SSL configuration at https://www.ssllabs.com/ssltest/
- [ ] Verify A+ rating on SSL Labs
- [ ] Verify HTTPS redirect is working (HTTP → HTTPS)
- [ ] Verify HSTS header is set

**Security Headers:**
- [ ] Verify Content-Security-Policy header is set
- [ ] Verify X-Frame-Options header is set (DENY or SAMEORIGIN)
- [ ] Verify X-Content-Type-Options header is set (nosniff)
- [ ] Verify Referrer-Policy header is set
- [ ] Verify Permissions-Policy header is set
- [ ] Test security headers at https://securityheaders.com/
- [ ] Verify A rating on Security Headers

**Authentication & Authorization:**
- [ ] Verify reCAPTCHA is working on login page
- [ ] Verify rate limiting is enabled on API endpoints
- [ ] Verify CORS is configured correctly
- [ ] Verify no sensitive data in client-side code
- [ ] Verify environment variables are not exposed
- [ ] Verify API keys are not committed to Git

**Data Protection:**
- [ ] Verify database connections use SSL
- [ ] Verify passwords are hashed (if applicable)
- [ ] Verify email addresses are stored securely
- [ ] Verify download tracking data is anonymized where possible
- [ ] Verify GDPR compliance for EU users
- [ ] Verify Privacy Policy is accessible and up-to-date

### Analytics & Monitoring Setup

**Analytics Configuration:**
- [ ] Verify analytics tracking code is present on all pages
- [ ] Verify analytics website ID matches production
- [ ] Test analytics events: page views, downloads, form submissions
- [ ] Verify analytics dashboard is accessible
- [ ] Set up custom events for key conversions
- [ ] Set up goals for download completions
- [ ] Set up goals for contact form submissions
- [ ] Set up goals for Calendly bookings

**Error Monitoring:**
- [ ] Set up error tracking service (Sentry, Rollbar, etc.)
- [ ] Verify error tracking is capturing client-side errors
- [ ] Verify error tracking is capturing server-side errors
- [ ] Set up error alerting to team email/Slack
- [ ] Test error tracking with intentional error
- [ ] Verify error reports include stack traces and context

**Performance Monitoring:**
- [ ] Set up performance monitoring (New Relic, Datadog, etc.)
- [ ] Verify performance metrics are being collected
- [ ] Set up alerts for slow page loads (> 3s)
- [ ] Set up alerts for API errors (> 5% error rate)
- [ ] Set up alerts for database slow queries (> 1s)
- [ ] Verify monitoring dashboard is accessible

**Uptime Monitoring:**
- [ ] Set up uptime monitoring service (Pingdom, UptimeRobot, etc.)
- [ ] Configure checks for homepage (/)
- [ ] Configure checks for API health endpoint (/api/health)
- [ ] Configure checks for database connectivity
- [ ] Set up alerts for downtime (> 1 minute)
- [ ] Set up alerts to team email/Slack/SMS
- [ ] Verify monitoring checks are running

---

## Launch Day (December 4, 2025)

### Pre-Launch Final Checks (Morning)

**Infrastructure Status:**
- [ ] Verify production server is running
- [ ] Verify database is accessible
- [ ] Verify DNS records are correct
- [ ] Verify SSL certificate is valid
- [ ] Verify CDN is configured and working
- [ ] Verify backup systems are operational
- [ ] Verify monitoring systems are active

**Code Deployment:**
- [ ] Pull latest code from main branch: `git pull origin main`
- [ ] Verify Git commit hash matches approved version
- [ ] Run production build: `pnpm build`
- [ ] Run database migration: `pnpm db:push`
- [ ] Restart application server
- [ ] Verify application starts without errors
- [ ] Check application logs for warnings

**Smoke Tests:**
- [ ] Visit homepage and verify it loads
- [ ] Test email capture modal
- [ ] Test document download
- [ ] Test download limit enforcement
- [ ] Test contact form
- [ ] Test client login
- [ ] Verify analytics tracking is working
- [ ] Verify error monitoring is working

### Go-Live Checklist

**DNS Cutover (if applicable):**
- [ ] Update DNS A record to point to production server
- [ ] Wait for DNS propagation (15-60 minutes)
- [ ] Verify new DNS is resolving correctly: `nslookup intelleges.com`
- [ ] Test website from multiple locations/networks
- [ ] Verify old DNS TTL has expired

**Post-Deployment Verification:**
- [ ] Visit https://intelleges.com and verify homepage loads
- [ ] Test all critical user flows (download, contact, login)
- [ ] Check application logs for errors
- [ ] Check error monitoring dashboard
- [ ] Check analytics dashboard for traffic
- [ ] Verify uptime monitoring shows site is up
- [ ] Test from multiple devices and browsers
- [ ] Test from mobile devices

**Team Communication:**
- [ ] Announce launch to internal team
- [ ] Share launch checklist completion status
- [ ] Share monitoring dashboard links
- [ ] Share incident response procedures
- [ ] Designate on-call engineer for launch day
- [ ] Set up team communication channel (Slack, etc.)

### Post-Launch Monitoring (First 24 Hours)

**Metrics to Monitor:**
- [ ] Page views and unique visitors
- [ ] Download completion rate
- [ ] Contact form submission rate
- [ ] Error rate (should be < 1%)
- [ ] Average page load time (should be < 2s)
- [ ] Bounce rate (should be < 50%)
- [ ] Mobile vs desktop traffic split
- [ ] Top traffic sources

**Issues to Watch For:**
- [ ] 404 errors (broken links)
- [ ] 500 errors (server errors)
- [ ] Slow page loads (> 3s)
- [ ] Failed downloads
- [ ] Failed email sends
- [ ] Database connection errors
- [ ] High bounce rate on specific pages
- [ ] Mobile layout issues

**Incident Response:**
- [ ] If critical issue detected, follow incident response procedure
- [ ] Assess severity: P0 (site down), P1 (major feature broken), P2 (minor issue)
- [ ] For P0: Execute rollback procedure immediately
- [ ] For P1: Fix forward if possible, rollback if not
- [ ] For P2: Document and schedule fix for next deployment
- [ ] Communicate status to stakeholders
- [ ] Post-mortem after incident resolution

---

## Post-Launch Tasks (December 5-7, 2025)

### Week 1 Monitoring

**Daily Checks (Days 1-7):**
- [ ] Review analytics dashboard for traffic trends
- [ ] Review error monitoring for new issues
- [ ] Review performance monitoring for degradation
- [ ] Review uptime monitoring for outages
- [ ] Review user feedback and support tickets
- [ ] Check email delivery rates
- [ ] Check download completion rates
- [ ] Check contact form submission rates

**Optimization Opportunities:**
- [ ] Identify slow-loading pages and optimize
- [ ] Identify high-bounce pages and improve content
- [ ] Identify broken links and fix
- [ ] Identify unused features and consider removing
- [ ] Identify popular content and promote
- [ ] A/B test CTAs and messaging
- [ ] Optimize conversion funnels

### Stakeholder Reporting

**Week 1 Report (Due December 11, 2025):**
- [ ] Total page views and unique visitors
- [ ] Top 10 pages by traffic
- [ ] Download completion rate and top documents
- [ ] Contact form submission rate
- [ ] Average session duration
- [ ] Bounce rate by page
- [ ] Mobile vs desktop traffic
- [ ] Top traffic sources
- [ ] Error rate and top errors
- [ ] Performance metrics (LCP, FCP, TTI)
- [ ] Uptime percentage
- [ ] Key learnings and recommendations

---

## Rollback Procedure

If critical issues are discovered post-launch that cannot be fixed forward, execute this rollback procedure:

**Step 1: Assess Severity**
- Determine if issue is P0 (site down/unusable) or P1 (major feature broken)
- For P0: Execute rollback immediately
- For P1: Attempt fix forward first, rollback if unsuccessful within 30 minutes

**Step 2: Execute Rollback**
```bash
# 1. Navigate to project directory
cd /home/ubuntu/intelleges-marketing-site

# 2. Identify last known good checkpoint
# Check GATE2_VERIFICATION_REPORT.md for approved version

# 3. Use webdev_rollback_checkpoint tool to restore
# This will revert code, dependencies, and configuration

# 4. Verify database schema compatibility
pnpm db:push

# 5. Restart application
# (Restart command depends on hosting platform)

# 6. Verify rollback success
curl https://intelleges.com
```

**Step 3: Verify Rollback**
- [ ] Homepage loads correctly
- [ ] Critical user flows work
- [ ] No errors in application logs
- [ ] Monitoring dashboards show healthy status

**Step 4: Communicate**
- [ ] Notify team of rollback
- [ ] Update status page (if applicable)
- [ ] Communicate to stakeholders
- [ ] Document root cause
- [ ] Schedule post-mortem

---

## Success Criteria

The launch is considered successful if all of the following criteria are met within the first 24 hours:

**Technical Metrics:**
- ✅ Site uptime ≥ 99.9% (< 1.5 minutes downtime)
- ✅ Error rate < 1% of all requests
- ✅ Average page load time < 2 seconds
- ✅ All critical user flows working correctly
- ✅ No P0 or P1 incidents

**Business Metrics:**
- ✅ At least 100 unique visitors
- ✅ Download completion rate ≥ 50%
- ✅ Contact form submission rate ≥ 5%
- ✅ Bounce rate < 60%
- ✅ Mobile traffic ≥ 30%

**User Experience:**
- ✅ No user-reported critical bugs
- ✅ Positive feedback from internal team
- ✅ All pages load correctly on mobile
- ✅ All forms work correctly
- ✅ All downloads work correctly

---

## Appendix: Key Contacts

**Launch Team:**
- **Chairman:** Juan Rene "John" Betancourt
- **CEO (Strategy):** Paula
- **COO (QA):** Claude
- **CTO (Implementation):** Manus

**Emergency Contacts:**
- **On-Call Engineer:** [To be assigned]
- **Database Admin:** [To be assigned]
- **DevOps Lead:** [To be assigned]

**Vendor Support:**
- **SendGrid Support:** https://support.sendgrid.com
- **Hosting Provider:** [Provider-specific support contact]
- **DNS Provider:** [Provider-specific support contact]

---

## Appendix: Reference Documents

- **Gate #2 Approval Form:** Gate_2_Approval_Form_Marketing_Website_Signed.pdf
- **Gate #2 Verification Report:** GATE2_VERIFICATION_REPORT.md
- **SendGrid Setup Guide:** SENDGRID_PRODUCTION_SETUP.md
- **QA Testing Guide:** QA_COMPLETE_TESTING_GUIDE.md (v2.0)
- **Production Deployment Guide:** PRODUCTION_DEPLOYMENT_GUIDE.md (to be created)
- **Analytics Setup Guide:** ANALYTICS_SETUP_GUIDE.md
- **Responsive Testing Guide:** RESPONSIVE_TESTING.md

---

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Next Review:** December 3, 2025 (T-1 Day)  
**Owner:** Manus (CTO)

**"Order enables excellence."** 🚀
