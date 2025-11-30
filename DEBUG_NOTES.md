# Debug Notes - Form Submission Failure Investigation

## Issue Summary
Form submission in EmailCaptureModal is failing silently. No database entries, no PDF downloads, no toast notifications.

## Code Review Findings

### EmailCaptureModal.tsx - handleSubmit Function

**Error Handling Present:**
```typescript
try {
  // ... submission logic
} catch (error: any) {
  console.error("Download error:", error);
  toast.error(error.message || "An error occurred. Please try again.");
  setIsSubmitting(false);
}
```

**Expected Console Output:**
- If error occurs: `console.error("Download error:", error)`
- Should show toast with error message

**Actual Behavior:**
- No console errors visible
- No toast messages appearing
- Modal remains open (should close after 2 seconds on success)

## Possible Root Causes

### 1. TRPC Client Not Initialized
The `trpc` object may not be properly initialized in the component context.

**Check:**
```typescript
import { trpc } from "@/lib/trpc";
```

### 2. API Endpoint Not Responding
The `documentDownloads.recordDownload` mutation may be:
- Not defined in server router
- Throwing validation error
- Timing out
- Blocked by middleware

### 3. Async/Await Issue
The form submission may be:
- Not awaiting properly
- Being interrupted by React state updates
- Prevented by form default behavior

### 4. TRPC Mutation Configuration Issue
The mutation may need:
- `onSuccess` callback
- `onError` callback  
- Proper error handling configuration

## Required Debug Steps

### Step 1: Add Console Logging
Add these logs to EmailCaptureModal.tsx handleSubmit:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("=== FORM SUBMISSION STARTED ===");
  console.log("Form data:", formData);
  console.log("Document type:", documentType);
  console.log("Resource title:", resourceTitle);
  console.log("Download URL:", downloadUrl);
  
  // ... validation ...
  
  try {
    setIsSubmitting(true);
    console.log("Submitting state set to true");
    
    if (documentType === 'case-study') {
      console.log("Case study flow detected");
      // ... case study logic
    }
    
    console.log("Starting download limit check...");
    const limitCheck = await trpc.documentDownloads.checkLimit.query({
      email: formData.email,
    });
    console.log("Limit check result:", limitCheck);
    
    if (limitCheck.limitReached) {
      console.log("Limit reached, showing limit modal");
      // ... limit logic
    }
    
    console.log("Recording download to database...");
    const result = await trpc.documentDownloads.recordDownload.mutate({
      email: formData.email,
      name: formData.name,
      company: formData.company || undefined,
      documentTitle: resourceTitle,
      documentUrl: downloadUrl,
      documentType: documentType,
    });
    console.log("Download recorded successfully:", result);
    
    console.log("Triggering PDF download...");
    // ... download logic
    
    console.log("=== FORM SUBMISSION COMPLETED ===");
  } catch (error: any) {
    console.error("=== FORM SUBMISSION ERROR ===");
    console.error("Error object:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    toast.error(error.message || "An error occurred. Please try again.");
    setIsSubmitting(false);
  }
};
```

### Step 2: Check Browser Developer Console
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Clear console
4. Submit form
5. Look for:
   - "=== FORM SUBMISSION STARTED ===" log
   - Any error messages
   - Network request failures
   - TRPC errors

### Step 3: Check Network Tab
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Submit form
5. Look for:
   - POST request to `/api/trpc/documentDownloads.recordDownload`
   - Request payload
   - Response status (200, 400, 500, etc.)
   - Response body

### Step 4: Check Server Logs
Run in terminal:
```bash
cd /home/ubuntu/intelleges-marketing-site
# Watch server output in real-time
pnpm dev
```

Look for:
- Incoming API requests
- Database queries
- Error stack traces
- Validation failures

## Expected vs Actual Behavior

### Expected Flow:
1. User clicks "Download Document"
2. `handleSubmit` called
3. Form validation passes
4. `setIsSubmitting(true)` - button shows loading state
5. `checkLimit` query executes - returns `{ limitReached: false, count: 0 }`
6. `recordDownload` mutation executes - creates DB entry
7. PDF download link created and clicked
8. Toast success message shown
9. Modal closes after 2 seconds
10. Form resets

### Actual Flow (Observed):
1. User clicks "Download Document"
2. ❓ Unknown - no console output
3. ❓ Unknown - no error messages
4. ❌ Button does not show loading state
5. ❌ No API requests visible
6. ❌ No database entries created
7. ❌ No PDF download
8. ❌ No toast messages
9. ❌ Modal remains open
10. ❌ Form data persists

## Hypothesis Ranking

### Most Likely (90% confidence):
**TRPC client initialization failure or API route mismatch**
- The `trpc` object may not be properly configured
- The API endpoint path may be incorrect
- TRPC context may be missing

### Likely (70% confidence):
**Form submission prevented by validation or event handling**
- Form default behavior not prevented
- Validation failing silently
- React state update interrupting async flow

### Possible (40% confidence):
**Server-side error with poor error handling**
- API endpoint throwing error
- Error not being caught properly
- CORS or network issue

### Unlikely (10% confidence):
**Browser compatibility or environment issue**
- Chromium automation blocking requests
- Sandbox network restrictions
- Dev server not running

## Next Actions

1. **Immediate:** Add comprehensive console logging to EmailCaptureModal
2. **Immediate:** Check browser console during form submission
3. **Immediate:** Check network tab for API requests
4. **Short-term:** Verify TRPC client configuration
5. **Short-term:** Test API endpoint directly with curl
6. **Medium-term:** Add unit tests for form submission flow

## Files to Review

1. `client/src/components/EmailCaptureModal.tsx` - Form submission logic
2. `client/src/lib/trpc.ts` - TRPC client configuration
3. `server/routers.ts` - API endpoint definition
4. `server/_core/index.ts` - Server setup and middleware

## Test Data

```json
{
  "name": "John Test Manual QA",
  "email": "qa.manual.001@intelleges-test.com",
  "company": "Intelleges QA Manual",
  "documentTitle": "Reps & Certs Compliance Service",
  "documentUrl": "https://cdn.example.com/reps-certs.pdf",
  "documentType": "capability"
}
```

## Expected Database Entry

```sql
INSERT INTO documentDownloads (
  email, name, company, documentTitle, documentUrl, documentType, downloadedAt
) VALUES (
  'qa.manual.001@intelleges-test.com',
  'John Test Manual QA',
  'Intelleges QA Manual',
  'Reps & Certs Compliance Service',
  'https://cdn.example.com/reps-certs.pdf',
  'capability',
  NOW()
);
```

## Expected Scheduled Email Entry

```sql
INSERT INTO scheduledEmails (
  recipientEmail, recipientName, emailType, subject, htmlContent, scheduledFor
) VALUES (
  'qa.manual.001@intelleges-test.com',
  'John Test Manual QA',
  'document_followup',
  'Your Intelleges Resource + Next Steps',
  '<html>...</html>',
  DATE_ADD(NOW(), INTERVAL 2 HOUR)
);
```

---

**Status:** Investigation in progress  
**Priority:** P0 - Blocking Gate #2  
**Assigned:** Development team  
**Last Updated:** December 30, 2024
