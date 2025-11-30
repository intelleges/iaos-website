# Implementation Guide: Email Automation System

**Status:** Backend Complete, Frontend Integration Needed  
**Last Updated:** November 30, 2025

---

## What's Already Implemented

### ✅ Database Schema
- `documentDownloads` table for tracking all downloads
- `scheduledEmails` table for 2-hour delayed email queue
- Migration applied successfully

### ✅ Backend API (`server/routers.ts`)
- `documentDownloads.checkLimit` - Check if email has reached 3-download limit
- `documentDownloads.recordDownload` - Record download and schedule follow-up email
- Email template with Calendly integration
- Proper error handling for limit enforcement

### ✅ UI Components
- `DownloadLimitReachedModal.tsx` - Modal shown when user hits 3-download limit
- `SimpleModal.tsx` - Custom modal wrapper (already working)

### ✅ Documentation
- `QA_TESTING_SPEC_EMAIL_AUTOMATION.md` - Complete QA testing specification

---

## What Needs to Be Completed

### 1. Update EmailCaptureModal Component

**File:** `client/src/components/EmailCaptureModal.tsx`

**Changes Needed:**

```typescript
import { trpc } from "@/lib/trpc";

// Add to component state
const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState<string | null>(null);

// Replace the handleSubmit function with this:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);

  try {
    // Check download limit first
    const limitCheck = await trpc.documentDownloads.checkLimit.query({
      email: formData.email,
    });

    if (limitCheck.limitReached) {
      // Close email capture modal and show limit reached modal
      onClose();
      // Trigger limit reached modal (need to pass this up to parent)
      if (onLimitReached) {
        onLimitReached();
      }
      return;
    }

    // Record the download
    await trpc.documentDownloads.recordDownload.mutate({
      email: formData.email,
      name: formData.name,
      company: formData.company || undefined,
      role: formData.role || undefined,
      documentTitle: documentTitle,
      documentUrl: documentUrl,
      documentType: documentType, // 'capability' | 'protocol' | 'whitepaper'
    });

    // Trigger the actual file download
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = documentTitle;
    link.click();

    // Close modal
    onClose();

    // Show success toast
    toast.success(`Download started! Check your email in 2 hours for a follow-up message.`);

  } catch (err: any) {
    console.error('Download error:', err);
    setError(err.message || 'Failed to process download. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

**Props to Add:**
```typescript
interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentUrl: string;
  documentType: 'capability' | 'protocol' | 'whitepaper';
  onLimitReached?: () => void; // Callback when limit is reached
}
```

---

### 2. Update Home.tsx to Use New System

**File:** `client/src/pages/Home.tsx`

**Changes Needed:**

```typescript
import { DownloadLimitReachedModal } from "@/components/DownloadLimitReachedModal";
import { trpc } from "@/lib/trpc";

// Add state for limit reached modal
const [showLimitModal, setShowLimitModal] = useState(false);

// Update capability card handler
const handleCapabilityDownload = async (capabilityKey: string) => {
  const capability = downloadMappings[capabilityKey];
  if (!capability) return;

  // Check limit before showing email capture modal
  // (Optional: you can also check in EmailCaptureModal itself)
  
  setSelectedCapability({
    title: capability.title,
    url: `/capabilities/${capability.filename}`,
    type: 'capability',
  });
  setShowCapabilityEmailModal(true);
};

// Update protocol handler
const handleProtocolDownload = (caseStudy: { title: string; s3Key: string }) => {
  setSelectedProtocol({
    title: caseStudy.title,
    url: `/case-studies/${caseStudy.s3Key}`,
    type: 'protocol',
  });
  setShowProtocolEmailModal(true);
};

// Update whitepaper handler
const handleWhitepaperDownload = (title: string, url: string) => {
  setSelectedWhitepaper({
    title,
    url,
    type: 'whitepaper',
  });
  setShowWhitepaperEmailModal(true);
};

// Add limit reached handler
const handleLimitReached = () => {
  setShowLimitModal(true);
};

// Update EmailCaptureModal components to include new props
<EmailCaptureModal
  isOpen={showCapabilityEmailModal}
  onClose={() => setShowCapabilityEmailModal(false)}
  documentTitle={selectedCapability?.title || ''}
  documentUrl={selectedCapability?.url || ''}
  documentType="capability"
  onLimitReached={handleLimitReached}
/>

<EmailCaptureModal
  isOpen={showProtocolEmailModal}
  onClose={() => setShowProtocolEmailModal(false)}
  documentTitle={selectedProtocol?.title || ''}
  documentUrl={selectedProtocol?.url || ''}
  documentType="protocol"
  onLimitReached={handleLimitReached}
/>

<EmailCaptureModal
  isOpen={showWhitepaperEmailModal}
  onClose={() => setShowWhitepaperEmailModal(false)}
  documentTitle={selectedWhitepaper?.title || ''}
  documentUrl={selectedWhitepaper?.url || ''}
  documentType="whitepaper"
  onLimitReached={handleLimitReached}
/>

// Add limit reached modal at the end
<DownloadLimitReachedModal
  isOpen={showLimitModal}
  onClose={() => setShowLimitModal(false)}
/>
```

---

### 3. Create Background Email Processor

**File:** `server/emailProcessor.ts` (NEW FILE)

```typescript
import { getDb } from "./db";
import { scheduledEmails, documentDownloads } from "../drizzle/schema";
import { eq, and, lte } from "drizzle-orm";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@intelleges.com';
const MAX_RETRIES = 3;

export async function processScheduledEmails() {
  const db = await getDb();
  if (!db) {
    console.error('Database not available');
    return;
  }

  // Find emails that are due to be sent
  const now = new Date();
  const pendingEmails = await db
    .select()
    .from(scheduledEmails)
    .where(
      and(
        eq(scheduledEmails.sent, 0),
        eq(scheduledEmails.failed, 0),
        lte(scheduledEmails.scheduledFor, now)
      )
    )
    .limit(50); // Process 50 at a time

  console.log(`Found ${pendingEmails.length} emails to send`);

  for (const email of pendingEmails) {
    try {
      await sendEmail(email);
      
      // Mark as sent
      await db
        .update(scheduledEmails)
        .set({
          sent: 1,
          sentAt: new Date(),
        })
        .where(eq(scheduledEmails.id, email.id));

      // Update documentDownloads table
      const metadata = JSON.parse(email.metadata || '{}');
      if (metadata.downloadId) {
        await db
          .update(documentDownloads)
          .set({
            followUpEmailSent: 1,
            followUpEmailSentAt: new Date(),
          })
          .where(eq(documentDownloads.id, metadata.downloadId));
      }

      console.log(`✓ Sent email to ${email.recipientEmail}`);

    } catch (error: any) {
      console.error(`✗ Failed to send email to ${email.recipientEmail}:`, error.message);

      const newRetryCount = email.retryCount + 1;
      const shouldFail = newRetryCount >= MAX_RETRIES;

      await db
        .update(scheduledEmails)
        .set({
          retryCount: newRetryCount,
          failed: shouldFail ? 1 : 0,
          failureReason: error.message,
        })
        .where(eq(scheduledEmails.id, email.id));
    }
  }
}

async function sendEmail(email: typeof scheduledEmails.$inferSelect) {
  if (!SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: email.recipientEmail, name: email.recipientName || undefined }],
      }],
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: 'Intelleges Team',
      },
      subject: email.subject,
      content: [{
        type: 'text/html',
        value: email.htmlContent,
      }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`SendGrid API error: ${response.status} - ${errorText}`);
  }
}

// Run processor every 5 minutes
setInterval(processScheduledEmails, 5 * 60 * 1000);

// Run immediately on startup
processScheduledEmails();
```

**Update `server/index.ts` to import the processor:**

```typescript
import "./emailProcessor"; // Add this line near the top
```

---

### 4. Add Environment Variables

**File:** `.env` (or configure in Manus Secrets panel)

```bash
# Calendly Integration
CALENDLY_URL=https://calendly.com/intelleges/demo

# SendGrid Email Service
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@intelleges.com
SENDGRID_FROM_NAME=Intelleges Team
```

---

### 5. Install Required Dependencies

```bash
# If not already installed
pnpm add @tanstack/react-query
pnpm add sonner  # For toast notifications
```

---

## Testing Checklist

### Backend Testing

```bash
# Test download limit check
curl -X POST http://localhost:3000/api/trpc/documentDownloads.checkLimit \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test record download
curl -X POST http://localhost:3000/api/trpc/documentDownloads.recordDownload \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "name":"Test User",
    "company":"Test Corp",
    "documentTitle":"Test Document",
    "documentUrl":"/test.pdf",
    "documentType":"capability"
  }'
```

### Frontend Testing

1. **First Download**
   - Click any download button
   - Fill in email capture form
   - Verify download starts
   - Check database for documentDownloads entry
   - Check database for scheduledEmails entry

2. **Second Download**
   - Use same email
   - Verify download works
   - Check download count = 2

3. **Third Download**
   - Use same email
   - Verify download works
   - Check download count = 3

4. **Fourth Download Attempt**
   - Use same email
   - Verify DownloadLimitReachedModal appears
   - Verify NO download occurs
   - Verify Calendly link works

5. **Email Delivery**
   - Wait 2 hours (or manually update scheduledFor timestamp in DB)
   - Verify email processor sends email
   - Check email inbox
   - Verify Calendly link in email works

---

## Database Queries for Debugging

```sql
-- Check download count for an email
SELECT email, COUNT(*) as download_count 
FROM documentDownloads 
WHERE email = 'test@example.com';

-- View all scheduled emails
SELECT * FROM scheduledEmails 
WHERE sent = 0 
ORDER BY scheduledFor ASC;

-- View sent emails
SELECT * FROM scheduledEmails 
WHERE sent = 1 
ORDER BY sentAt DESC;

-- Find users at limit
SELECT email, COUNT(*) as downloads 
FROM documentDownloads 
GROUP BY email 
HAVING COUNT(*) >= 3;

-- Check email processor status
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN sent = 1 THEN 1 ELSE 0 END) as sent,
  SUM(CASE WHEN failed = 1 THEN 1 ELSE 0 END) as failed,
  SUM(CASE WHEN sent = 0 AND failed = 0 THEN 1 ELSE 0 END) as pending
FROM scheduledEmails;
```

---

## Troubleshooting

### Email Not Sending

1. Check SendGrid API key is configured
2. Check email processor is running (`ps aux | grep node`)
3. Check scheduledEmails table for failed entries
4. Check server logs for errors

### Download Limit Not Enforcing

1. Check documentDownloads table has entries
2. Verify email is being normalized to lowercase
3. Check trpc API is accessible from frontend
4. Check browser console for errors

### Modal Not Appearing

1. Check SimpleModal component is working
2. Verify state management in Home.tsx
3. Check browser console for React errors
4. Verify modal z-index is high enough

---

## Next Steps After Implementation

1. **Test with real email addresses** - Verify SendGrid delivery
2. **Set up Calendly custom questions** - Configure a1 and a2 parameters
3. **Monitor email deliverability** - Check SendGrid dashboard
4. **Add analytics tracking** - Track download→email→meeting conversion
5. **Create admin dashboard** - View download stats and email status

---

## Files Modified/Created

### Created:
- `QA_TESTING_SPEC_EMAIL_AUTOMATION.md`
- `IMPLEMENTATION_GUIDE_EMAIL_AUTOMATION.md` (this file)
- `client/src/components/DownloadLimitReachedModal.tsx`
- `server/emailProcessor.ts` (needs to be created)

### Modified:
- `drizzle/schema.ts` - Added documentDownloads and scheduledEmails tables
- `server/routers.ts` - Added documentDownloads router
- `client/src/components/EmailCaptureModal.tsx` (needs modification)
- `client/src/pages/Home.tsx` (needs modification)
- `server/index.ts` (needs modification)

---

## Estimated Time to Complete

- EmailCaptureModal updates: 1-2 hours
- Home.tsx integration: 1-2 hours
- Email processor setup: 2-3 hours
- Testing and debugging: 2-4 hours

**Total: 6-11 hours**

---

## Support

For questions or issues during implementation:
1. Review QA_TESTING_SPEC_EMAIL_AUTOMATION.md for expected behavior
2. Check database tables to verify data flow
3. Review server logs for API errors
4. Test each component in isolation before integration
