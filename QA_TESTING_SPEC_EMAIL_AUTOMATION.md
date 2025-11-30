# QA Testing Specification: Email Automation & Download Limits

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Feature:** Automated Email Follow-up System with Download Limits

---

## Executive Summary

This document specifies the testing requirements for the automated email follow-up system that sends personalized Calendly meeting invitations 2 hours after users download documents from intelleges.com. The system enforces a strict 3-document download limit per email address to drive qualified lead engagement.

---

## Feature Overview

### Core Functionality

1. **Email-Gated Downloads**: All documents (capability one-pagers, protocol case studies, whitepapers) require email capture before download
2. **3-Document Download Limit**: Each email address can download maximum 3 documents site-wide (lifetime limit)
3. **2-Hour Delayed Email**: Automated follow-up email sent exactly 2 hours after each download
4. **Calendly Integration**: Follow-up emails include document-specific Calendly meeting links
5. **Download Limit Enforcement**: After 3 downloads, users see "Download Limit Reached" modal with Calendly link

### Business Rules

- **Download Limit**: 3 documents per email address (permanent, non-resettable)
- **Email Delay**: Exactly 2 hours from download timestamp
- **Email Content**: Personalized with document name and custom Calendly link
- **Limit Reached Behavior**: Show modal with meeting booking CTA instead of email capture form

---

## Test Scenarios

### 1. Email Capture & First Download (Happy Path)

**Preconditions:**
- User has never downloaded any documents from the site
- User email is not in database

**Test Steps:**
1. Navigate to homepage
2. Click on any capability card tooltip download button
3. Verify EmailCaptureModal appears
4. Fill in form:
   - Name: "John Doe"
   - Email: "john.doe@example.com"
   - Company: "Acme Corp"
   - Role: "Compliance Manager"
5. Click "Download" button

**Expected Results:**
- ✅ Modal closes immediately
- ✅ Document downloads to browser
- ✅ Database entry created in `documentDownloads` table with:
  - email: "john.doe@example.com"
  - documentTitle: [correct document name]
  - documentType: "capability"
  - downloadedAt: [current timestamp]
  - followUpEmailSent: 0
- ✅ Database entry created in `scheduledEmails` table with:
  - recipientEmail: "john.doe@example.com"
  - emailType: "document_followup"
  - scheduledFor: [current timestamp + 2 hours]
  - sent: 0
  - metadata: JSON with document info

**Acceptance Criteria:**
- Download count for email = 1
- Scheduled email exists for 2 hours from now
- User can continue browsing site

---

### 2. Second Download (Same Email)

**Preconditions:**
- User "john.doe@example.com" has downloaded 1 document
- User returns to site (same or different session)

**Test Steps:**
1. Navigate to Protocols page
2. Click on any protocol case study card
3. Verify EmailCaptureModal appears
4. Fill in same email: "john.doe@example.com"
5. Click "Download" button

**Expected Results:**
- ✅ Modal closes
- ✅ Document downloads
- ✅ New entry in `documentDownloads` table
- ✅ New entry in `scheduledEmails` table for 2 hours later
- ✅ Download count for email = 2

**Acceptance Criteria:**
- System allows second download
- Second follow-up email scheduled independently
- Both emails will be sent at their respective 2-hour marks

---

### 3. Third Download (Limit Reached)

**Preconditions:**
- User "john.doe@example.com" has downloaded 2 documents

**Test Steps:**
1. Navigate to homepage
2. Scroll to "Download Whitepaper" section
3. Click "Download Whitepaper" button
4. Choose "Executive Summary" option
5. Verify EmailCaptureModal appears
6. Fill in same email: "john.doe@example.com"
7. Click "Download" button

**Expected Results:**
- ✅ Modal closes
- ✅ Document downloads
- ✅ Third entry in `documentDownloads` table
- ✅ Third entry in `scheduledEmails` table
- ✅ Download count for email = 3 (LIMIT REACHED)

**Acceptance Criteria:**
- Third download succeeds
- Third follow-up email scheduled
- User has now reached lifetime limit

---

### 4. Fourth Download Attempt (Limit Enforcement)

**Preconditions:**
- User "john.doe@example.com" has downloaded 3 documents (limit reached)

**Test Steps:**
1. Navigate to any page with downloadable documents
2. Click on any download button/tooltip
3. Observe modal behavior

**Expected Results:**
- ✅ **Different modal appears**: "Download Limit Reached" modal (NOT EmailCaptureModal)
- ✅ Modal displays message:
  > "You've reached your download limit of 3 documents. To access more resources and discuss your compliance needs with our subject matter experts, please schedule a meeting with our team."
- ✅ Modal includes prominent Calendly button/link
- ✅ NO download occurs
- ✅ NO new database entries created

**Acceptance Criteria:**
- User cannot download 4th document
- Clear messaging explains limit and next steps
- Calendly CTA is prominent and functional

---

### 5. Email Delivery (2-Hour Delay)

**Preconditions:**
- User downloaded document at timestamp T
- Scheduled email exists for T+2hours
- Current time >= T+2hours

**Test Steps:**
1. Wait for background email processor to run (runs every 5 minutes)
2. Check user's email inbox

**Expected Email Content:**
```
Subject: Thank you for downloading [Document Name]

Hi [User Name],

Thank you for downloading "[Document Name]" from Intelleges.

This topic is of great interest to our leadership team. Our subject matter experts have helped dozens of enterprises streamline their compliance processes and reduce supplier management overhead.

Would you like to discuss how Intelleges can help your organization? 

[Schedule a Meeting Button - Links to Calendly]

Best regards,
The Intelleges Team
```

**Expected Results:**
- ✅ Email received within 5 minutes of T+2hours
- ✅ Email subject includes correct document name
- ✅ Email body includes correct document name
- ✅ Email body includes user's name
- ✅ Calendly link is functional and includes document context
- ✅ Database `scheduledEmails` entry updated:
  - sent: 1
  - sentAt: [delivery timestamp]
- ✅ Database `documentDownloads` entry updated:
  - followUpEmailSent: 1
  - followUpEmailSentAt: [delivery timestamp]

**Acceptance Criteria:**
- Email arrives exactly 2 hours (+/- 5 minutes) after download
- All personalization tokens replaced correctly
- Calendly link works and pre-fills meeting context

---

### 6. Multiple Downloads, Multiple Emails

**Preconditions:**
- User downloads 3 documents at different times:
  - Document A at 10:00 AM
  - Document B at 11:30 AM
  - Document C at 2:00 PM

**Expected Email Schedule:**
- Email for Document A: 12:00 PM
- Email for Document B: 1:30 PM
- Email for Document C: 4:00 PM

**Test Steps:**
1. Perform 3 downloads at staggered times
2. Monitor email inbox

**Expected Results:**
- ✅ Three separate emails received
- ✅ Each email references correct document
- ✅ Each email sent at correct 2-hour delay
- ✅ Emails do NOT consolidate or batch

**Acceptance Criteria:**
- Each download triggers independent email
- Timing is precise for each email
- No email consolidation occurs

---

### 7. Edge Case: Rapid Multiple Downloads

**Preconditions:**
- User downloads 3 documents within 5 minutes

**Test Steps:**
1. Download Document A at 10:00:00 AM
2. Download Document B at 10:02:00 AM
3. Download Document C at 10:04:00 AM

**Expected Results:**
- ✅ All 3 downloads succeed
- ✅ 3 scheduled emails created with staggered times:
  - Email A: 12:00 PM
  - Email B: 12:02 PM
  - Email C: 12:04 PM
- ✅ Fourth download attempt immediately blocked

**Acceptance Criteria:**
- System handles rapid downloads correctly
- Limit enforcement is immediate
- Email timing respects individual download timestamps

---

### 8. Edge Case: Same Email, Different Name/Company

**Preconditions:**
- User "john.doe@example.com" downloaded 1 document as "John Doe / Acme Corp"

**Test Steps:**
1. Attempt second download
2. Use same email but different name: "Jane Smith"
3. Use same email but different company: "Beta Inc"

**Expected Results:**
- ✅ Download succeeds (count = 2)
- ✅ System uses MOST RECENT name/company for follow-up email
- ✅ Download count tied to EMAIL only, not name/company

**Acceptance Criteria:**
- Email address is the unique identifier
- Name/company can vary without affecting limit
- Follow-up emails use latest provided information

---

### 9. Edge Case: Email Delivery Failure

**Preconditions:**
- Scheduled email ready to send
- Email service returns error (invalid email, bounce, etc.)

**Test Steps:**
1. Use invalid email format or known bounce address
2. Wait for scheduled send time

**Expected Results:**
- ✅ Database `scheduledEmails` entry updated:
  - failed: 1
  - failureReason: [error message]
  - retryCount: incremented
- ✅ System attempts retry (up to 3 times)
- ✅ After 3 failures, email marked as permanently failed

**Acceptance Criteria:**
- Failures are logged
- Retry logic prevents infinite loops
- Failed emails don't block other emails

---

### 10. Calendly Link Customization

**Preconditions:**
- User downloaded "Supplier Documentation & Collection Summary" one-pager

**Test Steps:**
1. Receive follow-up email
2. Click Calendly link
3. Observe Calendly booking page

**Expected Results:**
- ✅ Calendly URL includes query parameters:
  - `?document=supplier-documentation-collection`
  - `?email=john.doe@example.com`
  - `?name=John+Doe`
- ✅ Calendly form pre-fills user information
- ✅ Meeting notes/context reference downloaded document

**Acceptance Criteria:**
- Calendly integration passes document context
- Sales team can see which document triggered meeting
- User experience is seamless

---

## Database Validation

### documentDownloads Table

**Required Fields:**
- `id`: Auto-increment primary key
- `email`: User email (indexed for quick lookup)
- `name`: User name
- `company`: User company
- `role`: User role
- `documentTitle`: Full document title
- `documentUrl`: Document file path
- `documentType`: 'capability' | 'protocol' | 'whitepaper'
- `downloadedAt`: Timestamp of download
- `followUpEmailSent`: 0 or 1
- `followUpEmailSentAt`: Timestamp when email sent

**Validation Queries:**
```sql
-- Count downloads per email
SELECT email, COUNT(*) as download_count 
FROM documentDownloads 
GROUP BY email;

-- Find users at limit
SELECT email, COUNT(*) as download_count 
FROM documentDownloads 
GROUP BY email 
HAVING COUNT(*) >= 3;

-- Verify follow-up emails sent
SELECT * FROM documentDownloads 
WHERE followUpEmailSent = 1 
AND followUpEmailSentAt IS NOT NULL;
```

### scheduledEmails Table

**Required Fields:**
- `id`: Auto-increment primary key
- `recipientEmail`: Target email
- `recipientName`: Target name
- `emailType`: 'document_followup'
- `subject`: Email subject line
- `htmlContent`: Full HTML email body
- `scheduledFor`: Timestamp for delivery (downloadedAt + 2 hours)
- `sent`: 0 or 1
- `sentAt`: Actual delivery timestamp
- `failed`: 0 or 1
- `failureReason`: Error message if failed
- `retryCount`: Number of retry attempts
- `metadata`: JSON with document info
- `createdAt`: When scheduled

**Validation Queries:**
```sql
-- Find pending emails
SELECT * FROM scheduledEmails 
WHERE sent = 0 
AND failed = 0 
AND scheduledFor <= NOW();

-- Find failed emails
SELECT * FROM scheduledEmails 
WHERE failed = 1;

-- Verify email timing
SELECT 
  recipientEmail,
  scheduledFor,
  sentAt,
  TIMESTAMPDIFF(MINUTE, scheduledFor, sentAt) as delay_minutes
FROM scheduledEmails 
WHERE sent = 1;
```

---

## UI/UX Validation

### EmailCaptureModal

**Visual Checks:**
- ✅ Modal centered on screen
- ✅ Width: 500-700px (not narrow strip)
- ✅ Background overlay dims page
- ✅ ESC key closes modal
- ✅ Click outside closes modal
- ✅ Form fields clearly labeled
- ✅ "Download" button prominent
- ✅ Loading state during submission

### Download Limit Reached Modal

**Visual Checks:**
- ✅ Different styling from EmailCaptureModal
- ✅ Clear "limit reached" messaging
- ✅ Calendly CTA button prominent
- ✅ Professional, not punitive tone
- ✅ Explains value of meeting (not just "you're blocked")

---

## Performance Requirements

- **Email Delivery**: Within 5 minutes of scheduled time
- **Download Limit Check**: < 200ms response time
- **Modal Load Time**: < 100ms
- **Database Query Performance**: < 50ms for download count lookup

---

## Security Requirements

- **Email Validation**: Proper email format validation
- **SQL Injection Prevention**: Parameterized queries only
- **Rate Limiting**: Prevent abuse of email capture form
- **PII Protection**: Email addresses encrypted at rest (if required by compliance)

---

## Regression Testing

After implementing this feature, verify:
- ✅ Existing contact form still works
- ✅ Pricing page Calendly links still work
- ✅ Navigation and routing unchanged
- ✅ No performance degradation on homepage
- ✅ Mobile responsiveness maintained

---

## Test Data

### Valid Test Emails
```
test1@intelleges-qa.com (0 downloads)
test2@intelleges-qa.com (1 download)
test3@intelleges-qa.com (2 downloads)
test4@intelleges-qa.com (3 downloads - at limit)
```

### Invalid Test Emails
```
invalid-email (malformed)
bounce@simulator.amazonses.com (bounces)
complaint@simulator.amazonses.com (complaint)
```

### Test Documents
- Capability: "Supplier Documentation & Collection Summary"
- Protocol: "DFARS Compliance Protocol"
- Whitepaper: "Executive Summary: The Hidden Cost of Supplier Compliance"

---

## Acceptance Criteria Summary

**Feature is considered COMPLETE when:**

1. ✅ All document downloads require email capture
2. ✅ Download limit of 3 enforced per email address
3. ✅ Follow-up emails sent exactly 2 hours after each download
4. ✅ Emails include correct document name and personalization
5. ✅ Calendly links functional and include document context
6. ✅ "Download Limit Reached" modal appears after 3 downloads
7. ✅ Database correctly tracks downloads and scheduled emails
8. ✅ Email delivery failures handled gracefully with retries
9. ✅ No regression issues in existing functionality
10. ✅ Performance meets specified requirements

---

## Known Limitations

- **Email Timing**: Emails sent in 5-minute batches (not exact to the second)
- **Limit Reset**: No self-service way to reset download limit (requires manual database intervention)
- **Email Deliverability**: Dependent on SendGrid service availability
- **Timezone**: All timestamps in UTC; emails may arrive at different local times

---

## Support & Troubleshooting

### Common Issues

**Issue**: User claims they didn't receive follow-up email  
**Debug Steps**:
1. Check `scheduledEmails` table for their email
2. Verify `sent = 1` and `sentAt` timestamp
3. Check `failed = 1` and `failureReason`
4. Check user's spam folder
5. Verify SendGrid delivery logs

**Issue**: User wants download limit reset  
**Resolution**:
- Manual database deletion of `documentDownloads` entries
- Requires admin access
- Should be rare exception (defeats purpose of limit)

**Issue**: Email sent too early/late  
**Debug Steps**:
1. Check `scheduledFor` vs `sentAt` timestamps
2. Verify background job processor running every 5 minutes
3. Check server timezone configuration

---

## QA Sign-off

**Tested By**: _________________  
**Date**: _________________  
**Test Environment**: _________________  
**Result**: ☐ PASS  ☐ FAIL  ☐ CONDITIONAL PASS  

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________
