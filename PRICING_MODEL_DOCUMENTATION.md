# Intelleges Pricing Model - Complete Documentation

## Overview

The Intelleges pricing calculator uses a **configuration-based pricing model** with four tiers, each including base quantities of resources. Customers pay for excess usage beyond included amounts, plus optional add-on integrations.

---

## Pricing Tiers

### 1. Basic Tier
**Base Price:** $25,000/year

**Included Resources:**
- Users: 10
- Suppliers: 100
- Protocols: 1
- Sites: 1
- Partner Types: 0

**Features:**
- Core compliance protocols
- Basic supplier management
- Standard support
- Email notifications

**Integrations:** Not available

---

### 2. Professional Tier
**Base Price:** $60,000/year

**Included Resources:**
- Users: 25
- Suppliers: 500
- Protocols: 3
- Sites: 5
- Partner Types: 2

**Features:**
- All Basic features
- Advanced protocols
- Multi-site support
- Priority support
- Custom branding

**Integrations:** Not available

---

### 3. Advanced Tier
**Base Price:** $100,000/year

**Included Resources:**
- Users: 50
- Suppliers: 1,500
- Protocols: 5
- Sites: 10
- Partner Types: 5

**Features:**
- All Professional features
- ERP integration available
- eSRS support available
- Advanced analytics
- Dedicated account manager

**Integrations:** Available (ERP, eSRS, Premium Support)

---

### 4. Enterprise Tier
**Base Price:** $150,000/year

**Included Resources:**
- Users: 100
- Suppliers: 5,000
- Protocols: 10
- Sites: 25
- Partner Types: 10

**Features:**
- All Advanced features
- Unlimited protocols
- White-label option
- Custom integrations
- 24/7 premium support
- SLA guarantees

**Integrations:** Available (ERP, eSRS, Premium Support)

---

## Per-Unit Pricing (Annual)

When customer configuration exceeds included quantities, additional units are charged at these rates:

| Resource | Price per Unit | Calculation |
|----------|---------------|-------------|
| **Users** | $500/year | Excess users × $500 |
| **Suppliers** | $10/year | Excess suppliers × $10 |
| **Protocols** | $5,000/year | Excess protocols × $5,000 |
| **Sites** | $2,000/year | Excess sites × $2,000 |
| **Partner Types** | $1,000/year | Excess partner types × $1,000 |

---

## Add-On Integrations (Annual)

Available only for **Advanced** and **Enterprise** tiers:

| Integration | Annual Price | Description |
|------------|--------------|-------------|
| **ERP Integration** | $15,000/year | Seamless integration with customer's ERP system |
| **eSRS Support** | $10,000/year | European Sustainability Reporting Standards support |
| **Premium Support** | $12,000/year | 24/7 priority support with dedicated account manager (available for all tiers) |

**Note:** Premium Support is available for all tiers, but ERP and eSRS integrations require Advanced or Enterprise tier.

---

## Pricing Calculation Formula

### Annual Price Calculation:
```
Annual Price = Base Price 
             + (Excess Users × $500)
             + (Excess Suppliers × $10)
             + (Excess Protocols × $5,000)
             + (Excess Sites × $2,000)
             + (Excess Partner Types × $1,000)
             + ERP Integration ($15,000 if selected)
             + eSRS Support ($10,000 if selected)
             + Premium Support ($12,000 if selected)
```

### Total Contract Price:
```
Total Price = Annual Price × Contract Term (years)
```

### Excess Quantity Calculation:
```
Excess Quantity = MAX(0, Requested Quantity - Included Quantity)
```

---

## Example Calculations

### Example 1: Advanced Tier - Standard Configuration
**Configuration:**
- Tier: Advanced ($100,000 base)
- Users: 50 (included: 50) → 0 excess
- Suppliers: 1,500 (included: 1,500) → 0 excess
- Protocols: 1 (included: 5) → 0 excess
- Sites: 10 (included: 10) → 0 excess
- Partner Types: 0 (included: 5) → 0 excess
- No integrations
- Contract: 1 year

**Calculation:**
```
Annual Price = $100,000 (base)
Total Price = $100,000 × 1 year = $100,000
```

---

### Example 2: Advanced Tier - Celestica Configuration (from test plan)
**Configuration:**
- Tier: Advanced ($100,000 base)
- Users: 75 (included: 50) → 25 excess
- Suppliers: 2,000 (included: 1,500) → 500 excess
- Protocols: 8 (included: 5) → 3 excess
- Sites: 15 (included: 10) → 5 excess
- Partner Types: 8 (included: 5) → 3 excess
- ERP Integration: Yes ($15,000)
- eSRS Support: No
- Premium Support: Yes ($12,000)
- Contract: 1 year

**Calculation:**
```
Base Price:              $100,000
Additional Users:         25 × $500 = $12,500
Additional Suppliers:    500 × $10 = $5,000
Additional Protocols:      3 × $5,000 = $15,000
Additional Sites:          5 × $2,000 = $10,000
Additional Partner Types:  3 × $1,000 = $3,000
ERP Integration:         $15,000
Premium Support:         $12,000
─────────────────────────────────────
Annual Price:            $172,500
Total Price (1 year):    $172,500
```

---

### Example 3: Enterprise Tier - Large Organization
**Configuration:**
- Tier: Enterprise ($150,000 base)
- Users: 150 (included: 100) → 50 excess
- Suppliers: 6,000 (included: 5,000) → 1,000 excess
- Protocols: 12 (included: 10) → 2 excess
- Sites: 30 (included: 25) → 5 excess
- Partner Types: 15 (included: 10) → 5 excess
- ERP Integration: Yes ($15,000)
- eSRS Support: Yes ($10,000)
- Premium Support: Yes ($12,000)
- Contract: 3 years

**Calculation:**
```
Base Price:              $150,000
Additional Users:         50 × $500 = $25,000
Additional Suppliers:  1,000 × $10 = $10,000
Additional Protocols:      2 × $5,000 = $10,000
Additional Sites:          5 × $2,000 = $10,000
Additional Partner Types:  5 × $1,000 = $5,000
ERP Integration:         $15,000
eSRS Support:            $10,000
Premium Support:         $12,000
─────────────────────────────────────
Annual Price:            $247,000
Total Price (3 years):   $741,000
```

---

### Example 4: Basic Tier - Small Company
**Configuration:**
- Tier: Basic ($25,000 base)
- Users: 15 (included: 10) → 5 excess
- Suppliers: 200 (included: 100) → 100 excess
- Protocols: 1 (included: 1) → 0 excess
- Sites: 1 (included: 1) → 0 excess
- Partner Types: 0 (included: 0) → 0 excess
- No integrations (not available for Basic)
- Contract: 1 year

**Calculation:**
```
Base Price:              $25,000
Additional Users:          5 × $500 = $2,500
Additional Suppliers:    100 × $10 = $1,000
─────────────────────────────────────
Annual Price:            $28,500
Total Price (1 year):    $28,500
```

---

## Quote Validity and Expiration

### Expiration Policy
- **Validity Period:** All quotes are valid for **30 days** from creation date
- **Expiration Date:** Automatically set when quote is saved
- **Reminder Email:** Sent **7 days before** expiration (when quote status is "sent")
- **Expiration Email:** Sent on expiration day, quote status automatically changes to "expired"

### Expiration Status Indicators
| Status | Condition | Badge Color | Description |
|--------|-----------|-------------|-------------|
| **Active** | > 7 days remaining | Green | Quote is valid and active |
| **Expiring Soon** | ≤ 7 days remaining | Amber | Reminder email sent, urgent action needed |
| **Expired** | Past expiration date | Red | Quote no longer valid, can be extended |

### Extend Expiration
- Sales team can extend expired quotes by **30 days** from current date
- Extension resets reminder flags (new 7-day reminder will be sent)
- Unlimited extensions allowed

---

## Integration Restrictions

### Tier-Based Integration Access

| Integration | Basic | Professional | Advanced | Enterprise |
|------------|-------|--------------|----------|------------|
| **ERP Integration** | ❌ | ❌ | ✅ | ✅ |
| **eSRS Support** | ❌ | ❌ | ✅ | ✅ |
| **Premium Support** | ✅ | ✅ | ✅ | ✅ |

**Validation Rule:** If customer selects ERP or eSRS integration on Basic or Professional tier, the system will reject the configuration with error: `"{Tier} tier does not support integrations"`

---

## Currency and Contract Terms

### Currency
- **Default:** USD ($)
- **Format:** Whole dollars (no cents)
- **Display:** US number format with commas (e.g., $172,500)

### Contract Terms
- **Available Terms:** 1, 2, 3, 4, or 5 years
- **Default:** 1 year
- **Discount:** No multi-year discounts currently applied (future enhancement opportunity)
- **Calculation:** Total Price = Annual Price × Term Years

---

## Pricing Breakdown Structure

Every quote includes a detailed breakdown showing:

1. **Base Tier Price** - The foundation subscription cost
2. **Additional Resources** - Line items for each excess resource type (only if > 0)
3. **Integrations** - Line items for each selected add-on (only if selected)
4. **Annual Subtotal** - Sum of all annual charges
5. **Contract Term** - Number of years
6. **Total Contract Value** - Annual Price × Years

**Example Breakdown Display:**
```
Advanced Tier (Base)           1 × $100,000 = $100,000
Additional Users              25 × $500     = $12,500
Additional Suppliers         500 × $10      = $5,000
Additional Protocols           3 × $5,000   = $15,000
Additional Sites               5 × $2,000   = $10,000
Additional Partner Types       3 × $1,000   = $3,000
ERP Integration                1 × $15,000  = $15,000
Premium Support                1 × $12,000  = $12,000
───────────────────────────────────────────────────
Annual Price:                              $172,500
Contract Term:                             1 year
───────────────────────────────────────────────────
Total Price:                               $172,500
```

---

## Quote Status Workflow

### Status Progression
```
draft → sent → accepted/rejected/expired
```

### Status Definitions

| Status | Description | Email Trigger | Expiration Tracking |
|--------|-------------|---------------|---------------------|
| **draft** | Quote created but not sent to customer | None | Yes (30 days) |
| **sent** | Quote delivered to customer via email | Quote delivery email with PDF | Yes (7-day reminder + expiration) |
| **accepted** | Customer accepted the quote | None (manual status change) | No (stopped) |
| **rejected** | Customer declined the quote | None (manual status change) | No (stopped) |
| **expired** | Quote passed 30-day validity period | Expiration notification email | Can be extended |

---

## Email Automation

### 1. Quote Delivery Email (Status: draft → sent)
**Trigger:** Sales team changes quote status to "sent"

**Content:**
- Professional branded email with Intelleges colors
- Quote summary (customer name, tier, total price)
- PDF proposal attached
- Call-to-action to schedule demo
- Trust badges (ISO 27001, Battelle Supplier of the Year)

**Recipient:** Customer email address from quote

---

### 2. Expiration Reminder Email (7 days before expiration)
**Trigger:** Automated check finds quote expiring in ≤7 days (status: "sent", expirationReminderSent: false)

**Content:**
- Urgent notice that quote expires in X days
- Quote details and pricing summary
- Call-to-action to accept or request extension
- Sales contact information

**Recipient:** Customer email address from quote

**Flag:** `expirationReminderSent` set to 1 (prevents duplicate reminders)

---

### 3. Quote Expired Email (On expiration date)
**Trigger:** Automated check finds quote past expiration date (status: "sent", expirationEmailSent: false)

**Content:**
- Notice that quote has expired
- Invitation to request updated quote
- Sales contact information
- Call-to-action to schedule meeting

**Recipient:** Customer email address from quote

**Actions:**
- Quote status changed to "expired"
- `expirationEmailSent` flag set to 1
- Quote no longer valid for Stripe invoice generation

---

## Manual Operations

### Check Expirations Button
**Location:** Quote History page (top right)

**Function:** Manually triggers expiration checking process

**Process:**
1. Query all quotes with status "sent"
2. For each quote:
   - If expired and email not sent → send expiration email, update status to "expired"
   - If expiring soon (≤7 days) and reminder not sent → send reminder email
3. Return count of emails sent

**Use Case:** Sales team can manually check for expirations instead of waiting for scheduled cron job

---

### Extend Expiration Button
**Location:** Quote History page (Actions column, only visible for expired quotes)

**Function:** Extends quote expiration by 30 days from current date

**Process:**
1. Calculate new expiration date (today + 30 days)
2. Update quote with new expiration date
3. Reset reminder flags (expirationReminderSent = 0, expirationEmailSent = 0)
4. Change status back to "sent" if currently "expired"
5. New 7-day reminder will be sent when appropriate

**Use Case:** Customer requests more time to review quote, or sales team wants to reactivate expired quote

---

## Database Schema

### pricingQuotes Table Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT | Primary key, auto-increment |
| `customerName` | VARCHAR(255) | Customer company name |
| `customerEmail` | VARCHAR(255) | Customer email address (required for invoices/emails) |
| `industry` | VARCHAR(255) | Customer industry (optional) |
| `region` | VARCHAR(255) | Customer region (optional) |
| `tier` | VARCHAR(50) | Selected tier (Basic/Professional/Advanced/Enterprise) |
| `users` | INT | Number of users |
| `suppliers` | INT | Number of suppliers |
| `protocols` | INT | Number of protocols |
| `sites` | INT | Number of sites |
| `partnerTypes` | INT | Number of partner types |
| `erpIntegration` | TINYINT | ERP integration selected (0/1) |
| `esrsSupport` | TINYINT | eSRS support selected (0/1) |
| `supportPremium` | TINYINT | Premium support selected (0/1) |
| `basePrice` | DECIMAL(10,2) | Tier base price |
| `usersPrice` | DECIMAL(10,2) | Additional users cost |
| `suppliersPrice` | DECIMAL(10,2) | Additional suppliers cost |
| `protocolsPrice` | DECIMAL(10,2) | Additional protocols cost |
| `sitesPrice` | DECIMAL(10,2) | Additional sites cost |
| `partnerTypesPrice` | DECIMAL(10,2) | Additional partner types cost |
| `erpIntegrationPrice` | DECIMAL(10,2) | ERP integration cost |
| `esrsSupportPrice` | DECIMAL(10,2) | eSRS support cost |
| `supportPremiumPrice` | DECIMAL(10,2) | Premium support cost |
| `annualPrice` | DECIMAL(10,2) | Total annual price |
| `termYears` | INT | Contract term in years |
| `totalPrice` | DECIMAL(10,2) | Total contract value |
| `currency` | VARCHAR(10) | Currency code (default: USD) |
| `status` | VARCHAR(50) | Quote status (draft/sent/accepted/rejected/expired) |
| `notes` | TEXT | Internal notes about the quote |
| `expiresAt` | DATETIME | Quote expiration date (30 days from creation) |
| `expirationReminderSent` | TINYINT | 7-day reminder email sent flag (0/1) |
| `expirationEmailSent` | TINYINT | Expiration email sent flag (0/1) |
| `createdBy` | INT | User ID of sales team member who created quote |
| `createdAt` | DATETIME | Quote creation timestamp |
| `updatedAt` | DATETIME | Last update timestamp |

---

## API Endpoints (tRPC)

### 1. `pricing.calculate`
**Type:** Query  
**Input:** PricingRequest (tier, users, suppliers, protocols, sites, partnerTypes, integrations, termYears)  
**Output:** PricingResult (all prices, breakdown, annual/total)  
**Purpose:** Real-time pricing calculation as user adjusts configuration

---

### 2. `pricing.saveQuote`
**Type:** Mutation  
**Input:** PricingRequest + notes  
**Output:** { quoteId, pricing }  
**Purpose:** Save quote to database with automatic 30-day expiration date

---

### 3. `pricing.getQuote`
**Type:** Query  
**Input:** { id: number }  
**Output:** Complete quote record  
**Purpose:** Retrieve single quote by ID

---

### 4. `pricing.listQuotes`
**Type:** Query  
**Input:** { page, limit, search, status, tier }  
**Output:** { quotes[], total, page, totalPages }  
**Purpose:** List all quotes with pagination and filters

---

### 5. `pricing.updateQuoteStatus`
**Type:** Mutation  
**Input:** { id: number, status: string }  
**Output:** { success: boolean }  
**Purpose:** Change quote status (draft/sent/accepted/rejected/expired)  
**Special:** When status changes to "sent", automatically sends quote delivery email with PDF

---

### 6. `pricing.generateStripeInvoice`
**Type:** Mutation  
**Input:** { id: number }  
**Output:** { invoiceId, invoiceUrl, hostedInvoiceUrl }  
**Purpose:** Create Stripe invoice for quote and return payment URL

---

### 7. `pricing.exportPDF`
**Type:** Mutation  
**Input:** { id: number }  
**Output:** { data: base64, filename, mimeType }  
**Purpose:** Generate PDF proposal for quote download

---

### 8. `pricing.extendExpiration`
**Type:** Mutation  
**Input:** { id: number }  
**Output:** { success: boolean, newExpiresAt: Date }  
**Purpose:** Extend quote expiration by 30 days from current date

---

### 9. `pricing.checkExpiredQuotes`
**Type:** Mutation  
**Input:** None  
**Output:** { success: boolean, remindersSent: number, expirationEmailsSent: number }  
**Purpose:** Check all quotes and send reminder/expiration emails as needed

---

## Future Enhancements

### Potential Pricing Model Improvements

1. **Multi-Year Discounts**
   - 5% discount for 2-year contracts
   - 10% discount for 3-year contracts
   - 15% discount for 4-5 year contracts

2. **Volume Discounts**
   - Tiered pricing for large supplier counts (e.g., $10 → $8 → $6 per supplier)
   - Bulk user discounts for 100+ users

3. **Seasonal Promotions**
   - Q4 end-of-year discounts
   - New customer incentives
   - Referral discounts

4. **Custom Pricing Tiers**
   - Allow sales team to create custom tiers for special customers
   - Override base prices for strategic accounts

5. **Quote Templates**
   - Save common configurations as templates
   - Quick quote generation for similar customers

6. **Approval Workflow**
   - Require manager approval for discounts > 15%
   - Automated approval for standard pricing

7. **Competitor Price Matching**
   - Field to enter competitor quote
   - Automatic discount calculation to match/beat

8. **Quote Versioning**
   - Track quote revisions
   - Compare versions side-by-side
   - Revert to previous versions

---

## Testing Reference

For comprehensive testing scenarios and validation, see:
- **PRICING_CALCULATOR_TEST_PLAN.md** - 40+ detailed test cases with exact dollar amounts
- Test cases cover all tiers, configurations, edge cases, and quote lifecycle workflows

---

## Summary

The Intelleges pricing model is designed for **transparency, flexibility, and scalability**:

- **4 tiers** ranging from $25K to $150K base price
- **Configuration-based pricing** charges only for excess usage
- **Add-on integrations** available for advanced tiers
- **30-day quote validity** with automated reminders
- **Complete audit trail** of all pricing calculations
- **Stripe integration** for seamless payment processing

This model supports both small companies (Basic tier with minimal excess) and large enterprises (Enterprise tier with significant customization), while maintaining clear, predictable pricing that builds customer trust.
