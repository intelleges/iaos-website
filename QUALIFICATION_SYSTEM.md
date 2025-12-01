# Lead Qualification System Documentation

## Overview

The lead qualification system automatically scores and gates Calendly access based on company data enriched from Apollo.io. Only qualified leads (score ≥60) can access the scheduling widget, protecting your calendar from low-value meetings.

## Architecture

```
User Form Submission
  ↓
QualificationGate Component (React)
  ↓
TRPC qualifyLead Mutation
  ↓
Apollo.io Enrichment (server/lib/enrichment.ts)
  ↓
Scoring Engine (server/lib/qualification.ts)
  ↓
Database Persistence (leadQualificationAttempts table)
  ↓
Return qualified=true/false to Frontend
  ↓
Show Calendly Widget OR "We'll reach out" Message
```

## Scoring Model

### Critical Disqualifiers (Auto-Reject)
- **Free email domain** (Gmail, Yahoo, Outlook, etc.) → -100 points
- **Blocked industry** (Retail, Hospitality, Crypto, etc.) → -80 points
- **Company <200 employees** → -50 points
- **Non-target country** (not US/Mexico) → -50 points
- **No enrichment data** → -30 points

### Positive Signals
- **Target industry match** (Healthcare, Aerospace, Defense, Manufacturing) → +50 points
- **Large enterprise** (≥1000 employees) → +25 points
- **Mid-size company** (200-999 employees) → +15 points
- **Target country** (US/Mexico) → +10 points
- **Corporate email domain** → +10 points
- **High revenue** (>$100M) → +20 points
- **Mid revenue** ($50-100M) → +10 points
- **Decision-maker title** (VP, Director, Chief, Procurement, Compliance, etc.) → +30 points

### Qualification Threshold
- **≥60 points** = Qualified → Show Calendly
- **<60 points** = Not Qualified → Show "We'll reach out" message

## Setup Instructions

### 1. Configure Apollo API Key

Add your Apollo.io API key to the environment:

```bash
# In Railway or your hosting platform
APOLLO_API_KEY=your_apollo_api_key_here
```

**How to get Apollo API Key:**
1. Sign up at https://apollo.io
2. Navigate to Settings → Integrations → API
3. Generate a new API key
4. Copy and paste into your environment variables

### 2. Database Migration

The `leadQualificationAttempts` table is already created. Verify with:

```bash
pnpm db:push
```

### 3. Test the System

Run the comprehensive test suite:

```bash
pnpm test server/lib/qualification.test.ts
```

### 4. Deploy

The qualification system is integrated into:
- `/demo` page - Primary demo booking page
- Can be added to `/contact` page
- Can be added to `/welcome` personalized landing page

## Usage Examples

### Qualified Lead Example

**Input:**
- Name: John Smith
- Email: john.smith@boeing.com
- Company: Boeing
- Title: VP of Procurement

**Apollo Enrichment:**
- Industry: Aerospace & Defense
- Employees: 150,000
- Country: United States
- Revenue: $100B+

**Score Breakdown:**
- Target industry (+50)
- Large enterprise (+25)
- Corporate domain (+10)
- Target country (+10)
- High revenue (+20)
- Decision-maker title (+30)
- **Total: 145 points** ✅ QUALIFIED

**Result:** Calendly widget shown with pre-filled information

---

### Disqualified Lead Example 1: Free Email

**Input:**
- Name: Jane Doe
- Email: jane.doe@gmail.com
- Company: Boeing
- Title: VP of Procurement

**Score Breakdown:**
- Free email domain (-100)
- **Total: -100 points** ❌ DISQUALIFIED

**Result:** "Thank you for your interest" message shown

---

### Disqualified Lead Example 2: Too Small

**Input:**
- Name: Bob Johnson
- Email: bob@smallstartup.com
- Company: Small Startup Inc
- Title: CEO

**Apollo Enrichment:**
- Industry: Software
- Employees: 15
- Country: United States

**Score Breakdown:**
- Company too small (-50)
- No enrichment data (-30)
- Corporate domain (+10)
- **Total: -70 points** ❌ DISQUALIFIED

**Result:** "Thank you for your interest" message shown

---

### Disqualified Lead Example 3: Wrong Industry

**Input:**
- Name: Sarah Lee
- Email: sarah@retailchain.com
- Company: Retail Chain Co
- Title: VP of Operations

**Apollo Enrichment:**
- Industry: Retail
- Employees: 5,000
- Country: United States
- Revenue: $500M+

**Score Breakdown:**
- Blocked industry (-80)
- Corporate domain (+10)
- Target country (+10)
- High revenue (+20)
- **Total: -40 points** ❌ DISQUALIFIED

**Result:** "Thank you for your interest" message shown

## Customization

### Adjust Qualification Threshold

Edit `server/lib/qualification.ts`:

```typescript
// Change from 60 to your desired threshold
const qualified = score >= 70; // More strict
// or
const qualified = score >= 50; // More lenient
```

### Add/Remove Target Industries

Edit `server/lib/qualification.ts`:

```typescript
const TARGET_INDUSTRIES = [
  "healthcare",
  "aerospace",
  "defense",
  "manufacturing",
  "pharmaceutical", // Add new industry
];
```

### Add/Remove Blocked Industries

```typescript
const BLOCKED_INDUSTRIES = [
  "retail",
  "hospitality",
  "restaurant",
  "crypto",
  // Add more blocked industries
];
```

### Modify Scoring Weights

```typescript
// Example: Increase decision-maker title bonus
if (hasPositiveKeyword) {
  score += 40; // Changed from 30
  reasons.push(`Decision-maker title: ${title}`);
}
```

## Monitoring & Analytics

### View Qualification Attempts

Query the database directly:

```sql
SELECT 
  name,
  email,
  company,
  score,
  qualified,
  reasons,
  industry,
  employeeCount,
  country,
  createdAt
FROM leadQualificationAttempts
ORDER BY createdAt DESC
LIMIT 50;
```

### GA4 Events Tracked

The system fires these Google Analytics events:

1. **qualification_attempt** - When user submits form
2. **qualification_passed** - When lead scores ≥60
3. **qualification_failed** - When lead scores <60

View in GA4:
- Events → qualification_attempt
- Add secondary dimension: `event_label` (company name)
- Add metric: `score` (custom parameter)

### Score Distribution Analysis

```sql
SELECT 
  CASE 
    WHEN score >= 80 THEN 'Excellent (80+)'
    WHEN score >= 60 THEN 'Qualified (60-79)'
    WHEN score >= 40 THEN 'Borderline (40-59)'
    ELSE 'Poor (<40)'
  END as score_range,
  COUNT(*) as count,
  AVG(score) as avg_score
FROM leadQualificationAttempts
GROUP BY score_range
ORDER BY avg_score DESC;
```

## Troubleshooting

### Issue: All leads showing "No enrichment data"

**Solution:** Check that `APOLLO_API_KEY` is set correctly in environment variables.

```bash
# Verify in Railway dashboard or run locally:
echo $APOLLO_API_KEY
```

### Issue: Qualified leads not seeing Calendly widget

**Solution:** Check browser console for JavaScript errors. Ensure Calendly script is loading:

```html
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Issue: Too many false positives/negatives

**Solution:** Adjust the qualification threshold or scoring weights in `server/lib/qualification.ts`.

For more strict qualification:
- Increase threshold to 70+
- Increase negative weights for disqualifiers
- Decrease positive weights for signals

For more lenient qualification:
- Decrease threshold to 50
- Decrease negative weights
- Increase positive weights

## API Reference

### TRPC Mutation: `qualification.qualifyLead`

**Input:**
```typescript
{
  name: string;        // Full name (required)
  email: string;       // Business email (required)
  company: string;     // Company name (required)
  title?: string;      // Job title (optional)
}
```

**Output:**
```typescript
{
  qualified: boolean;           // true if score ≥60
  score: number;                // Total score
  reasons: string[];            // Array of scoring reasons
  explanation: string;          // Human-readable summary
  enrichment: {                 // Derived data from Apollo
    industry?: string;
    employeeCount?: number;
    country?: string;
    revenueBand?: string;
    website?: string;
  };
}
```

### TRPC Query: `qualification.getRecentAttempts`

**Input:**
```typescript
{
  limit?: number;  // Max 100, default 20
}
```

**Output:**
```typescript
Array<{
  id: number;
  name: string;
  email: string;
  company: string;
  title?: string;
  score: number;
  qualified: boolean;
  reasons: string[];
  industry?: string;
  employeeCount?: number;
  country?: string;
  revenueBand?: string;
  createdAt: Date;
}>
```

## Best Practices

1. **Review blocked leads monthly** - Check `leadQualificationAttempts` for false negatives
2. **Monitor score distribution** - Adjust thresholds if too many/few leads qualify
3. **Update industry lists** - Add new target industries as your ICP evolves
4. **Test with real data** - Use actual customer emails to validate scoring
5. **Provide escape hatch** - Include sales email in rejection message for edge cases

## Future Enhancements

- [ ] Add manual override capability for sales team
- [ ] Implement lead scoring dashboard in admin panel
- [ ] Add email notifications for high-score leads
- [ ] Integrate with CRM (Salesforce, HubSpot)
- [ ] Add A/B testing for qualification thresholds
- [ ] Implement machine learning for dynamic scoring
- [ ] Add LinkedIn profile enrichment
- [ ] Create qualification analytics dashboard

## Support

For questions or issues:
1. Check this documentation first
2. Review test cases in `server/lib/qualification.test.ts`
3. Examine actual qualification attempts in database
4. Contact development team with specific examples
