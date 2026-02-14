# Enterprise Plan Configurator - Backend Integration Summary

**Date:** February 13, 2026  
**Integration Status:** ✅ COMPLETE (Ready for Database Migration)  
**Source:** www-backend-package.zip (INT.DOC.91 v1.1)

---

## ✅ COMPLETED STEPS

### 1. Dependencies Installed
```bash
✅ pnpm add pdfkit
✅ pnpm add -D @types/pdfkit
```

### 2. Database Schema Added
- ✅ `drizzle/proposalSchema.ts` → Copied to project
- ✅ Exports added to `drizzle/schema.ts`:
  - `enterpriseProposals` table
  - `proposalEvents` table
  - Relations

### 3. Service Files Added
- ✅ `server/services/proposalPdf.ts` → PDF generation with PDFKit
- ✅ `server/services/proposalEmail.ts` → SendGrid email templates

### 4. Router Added
- ✅ `server/routers/configurator.ts` → tRPC endpoints
- ✅ Import paths fixed:
  - `router, publicProcedure` → `../_core/trpc`
  - `db` → `getDb()` from `../db`
  - `pricingConfig` → `../../client/src/lib/pricingConfig`

### 5. Router Registered
- ✅ Added to `server/routers.ts`:
  ```typescript
  import { configuratorRouter } from "./routers/configurator.js";
  
  export const appRouter = router({
    system: systemRouter,
    pricing: pricingRouter,
    configurator: configuratorRouter, // ← NEW
    // ...
  });
  ```

### 6. Frontend Component Updated
- ✅ `client/src/components/ProposalModal.tsx` → Replaced with tRPC-wired version

### 7. Uploads Directory Created
- ✅ `uploads/proposals/` directory created
- ✅ Added to `.gitignore`: `uploads/proposals/*.pdf`

### 8. Database Migration Generated
- ✅ Migration file created: `drizzle/0005_smart_lorna_dane.sql`
- ✅ Tables to be created:
  - `enterpriseProposals` (26 columns)
  - `proposalEvents` (5 columns)

---

## 🔄 REMAINING STEPS (Manual Deployment)

### Step 1: Run Database Migration

**When ready to deploy**, run this command to create the tables:

```bash
pnpm drizzle-kit migrate
```

**Verify tables exist:**
```sql
SHOW TABLES LIKE 'enterprise%';
SHOW TABLES LIKE 'proposal%';
DESC enterpriseProposals;
DESC proposalEvents;
```

### Step 2: Verify Environment Variables

These should already be set (existing SendGrid integration):
```env
SENDGRID_API_KEY=SG.xxxxx          # Already configured
SENDGRID_FROM_EMAIL=sales@intelleges.com  # Already configured
```

Optional new variable for internal notifications:
```env
SALES_TEAM_EMAIL=sales@intelleges.com  # Where internal proposal alerts go
```

### Step 3: Test the Integration

Follow the testing checklist in `INTEGRATION_INSTRUCTIONS.md`:

1. **Database:** Verify tables exist
2. **tRPC endpoint:** Submit proposal from configurator
3. **Database record:** Check proposal saved correctly
4. **PDF generation:** Verify PDF created in `uploads/proposals/`
5. **Emails:** Check prospect confirmation and internal notification
6. **Error handling:** Test validation and error states

---

## 📋 TESTING CHECKLIST

After running the migration, verify each component:

### 1. Database Tables
```sql
-- Tables exist
SHOW TABLES LIKE 'enterprise%';
SHOW TABLES LIKE 'proposal%';

-- Columns match schema
DESC enterpriseProposals;
-- Should have: id, status, tierKey, tierName, priceAnnual, configUsers, 
-- configSuppliers, configGroups, configProtocols, multiJurisdiction, 
-- contactName, contactEmail, contactCompany, contactRole, contactPhone, 
-- stripeSessionId, stripePaymentId, poDocumentUrl, poApprovedAt, 
-- poApprovedBy, pdfUrl, fcmsEnterpriseId, paidAt, provisionedAt, 
-- createdAt, updatedAt
```

### 2. tRPC Endpoint
- Navigate to `/pricing`
- Fill in configurator
- Click "Request Proposal"
- Fill form and submit
- Check Network tab: POST to tRPC endpoint
- Response should include: `{ success: true, proposalId: N }`

### 3. Database Record
```sql
-- After submission
SELECT * FROM enterpriseProposals ORDER BY id DESC LIMIT 1;
-- Should show: status='SENT', correct tier, config, contact info

SELECT * FROM proposalEvents WHERE proposalId = [id from above];
-- Should show: CREATED and SENT events
```

### 4. PDF Generation
```bash
# Check uploads directory
ls -la uploads/proposals/
# Should contain: intelleges-proposal-[id].pdf
```

### 5. Emails
- **Prospect email:** Check submitted email address for confirmation with PDF
- **Internal email:** Check sales@intelleges.com for notification with details

### 6. Error Handling
- Submit with invalid email → validation error
- Submit with server down → error state with "Try Again"
- Submit same proposal twice → both succeed (separate proposals)

---

## 📁 FILES ADDED/MODIFIED

### New Files:
```
drizzle/proposalSchema.ts
drizzle/0005_smart_lorna_dane.sql
server/services/proposalPdf.ts
server/services/proposalEmail.ts
server/routers/configurator.ts
uploads/proposals/ (directory)
```

### Modified Files:
```
drizzle/schema.ts (added exports)
server/routers.ts (registered configurator router)
client/src/components/ProposalModal.tsx (replaced)
.gitignore (added uploads/proposals/*.pdf)
package.json (added pdfkit dependency)
```

---

## 🚀 DEPLOYMENT WORKFLOW

1. **Local Testing:**
   ```bash
   pnpm drizzle-kit migrate  # Apply migration
   pnpm dev                   # Start dev server
   # Test configurator at http://localhost:3000/pricing
   ```

2. **Git Commit:**
   ```bash
   git add .
   git commit -m "Add Enterprise Plan Configurator backend integration"
   git push origin main
   ```

3. **Production Deployment:**
   - Manus platform will auto-deploy on push
   - Verify environment variables are set
   - Run migration on production database
   - Test proposal submission flow

---

## 🔧 TROUBLESHOOTING

| Issue | Fix |
|-------|-----|
| `Cannot find module 'pdfkit'` | Run `pnpm install` |
| `Table 'enterpriseProposals' doesn't exist` | Run `pnpm drizzle-kit migrate` |
| `SENDGRID_API_KEY not set` | Check .env file |
| `Cannot find module '../_core/trpc'` | Import paths already fixed |
| `pricingConfig import fails` | Verify `client/src/lib/pricingConfig.ts` exists |
| PDF not generating | Check `uploads/proposals/` exists and is writable |
| Email not sending | Verify SendGrid API key is valid |

---

## 📚 DOCUMENTATION REFERENCE

- **Integration Instructions:** `INTEGRATION_INSTRUCTIONS.md` (from backend package)
- **API Documentation:** INT.DOC.91 v1.1 Section 3.3
- **Email Templates:** INT.DOC.91 v1.1 Section 5
- **PDF Generation:** INT.DOC.91 v1.1 Section 3.3 (D8)

---

## ✅ INTEGRATION COMPLETE

All backend files have been integrated following the exact specifications in `INTEGRATION_INSTRUCTIONS.md`. Import paths have been corrected to match the Intelleges project structure. No refactoring or renaming was performed.

**Next Action:** Run `pnpm drizzle-kit migrate` to create the database tables, then test the proposal submission flow.
