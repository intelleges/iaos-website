# Pricing Calculator Testing Plan

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Author:** Manus AI  
**Purpose:** Comprehensive testing plan for Intelleges pricing calculator to ensure accuracy, reliability, and customer trust

---

## Executive Summary

This document provides a detailed, step-by-step testing plan for the Intelleges pricing calculator system. The pricing calculator is a critical sales tool that generates quotes for enterprise customers. **Accuracy is paramount**—incorrect pricing calculations can result in lost revenue, customer distrust, legal issues, and damaged reputation.

This testing plan covers all pricing tiers, configuration options, edge cases, and integration points including quote saving, Stripe invoice generation, PDF export, and automated email delivery. Each test case includes expected results with exact dollar amounts to facilitate validation.

---

## Table of Contents

1. [Pricing Structure Overview](#pricing-structure-overview)
2. [Calculation Formula Reference](#calculation-formula-reference)
3. [Test Environment Setup](#test-environment-setup)
4. [Test Case Categories](#test-case-categories)
5. [Detailed Test Cases](#detailed-test-cases)
6. [Integration Testing](#integration-testing)
7. [Edge Case Testing](#edge-case-testing)
8. [Validation Checklist](#validation-checklist)
9. [Known Limitations](#known-limitations)

---

## Pricing Structure Overview

The Intelleges pricing calculator supports four tiers with different base prices and included quantities. Customers pay for usage beyond included amounts at per-unit rates.

### Tier Definitions

| Tier | Base Price (Annual) | Users | Suppliers | Protocols | Sites | Partner Types | Integrations Allowed |
|------|---------------------|-------|-----------|-----------|-------|---------------|---------------------|
| **Basic** | $25,000 | 10 | 100 | 1 | 1 | 0 | No |
| **Professional** | $60,000 | 25 | 500 | 3 | 5 | 2 | No |
| **Advanced** | $100,000 | 50 | 1,500 | 5 | 10 | 5 | Yes |
| **Enterprise** | $150,000 | 100 | 5,000 | 10 | 25 | 10 | Yes |

### Per-Unit Pricing (Annual)

| Item | Price per Unit |
|------|----------------|
| Additional User | $500 |
| Additional Supplier | $10 |
| Additional Protocol | $5,000 |
| Additional Site | $2,000 |
| Additional Partner Type | $1,000 |

### Integration Add-Ons (Annual)

| Integration | Price | Availability |
|-------------|-------|--------------|
| ERP Integration | $15,000 | Advanced & Enterprise only |
| eSRS Support | $10,000 | Advanced & Enterprise only |
| Premium Support | $12,000 | All tiers |

### Multi-Year Contracts

The total price is calculated as: **Total Price = Annual Price × Contract Term (Years)**

Contract terms range from 1 to 5 years with no discount applied for longer terms.

---

## Calculation Formula Reference

### Annual Price Calculation

```
Annual Price = Base Price
             + (Excess Users × $500)
             + (Excess Suppliers × $10)
             + (Excess Protocols × $5,000)
             + (Excess Sites × $2,000)
             + (Excess Partner Types × $1,000)
             + ERP Integration (if selected and tier allows)
             + eSRS Support (if selected and tier allows)
             + Premium Support (if selected)
```

Where **Excess = Requested Quantity - Included Quantity** (minimum 0)

### Total Price Calculation

```
Total Price = Annual Price × Contract Term Years
```

---

## Test Environment Setup

### Prerequisites

Before beginning testing, ensure the following:

1. **Access to Admin Interface**
   - Navigate to `/admin/pricing` (Pricing Calculator)
   - Navigate to `/admin/quotes` (Quote History)
   - Verify authentication is working

2. **Environment Variables Configured**
   - `SENDGRID_API_KEY` - for email testing
   - `SENDGRID_FROM_EMAIL` - sender email address
   - `STRIPE_SECRET_KEY` - for invoice generation (test mode)
   - `DATABASE_URL` - database connection

3. **Testing Tools**
   - Calculator or spreadsheet for manual verification
   - Email client to verify automated emails
   - Stripe dashboard (test mode) to verify invoices
   - PDF viewer to verify proposal exports

4. **Test Data**
   - Valid customer email address for testing (use your own)
   - Access to database to verify quote storage

---

## Test Case Categories

This testing plan is organized into the following categories:

1. **Basic Tier Tests** - Verify calculations for Basic tier configurations
2. **Professional Tier Tests** - Verify calculations for Professional tier configurations
3. **Advanced Tier Tests** - Verify calculations for Advanced tier with integrations
4. **Enterprise Tier Tests** - Verify calculations for Enterprise tier with integrations
5. **Multi-Year Contract Tests** - Verify multi-year pricing calculations
6. **Integration Restriction Tests** - Verify integration restrictions by tier
7. **Edge Case Tests** - Verify boundary conditions and unusual inputs
8. **Quote Management Tests** - Verify save, load, and status update functionality
9. **Stripe Invoice Tests** - Verify Stripe invoice generation
10. **PDF Export Tests** - Verify PDF proposal generation
11. **Email Automation Tests** - Verify automated email delivery

---

## Detailed Test Cases

### Category 1: Basic Tier Tests

#### Test Case 1.1: Basic Tier - Minimum Configuration

**Objective:** Verify pricing for Basic tier with all included quantities (no overages).

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information:
   - Customer Name: `Test Customer A`
   - Customer Email: `your-email@example.com`
   - Industry: `Manufacturing`
   - Region: `North America`
3. Select tier: **Basic**
4. Set configuration:
   - Users: `10` (included)
   - Suppliers: `100` (included)
   - Protocols: `1` (included)
   - Sites: `1` (included)
   - Partner Types: `0` (included)
5. Set integrations:
   - ERP Integration: `OFF` (not allowed for Basic)
   - eSRS Support: `OFF` (not allowed for Basic)
   - Premium Support: `OFF`
6. Set contract term: `1 Year`
7. Review pricing breakdown

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Basic Tier (Base) | 1 | $25,000 | $25,000 |
| **Annual Price** | | | **$25,000** |
| **Total Price (1 Year)** | | | **$25,000** |

**Validation:**
- ✓ Annual Price = $25,000
- ✓ Total Price = $25,000
- ✓ No additional line items appear
- ✓ Integration toggles are disabled or hidden for Basic tier

---

#### Test Case 1.2: Basic Tier - Moderate Overages

**Objective:** Verify pricing for Basic tier with moderate usage beyond included quantities.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information (same as 1.1)
3. Select tier: **Basic**
4. Set configuration:
   - Users: `20` (10 excess)
   - Suppliers: `250` (150 excess)
   - Protocols: `2` (1 excess)
   - Sites: `3` (2 excess)
   - Partner Types: `1` (1 excess)
5. Set integrations:
   - ERP Integration: `OFF`
   - eSRS Support: `OFF`
   - Premium Support: `ON`
6. Set contract term: `1 Year`
7. Review pricing breakdown

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Basic Tier (Base) | 1 | $25,000 | $25,000 |
| Additional Users | 10 | $500 | $5,000 |
| Additional Suppliers | 150 | $10 | $1,500 |
| Additional Protocols | 1 | $5,000 | $5,000 |
| Additional Sites | 2 | $2,000 | $4,000 |
| Additional Partner Types | 1 | $1,000 | $1,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$53,500** |
| **Total Price (1 Year)** | | | **$53,500** |

**Manual Calculation Verification:**
```
Base: $25,000
Users: 10 × $500 = $5,000
Suppliers: 150 × $10 = $1,500
Protocols: 1 × $5,000 = $5,000
Sites: 2 × $2,000 = $4,000
Partner Types: 1 × $1,000 = $1,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $53,500
```

**Validation:**
- ✓ Annual Price = $53,500
- ✓ Each line item matches expected values
- ✓ Premium Support is available for Basic tier
- ✓ ERP and eSRS integrations remain unavailable

---

#### Test Case 1.3: Basic Tier - Maximum Realistic Configuration

**Objective:** Verify pricing for Basic tier with high usage (stress test).

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Basic**
4. Set configuration:
   - Users: `100` (90 excess)
   - Suppliers: `1000` (900 excess)
   - Protocols: `5` (4 excess)
   - Sites: `10` (9 excess)
   - Partner Types: `5` (5 excess)
5. Set integrations:
   - Premium Support: `ON`
6. Set contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Basic Tier (Base) | 1 | $25,000 | $25,000 |
| Additional Users | 90 | $500 | $45,000 |
| Additional Suppliers | 900 | $10 | $9,000 |
| Additional Protocols | 4 | $5,000 | $20,000 |
| Additional Sites | 9 | $2,000 | $18,000 |
| Additional Partner Types | 5 | $1,000 | $5,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$134,000** |
| **Total Price (1 Year)** | | | **$134,000** |

**Manual Calculation:**
```
Base: $25,000
Users: 90 × $500 = $45,000
Suppliers: 900 × $10 = $9,000
Protocols: 4 × $5,000 = $20,000
Sites: 9 × $2,000 = $18,000
Partner Types: 5 × $1,000 = $5,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $134,000
```

**Validation:**
- ✓ Annual Price = $134,000
- ✓ System handles large quantities correctly
- ✓ Note: At this configuration, customer should be recommended Advanced tier ($100K base)

---

### Category 2: Professional Tier Tests

#### Test Case 2.1: Professional Tier - Minimum Configuration

**Objective:** Verify pricing for Professional tier with included quantities only.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Professional**
4. Set configuration:
   - Users: `25` (included)
   - Suppliers: `500` (included)
   - Protocols: `3` (included)
   - Sites: `5` (included)
   - Partner Types: `2` (included)
5. No integrations enabled
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Professional Tier (Base) | 1 | $60,000 | $60,000 |
| **Annual Price** | | | **$60,000** |
| **Total Price (1 Year)** | | | **$60,000** |

**Validation:**
- ✓ Annual Price = $60,000
- ✓ Total Price = $60,000
- ✓ No additional charges

---

#### Test Case 2.2: Professional Tier - Moderate Overages

**Objective:** Verify Professional tier with moderate usage beyond included amounts.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Professional**
4. Set configuration:
   - Users: `40` (15 excess)
   - Suppliers: `800` (300 excess)
   - Protocols: `5` (2 excess)
   - Sites: `8` (3 excess)
   - Partner Types: `4` (2 excess)
5. Set integrations:
   - Premium Support: `ON`
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Professional Tier (Base) | 1 | $60,000 | $60,000 |
| Additional Users | 15 | $500 | $7,500 |
| Additional Suppliers | 300 | $10 | $3,000 |
| Additional Protocols | 2 | $5,000 | $10,000 |
| Additional Sites | 3 | $2,000 | $6,000 |
| Additional Partner Types | 2 | $1,000 | $2,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$100,500** |
| **Total Price (1 Year)** | | | **$100,500** |

**Manual Calculation:**
```
Base: $60,000
Users: 15 × $500 = $7,500
Suppliers: 300 × $10 = $3,000
Protocols: 2 × $5,000 = $10,000
Sites: 3 × $2,000 = $6,000
Partner Types: 2 × $1,000 = $2,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $100,500
```

**Validation:**
- ✓ Annual Price = $100,500
- ✓ All line items correct
- ✓ ERP and eSRS integrations unavailable for Professional tier

---

### Category 3: Advanced Tier Tests

#### Test Case 3.1: Advanced Tier - Minimum Configuration

**Objective:** Verify Advanced tier base pricing with included quantities.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Advanced**
4. Set configuration:
   - Users: `50` (included)
   - Suppliers: `1500` (included)
   - Protocols: `5` (included)
   - Sites: `10` (included)
   - Partner Types: `5` (included)
5. No integrations enabled
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Advanced Tier (Base) | 1 | $100,000 | $100,000 |
| **Annual Price** | | | **$100,000** |
| **Total Price (1 Year)** | | | **$100,000** |

**Validation:**
- ✓ Annual Price = $100,000
- ✓ ERP and eSRS integration toggles are available (but not selected)

---

#### Test Case 3.2: Advanced Tier - With All Integrations

**Objective:** Verify Advanced tier with all available integrations enabled.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Advanced**
4. Set configuration (use included amounts):
   - Users: `50`
   - Suppliers: `1500`
   - Protocols: `5`
   - Sites: `10`
   - Partner Types: `5`
5. Enable all integrations:
   - ERP Integration: `ON`
   - eSRS Support: `ON`
   - Premium Support: `ON`
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Advanced Tier (Base) | 1 | $100,000 | $100,000 |
| ERP Integration | 1 | $15,000 | $15,000 |
| eSRS Support | 1 | $10,000 | $10,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$137,000** |
| **Total Price (1 Year)** | | | **$137,000** |

**Manual Calculation:**
```
Base: $100,000
ERP Integration: $15,000
eSRS Support: $10,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $137,000
```

**Validation:**
- ✓ Annual Price = $137,000
- ✓ All three integrations appear in breakdown
- ✓ Integration toggles are functional for Advanced tier

---

#### Test Case 3.3: Advanced Tier - Celestica Configuration (Real-World Example)

**Objective:** Verify pricing for a realistic enterprise customer (Celestica use case).

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information:
   - Customer Name: `Celestica`
   - Customer Email: `procurement@celestica.com`
   - Industry: `Electronics Manufacturing`
   - Region: `Global`
3. Select tier: **Advanced**
4. Set configuration:
   - Users: `75` (25 excess)
   - Suppliers: `2000` (500 excess)
   - Protocols: `8` (3 excess)
   - Sites: `15` (5 excess)
   - Partner Types: `8` (3 excess)
5. Enable integrations:
   - ERP Integration: `ON`
   - eSRS Support: `ON`
   - Premium Support: `ON`
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Advanced Tier (Base) | 1 | $100,000 | $100,000 |
| Additional Users | 25 | $500 | $12,500 |
| Additional Suppliers | 500 | $10 | $5,000 |
| Additional Protocols | 3 | $5,000 | $15,000 |
| Additional Sites | 5 | $2,000 | $10,000 |
| Additional Partner Types | 3 | $1,000 | $3,000 |
| ERP Integration | 1 | $15,000 | $15,000 |
| eSRS Support | 1 | $10,000 | $10,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$182,500** |
| **Total Price (1 Year)** | | | **$182,500** |

**Manual Calculation:**
```
Base: $100,000
Users: 25 × $500 = $12,500
Suppliers: 500 × $10 = $5,000
Protocols: 3 × $5,000 = $15,000
Sites: 5 × $2,000 = $10,000
Partner Types: 3 × $1,000 = $3,000
ERP Integration: $15,000
eSRS Support: $10,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $182,500
```

**Validation:**
- ✓ Annual Price = $182,500
- ✓ All line items match expected values
- ✓ This is a realistic enterprise configuration

---

### Category 4: Enterprise Tier Tests

#### Test Case 4.1: Enterprise Tier - Minimum Configuration

**Objective:** Verify Enterprise tier base pricing.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Enterprise**
4. Set configuration (use included amounts):
   - Users: `100`
   - Suppliers: `5000`
   - Protocols: `10`
   - Sites: `25`
   - Partner Types: `10`
5. No integrations enabled
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Enterprise Tier (Base) | 1 | $150,000 | $150,000 |
| **Annual Price** | | | **$150,000** |
| **Total Price (1 Year)** | | | **$150,000** |

**Validation:**
- ✓ Annual Price = $150,000

---

#### Test Case 4.2: Enterprise Tier - Full Configuration

**Objective:** Verify Enterprise tier with overages and all integrations.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Enterprise**
4. Set configuration:
   - Users: `150` (50 excess)
   - Suppliers: `7500` (2500 excess)
   - Protocols: `15` (5 excess)
   - Sites: `40` (15 excess)
   - Partner Types: `15` (5 excess)
5. Enable all integrations:
   - ERP Integration: `ON`
   - eSRS Support: `ON`
   - Premium Support: `ON`
6. Contract term: `1 Year`

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Enterprise Tier (Base) | 1 | $150,000 | $150,000 |
| Additional Users | 50 | $500 | $25,000 |
| Additional Suppliers | 2,500 | $10 | $25,000 |
| Additional Protocols | 5 | $5,000 | $25,000 |
| Additional Sites | 15 | $2,000 | $30,000 |
| Additional Partner Types | 5 | $1,000 | $5,000 |
| ERP Integration | 1 | $15,000 | $15,000 |
| eSRS Support | 1 | $10,000 | $10,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$297,000** |
| **Total Price (1 Year)** | | | **$297,000** |

**Manual Calculation:**
```
Base: $150,000
Users: 50 × $500 = $25,000
Suppliers: 2,500 × $10 = $25,000
Protocols: 5 × $5,000 = $25,000
Sites: 15 × $2,000 = $30,000
Partner Types: 5 × $1,000 = $5,000
ERP Integration: $15,000
eSRS Support: $10,000
Premium Support: $12,000
─────────────────────────────
Annual Total: $297,000
```

**Validation:**
- ✓ Annual Price = $297,000
- ✓ All line items correct

---

### Category 5: Multi-Year Contract Tests

#### Test Case 5.1: Basic Tier - 3-Year Contract

**Objective:** Verify multi-year pricing calculation (no discount applied).

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Basic**
4. Set configuration:
   - Users: `15` (5 excess)
   - Suppliers: `150` (50 excess)
   - Protocols: `2` (1 excess)
   - Sites: `2` (1 excess)
   - Partner Types: `1` (1 excess)
5. Enable Premium Support: `ON`
6. Set contract term: **3 Years**

**Expected Results:**

| Line Item | Quantity | Unit Price | Total |
|-----------|----------|------------|-------|
| Basic Tier (Base) | 1 | $25,000 | $25,000 |
| Additional Users | 5 | $500 | $2,500 |
| Additional Suppliers | 50 | $10 | $500 |
| Additional Protocols | 1 | $5,000 | $5,000 |
| Additional Sites | 1 | $2,000 | $2,000 |
| Additional Partner Types | 1 | $1,000 | $1,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$48,000** |
| **Total Price (3 Years)** | | | **$144,000** |

**Manual Calculation:**
```
Annual Price: $48,000
Contract Term: 3 years
─────────────────────────────
Total Price: $48,000 × 3 = $144,000
```

**Validation:**
- ✓ Annual Price = $48,000
- ✓ Total Price = $144,000 (exactly 3× annual)
- ✓ No multi-year discount applied

---

#### Test Case 5.2: Advanced Tier - 5-Year Contract

**Objective:** Verify maximum contract term calculation.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer information
3. Select tier: **Advanced**
4. Set configuration (use included amounts):
   - Users: `50`
   - Suppliers: `1500`
   - Protocols: `5`
   - Sites: `10`
   - Partner Types: `5`
5. Enable all integrations:
   - ERP Integration: `ON`
   - eSRS Support: `ON`
   - Premium Support: `ON`
6. Set contract term: **5 Years**

**Expected Results:**

| Line Item | Quantity | Unit Price | Total (Annual) |
|-----------|----------|------------|----------------|
| Advanced Tier (Base) | 1 | $100,000 | $100,000 |
| ERP Integration | 1 | $15,000 | $15,000 |
| eSRS Support | 1 | $10,000 | $10,000 |
| Premium Support | 1 | $12,000 | $12,000 |
| **Annual Price** | | | **$137,000** |
| **Total Price (5 Years)** | | | **$685,000** |

**Manual Calculation:**
```
Annual Price: $137,000
Contract Term: 5 years
─────────────────────────────
Total Price: $137,000 × 5 = $685,000
```

**Validation:**
- ✓ Annual Price = $137,000
- ✓ Total Price = $685,000 (exactly 5× annual)
- ✓ System accepts 5-year term

---

### Category 6: Integration Restriction Tests

#### Test Case 6.1: Basic Tier - Integration Restrictions

**Objective:** Verify that ERP and eSRS integrations are not available for Basic tier.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Basic**
3. Attempt to enable integrations:
   - ERP Integration: Should be disabled/unavailable
   - eSRS Support: Should be disabled/unavailable
   - Premium Support: Should be available

**Expected Results:**
- ✓ ERP Integration toggle is disabled or hidden
- ✓ eSRS Support toggle is disabled or hidden
- ✓ Premium Support toggle is available and functional
- ✓ UI clearly indicates which integrations are unavailable

**Validation:**
- ✓ User cannot accidentally enable restricted integrations
- ✓ Error message or visual indicator explains restriction

---

#### Test Case 6.2: Professional Tier - Integration Restrictions

**Objective:** Verify that ERP and eSRS integrations are not available for Professional tier.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Professional**
3. Attempt to enable integrations:
   - ERP Integration: Should be disabled/unavailable
   - eSRS Support: Should be disabled/unavailable
   - Premium Support: Should be available

**Expected Results:**
- ✓ ERP Integration toggle is disabled or hidden
- ✓ eSRS Support toggle is disabled or hidden
- ✓ Premium Support toggle is available
- ✓ UI indicates Advanced/Enterprise tiers required for ERP/eSRS

---

#### Test Case 6.3: Advanced Tier - All Integrations Available

**Objective:** Verify that all integrations are available for Advanced tier.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Advanced**
3. Verify all integration toggles are enabled:
   - ERP Integration: Available
   - eSRS Support: Available
   - Premium Support: Available

**Expected Results:**
- ✓ All three integration toggles are functional
- ✓ Toggling each integration updates pricing correctly
- ✓ No restrictions or warnings displayed

---

### Category 7: Edge Case Tests

#### Test Case 7.1: Zero Overages

**Objective:** Verify that quantities exactly matching included amounts result in no additional charges.

**Test Steps:**

1. For each tier (Basic, Professional, Advanced, Enterprise):
2. Set configuration to exactly match included quantities
3. Verify no additional line items appear

**Expected Results:**
- ✓ Only base price appears in breakdown
- ✓ No "Additional X" line items
- ✓ Annual Price = Base Price

---

#### Test Case 7.2: One Unit Below Included Amount

**Objective:** Verify that quantities below included amounts don't cause errors or negative charges.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Professional** (25 users included)
3. Set Users: `20` (5 below included)
4. Set other quantities to included amounts

**Expected Results:**
- ✓ No "Additional Users" line item appears
- ✓ No negative charges
- ✓ Annual Price = Base Price
- ✓ System handles below-included quantities gracefully

---

#### Test Case 7.3: Very Large Quantities

**Objective:** Verify system handles extremely large quantities without errors.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Enterprise**
3. Set configuration:
   - Users: `10,000`
   - Suppliers: `50,000`
   - Protocols: `100`
   - Sites: `500`
   - Partner Types: `100`
4. Enable all integrations
5. Contract term: `5 Years`

**Expected Results:**

**Annual Price Calculation:**
```
Base: $150,000
Users: (10,000 - 100) × $500 = $4,950,000
Suppliers: (50,000 - 5,000) × $10 = $450,000
Protocols: (100 - 10) × $5,000 = $450,000
Sites: (500 - 25) × $2,000 = $950,000
Partner Types: (100 - 10) × $1,000 = $90,000
ERP Integration: $15,000
eSRS Support: $10,000
Premium Support: $12,000
─────────────────────────────
Annual: $7,077,000
Total (5 years): $35,385,000
```

**Validation:**
- ✓ System calculates large numbers correctly
- ✓ No integer overflow errors
- ✓ Annual Price = $7,077,000
- ✓ Total Price = $35,385,000
- ✓ UI displays large numbers with proper formatting (commas)

---

#### Test Case 7.4: Zero Quantities (Minimum Configuration)

**Objective:** Verify system handles zero quantities without errors.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Select tier: **Basic**
3. Set all quantities to `0`:
   - Users: `0`
   - Suppliers: `0`
   - Protocols: `0`
   - Sites: `0`
   - Partner Types: `0`
4. No integrations enabled
5. Contract term: `1 Year`

**Expected Results:**
- ✓ System accepts zero quantities
- ✓ Annual Price = $25,000 (base price only)
- ✓ No errors or warnings
- ✓ Note: This is technically valid but unusual—consider adding a warning that customer is paying for unused capacity

---

#### Test Case 7.5: Missing Customer Email

**Objective:** Verify system behavior when customer email is not provided.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Enter customer name but leave email blank
3. Configure pricing and attempt to save quote

**Expected Results:**
- ✓ System allows saving quote without email
- ✓ Warning displayed that email is required for automated delivery
- ✓ Quote can be saved with status "draft"
- ✓ Attempting to change status to "sent" shows error or warning about missing email

---

### Category 8: Quote Management Tests

#### Test Case 8.1: Save Quote

**Objective:** Verify quote can be saved to database.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Configure a quote (use Test Case 3.3 Celestica configuration)
3. Add notes: `Initial quote for Celestica - Q1 2026 opportunity`
4. Click **Save Quote** button
5. Verify success message appears
6. Note the Quote ID displayed

**Expected Results:**
- ✓ Success message: "Quote saved successfully"
- ✓ Quote ID is displayed (e.g., "Quote #1")
- ✓ Quote appears in database
- ✓ All configuration details are stored correctly

**Database Verification:**
- Navigate to `/admin/quotes`
- Verify new quote appears in list
- Verify all details match: customer name, email, tier, annual price, total price, status (draft)

---

#### Test Case 8.2: Load Saved Quote

**Objective:** Verify saved quote can be loaded and displays correctly.

**Test Steps:**

1. Navigate to `/admin/quotes`
2. Locate the quote saved in Test Case 8.1
3. Click on the quote or use "Load" action
4. Verify calculator loads with saved configuration

**Expected Results:**
- ✓ All customer information populated correctly
- ✓ Tier selection matches saved quote
- ✓ All configuration values match saved quote
- ✓ Integration toggles match saved state
- ✓ Contract term matches saved quote
- ✓ Pricing breakdown recalculates and matches saved amounts
- ✓ Notes field displays saved notes

---

#### Test Case 8.3: Update Quote Status

**Objective:** Verify quote status can be updated through Quote History dashboard.

**Test Steps:**

1. Navigate to `/admin/quotes`
2. Locate a quote with status "draft"
3. Click status dropdown
4. Select status: **sent**
5. Verify status update

**Expected Results:**
- ✓ Status updates immediately in UI
- ✓ Status badge changes color/appearance
- ✓ Database record updated
- ✓ If customer email exists, automated email is triggered (see Test Case 11.1)

---

#### Test Case 8.4: Quote History Filtering

**Objective:** Verify filtering functionality in Quote History dashboard.

**Test Steps:**

1. Create multiple test quotes with different:
   - Customer names
   - Tiers (Basic, Professional, Advanced, Enterprise)
   - Statuses (draft, sent, accepted, rejected)
2. Navigate to `/admin/quotes`
3. Test search functionality:
   - Search by customer name
   - Search by customer email
4. Test status filter:
   - Filter by "draft"
   - Filter by "sent"
   - Filter by "accepted"
   - Filter by "rejected"
   - Filter by "All Statuses"
5. Test tier filter:
   - Filter by each tier
   - Filter by "All Tiers"
6. Test combined filters (e.g., Advanced tier + sent status)

**Expected Results:**
- ✓ Search returns matching quotes only
- ✓ Status filter shows only quotes with selected status
- ✓ Tier filter shows only quotes with selected tier
- ✓ Combined filters work correctly (AND logic)
- ✓ "Clear Filters" button resets all filters
- ✓ Quote count updates based on filters

---

#### Test Case 8.5: Quote History Pagination

**Objective:** Verify pagination works correctly with 25 quotes per page.

**Test Steps:**

1. Create 30+ test quotes
2. Navigate to `/admin/quotes`
3. Verify first page shows 25 quotes
4. Navigate to page 2
5. Verify remaining quotes appear

**Expected Results:**
- ✓ Page 1 displays exactly 25 quotes
- ✓ Page 2 displays remaining quotes
- ✓ Pagination controls are functional
- ✓ Total quote count is accurate
- ✓ Sorting is consistent across pages

---

### Category 9: Stripe Invoice Tests

#### Test Case 9.1: Generate Stripe Invoice - Basic Configuration

**Objective:** Verify Stripe invoice generation for a saved quote.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Configure a quote (use Test Case 1.2 configuration)
3. Ensure customer email is provided
4. Click **Save Quote** button
5. Click **Generate Stripe Invoice** button
6. Wait for confirmation message
7. Note the Stripe invoice URL provided

**Expected Results:**
- ✓ Success message: "Stripe invoice created successfully"
- ✓ Stripe invoice URL is displayed
- ✓ Invoice URL is clickable and opens Stripe hosted invoice page

**Stripe Dashboard Verification:**
1. Log into Stripe Dashboard (test mode)
2. Navigate to Invoices
3. Locate the newly created invoice
4. Verify invoice details:
   - Customer email matches
   - Line items match pricing breakdown
   - Total amount matches quote total
   - Currency is USD
   - Invoice is in "draft" status (not sent automatically)

**Validation:**
- ✓ Invoice created in Stripe test mode
- ✓ All line items present and accurate
- ✓ Total matches quote total exactly
- ✓ Customer information correct

---

#### Test Case 9.2: Generate Stripe Invoice - Complex Configuration

**Objective:** Verify Stripe invoice generation for complex quote with multiple line items.

**Test Steps:**

1. Use Test Case 3.3 (Celestica configuration)
2. Save quote
3. Generate Stripe invoice
4. Verify in Stripe dashboard

**Expected Results:**
- ✓ Invoice created successfully
- ✓ All 9 line items appear in Stripe invoice:
  1. Advanced Tier (Base) - $100,000
  2. Additional Users (25) - $12,500
  3. Additional Suppliers (500) - $5,000
  4. Additional Protocols (3) - $15,000
  5. Additional Sites (5) - $10,000
  6. Additional Partner Types (3) - $3,000
  7. ERP Integration - $15,000
  8. eSRS Support - $10,000
  9. Premium Support - $12,000
- ✓ Total: $182,500

---

#### Test Case 9.3: Stripe Invoice Error Handling

**Objective:** Verify system handles Stripe API errors gracefully.

**Test Steps:**

1. Temporarily disable Stripe API key (set to invalid value)
2. Attempt to generate invoice
3. Verify error handling

**Expected Results:**
- ✓ Error message displayed to user
- ✓ Error message is clear and actionable
- ✓ System doesn't crash
- ✓ Quote remains saved in database
- ✓ User can retry after fixing configuration

---

### Category 10: PDF Export Tests

#### Test Case 10.1: Export PDF Proposal - Basic Quote

**Objective:** Verify PDF proposal generation and download.

**Test Steps:**

1. Navigate to `/admin/pricing`
2. Configure a quote (use Test Case 1.2)
3. Click **Export PDF Proposal** button
4. Wait for PDF download
5. Open PDF in viewer

**Expected Results:**

**PDF Content Verification:**
- ✓ PDF downloads successfully
- ✓ Filename format: `intelleges-proposal-[quote-id].pdf`
- ✓ PDF opens without errors

**PDF Layout Verification:**
- ✓ Intelleges branding/logo present
- ✓ Quote ID displayed
- ✓ Customer information section:
  - Customer name
  - Customer email
  - Industry
  - Region
- ✓ Tier information clearly displayed
- ✓ Pricing breakdown table with all line items
- ✓ Annual price prominently displayed
- ✓ Total price prominently displayed
- ✓ Contract term noted
- ✓ Features list for selected tier
- ✓ Date generated
- ✓ Professional formatting and layout

---

#### Test Case 10.2: Export PDF Proposal - Complex Quote

**Objective:** Verify PDF handles complex quotes with many line items.

**Test Steps:**

1. Use Test Case 3.3 (Celestica configuration)
2. Export PDF proposal
3. Review PDF content

**Expected Results:**
- ✓ All 9 line items appear in pricing table
- ✓ Table formatting is clean and readable
- ✓ Numbers formatted with currency symbols and commas
- ✓ Page layout accommodates all content (no overflow)
- ✓ Multi-page PDF if needed (with page numbers)

---

#### Test Case 10.3: PDF Generation Error Handling

**Objective:** Verify system handles PDF generation errors.

**Test Steps:**

1. Test with wkhtmltopdf not installed (simulate failure)
2. Attempt to export PDF
3. Verify error handling

**Expected Results:**
- ✓ Error message displayed to user
- ✓ Error logged on server
- ✓ System doesn't crash
- ✓ User can retry or use alternative (Stripe invoice)

---

### Category 11: Email Automation Tests

#### Test Case 11.1: Automated Email Delivery - Status Change to "Sent"

**Objective:** Verify automated email is sent when quote status changes to "sent".

**Test Steps:**

1. Create and save a quote with valid customer email (use your own email for testing)
2. Navigate to `/admin/quotes`
3. Locate the quote (status should be "draft")
4. Change status to **sent** using dropdown
5. Wait for confirmation
6. Check email inbox

**Expected Results:**

**System Response:**
- ✓ Status update succeeds
- ✓ Confirmation message indicates email was sent
- ✓ Quote status displays as "sent" in dashboard

**Email Verification:**
- ✓ Email received within 1-2 minutes
- ✓ From address: Configured SENDGRID_FROM_EMAIL (e.g., sales@intelleges.com)
- ✓ Subject line: `Your Intelleges [Tier] Tier Quote - #[Quote ID]`
- ✓ Email contains:
  - Professional HTML formatting
  - Intelleges branding
  - Customer name in greeting
  - Quote summary (ID, tier, annual price, term, total)
  - PDF attachment
  - Call-to-action button (Schedule a Demo)
  - Contact information
  - Trust badges (ISO 27001, Battelle Supplier of the Year)

**PDF Attachment Verification:**
- ✓ PDF is attached to email
- ✓ Filename: `intelleges-proposal-[quote-id].pdf`
- ✓ PDF opens correctly
- ✓ PDF content matches quote details

---

#### Test Case 11.2: Email Not Sent for Other Status Changes

**Objective:** Verify email is only sent when status changes to "sent", not for other statuses.

**Test Steps:**

1. Create and save a quote
2. Change status to "accepted" - verify no email sent
3. Change status to "rejected" - verify no email sent
4. Change status back to "draft" - verify no email sent

**Expected Results:**
- ✓ No emails sent for status changes other than "sent"
- ✓ Status updates succeed without email delivery

---

#### Test Case 11.3: Email Error Handling - Missing Customer Email

**Objective:** Verify system handles missing customer email gracefully.

**Test Steps:**

1. Create and save a quote WITHOUT customer email
2. Navigate to `/admin/quotes`
3. Attempt to change status to "sent"

**Expected Results:**
- ✓ Status update succeeds (quote marked as "sent")
- ✓ Warning message: "Email not sent - customer email missing"
- ✓ System doesn't crash
- ✓ Error logged on server

---

#### Test Case 11.4: Email Error Handling - SendGrid Failure

**Objective:** Verify system handles SendGrid API errors gracefully.

**Test Steps:**

1. Temporarily disable SendGrid API key (set to invalid value)
2. Create and save a quote with valid email
3. Change status to "sent"

**Expected Results:**
- ✓ Status update succeeds (quote marked as "sent")
- ✓ Error message: "Status updated but email failed to send"
- ✓ Error details logged on server
- ✓ System doesn't crash
- ✓ Admin can manually resend or use alternative delivery method

---

#### Test Case 11.5: Email Content Verification - Plain Text Fallback

**Objective:** Verify plain text version of email is included for email clients that don't support HTML.

**Test Steps:**

1. Send test email (use Test Case 11.1)
2. View email source/raw content
3. Verify plain text version exists

**Expected Results:**
- ✓ Email includes both HTML and plain text versions
- ✓ Plain text version contains all key information:
  - Customer greeting
  - Quote summary
  - Attachment notice
  - Contact information
- ✓ Plain text is readable and well-formatted

---

## Integration Testing

### Test Case INT-1: End-to-End Quote Workflow

**Objective:** Verify complete quote lifecycle from creation to email delivery.

**Test Steps:**

1. **Create Quote:**
   - Navigate to `/admin/pricing`
   - Configure quote (use Test Case 3.3 Celestica)
   - Add notes
   - Click Save Quote
   - Verify success message and note Quote ID

2. **Verify Quote in History:**
   - Navigate to `/admin/quotes`
   - Locate saved quote
   - Verify all details correct
   - Verify status is "draft"

3. **Generate Stripe Invoice:**
   - From Quote History, click "Generate Invoice" (or return to calculator)
   - Verify invoice created in Stripe
   - Note invoice URL

4. **Export PDF:**
   - Click "Export PDF"
   - Download and verify PDF content

5. **Send to Customer:**
   - Change quote status to "sent"
   - Verify email sent
   - Check email inbox
   - Verify PDF attached

6. **Customer Response:**
   - Change status to "accepted"
   - Verify no additional email sent

**Expected Results:**
- ✓ All steps complete without errors
- ✓ Quote data consistent across all touchpoints
- ✓ Stripe invoice matches calculator
- ✓ PDF matches calculator
- ✓ Email matches calculator
- ✓ Status transitions work correctly

---

### Test Case INT-2: Multiple Quotes Workflow

**Objective:** Verify system handles multiple concurrent quotes correctly.

**Test Steps:**

1. Create 5 different quotes with varying configurations
2. Save all quotes
3. Generate Stripe invoices for 3 of them
4. Export PDFs for 2 of them
5. Send 1 quote via email
6. Update statuses on 2 quotes
7. Filter and search in Quote History

**Expected Results:**
- ✓ All quotes stored correctly
- ✓ No data cross-contamination between quotes
- ✓ Each quote maintains its own configuration
- ✓ Filtering and searching work correctly
- ✓ Status updates don't affect other quotes

---

## Validation Checklist

Use this checklist to verify all critical functionality:

### Pricing Accuracy
- [ ] Basic tier base price = $25,000
- [ ] Professional tier base price = $60,000
- [ ] Advanced tier base price = $100,000
- [ ] Enterprise tier base price = $150,000
- [ ] Additional user = $500
- [ ] Additional supplier = $10
- [ ] Additional protocol = $5,000
- [ ] Additional site = $2,000
- [ ] Additional partner type = $1,000
- [ ] ERP integration = $15,000
- [ ] eSRS support = $10,000
- [ ] Premium support = $12,000
- [ ] Multi-year calculation = Annual × Years (no discount)

### Tier Restrictions
- [ ] Basic tier: No ERP/eSRS integrations
- [ ] Professional tier: No ERP/eSRS integrations
- [ ] Advanced tier: All integrations available
- [ ] Enterprise tier: All integrations available
- [ ] Premium Support available for all tiers

### UI Functionality
- [ ] Tier selection updates included quantities
- [ ] Configuration inputs accept valid numbers
- [ ] Integration toggles work correctly
- [ ] Contract term dropdown (1-5 years)
- [ ] Real-time pricing calculation
- [ ] Pricing breakdown displays all line items
- [ ] Currency formatting ($ and commas)

### Quote Management
- [ ] Save quote stores all data correctly
- [ ] Load quote restores configuration
- [ ] Quote History displays all quotes
- [ ] Search by customer name/email works
- [ ] Status filter works
- [ ] Tier filter works
- [ ] Pagination works (25 per page)
- [ ] Status update works

### Stripe Integration
- [ ] Invoice created in Stripe test mode
- [ ] All line items appear in invoice
- [ ] Total matches quote total
- [ ] Customer email correct
- [ ] Invoice URL provided

### PDF Export
- [ ] PDF downloads successfully
- [ ] PDF contains all quote details
- [ ] PDF formatting is professional
- [ ] PDF matches pricing breakdown

### Email Automation
- [ ] Email sent when status changes to "sent"
- [ ] Email contains quote summary
- [ ] PDF attached to email
- [ ] Email formatting is professional
- [ ] No email sent for other status changes
- [ ] Error handling for missing email
- [ ] Error handling for SendGrid failure

---

## Known Limitations

1. **No Multi-Year Discounts:** The system currently applies no discount for longer contract terms. This is intentional but may need to be revised based on sales strategy.

2. **Integration Restrictions:** ERP and eSRS integrations are only available for Advanced and Enterprise tiers. This is a business rule enforced in the code.

3. **Currency Support:** Currently only USD is supported. Multi-currency support would require additional development.

4. **No Quote Expiration:** Quotes do not have expiration dates. Consider adding a 30-day validity period.

5. **No Approval Workflow:** Quotes can be sent directly without approval. Consider adding approval workflow for large quotes.

6. **No Quote Versioning:** Editing a quote overwrites the previous version. Consider adding version history.

7. **Email Retry:** If email sending fails, there's no automatic retry mechanism. Admin must manually resend.

8. **PDF Generation Dependency:** PDF export requires wkhtmltopdf to be installed on the server. If not available, feature will fail.

---

## Conclusion

This testing plan provides comprehensive coverage of the Intelleges pricing calculator system. **Accuracy is critical**—any pricing errors can damage customer trust and result in financial losses.

### Testing Priorities

**Priority 1 (Critical):**
- All pricing calculation tests (Categories 1-5)
- Integration restriction tests (Category 6)
- Quote save/load functionality

**Priority 2 (High):**
- Stripe invoice generation
- PDF export
- Email automation

**Priority 3 (Medium):**
- Quote History filtering and pagination
- Edge case handling
- Error handling

### Recommended Testing Frequency

- **Before Production Deployment:** Complete all test cases
- **After Pricing Changes:** Re-run all pricing calculation tests (Categories 1-5)
- **After Code Changes:** Re-run affected test categories
- **Monthly:** Spot-check 5-10 random test cases
- **Quarterly:** Full regression testing

### Sign-Off

Before deploying to production, ensure:
- [ ] All Priority 1 tests pass
- [ ] All Priority 2 tests pass
- [ ] At least 80% of Priority 3 tests pass
- [ ] All critical pricing calculations verified manually
- [ ] Stripe test mode invoices reviewed
- [ ] PDF exports reviewed for formatting
- [ ] Test emails received and reviewed
- [ ] Database backups configured
- [ ] Error logging and monitoring in place

---

**Document End**
