# Contact Form Multi-Channel Notification Flow

## Overview
The contact form submission triggers multiple notification channels to ensure sales team receives immediate alerts about new leads.

---

## Current Implementation

### 1. Database Storage
**Table:** `leads`

**Fields:**
- `id` - Auto-increment primary key
- `firstName` - Contact's first name
- `lastName` - Contact's last name
- `email` - Contact's email address
- `company` - Company name
- `phone` - Phone number
- `role` - Job role (optional)
- `plan` - Interested pricing plan (optional)
- `message` - Contact message
- `source` - Always "contact_form"
- `status` - Always "new" on submission
- `createdAt` - Timestamp

### 2. Email Notifications
**Recipients:**
- john@intelleges.com
- team@intelleges.com
- sales@intelleges.com

**Email Content:**
- Subject: `New Contact Form Submission - {Company Name}`
- HTML formatted with all form fields
- Includes Lead ID and submission timestamp
- Sent via SendGrid

**Environment Variables Required:**
- `SENDGRID_API_KEY` - SendGrid API key
- `SENDGRID_FROM_EMAIL` - Sender email address (default: noreply@intelleges.com)

### 3. WhatsApp/Signal Notifications (Optional - Not Currently Active)

**Integration:** Twilio

**Setup Instructions:**
1. Create Twilio account at https://www.twilio.com
2. Enable WhatsApp messaging
3. Get Account SID and Auth Token
4. Add environment variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM` (e.g., whatsapp:+14155238886)
   - `TWILIO_WHATSAPP_TO` (e.g., whatsapp:+19178180225)

**Code to Uncomment in `server/routers.ts`:**
```typescript
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  const twilio = require('twilio');
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.TWILIO_WHATSAPP_TO,
    body: `New lead: ${input.firstName} ${input.lastName} from ${input.company}\nEmail: ${input.email}\nPhone: ${input.phone}\nMessage: ${input.message.substring(0, 100)}...`
  });
}
```

### 4. CRM Integration (Optional - Not Currently Active)

#### Option A: Apollo.io

**Setup Instructions:**
1. Log in to Apollo.io
2. Navigate to Settings → API
3. Generate API key
4. Add environment variable: `APOLLO_API_KEY`

**Code to Uncomment in `server/routers.ts`:**
```typescript
if (process.env.APOLLO_API_KEY) {
  await fetch('https://api.apollo.io/v1/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': process.env.APOLLO_API_KEY,
    },
    body: JSON.stringify({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      organization_name: input.company,
      phone_numbers: [input.phone],
      label_names: ['Website Lead'],
    }),
  });
}
```

#### Option B: HubSpot

**Setup Instructions:**
1. Log in to HubSpot
2. Navigate to Settings → Integrations → API Key
3. Generate private app access token
4. Add environment variable: `HUBSPOT_API_KEY`

**Code to Uncomment in `server/routers.ts`:**
```typescript
if (process.env.HUBSPOT_API_KEY) {
  await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
    body: JSON.stringify({
      properties: {
        firstname: input.firstName,
        lastname: input.lastName,
        email: input.email,
        company: input.company,
        phone: input.phone,
        hs_lead_status: 'NEW',
      },
    }),
  });
}
```

---

## Testing

### Test Contact Form Submission

1. **Navigate to Contact Page**
   ```
   https://intelleges.com/contact
   ```

2. **Fill Out Form**
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Company: Test Company
   - Phone: +1-555-0100
   - Message: This is a test submission

3. **Submit Form**

4. **Verify Database Entry**
   ```sql
   SELECT * FROM leads ORDER BY createdAt DESC LIMIT 1;
   ```

5. **Check Email Delivery**
   - Check john@intelleges.com inbox
   - Check team@intelleges.com inbox
   - Check sales@intelleges.com inbox
   - Verify email contains all form fields
   - Verify Lead ID is included

6. **Check WhatsApp (if enabled)**
   - Verify message received on configured WhatsApp number

7. **Check CRM (if enabled)**
   - Verify contact created in Apollo.io or HubSpot
   - Verify all fields populated correctly

---

## Error Handling

### Database Errors
- If database insert fails, entire operation fails
- User sees error message: "Failed to submit contact form. Please try again."
- Error logged to server console

### Email Delivery Errors
- Uses `Promise.allSettled()` to prevent email failures from blocking submission
- Failed emails logged but don't prevent database write
- User still sees success message even if some emails fail

### CRM Integration Errors
- CRM failures don't block submission
- Errors logged but submission continues
- Manual CRM entry may be required if integration fails

---

## Monitoring

### Key Metrics to Track

1. **Submission Rate**
   - Total submissions per day/week/month
   - Conversion rate from page views to submissions

2. **Email Delivery Rate**
   - Successful email deliveries vs. failures
   - SendGrid dashboard for bounce rates

3. **Response Time**
   - Time from submission to first sales contact
   - Track in CRM or manually

4. **Lead Quality**
   - Track which plan interests generate most conversions
   - Analyze company sizes and industries

### Database Queries for Monitoring

**Daily Submissions:**
```sql
SELECT COUNT(*) as daily_leads
FROM leads
WHERE DATE(createdAt) = CURRENT_DATE;
```

**Leads by Plan Interest:**
```sql
SELECT plan, COUNT(*) as count
FROM leads
WHERE plan IS NOT NULL
GROUP BY plan
ORDER BY count DESC;
```

**Recent Leads:**
```sql
SELECT firstName, lastName, email, company, plan, createdAt
FROM leads
ORDER BY createdAt DESC
LIMIT 10;
```

---

## Production Deployment Checklist

- [ ] Verify SendGrid API key is set in production environment
- [ ] Verify SendGrid from email is verified and not in sandbox mode
- [ ] Test email delivery to all three recipient addresses
- [ ] Confirm database `leads` table exists and is accessible
- [ ] (Optional) Set up Twilio WhatsApp integration
- [ ] (Optional) Set up Apollo.io or HubSpot CRM integration
- [ ] Set up monitoring alerts for failed submissions
- [ ] Create dashboard for lead tracking
- [ ] Document sales team response workflow

---

**Last Updated:** November 30, 2025
