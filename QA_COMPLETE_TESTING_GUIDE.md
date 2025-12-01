# Intelleges Website - Complete QA Testing Guide

**Version:** 2.0  
**Last Updated:** November 30, 2025  
**Purpose:** Comprehensive testing specification for QA team covering all clickable elements, business rules, email management, analytics, and expected behaviors

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Global Navigation & Header](#global-navigation--header)
3. [Page-by-Page Testing Guide](#page-by-page-testing-guide)
4. [Download System Rules](#download-system-rules)
5. [Email Automation Workflows](#email-automation-workflows)
6. [Email Suppression System](#email-suppression-system) **NEW**
7. [Email Analytics Dashboard](#email-analytics-dashboard) **NEW**
8. [Email Health Badges](#email-health-badges) **NEW**
9. [Lead Qualification System](#lead-qualification-system) **NEW**
10. [Personalized Welcome Pages](#personalized-welcome-pages) **NEW**
11. [SendGrid Webhook Integration](#sendgrid-webhook-integration) **NEW**
12. [Modal Behaviors](#modal-behaviors)
13. [Edge Cases & Error Handling](#edge-cases--error-handling)
14. [Testing Checklists](#testing-checklists)
15. [Automated Test Verification](#automated-test-verification) **NEW**

---

## System Overview

### Technology Stack

- **Frontend:** React 19 + Wouter (client-side routing)
- **Backend:** tRPC API
- **Database:** MySQL (Drizzle ORM)
- **Email:** SendGrid with webhook integration
- **Storage:** S3 (Manus CDN)
- **Analytics:** Custom email engagement tracking

### Key Business Rules

1. **3-Document Lifetime Limit:** Each email address can download maximum 3 documents (lifetime, not per day)
2. **2-Hour Email Delay:** Follow-up emails sent 2 hours after document download
3. **Email Capture Required:** All service one-pagers and featured documents require email capture
4. **Case Studies Require Meeting:** Case study downloads require Calendly meeting booking
5. **Email Suppression:** Bounced, spam-reported, and unsubscribed emails are automatically blocked from future communications **NEW**
6. **Lead Qualification:** High-value prospects are tracked and qualified through dedicated workflows **NEW**

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
10. Compliance Maturity Model (NEW)
11. Current Compliance Landscape (NEW)

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
|-------|-----------------|---------------|
| Full Name | Required, non-empty | "Name is required" |
| Email Address | Required, valid email format | "Email is required" / "Please enter a valid email address" |
| Company Name | Required, non-empty | "Company name is required" |

**Step 3: Email Suppression Check** **NEW**

Before processing the download, the system checks if the email is suppressed:

1. Call `emailSuppression.checkEmailSuppression` API
2. If email is suppressed:
   - Show error toast: "This email address cannot receive communications (reason: [bounce/spam/unsubscribe])"
   - Do NOT proceed with download
   - Keep modal open for user to try different email
3. If email is NOT suppressed:
   - Proceed to Step 4 (download limit check)

**Step 4: Download Limit Check**

1. Check download limit via `documentDownloads.checkLimit` API
2. If limit reached (≥3 downloads):
   - Close EmailCaptureModal
   - Open DownloadLimitReachedModal
   - **STOP** (no download occurs)
3. If limit NOT reached:
   - Proceed to Step 5

**Step 5: Record Download & Schedule Email**

- Record download via `documentDownloads.recordDownload` API
- **Check suppression status again** before scheduling follow-up email **NEW**
- If NOT suppressed: Schedule follow-up email for 2 hours later
- If suppressed: Skip email scheduling (log suppression block)
- Trigger browser download of PDF from S3 CDN URL
- Show success state (green checkmark)
- Display toast: "Download started! Check your email in 2 hours for a follow-up message."
- Auto-close modal after 2 seconds

**Step 6: Success State**

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
| Download button | Button inside card | Click | Open EmailCaptureModal |

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
| Download button | Button | Click | No action (placeholder, not wired up) |

**Testing Note:** These 4 cards are placeholders and should NOT trigger downloads. QA should verify no modal opens when clicking Download.

---

### 4. Case Studies Page (/case-studies)

#### Case Study Cards (17 Total)

**Gating Rule:** All case studies require Calendly meeting booking (NOT email capture)

| Element | Type | Click Behavior | Expected Result |
|---------|------|----------------|-----------------|
| Case study card | Interactive card | Hover | Scale effect, shadow increase |
| **Download Case Study** button | CTA button | Click | Redirect to Calendly booking page (external link) |

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
| Full Name | Text input | Non-empty | Yes |
| Email | Email input | Valid email format | Yes |
| Company | Text input | Non-empty | Yes |
| Message | Textarea | Non-empty | Yes |

#### Submit Behavior

1. Validate all fields
2. Call `contact.submitForm` API
3. Show success toast: "Message sent! We'll get back to you soon."
4. Clear form fields
5. No email suppression check (contact form submissions always go through)

---

## Download System Rules

### 3-Document Lifetime Limit

**Business Rule:** Each email address can download a maximum of 3 documents across their lifetime (not per day, not per session).

#### Implementation

1. **Check Limit Before Download:**
   - API: `documentDownloads.checkLimit({ email })`
   - Returns: `{ canDownload: boolean, downloadsUsed: number, limit: number }`

2. **If Limit Reached:**
   - Close EmailCaptureModal
   - Open DownloadLimitReachedModal
   - Display message: "You've reached your download limit (3 documents)"
   - Provide contact information for additional access

3. **If Limit NOT Reached:**
   - Proceed with download
   - Increment download count in database

#### Testing Scenarios

| Scenario | Downloads Used | Expected Behavior |
|----------|----------------|-------------------|
| First download | 0 | Allow download, show success |
| Second download | 1 | Allow download, show success |
| Third download | 2 | Allow download, show success |
| Fourth download | 3 | Block download, show DownloadLimitReachedModal |
| Fifth+ download | 3+ | Block download, show DownloadLimitReachedModal |

---

## Email Automation Workflows

### Follow-Up Email Schedule

**Business Rule:** Follow-up emails are sent 2 hours after document download (unless email is suppressed).

#### Workflow

1. **User downloads document** via EmailCaptureModal
2. **System records download** in `documentDownloads` table
3. **System checks suppression status** **NEW**
   - If suppressed: Skip email scheduling, log suppression block
   - If not suppressed: Continue to step 4
4. **System schedules email** in `scheduledEmails` table
   - `scheduledFor`: current time + 2 hours
   - `status`: "pending"
5. **Background worker processes scheduled emails** every minute
   - Finds emails where `scheduledFor <= NOW()` and `status = "pending"`
   - Sends email via SendGrid
   - Updates status to "sent"
   - Records email event in `emailStatus` and `emailEvents` tables **NEW**

#### Email Content

**Subject:** "Your [Document Name] - Next Steps"

**Body:**
- Personalized greeting with user's name
- Summary of downloaded document
- Call-to-action: Book a demo or contact sales
- Unsubscribe link

#### Testing Scenarios

| Scenario | Expected Behavior |
|----------|-------------------|
| Download at 10:00 AM | Email sent at 12:00 PM |
| Download at 11:59 PM | Email sent at 1:59 AM next day |
| Email suppressed (bounced) | Email NOT sent, suppression logged |
| Email suppressed (spam) | Email NOT sent, suppression logged |
| Email suppressed (unsubscribed) | Email NOT sent, suppression logged |

---

## Email Suppression System **NEW**

### Overview

The email suppression system automatically blocks bounced, spam-reported, and unsubscribed email addresses from receiving future communications. This protects sender reputation and ensures compliance with email best practices.

### Suppression Reasons

| Reason | Trigger | Description |
|--------|---------|-------------|
| **bounce** | SendGrid bounce event | Email address bounced (hard or soft bounce) |
| **spam** | SendGrid spam_report event | Recipient marked email as spam |
| **unsubscribe** | SendGrid unsubscribe event | Recipient clicked unsubscribe link |
| **dropped** | SendGrid dropped event | SendGrid dropped email (invalid address, suppression list) |
| **manual** | Admin action | Manually suppressed by administrator |

### Automatic Suppression Flow

1. **SendGrid sends email** to recipient
2. **Recipient action triggers event** (bounce, spam report, unsubscribe)
3. **SendGrid webhook fires** to `/api/webhooks/sendgrid`
4. **Webhook handler processes event:**
   - Records event in `emailEvents` table
   - Updates `emailStatus` table with engagement metrics
   - **If event is bounce/spam/unsubscribe/dropped:**
     - Sets `isSuppressed = 1`
     - Sets `suppressionReason = [reason]`
     - Sets `suppressedAt = NOW()`
     - Logs suppression action
5. **Future email attempts are blocked:**
   - EmailCaptureModal checks suppression before submission
   - Follow-up email scheduler checks suppression before scheduling
   - Contact form submissions bypass suppression (always go through)

### Testing Email Suppression

#### Test Case 1: Bounce Event

**Setup:**
1. Use test email: `bounce@simulator.amazonses.com`
2. Download a document with this email
3. Simulate bounce event via webhook

**Expected Behavior:**
- Email status shows `isSuppressed = 1`, `suppressionReason = "bounce"`
- Attempting to download another document with same email shows error: "This email address cannot receive communications (reason: bounce)"
- Follow-up emails are NOT scheduled for this address

#### Test Case 2: Spam Report

**Setup:**
1. Use test email: `spam@example.com`
2. Download a document with this email
3. Simulate spam_report event via webhook

**Expected Behavior:**
- Email status shows `isSuppressed = 1`, `suppressionReason = "spam"`
- Future download attempts blocked with error message
- Follow-up emails are NOT scheduled

#### Test Case 3: Unsubscribe

**Setup:**
1. Use test email: `unsubscribe@example.com`
2. Download a document with this email
3. Simulate unsubscribe event via webhook

**Expected Behavior:**
- Email status shows `isSuppressed = 1`, `suppressionReason = "unsubscribe"`
- Future download attempts blocked with error message
- Follow-up emails are NOT scheduled

#### Test Case 4: Manual Suppression

**Setup:**
1. Admin logs into `/admin/email-analytics`
2. Manually suppresses email via API (future enhancement)

**Expected Behavior:**
- Email status shows `isSuppressed = 1`, `suppressionReason = "manual"`
- All future communications blocked

#### Test Case 5: Unsuppression

**Setup:**
1. Admin logs into `/admin/email-analytics`
2. Removes suppression via API (future enhancement)

**Expected Behavior:**
- Email status shows `isSuppressed = 0`, `suppressionReason = NULL`
- Email can now receive communications again

### Suppression API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `emailSuppression.checkEmailSuppression` | Query | Check if email is suppressed |
| `emailSuppression.suppressEmail` | Mutation | Manually suppress an email |
| `emailSuppression.unsuppressEmail` | Mutation | Remove suppression |
| `emailSuppression.getSuppressionStats` | Query | Get suppression counts by reason |

### Testing Checklist: Email Suppression

- [ ] Bounced email is automatically suppressed
- [ ] Spam-reported email is automatically suppressed
- [ ] Unsubscribed email is automatically suppressed
- [ ] Dropped email is automatically suppressed
- [ ] Suppressed email cannot download documents (error shown)
- [ ] Suppressed email does not receive follow-up emails
- [ ] Suppression reason is correctly recorded
- [ ] Suppression timestamp is correctly recorded
- [ ] Manual suppression works (if implemented)
- [ ] Unsuppression works (if implemented)
- [ ] Suppression stats are accurate
- [ ] Case-insensitive email matching works (Test@Example.com = test@example.com)

---

## Email Analytics Dashboard **NEW**

### Overview

The Email Analytics Dashboard (`/admin/email-analytics`) provides comprehensive insights into email engagement, deliverability, and suppression status.

### Access Control

- **URL:** `/admin/email-analytics`
- **Authentication:** Required (OAuth login)
- **Authorization:** Admin users only (currently all authenticated users, pending role implementation)

### Dashboard Sections

#### 1. Overview Cards

| Metric | Description | Calculation |
|--------|-------------|-------------|
| **Total Tracked Emails** | Number of unique email addresses tracked | COUNT(*) from emailStatus |
| **Total Delivered** | Number of successfully delivered emails | SUM(delivered) |
| **Total Opened** | Number of emails opened | SUM(opened) |
| **Total Clicked** | Number of emails with link clicks | SUM(clicked) |
| **Total Bounced** | Number of bounced emails | SUM(bounce) |
| **Total Spam Reports** | Number of spam complaints | SUM(spam) |
| **Total Unsubscribed** | Number of unsubscribe requests | SUM(unsubscribed) |
| **Open Rate** | Percentage of delivered emails opened | (opened / delivered) * 100 |
| **Click Rate** | Percentage of delivered emails clicked | (clicked / delivered) * 100 |
| **Bounce Rate** | Percentage of emails bounced | (bounced / (delivered + bounced)) * 100 |

#### 2. Email Status Table

**Columns:**

| Column | Description | Data Type |
|--------|-------------|-----------|
| **Email** | Email address | String (monospace font) |
| **Engagement Status** | Visual health badges | Badge group component |
| **Delivered** | Delivered count | Number (✓ if > 0) |
| **Opened** | Opened count | Number (✓ if > 0) |
| **Clicked** | Clicked count | Number (✓ if > 0) |
| **Bounced** | Bounce count | Number (⚠️ if > 0) |
| **Unsubscribed** | Unsubscribe count | Number (✖️ if > 0) |
| **Last Event At** | Timestamp of last event | Formatted date/time |

**Features:**

- **Search:** Filter by email address (partial match)
- **Filter:** Filter by event type (all, bounced, opened, clicked, spam, unsubscribed)
- **Pagination:** 25 rows per page with offset-based navigation
- **Row Selection:** Click row to view detailed timeline
- **Sorting:** Ordered by last event timestamp (descending)

#### 3. Email Timeline (Detail View)

When clicking an email row, a detailed timeline appears showing all events for that email:

**Event Types Displayed:**

- Delivered
- Opened
- Clicked
- Bounced
- Spam Report
- Unsubscribed
- Dropped

**Event Details:**

- Event type (with icon)
- Timestamp (formatted as relative time)
- Event metadata (if available)

### Testing Email Analytics Dashboard

#### Test Case 1: Overview Metrics

**Setup:**
1. Ensure test data exists in database (use test-webhook.mjs to simulate events)
2. Navigate to `/admin/email-analytics`

**Expected Behavior:**
- All overview cards display correct counts
- Rates (open, click, bounce) are calculated correctly
- Metrics update when new events occur

#### Test Case 2: Email Search

**Setup:**
1. Navigate to `/admin/email-analytics`
2. Enter partial email in search box (e.g., "test")

**Expected Behavior:**
- Table filters to show only matching emails
- Search is case-insensitive
- Partial matches work (e.g., "test" matches "test@example.com")

#### Test Case 3: Event Filter

**Setup:**
1. Navigate to `/admin/email-analytics`
2. Select filter: "Bounced"

**Expected Behavior:**
- Table shows only emails with bounce = 1
- Other emails are hidden
- Filter persists when searching

#### Test Case 4: Email Timeline

**Setup:**
1. Navigate to `/admin/email-analytics`
2. Click on an email row with multiple events

**Expected Behavior:**
- Timeline appears below overview cards
- All events for that email are displayed
- Events are sorted by timestamp (newest first)
- Event types have appropriate icons and colors

#### Test Case 5: Pagination

**Setup:**
1. Ensure > 25 emails exist in database
2. Navigate to `/admin/email-analytics`

**Expected Behavior:**
- Only 25 rows displayed initially
- "Next" button appears if more rows exist
- Clicking "Next" loads next 25 rows
- "Previous" button appears on page 2+

### Testing Checklist: Email Analytics Dashboard

- [ ] Dashboard loads without errors
- [ ] Overview cards display correct metrics
- [ ] Open rate calculation is correct
- [ ] Click rate calculation is correct
- [ ] Bounce rate calculation is correct
- [ ] Email search works (case-insensitive, partial match)
- [ ] Event filter works (bounced, opened, clicked, spam, unsubscribed)
- [ ] Email status table displays all columns
- [ ] Clicking email row shows timeline
- [ ] Timeline displays all events for email
- [ ] Timeline events are sorted correctly
- [ ] Pagination works (next/previous)
- [ ] Health badges display correctly (see next section)

---

## Email Health Badges **NEW**

### Overview

Email health badges provide visual indicators of email engagement status throughout the platform. They appear in the email analytics dashboard and will be extended to lead qualification views and personalized welcome pages.

### Badge Types

| Status | Icon | Color | Description |
|--------|------|-------|-------------|
| **delivered** | ✓ | Green | Email successfully delivered |
| **opened** | 📧 | Blue | Recipient opened email |
| **clicked** | 🔗 | Purple | Recipient clicked link in email |
| **bounced** | ⚠️ | Orange | Email bounced (hard or soft) |
| **spam** | 🚫 | Red | Marked as spam |
| **unsubscribed** | ✖️ | Gray | Recipient unsubscribed |
| **suppressed** | 🚫 | Red | Email is suppressed (cannot receive emails) |

### Badge Sizes

- **sm:** Small (used in compact tables)
- **md:** Medium (default)
- **lg:** Large (used in prominent displays)

### Badge Components

#### 1. EmailHealthBadge (Single Badge)

**Props:**

- `status`: Badge type (delivered, opened, clicked, bounced, spam, unsubscribed, suppressed)
- `count`: Number of events (optional, shows badge with count)
- `timestamp`: Event timestamp (optional, shows in tooltip)
- `size`: Badge size (sm, md, lg)

**Example Usage:**

```tsx
<EmailHealthBadge 
  status="opened" 
  count={3} 
  timestamp="2025-11-30T10:30:00Z" 
  size="md" 
/>
```

**Expected Display:**

- Blue badge with 📧 icon
- Count "3" displayed
- Tooltip: "Opened (3) - Last: Nov 30, 2025 10:30 AM"

#### 2. EmailHealthBadgeGroup (Multiple Badges)

**Props:**

- `statuses`: Array of badge objects `[{ status, count, timestamp }]`
- `size`: Badge size for all badges
- `maxVisible`: Maximum number of badges to show (default: 4)

**Example Usage:**

```tsx
<EmailHealthBadgeGroup 
  statuses={[
    { status: "delivered", count: 1, timestamp: "2025-11-30T10:00:00Z" },
    { status: "opened", count: 2, timestamp: "2025-11-30T10:30:00Z" },
    { status: "clicked", count: 1, timestamp: "2025-11-30T11:00:00Z" },
  ]}
  size="sm"
  maxVisible={4}
/>
```

**Expected Display:**

- Three badges displayed horizontally
- Each badge shows icon and count
- Hover shows tooltip with details
- If > maxVisible badges, show "+N more" indicator

### Badge Placement

#### Current Implementation

- **Email Analytics Dashboard:** Email status table shows badge group for each email

#### Future Implementation (Planned)

- **Lead Qualification Views:** Show badges next to email in qualification attempts table
- **Admin Lead Management:** Display engagement badges in lead detail modals
- **Personalized Welcome Pages:** Show "Your email engagement" card with badges

### Testing Email Health Badges

#### Test Case 1: Single Badge Display

**Setup:**
1. Navigate to `/admin/email-analytics`
2. Find email with single event (e.g., only delivered)

**Expected Behavior:**
- Single badge displayed with correct icon and color
- Hover shows tooltip with timestamp
- Badge size matches specified size

#### Test Case 2: Multiple Badges Display

**Setup:**
1. Navigate to `/admin/email-analytics`
2. Find email with multiple events (delivered, opened, clicked)

**Expected Behavior:**
- Badge group displays all badges horizontally
- Each badge has correct icon, color, and count
- Badges are ordered by priority (delivered → opened → clicked → bounced → spam → unsubscribed)
- Hover on each badge shows individual tooltip

#### Test Case 3: Badge with Count

**Setup:**
1. Simulate multiple "opened" events for same email
2. Navigate to `/admin/email-analytics`

**Expected Behavior:**
- Opened badge shows count (e.g., "📧 3")
- Tooltip shows: "Opened (3) - Last: [timestamp]"

#### Test Case 4: Suppressed Badge

**Setup:**
1. Suppress an email (bounce, spam, or unsubscribe)
2. Navigate to `/admin/email-analytics`

**Expected Behavior:**
- Suppressed badge (🚫) displayed in red
- Tooltip shows: "Suppressed ([reason]) - [timestamp]"
- Badge appears prominently to indicate blocked status

#### Test Case 5: Badge Overflow

**Setup:**
1. Create email with > 4 events
2. Navigate to `/admin/email-analytics`

**Expected Behavior:**
- First 4 badges displayed
- "+N more" indicator shown
- Clicking indicator shows all badges (future enhancement)

### Testing Checklist: Email Health Badges

- [ ] Delivered badge displays correctly (green, ✓)
- [ ] Opened badge displays correctly (blue, 📧)
- [ ] Clicked badge displays correctly (purple, 🔗)
- [ ] Bounced badge displays correctly (orange, ⚠️)
- [ ] Spam badge displays correctly (red, 🚫)
- [ ] Unsubscribed badge displays correctly (gray, ✖️)
- [ ] Suppressed badge displays correctly (red, 🚫)
- [ ] Badge counts display correctly
- [ ] Badge tooltips show correct information
- [ ] Badge sizes (sm, md, lg) render correctly
- [ ] Badge group displays multiple badges
- [ ] Badge group respects maxVisible limit
- [ ] Badge colors match design system
- [ ] Badges are responsive on mobile

---

## Lead Qualification System **NEW**

### Overview

The lead qualification system identifies high-value prospects and guides them through a structured qualification process. Qualified leads receive personalized welcome pages with their engagement data.

### Qualification Criteria

A lead is considered "qualified" if they meet ANY of the following criteria:

1. **Government Email Domain:** Email ends with `.gov` or `.mil`
2. **Fortune 500 Company:** Company name matches Fortune 500 list
3. **High Download Volume:** Downloaded 2+ documents
4. **High Engagement:** Opened and clicked follow-up emails

### Qualification Workflow

#### Step 1: Lead Capture

- User downloads document via EmailCaptureModal
- System records: name, email, company, document downloaded
- System checks qualification criteria

#### Step 2: Qualification Check

**API:** `qualification.checkQualification({ email })`

**Returns:**
```json
{
  "isQualified": true,
  "reason": "government_email",
  "qualificationScore": 85
}
```

#### Step 3: Qualification Gate (If Qualified)

- After download success, show QualificationGate modal
- Ask 3 additional questions:
  1. **Job Title:** Text input
  2. **Company Size:** Dropdown (1-50, 51-200, 201-1000, 1000+)
  3. **Primary Compliance Need:** Dropdown (CMMC, ITAR, AS9100, etc.)
- Submit via `qualification.submitQualification` API

#### Step 4: Personalized Welcome Page

- System generates unique welcome URL: `/welcome/[token]`
- Welcome page displays:
  - Personalized greeting with user's name
  - Company information
  - Downloaded documents list
  - Email engagement metrics **NEW**
  - Call-to-action: Book a demo
- URL is included in follow-up email

### Testing Lead Qualification

#### Test Case 1: Government Email Qualification

**Setup:**
1. Download document with email: `john.doe@navy.mil`

**Expected Behavior:**
- After download success, QualificationGate modal opens
- Modal shows: "We noticed you're from a government organization"
- User fills out 3 additional fields
- Submit creates qualification record
- Welcome page URL generated

#### Test Case 2: Fortune 500 Qualification

**Setup:**
1. Download document with company: "Lockheed Martin"

**Expected Behavior:**
- After download success, QualificationGate modal opens
- Modal shows: "We noticed you're from a Fortune 500 company"
- User completes qualification
- Welcome page URL generated

#### Test Case 3: High Download Volume Qualification

**Setup:**
1. Download 2 documents with same email

**Expected Behavior:**
- After 2nd download, QualificationGate modal opens
- Modal shows: "You've shown strong interest in our resources"
- User completes qualification
- Welcome page URL generated

#### Test Case 4: Non-Qualified Lead

**Setup:**
1. Download document with generic email: `test@example.com`
2. Company: "Small Business Inc"

**Expected Behavior:**
- Download completes successfully
- QualificationGate modal does NOT open
- Standard follow-up email sent (no welcome page)

### Testing Checklist: Lead Qualification

- [ ] Government email (.gov, .mil) triggers qualification
- [ ] Fortune 500 company triggers qualification
- [ ] 2+ downloads trigger qualification
- [ ] QualificationGate modal opens after qualification
- [ ] QualificationGate form validates all fields
- [ ] Qualification submission creates database record
- [ ] Welcome page URL is generated
- [ ] Welcome page displays correct user data
- [ ] Welcome page shows email engagement metrics
- [ ] Non-qualified leads do not see QualificationGate

---

## Personalized Welcome Pages **NEW**

### Overview

Qualified leads receive personalized welcome pages that display their engagement data, downloaded documents, and email analytics.

### URL Structure

**Format:** `/welcome/[token]`

**Example:** `/welcome/abc123def456`

**Token:** Unique, secure token generated for each qualified lead

### Page Sections

#### 1. Hero Section

- **Personalized Greeting:** "Welcome back, [First Name]!"
- **Company Name:** "[Company Name]"
- **Qualification Badge:** Visual indicator of qualification reason

#### 2. Your Downloads Section

**Displays:**
- List of all documents downloaded by this email
- Document titles
- Download timestamps
- Download count

#### 3. Email Engagement Section **NEW**

**Displays:**
- Email health badges showing engagement status
- Metrics:
  - Emails delivered
  - Emails opened
  - Links clicked
  - Last engagement timestamp
- Visual engagement timeline (future enhancement)

#### 4. Next Steps Section

**Call-to-Action:**
- **Primary CTA:** "Book a Demo" (links to Calendly)
- **Secondary CTA:** "Download More Resources" (links to /resources)

#### 5. Contact Information

- Sales team email
- Phone number
- Office hours

### Testing Personalized Welcome Pages

#### Test Case 1: Valid Token

**Setup:**
1. Qualify a lead and get welcome token
2. Navigate to `/welcome/[token]`

**Expected Behavior:**
- Page loads successfully
- Personalized greeting displays correct name
- Company name displays correctly
- Downloads section shows all downloaded documents
- Email engagement section shows correct metrics
- Email health badges display correctly
- CTAs are clickable and functional

#### Test Case 2: Invalid Token

**Setup:**
1. Navigate to `/welcome/invalid-token-123`

**Expected Behavior:**
- Show error message: "Invalid or expired welcome link"
- Provide link to homepage
- Do NOT display any user data

#### Test Case 3: Expired Token

**Setup:**
1. Use token older than 90 days (if expiration implemented)

**Expected Behavior:**
- Show error message: "This welcome link has expired"
- Provide contact information to request new link

#### Test Case 4: Email Engagement Display

**Setup:**
1. Qualify lead with multiple email events (delivered, opened, clicked)
2. Navigate to welcome page

**Expected Behavior:**
- Email engagement section displays all badges
- Metrics show correct counts
- Last engagement timestamp is accurate
- Badges match those in email analytics dashboard

### Testing Checklist: Personalized Welcome Pages

- [ ] Valid token loads page successfully
- [ ] Invalid token shows error message
- [ ] Personalized greeting displays correct name
- [ ] Company name displays correctly
- [ ] Downloads section shows all documents
- [ ] Download timestamps are formatted correctly
- [ ] Email engagement section displays
- [ ] Email health badges render correctly
- [ ] Email metrics are accurate
- [ ] "Book a Demo" CTA links to Calendly
- [ ] "Download More Resources" CTA links to /resources
- [ ] Contact information is correct
- [ ] Page is responsive on mobile
- [ ] Page loads quickly (< 2 seconds)

---

## SendGrid Webhook Integration **NEW**

### Overview

SendGrid webhooks enable real-time tracking of email events (delivered, opened, clicked, bounced, spam, unsubscribed). This data powers the email analytics dashboard, suppression system, and engagement tracking.

### Webhook Endpoint

**URL:** `https://yourdomain.manus.space/api/webhooks/sendgrid`

**Method:** POST

**Authentication:** Signature verification (optional but recommended)

### Event Types Tracked

| Event Type | Description | Triggers |
|------------|-------------|----------|
| **delivered** | Email successfully delivered | Updates emailStatus.delivered |
| **open** | Recipient opened email | Updates emailStatus.opened |
| **click** | Recipient clicked link | Updates emailStatus.clicked |
| **bounce** | Email bounced | Updates emailStatus.bounce, triggers suppression |
| **dropped** | SendGrid dropped email | Triggers suppression |
| **spam_report** | Marked as spam | Updates emailStatus.spam, triggers suppression |
| **unsubscribe** | Recipient unsubscribed | Updates emailStatus.unsubscribed, triggers suppression |

### Webhook Processing Flow

1. **SendGrid sends POST request** to webhook endpoint
2. **Webhook handler validates signature** (if verification key provided)
3. **For each event in batch:**
   - Extract email address and event type
   - **Record event** in `emailEvents` table
   - **Update aggregated stats** in `emailStatus` table
   - **Check if event triggers suppression** (bounce, spam, unsubscribe, dropped)
   - **If suppression triggered:**
     - Set `isSuppressed = 1`
     - Set `suppressionReason = [event type]`
     - Set `suppressedAt = NOW()`
     - Log suppression action
4. **Return 200 OK** to SendGrid

### Production Configuration

**Step-by-Step Setup:**

1. **Log in to SendGrid Dashboard**
2. **Navigate to:** Settings → Mail Settings → Event Webhook
3. **Click:** Create New Webhook
4. **Enter Webhook URL:** `https://yourdomain.manus.space/api/webhooks/sendgrid`
5. **Enable Event Types:**
   - ✅ Delivered
   - ✅ Opened
   - ✅ Clicked
   - ✅ Bounced
   - ✅ Dropped
   - ✅ Spam Report
   - ✅ Unsubscribe
   - ❌ Deferred (not needed)
   - ❌ Processed (not needed)
6. **Generate Verification Key** (recommended for production)
7. **Add Verification Key to Environment Variables:**
   - Variable: `SENDGRID_WEBHOOK_VERIFICATION_KEY`
   - Value: Public key from SendGrid
8. **Click:** Save
9. **Send Test Notification** to verify webhook is reachable

**Detailed Setup Guide:** See `SENDGRID_PRODUCTION_SETUP.md` in project root

### Testing SendGrid Webhook

#### Test Case 1: Delivered Event

**Setup:**
1. Use test script: `node test-webhook.mjs delivered test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.delivered` incremented
- `emailStatus.lastEvent = "delivered"`
- `emailStatus.lastEventAt` updated

#### Test Case 2: Opened Event

**Setup:**
1. Use test script: `node test-webhook.mjs open test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.opened` incremented
- `emailStatus.lastEvent = "open"`
- Email analytics dashboard shows opened badge

#### Test Case 3: Clicked Event

**Setup:**
1. Use test script: `node test-webhook.mjs click test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.clicked` incremented
- `emailStatus.lastEvent = "click"`
- Email analytics dashboard shows clicked badge

#### Test Case 4: Bounce Event (Triggers Suppression)

**Setup:**
1. Use test script: `node test-webhook.mjs bounce test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.bounce` incremented
- **`emailStatus.isSuppressed = 1`**
- **`emailStatus.suppressionReason = "bounce"`**
- **`emailStatus.suppressedAt` set to current timestamp**
- Email analytics dashboard shows bounced badge
- Future download attempts blocked

#### Test Case 5: Spam Report (Triggers Suppression)

**Setup:**
1. Use test script: `node test-webhook.mjs spam_report test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.spam` incremented
- **Email automatically suppressed**
- Email analytics dashboard shows spam badge

#### Test Case 6: Unsubscribe (Triggers Suppression)

**Setup:**
1. Use test script: `node test-webhook.mjs unsubscribe test@example.com`

**Expected Behavior:**
- Event recorded in `emailEvents` table
- `emailStatus.unsubscribed` incremented
- **Email automatically suppressed**
- Email analytics dashboard shows unsubscribed badge

#### Test Case 7: Signature Verification

**Setup:**
1. Set `SENDGRID_WEBHOOK_VERIFICATION_KEY` environment variable
2. Send webhook request with invalid signature

**Expected Behavior:**
- Webhook returns 401 Unauthorized
- Event is NOT processed
- Error logged: "Webhook signature verification failed"

#### Test Case 8: Batch Events

**Setup:**
1. Send webhook request with multiple events in single payload

**Expected Behavior:**
- All events processed successfully
- Each event recorded individually
- Aggregated stats updated correctly
- Webhook returns 200 OK

### Testing Checklist: SendGrid Webhook

- [ ] Webhook endpoint is publicly accessible
- [ ] Delivered events are recorded correctly
- [ ] Opened events are recorded correctly
- [ ] Clicked events are recorded correctly
- [ ] Bounced events are recorded and trigger suppression
- [ ] Spam report events are recorded and trigger suppression
- [ ] Unsubscribe events are recorded and trigger suppression
- [ ] Dropped events trigger suppression
- [ ] Signature verification works (if enabled)
- [ ] Invalid signature returns 401
- [ ] Batch events are processed correctly
- [ ] Webhook logs are readable and useful
- [ ] Email analytics dashboard reflects webhook data
- [ ] Suppression system responds to webhook events
- [ ] Webhook performance is acceptable (< 500ms per event)

---

## Modal Behaviors

### 1. EmailCaptureModal

**Trigger:** Click on service one-pager card or featured document

**Contents:**
- Modal title: "Download [Document Name]"
- 3 form fields: Full Name, Email Address, Company Name
- Submit button: "Download"
- Close button (X in top right)

**Behaviors:**

| Action | Expected Result |
|--------|-----------------|
| Click outside modal | Close modal (no download) |
| Press ESC key | Close modal (no download) |
| Click X button | Close modal (no download) |
| Submit with empty fields | Show validation errors, do NOT close |
| Submit with invalid email | Show validation error, do NOT close |
| Submit with valid data (suppressed email) | Show error toast, do NOT close **NEW** |
| Submit with valid data (limit reached) | Close EmailCaptureModal, open DownloadLimitReachedModal |
| Submit with valid data (limit NOT reached) | Show success state, trigger download, auto-close after 2 seconds |

### 2. DownloadLimitReachedModal

**Trigger:** User attempts 4th download (limit is 3)

**Contents:**
- Title: "Download Limit Reached"
- Message: "You've downloaded the maximum of 3 documents. For additional access, please contact our sales team."
- Contact information: sales@intelleges.com
- Close button

**Behaviors:**

| Action | Expected Result |
|--------|-----------------|
| Click outside modal | Close modal |
| Press ESC key | Close modal |
| Click Close button | Close modal |

### 3. QualificationGate Modal **NEW**

**Trigger:** Qualified lead completes document download

**Contents:**
- Title: "Tell Us More About Your Needs"
- Subtitle: Personalized based on qualification reason
- 3 additional fields:
  - Job Title (text input)
  - Company Size (dropdown)
  - Primary Compliance Need (dropdown)
- Submit button: "Continue"
- Skip button: "Maybe Later"

**Behaviors:**

| Action | Expected Result |
|--------|-----------------|
| Click outside modal | Do NOT close (force user to make choice) |
| Press ESC key | Close modal (same as "Maybe Later") |
| Click "Maybe Later" | Close modal, no qualification recorded |
| Submit with empty fields | Show validation errors, do NOT close |
| Submit with valid data | Record qualification, close modal, show success toast |

---

## Edge Cases & Error Handling

### Download System Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| User at exactly 3 downloads | Block 4th download, show limit modal |
| User tries same document twice | Each download counts toward limit |
| User uses different email | New download count (limit is per email) |
| User uses email variation (test@example.com vs Test@Example.com) | Treated as same email (case-insensitive) |
| Network error during download | Show error toast, do NOT increment download count |
| S3 URL expired | Show error toast, regenerate URL, retry download |

### Email Suppression Edge Cases **NEW**

| Scenario | Expected Behavior |
|----------|-------------------|
| Email suppressed mid-download | Download completes, but follow-up email NOT sent |
| Email suppressed then unsuppressed | Can download again, receives follow-up emails |
| Multiple suppression events (bounce + spam) | Last event wins, suppressionReason updated |
| Suppression check fails (API error) | Allow download to proceed (fail open), log error |
| Case-insensitive email matching | Test@Example.com and test@example.com treated as same |

### Email Analytics Edge Cases **NEW**

| Scenario | Expected Behavior |
|----------|-------------------|
| Email with no events | Shows in table with all zeros |
| Email with only delivered event | Shows delivered badge only |
| Email with 10+ events | Badge group shows first 4 + "+N more" |
| Webhook event for unknown email | Create new emailStatus record |
| Duplicate webhook events | Deduplicate based on event ID, do NOT double-count |

### Form Validation Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty name field | Show error: "Name is required" |
| Invalid email format | Show error: "Please enter a valid email address" |
| Email with spaces | Trim spaces, validate trimmed email |
| Very long name (> 255 chars) | Truncate to 255 chars, accept submission |
| Special characters in name | Accept all Unicode characters |
| Company name with numbers | Accept (e.g., "3M Company") |

---

## Testing Checklists

### Pre-Release Checklist

- [ ] All navigation links work correctly
- [ ] All CTAs trigger expected actions
- [ ] EmailCaptureModal workflow functions end-to-end
- [ ] Download limit enforcement works correctly
- [ ] Follow-up emails are scheduled correctly
- [ ] Email suppression system blocks suppressed addresses **NEW**
- [ ] Email analytics dashboard displays accurate data **NEW**
- [ ] Email health badges render correctly **NEW**
- [ ] Lead qualification system identifies qualified leads **NEW**
- [ ] Personalized welcome pages display correct data **NEW**
- [ ] SendGrid webhook processes events correctly **NEW**
- [ ] Case studies redirect to Calendly
- [ ] Contact form submits successfully
- [ ] All modals open and close correctly
- [ ] Form validation works on all forms
- [ ] Mobile responsive design works on all pages
- [ ] Page load times are acceptable (< 3 seconds)
- [ ] No console errors on any page
- [ ] All images load correctly
- [ ] Footer links work correctly

### Regression Testing Checklist

After any code changes, verify:

- [ ] Download system still enforces 3-document limit
- [ ] EmailCaptureModal still validates all fields
- [ ] Follow-up emails still schedule correctly
- [ ] Email suppression still blocks suppressed addresses **NEW**
- [ ] Email analytics dashboard still loads **NEW**
- [ ] SendGrid webhook still processes events **NEW**
- [ ] Navigation still works on all pages
- [ ] No new console errors introduced

### Performance Testing Checklist

- [ ] Homepage loads in < 2 seconds
- [ ] One-pagers page loads in < 2 seconds
- [ ] Resources page loads in < 2 seconds
- [ ] Case studies page loads in < 3 seconds (17 cards)
- [ ] Email analytics dashboard loads in < 3 seconds **NEW**
- [ ] EmailCaptureModal opens instantly (< 100ms)
- [ ] Download starts within 1 second of submission
- [ ] Webhook processes events in < 500ms **NEW**
- [ ] Database queries complete in < 100ms
- [ ] API responses return in < 500ms

### Security Testing Checklist

- [ ] Email addresses are validated server-side
- [ ] Download limits cannot be bypassed via API manipulation
- [ ] Webhook signature verification works (if enabled) **NEW**
- [ ] Personalized welcome page tokens cannot be guessed **NEW**
- [ ] Admin dashboard requires authentication **NEW**
- [ ] SQL injection attempts are blocked
- [ ] XSS attempts are sanitized
- [ ] CSRF protection is enabled
- [ ] Environment variables are not exposed to client

---

## Automated Test Verification **NEW**

### Overview

The project includes automated test suites to verify core functionality. QA should run these tests before manual testing to catch regressions early.

### Test Suites

#### 1. Email Suppression System Tests

**File:** `server/test-email-suppression.test.ts`

**Coverage:**
- Manual suppression/unsuppression
- Automatic suppression via webhook simulation
- Suppression status checking
- Email capture blocking
- Follow-up email prevention
- Case-insensitive email handling
- Edge cases and multiple suppressions

**Run Command:**
```bash
pnpm vitest run server/test-email-suppression.test.ts
```

**Expected Output:**
```
✓ Email Suppression System (9 tests)
✓ Email Suppression Edge Cases (3 tests)
Test Files  1 passed (1)
Tests  12 passed (12)
```

#### 2. Download System Tests (Future)

**File:** `server/test-download-system.test.ts` (to be created)

**Coverage:**
- Download limit enforcement
- Email capture validation
- Follow-up email scheduling
- Download count tracking

#### 3. Lead Qualification Tests (Future)

**File:** `server/test-lead-qualification.test.ts` (to be created)

**Coverage:**
- Government email detection
- Fortune 500 company detection
- High download volume detection
- Qualification gate workflow

### Running All Tests

**Command:**
```bash
pnpm test
```

**Expected Behavior:**
- All tests pass
- No console errors
- Test coverage > 80%

### Test Failure Protocol

If any automated tests fail:

1. **Do NOT proceed with manual testing**
2. **Report failure to development team**
3. **Include:**
   - Test name
   - Error message
   - Stack trace
   - Steps to reproduce
4. **Wait for fix before continuing QA**

---

## Appendix

### Test Data

**Test Emails:**

- `test@example.com` - Standard test email
- `bounce@simulator.amazonses.com` - Simulates bounce
- `spam@example.com` - For spam testing
- `unsubscribe@example.com` - For unsubscribe testing
- `john.doe@navy.mil` - Government email (triggers qualification)
- `jane.smith@lockheedmartin.com` - Fortune 500 (triggers qualification)

**Test Companies:**

- "Lockheed Martin" - Fortune 500
- "Northrop Grumman" - Fortune 500
- "Small Business Inc" - Non-qualified
- "Test Company" - Generic test

### API Endpoints Reference

| Endpoint | Type | Purpose |
|----------|------|---------|
| `documentDownloads.checkLimit` | Query | Check download limit |
| `documentDownloads.recordDownload` | Mutation | Record download and schedule email |
| `emailSuppression.checkEmailSuppression` | Query | Check if email is suppressed **NEW** |
| `emailSuppression.suppressEmail` | Mutation | Manually suppress email **NEW** |
| `emailSuppression.unsuppressEmail` | Mutation | Remove suppression **NEW** |
| `emailSuppression.getSuppressionStats` | Query | Get suppression statistics **NEW** |
| `emailAnalytics.overview` | Query | Get email analytics overview **NEW** |
| `emailAnalytics.listStatus` | Query | Get email status list **NEW** |
| `emailAnalytics.getEmailTimeline` | Query | Get event timeline for email **NEW** |
| `qualification.checkQualification` | Query | Check if lead is qualified **NEW** |
| `qualification.submitQualification` | Mutation | Submit qualification data **NEW** |
| `contact.submitForm` | Mutation | Submit contact form |

### Database Tables Reference

| Table | Purpose |
|-------|---------|
| `documentDownloads` | Track document downloads per email |
| `scheduledEmails` | Queue for follow-up emails |
| `emailStatus` | Aggregated email engagement metrics **NEW** |
| `emailEvents` | Individual email events from SendGrid **NEW** |
| `leadQualificationAttempts` | Qualified lead data **NEW** |

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `SENDGRID_API_KEY` | SendGrid API authentication | Yes |
| `SENDGRID_FROM_EMAIL` | Sender email address | Yes |
| `SENDGRID_FROM_NAME` | Sender name | Yes |
| `SENDGRID_WEBHOOK_VERIFICATION_KEY` | Webhook signature verification | Recommended **NEW** |
| `DATABASE_URL` | MySQL connection string | Yes |
| `JWT_SECRET` | JWT token signing | Yes |

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 30, 2025 | Initial release |
| 2.0 | Nov 30, 2025 | Added email suppression system, email analytics dashboard, email health badges, lead qualification system, personalized welcome pages, SendGrid webhook integration, and automated test verification |

---

**End of QA Testing Guide**

For questions or clarifications, contact: sales@intelleges.com
