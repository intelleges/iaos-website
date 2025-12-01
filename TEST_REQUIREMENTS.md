# Comprehensive Test Requirements

**Based on:** QA Complete Testing Guide v2, Pricing Calculator Test Plan, Pre-Launch Checklist Dec 4

---

## Test Categories

### 1. Unit Tests (Component-Level)
Individual component functionality and business logic validation

### 2. Regression Tests (Critical User Flows)
End-to-end user journeys covering all key business processes

### 3. Stress Tests (Performance & Load)
System behavior under high load and edge conditions

---

## Unit Test Requirements

### Navigation & Header
- ✅ Logo click → Navigate to homepage
- ✅ Product menu → Navigate to /product
- ✅ Protocols menu → Navigate to /protocols
- ✅ About menu → Navigate to /about
- ✅ Pricing menu → Navigate to /pricing
- ✅ Contact menu → Navigate to /contact
- ✅ Client Login button → Navigate to OAuth portal
- ✅ Book a Demo button → Navigate to /contact

### Footer Links
- ✅ Product section links (Overview, Protocols, Supplier Onboarding, Pricing)
- ✅ Company section links (About, Contact, Phone number)
- ✅ Resources section links (Case Studies, Whitepapers, One-Pagers)
- ✅ Legal section links (Security, Privacy, Terms)
- ✅ Access section (Client Login)

### Homepage Components
- ✅ Hero section - Book a Demo CTA
- ✅ Hero section - Watch 2-Minute Overview (video modal placeholder)
- ✅ Protocols section - 16 protocol cards with hover effects
- ✅ Download Whitepaper CTA
- ✅ How Intelleges Works - 6 numbered steps

### One-Pagers Page (11 Service Documents)
- ✅ Card hover effects (scale, shadow, font weight)
- ✅ Card click → Opens EmailCaptureModal with document title pre-filled
- ✅ Modal form validation (Name, Email, Company required)
- ✅ Download limit check (3 documents per email lifetime)
- ✅ Success state with green checkmark
- ✅ Toast notification: "Download started! Check your email in 2 hours"
- ✅ Auto-close modal after 2 seconds

### EmailCaptureModal Workflow
- ✅ Step 1: Modal opens with document title
- ✅ Step 2: Form validation
  - Name required → "Name is required"
  - Email required + valid format → "Email is required" / "Please enter a valid email address"
  - Company required → "Company name is required"
- ✅ Step 3: Submit process
  - Check download limit via `documentDownloads.checkLimit` API
  - If limit reached (≥3): Close EmailCaptureModal, Open DownloadLimitReachedModal, STOP
  - If limit NOT reached: Record download, trigger PDF from S3 CDN, schedule follow-up email (2 hours), show success state
- ✅ Step 4: Success state
  - Green checkmark icon
  - Message: "Download Started!"
  - Subtext: "Your document is downloading now. Check your email in 2 hours for a personalized follow-up."

### Download Limit Reached Modal
- ✅ Title: "You've reached your download limit of 3 documents"
- ✅ Professional messaging
- ✅ "Schedule a Meeting" button → Calendly redirect
- ✅ Modal prevents download from proceeding

### Case Studies (3 pages: FOCI, COO Compliance, Counterfeit Parts)
- ✅ Each has download CTA triggering EmailCaptureModal
- ✅ documentType prop must be provided (case_study)
- ✅ Same workflow as One-Pagers

### Contact Form
- ✅ Form fields: First Name, Last Name, Email, Company, Phone, Message, Role (optional), Plan (optional)
- ✅ Form validation
- ✅ Submit → Backend API or localStorage
- ✅ Success message display
- ✅ Calendly widget loads correctly

### Pricing Calculator (Admin)
- ✅ Tier selection (Basic, Professional, Advanced, Enterprise)
- ✅ User count slider
- ✅ Supplier count slider
- ✅ Protocol count slider
- ✅ Site count slider
- ✅ Partner type count slider
- ✅ Integration toggles (ERP, eSRS, Premium Support)
- ✅ Integration restrictions (ERP/eSRS only for Advanced/Enterprise)
- ✅ Real-time price calculation
- ✅ Currency selector (USD, EUR, GBP)
- ✅ Generate Quote button
- ✅ PDF export functionality
- ✅ Email quote functionality

---

## Regression Test Requirements (Critical User Flows)

### Flow 1: Document Download (First-Time User)
1. Navigate to homepage as anonymous user
2. Click on any protocol card (e.g., "Reps & Certs Compliance")
3. Verify email capture modal appears
4. Fill in form: First Name, Last Name, Email, Company
5. Submit form and verify validation works
6. Verify PDF download triggers immediately
7. Verify database entry created in `documentDownloads` table
8. Verify follow-up email scheduled in `scheduledEmails` table
9. Wait 2 hours and verify follow-up email is sent
10. Verify personalized welcome page link in email works
11. Verify Calendly scheduling link in email works

### Flow 2: Download Limit Enforcement
1. Use same email from Flow 1
2. Download 2 more documents (total 3)
3. Verify all 3 downloads succeed
4. Attempt 4th download with same email
5. Verify download limit modal appears
6. Verify modal shows "You've reached your download limit of 3 documents"
7. Verify "Schedule a Meeting" button works
8. Verify modal prevents download from proceeding

### Flow 3: Email Suppression System
1. Simulate bounced email event via SendGrid webhook
2. Verify email is marked as suppressed in `emailStatus` table
3. Attempt download with suppressed email
4. Verify error message: "This email is blocked due to delivery issues"
5. Verify download is prevented
6. Test unsuppress functionality via admin API
7. Verify email can download again after unsuppression

### Flow 4: Contact Form Submission
1. Navigate to /contact page
2. Fill in contact form with test data
3. Submit form and verify success message
4. Verify form data is captured (localStorage or backend)
5. Verify Calendly widget loads correctly
6. Test Calendly scheduling flow end-to-end

### Flow 5: Client Login
1. Navigate to /login page
2. Test login with credentials: john@intelleges.com / 012463.xX
3. Verify reCAPTCHA challenge appears
4. Complete reCAPTCHA and submit login
5. Verify redirect to Railway dashboard
6. Test SSO buttons (Google, Microsoft, Okta) display correctly

### Flow 6: Pricing Calculator Quote Generation
1. Navigate to /admin/pricing
2. Select Advanced tier
3. Adjust sliders: 50 users, 200 suppliers, 10 protocols, 5 sites, 3 partner types
4. Enable ERP Integration
5. Enable Premium Support
6. Verify real-time price updates
7. Click "Generate Quote"
8. Verify quote is saved to database
9. Click "Export PDF"
10. Verify PDF downloads with correct pricing
11. Enter email and click "Email Quote"
12. Verify quote email is sent

---

## Stress Test Requirements (Performance & Load)

### Load Testing Scenarios

#### Scenario 1: Concurrent Document Downloads
- **Goal:** Test system under 100 concurrent download requests
- **Steps:**
  1. Simulate 100 unique users requesting documents simultaneously
  2. Verify all downloads complete successfully
  3. Verify database handles 100 concurrent inserts
  4. Verify S3 CDN serves all PDFs without errors
  5. Verify follow-up emails are scheduled correctly
  6. Measure response time (target: <2 seconds per request)

#### Scenario 2: Download Limit Enforcement Under Load
- **Goal:** Test download limit logic with 50 users hitting limit simultaneously
- **Steps:**
  1. Create 50 users with 3 downloads each
  2. Simulate all 50 attempting 4th download at same time
  3. Verify all 50 see download limit modal
  4. Verify no race conditions allow 4th download
  5. Verify database integrity maintained

#### Scenario 3: Pricing Calculator Stress Test
- **Goal:** Test calculator with rapid tier switching and slider adjustments
- **Steps:**
  1. Rapidly switch between all 4 tiers (10 times per second for 30 seconds)
  2. Rapidly adjust all sliders (random values, 10 times per second for 30 seconds)
  3. Toggle all integrations rapidly (10 times per second for 30 seconds)
  4. Verify UI remains responsive
  5. Verify price calculations remain accurate
  6. Verify no memory leaks or performance degradation

#### Scenario 4: Email System Stress Test
- **Goal:** Test email scheduling and sending under high volume
- **Steps:**
  1. Schedule 1000 follow-up emails for 2 hours from now
  2. Verify cron job processes all 1000 emails correctly
  3. Verify SendGrid API handles volume
  4. Verify webhook processing for 1000 email events
  5. Measure processing time (target: <5 minutes for 1000 emails)

#### Scenario 5: Database Query Performance
- **Goal:** Verify query performance with large dataset
- **Steps:**
  1. Seed database with 10,000 document downloads
  2. Seed database with 10,000 scheduled emails
  3. Run download limit check query 100 times
  4. Measure average response time (target: 50-100ms)
  5. Verify database indexes are utilized
  6. Test connection pooling under load

### Performance Benchmarks

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Page Load Time | <2s | <3s |
| API Response Time | <200ms | <500ms |
| Database Query Time | <100ms | <200ms |
| PDF Download Trigger | <1s | <2s |
| Concurrent Users | 100+ | 50+ |
| Email Processing | 1000/5min | 1000/10min |

---

## Key Business Rules to Test

### 1. 3-Document Lifetime Limit
- Each email address can download maximum 3 documents (lifetime, not per day)
- Enforced via `documentDownloads.checkLimit` API
- 4th download attempt shows DownloadLimitReachedModal

### 2. 2-Hour Email Delay
- Follow-up emails sent 2 hours after document download
- Scheduled via `scheduledEmails` table
- Processed by cron job running every 5 minutes

### 3. Email Capture Required
- All service one-pagers and featured documents require email capture
- EmailCaptureModal with 3 required fields: Name, Email, Company

### 4. Case Studies Require Meeting
- Case study downloads require Calendly meeting booking
- DownloadLimitReachedModal includes "Schedule a Meeting" button

### 5. Integration Tier Restrictions
- ERP Integration: Advanced and Enterprise only
- eSRS Support: Advanced and Enterprise only
- Premium Support: Available for all tiers

---

## Testing Checklist Summary

### Pre-Launch Priority 1 (Must Complete)
- [ ] SendGrid Production Webhook configured
- [ ] Cron Job Verification (email processor runs every 5 minutes)
- [ ] Environment Variables verified
- [ ] SSL Certificate valid for intelleges.com
- [ ] Analytics tracking code present on all pages
- [ ] Mobile Testing completed
- [ ] Performance Testing (Lighthouse audit)

### Pre-Launch Priority 2 (Post-Launch Acceptable)
- [ ] Contact Form Backend connected
- [ ] Email Health Badges added
- [ ] Admin Suppression Controls UI built

---

## Test Data Requirements

### Test Emails
- `test-user-1@example.com` - Fresh user (0 downloads)
- `test-user-2@example.com` - User with 2 downloads
- `test-user-3@example.com` - User at limit (3 downloads)
- `test-suppressed@example.com` - Suppressed email
- `test-bounced@example.com` - Bounced email

### Test Documents
- Reps & Certs Compliance Service
- Export Control (ITAR/EAR) Service
- Cybersecurity (CMMC/NIST) Service
- FOCI Case Study
- COO Compliance Case Study
- Counterfeit Parts Case Study

### Test Pricing Scenarios
- Basic tier: 10 users, 50 suppliers, 3 protocols, 1 site, 1 partner type
- Professional tier: 25 users, 100 suppliers, 5 protocols, 2 sites, 2 partner types
- Advanced tier: 50 users, 200 suppliers, 10 protocols, 5 sites, 3 partner types + ERP + Premium Support
- Enterprise tier: 100 users, 500 suppliers, 16 protocols, 10 sites, 5 partner types + ERP + eSRS + Premium Support
