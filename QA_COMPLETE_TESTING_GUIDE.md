# Intelleges Website - Complete QA Testing Guide

**Version:** 1.0  
**Last Updated:** November 30, 2025  
**Purpose:** Comprehensive testing specification for QA team covering all clickable elements, business rules, and expected behaviors

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Global Navigation & Header](#global-navigation--header)
3. [Page-by-Page Testing Guide](#page-by-page-testing-guide)
4. [Download System Rules](#download-system-rules)
5. [Email Automation Workflows](#email-automation-workflows)
6. [Modal Behaviors](#modal-behaviors)
7. [Edge Cases & Error Handling](#edge-cases--error-handling)
8. [Testing Checklists](#testing-checklists)

---

## System Overview

### Technology Stack
- **Frontend:** React 19 + Wouter (client-side routing)
- **Backend:** tRPC API
- **Database:** MySQL (Drizzle ORM)
- **Email:** SendGrid
- **Storage:** S3 (Manus CDN)

### Key Business Rules
1. **3-Document Lifetime Limit:** Each email address can download maximum 3 documents (lifetime, not per day)
2. **2-Hour Email Delay:** Follow-up emails sent 2 hours after document download
3. **Email Capture Required:** All service one-pagers and featured documents require email capture
4. **Case Studies Require Meeting:** Case study downloads require Calendly meeting booking

---

## Global Navigation & Header

### Header Elements (All Pages)

| Element | Location | Click Behavior | Expected Result |
|---------|----------|----------------|-----------------|
| **Intelleges Logo** | Top left | Click | Navigate to homepage (/) |
| **Product** | Top nav | Click | Navigate to /product |
| **Protocols** | Top nav | Click | Navigate to /protocols |
| **About** | Top nav | Click | Navigate to /about |
| **Pricing** | Top nav | Click | Navigate to /pricing |
| **Contact** | Top nav | Click | Navigate to /contact |
| **Client Login** | Top right button | Click | Navigate to OAuth login portal |
| **Book a Demo** | Top right button | Click | Navigate to /contact page |

### Footer Elements (All Pages)

| Section | Links | Click Behavior |
|---------|-------|----------------|
| **Product** | Overview, Protocols, Supplier Onboarding, Pricing | Navigate to respective pages |
| **Company** | About, Contact, +1-917-818-0225 | Navigate or initiate phone call |
| **Resources** | Case Studies, Whitepapers, One-Pagers | Navigate to /case-studies, /resources, /one-pagers |
| **Legal** | Security, Privacy, Terms | Navigate to respective pages |
| **Access** | Client Login | Navigate to OAuth login portal |

---

## Page-by-Page Testing Guide

### 1. Homepage (/)

#### Hero Section
| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| **Book a Demo** button | Primary CTA | Click | Navigate to /contact |
| **Watch 2-Minute Overview** button | Secondary CTA | Click | Open video modal (placeholder) |

#### Protocols Section
| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| Protocol cards (16 total) | Interactive cards | Hover | Show subtle scale effect |
| Protocol cards | Interactive cards | Click | No action (informational only) |

#### How Intelleges Works Section
- **6 numbered steps:** Informational only, no click actions

#### Download Whitepaper CTA
| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| **Download Whitepaper** button | CTA | Click | Navigate to /resources |

---

### 2. One-Pagers Page (/one-pagers)

#### Service Document Cards (11 Total)

**List of Documents:**
1. Reps & Certs Compliance Service
2. Export Control (ITAR/EAR) Service
3. Cybersecurity (CMMC/NIST) Service
4. Small Business Programs Service
5. Conflict Minerals Service
6. Buy American Compliance Service
7. Supplier Risk Management Service
8. Quality Systems (ISO/AS9100) Service
9. Environmental & COI Tracking Service
10. **Compliance Maturity Model** (NEW)
11. **Current Compliance Landscape** (NEW)

#### Click Behavior for Each Card

| Action | Expected Result |
|--------|-----------------|
| **Hover** | Card scales up slightly, shadow increases, title font weight increases |
| **Click** | Opens EmailCaptureModal with document title pre-filled |

#### EmailCaptureModal Workflow

**Step 1: Modal Opens**
- Title: "Download [Document Name]"
- 3 required fields: Full Name, Email Address, Company Name
- All fields have validation

**Step 2: Form Validation**
| Field | Validation Rule | Error Message |
|-------|----------------|---------------|
| Full Name | Required, non-empty | "Name is required" |
| Email Address | Required, valid email format | "Email is required" / "Please enter a valid email address" |
| Company Name | Required, non-empty | "Company name is required" |

**Step 3: Submit Process**
1. Check download limit via `documentDownloads.checkLimit` API
2. If limit reached (≥3 downloads):
   - Close EmailCaptureModal
   - Open DownloadLimitReachedModal
   - **STOP** (no download occurs)
3. If limit NOT reached:
   - Record download via `documentDownloads.recordDownload` API
   - Trigger browser download of PDF from S3 CDN URL
   - Schedule follow-up email for 2 hours later
   - Show success state (green checkmark)
   - Display toast: "Download started! Check your email in 2 hours for a follow-up message."
   - Auto-close modal after 2 seconds

**Step 4: Success State**
- Green checkmark icon
- Message: "Download Started!"
- Subtext: "Your document is downloading now. Check your email in 2 hours for a personalized follow-up."

---

### 3. Resources Page (/resources)

#### Featured Compliance Frameworks Section

**2 Featured Documents:**
1. Compliance Maturity Model
2. Current Compliance Landscape

| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| Featured document card | Interactive card | Hover | Scale up, shadow increase, gradient effect |
| Featured document card | Interactive card | Click | Open EmailCaptureModal (same workflow as One-Pagers) |
| **Download** button | Button inside card | Click | Open EmailCaptureModal |

**Visual Design:**
- Gradient backgrounds (indigo/violet)
- Custom icons (TrendingUp, Map)
- Border ring effects
- Badge: "One-Pager"
- "PDF • Free Download" footer text

#### Additional Resources Section

**4 Placeholder Resource Cards:**
1. CMMC 2.0 Readiness Guide
2. The Future of Supply Chain Risk
3. Intelleges Platform Datasheet
4. Audit Preparation Handbook

| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| Resource cards | Interactive cards | Hover | Border darkens, shadow appears |
| **Download** button | Button | Click | **No action** (placeholder, not wired up) |

**Testing Note:** These 4 cards are placeholders and should NOT trigger downloads. QA should verify no modal opens when clicking Download.

---

### 4. Case Studies Page (/case-studies)

#### Case Study Cards (17 Total)

**Gating Rule:** All case studies require Calendly meeting booking (NOT email capture)

| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| Case study card | Interactive card | Hover | Scale effect, shadow increase |
| **Download Case Study** button | CTA button | Click | **Redirect to Calendly booking page** (external link) |

**Expected Calendly URL Format:**
```
https://calendly.com/intelleges/demo?prefill_email=[user_email]&prefill_name=[user_name]
```

**Testing Note:** Case studies do NOT use EmailCaptureModal. They bypass email capture and go straight to Calendly.

---

### 5. Contact Page (/contact)

#### Contact Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Full Name | Text input | Non-empty string | Yes |
| Email Address | Email input | Valid email format | Yes |
| Company Name | Text input | Non-empty string | Yes |
| Message | Textarea | Non-empty string | Yes |

#### Form Submission

| Action | Expected Result |
|--------|-----------------|
| Click **Send Message** | Submit form via tRPC `leads.submit` mutation |
| Success | Show success toast, clear form |
| Error | Show error toast with message |

---

### 6. Pricing Page (/pricing)

#### Pricing Tiers

**3 Tiers:**
1. **Starter** - Contact for pricing
2. **Professional** - Contact for pricing
3. **Enterprise** - Contact for pricing

| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| **Contact Sales** button | CTA | Click | Navigate to /contact |
| **Book a Demo** button | CTA | Click | Navigate to /contact |

---

### 7. About Page (/about)

#### Team Section
- Informational content only
- No interactive elements beyond global navigation

#### CTA Section
| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| **Learn More** button | CTA | Click | Navigate to /product |
| **Contact Us** button | CTA | Click | Navigate to /contact |

---

## Download System Rules

### 3-Document Lifetime Limit

**Rule:** Each unique email address can download a maximum of 3 documents across their lifetime.

#### Counting Logic
- **What counts:** Any document downloaded via EmailCaptureModal
- **What doesn't count:** Case studies (require Calendly, not tracked in documentDownloads table)
- **Scope:** Lifetime (not per day, not per session)
- **Tracking:** `documentDownloads` table in database

#### Database Schema
```sql
documentDownloads (
  id INT PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  documentTitle VARCHAR(500) NOT NULL,
  documentUrl TEXT NOT NULL,
  documentType ENUM('capability', 'protocol', 'whitepaper'),
  downloadedAt TIMESTAMP DEFAULT NOW(),
  followUpEmailSent TINYINT DEFAULT 0,
  followUpEmailSentAt TIMESTAMP NULL
)
```

#### API Endpoints

**1. Check Limit**
```typescript
documentDownloads.checkLimit({ email: string })
// Returns: { email, downloadCount, limitReached, remainingDownloads }
```

**2. Record Download**
```typescript
documentDownloads.recordDownload({
  email: string,
  name: string,
  company?: string,
  documentTitle: string,
  documentUrl: string,
  documentType: 'capability' | 'protocol' | 'whitepaper'
})
// Returns: { success, downloadCount, remainingDownloads }
```

### Testing Scenarios

#### Scenario 1: First Download (0/3 used)
1. User enters email: `test@example.com`
2. Submit form
3. **Expected:** Download succeeds, count = 1, remaining = 2

#### Scenario 2: Second Download (1/3 used)
1. Same email: `test@example.com`
2. Submit form
3. **Expected:** Download succeeds, count = 2, remaining = 1

#### Scenario 3: Third Download (2/3 used)
1. Same email: `test@example.com`
2. Submit form
3. **Expected:** Download succeeds, count = 3, remaining = 0

#### Scenario 4: Fourth Download (3/3 used - LIMIT REACHED)
1. Same email: `test@example.com`
2. Submit form
3. **Expected:**
   - EmailCaptureModal closes immediately
   - DownloadLimitReachedModal opens
   - NO download occurs
   - NO database record created

### DownloadLimitReachedModal

**Content:**
- Icon: Checkmark in blue circle
- Title: "You've Reached Your Download Limit"
- Message: "You've downloaded 3 free resources. To access more compliance documents and get personalized guidance, schedule a brief call with our team."
- CTA Button: "Schedule a Meeting" → Opens Calendly in new tab
- Secondary action: Close modal (X button or click outside)

**Calendly URL:**
```
https://calendly.com/intelleges/demo
```

---

## Email Automation Workflows

### 2-Hour Delayed Follow-Up Email

**Trigger:** User successfully downloads a document via EmailCaptureModal

**Process:**
1. User submits EmailCaptureModal form
2. Backend records download in `documentDownloads` table
3. Backend creates scheduled email in `scheduledEmails` table
   - `scheduledFor` = current time + 2 hours
   - `sent` = 0 (not sent yet)
4. Background processor (cron job) runs every hour
5. Processor finds emails where `scheduledFor <= NOW()` and `sent = 0`
6. Processor sends email via SendGrid
7. Processor marks `sent = 1` and sets `sentAt` timestamp

### Email Content Template

**Subject:** `Thank you for downloading [Document Title]`

**Body:**
```html
Hi [Name],

Thank you for downloading [Document Title] from Intelleges.

We hope you found it valuable. If you'd like to discuss how Intelleges can help your organization streamline compliance and supplier management, we'd love to connect.

[Schedule a 15-Minute Call]
→ [Calendly URL with pre-filled email and document info]

Best regards,
The Intelleges Team
```

**Calendly URL Parameters:**
```
https://calendly.com/intelleges/demo?email=[email]&name=[name]&a1=[documentTitle]&a2=[documentType]
```

### Email Delivery Testing

| Test Case | Expected Behavior |
|-----------|-------------------|
| Download document at 2:00 PM | Email sent at 4:00 PM (or next cron run after 4:00 PM) |
| Download 3 documents in 1 hour | Receive 3 separate emails, each 2 hours after respective download |
| Invalid email address | Email fails to send, marked as `failed = 1` in database |
| SendGrid API error | Email marked as `failed = 1`, `failureReason` logged |

### Database Tables

**scheduledEmails Schema:**
```sql
scheduledEmails (
  id INT PRIMARY KEY,
  recipientEmail VARCHAR(320) NOT NULL,
  recipientName VARCHAR(255),
  emailType VARCHAR(100) NOT NULL,  -- 'document_followup'
  subject VARCHAR(500) NOT NULL,
  htmlContent TEXT NOT NULL,
  scheduledFor TIMESTAMP NOT NULL,
  sent TINYINT DEFAULT 0,
  sentAt TIMESTAMP NULL,
  failed TINYINT DEFAULT 0,
  failureReason TEXT NULL,
  retryCount INT DEFAULT 0,
  metadata TEXT,  -- JSON string
  createdAt TIMESTAMP DEFAULT NOW()
)
```

---

## Modal Behaviors

### 1. EmailCaptureModal

**Trigger Locations:**
- One-Pagers page: Click any service document card
- Resources page: Click featured document card

**States:**

| State | Visual | Duration |
|-------|--------|----------|
| **Form Entry** | 3 input fields, Download button | Until submit or close |
| **Submitting** | Button text: "Processing...", button disabled | 1-3 seconds |
| **Success** | Green checkmark, "Download Started!" message | 2 seconds (auto-close) |
| **Limit Reached** | Modal closes, DownloadLimitReachedModal opens | Immediate |

**Close Behaviors:**
- Click X button (top right)
- Click outside modal (backdrop)
- Press ESC key
- Auto-close after success (2 seconds)

**Form Validation:**
- Real-time validation on blur
- Error messages appear below each field
- Submit button enabled only when all fields valid

### 2. DownloadLimitReachedModal

**Trigger:** User attempts 4th download (limit already reached)

**Content:**
- Blue checkmark icon
- Title: "You've Reached Your Download Limit"
- Message: Explanation + CTA to schedule meeting
- Button: "Schedule a Meeting" (opens Calendly)

**Close Behaviors:**
- Click X button
- Click outside modal
- Press ESC key
- Click "Schedule a Meeting" (opens Calendly, modal stays open)

### 3. SimpleModal (Base Component)

**Used by:** EmailCaptureModal, DownloadLimitReachedModal

**Features:**
- Backdrop overlay (semi-transparent black)
- Center-aligned modal
- Click outside to close
- ESC key to close
- Smooth fade-in/out animations

---

## Edge Cases & Error Handling

### Download System Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| **User clears cookies between downloads** | Limit still enforced (tracked by email, not cookies) |
| **User uses different capitalization (Test@example.com vs test@example.com)** | Treated as same email (normalized to lowercase) |
| **User enters invalid email format** | Form validation prevents submission |
| **Database connection fails** | Error toast: "An error occurred. Please try again." |
| **S3 CDN URL is invalid** | Browser shows download error, but download is still recorded |
| **User clicks Download button multiple times rapidly** | Button disabled after first click, prevents duplicate records |

### Email Automation Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| **Cron job doesn't run for 3 hours** | All pending emails sent on next cron run |
| **SendGrid API rate limit exceeded** | Email marked as failed, retry on next cron run |
| **User's email bounces** | Marked as failed in database, no retry |
| **User downloads 3 documents in 5 minutes** | 3 separate emails scheduled, sent 2 hours after each download |

### Modal Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| **User opens modal, navigates away, comes back** | Modal state resets (no persisted form data) |
| **User opens modal on mobile** | Modal is responsive, full-width on small screens |
| **User has JavaScript disabled** | Modals don't work (graceful degradation not implemented) |

---

## Testing Checklists

### Pre-Deployment Checklist

- [ ] All navigation links work correctly
- [ ] All footer links work correctly
- [ ] Logo click returns to homepage
- [ ] Mobile navigation works (hamburger menu if implemented)
- [ ] All buttons have hover states
- [ ] All forms validate correctly
- [ ] All modals open and close properly
- [ ] Download limit enforcement works
- [ ] Email capture records downloads correctly
- [ ] Scheduled emails created in database
- [ ] S3 CDN URLs are valid and accessible
- [ ] Calendly links open in new tab
- [ ] Toast notifications appear for success/error states

### Download System Testing Checklist

**Test with fresh email address:**
- [ ] Download 1st document → Success, count = 1
- [ ] Download 2nd document → Success, count = 2
- [ ] Download 3rd document → Success, count = 3
- [ ] Download 4th document → Limit modal appears, no download
- [ ] Verify 3 records in `documentDownloads` table
- [ ] Verify 3 records in `scheduledEmails` table
- [ ] Verify `scheduledFor` timestamp is 2 hours after download

### Email Automation Testing Checklist

- [ ] Download document, wait 2+ hours
- [ ] Check email inbox for follow-up email
- [ ] Verify email subject includes document title
- [ ] Verify email body includes recipient name
- [ ] Verify Calendly link works and pre-fills email
- [ ] Check `scheduledEmails` table: `sent = 1`, `sentAt` populated
- [ ] Check `documentDownloads` table: `followUpEmailSent = 1`

### Modal Testing Checklist

**EmailCaptureModal:**
- [ ] Opens when clicking document card
- [ ] Form validation works for all fields
- [ ] Submit button disabled during submission
- [ ] Success state shows for 2 seconds
- [ ] Modal auto-closes after success
- [ ] ESC key closes modal
- [ ] Click outside closes modal
- [ ] X button closes modal

**DownloadLimitReachedModal:**
- [ ] Opens when limit reached
- [ ] "Schedule a Meeting" button opens Calendly
- [ ] Calendly opens in new tab
- [ ] Modal closes with ESC, X, or click outside

### Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsive Design Testing

Test breakpoints:
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large desktop (1440px+)

---

## Database Verification Queries

### Check Download Count for Email
```sql
SELECT COUNT(*) as download_count 
FROM documentDownloads 
WHERE email = 'test@example.com';
```

### Check Scheduled Emails
```sql
SELECT * 
FROM scheduledEmails 
WHERE recipientEmail = 'test@example.com' 
ORDER BY createdAt DESC;
```

### Check Failed Emails
```sql
SELECT * 
FROM scheduledEmails 
WHERE failed = 1 
ORDER BY createdAt DESC;
```

### Check Pending Emails (Not Yet Sent)
```sql
SELECT * 
FROM scheduledEmails 
WHERE sent = 0 AND failed = 0 AND scheduledFor <= NOW();
```

---

## Known Issues & Limitations

1. **TypeScript Errors:** Some type mismatches exist but don't affect runtime behavior
2. **Placeholder Resources:** 4 resource cards on Resources page are not wired up to downloads
3. **Case Study Downloads:** Not tracked in download limit system (requires Calendly)
4. **Email Processor:** Requires manual cron job setup (not automatic)
5. **SEO Component:** Missing from some pages (Pricing, Resources)

---

## Support & Escalation

**For QA Issues:**
- Check this guide first
- Verify database state using SQL queries
- Check browser console for JavaScript errors
- Check network tab for API failures

**For Bug Reports, Include:**
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/device information
5. Screenshots/video if applicable
6. Database state (if relevant)

---

**End of QA Testing Guide**
