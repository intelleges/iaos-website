# Enterprise Plan Configurator Integration Notes

## Overview
This document describes the integration of the Enterprise Plan Configurator into the existing Intelleges marketing website.

## Changes Made

### 1. New Files Added

#### `/client/src/lib/pricingConfig.ts`
- Pricing configuration data for all 4 tiers (Starter, Foundation, Generation 1, Generation 2)
- Protocol definitions organized by category
- User, supplier, and group options for dropdowns

#### `/client/src/lib/recommendationEngine.ts`
- Business logic for tier recommendations
- Calculates optimal tier based on user inputs
- Generates warnings when capacity is exceeded

#### `/client/src/components/ProposalModal.tsx`
- Modal component for collecting user information
- Form validation for proposal requests
- Integrates with recommendation system

#### `/client/src/components/EnterprisePlanConfigurator.tsx`
- Main configurator component
- Configuration inputs (users, suppliers, groups, protocols, multi-jurisdiction)
- Live recommendation card
- 4-column comparison table
- Accordion-based detailed breakdown

### 2. Modified Files

#### `/client/src/pages/Pricing.tsx`
**Before:**
```tsx
export default function Pricing() {
  return (
    <>
      <SEO title="Pricing" description="..." />
      <PricingSection />
    </>
  );
}
```

**After:**
```tsx
export default function Pricing() {
  const [activeTab, setActiveTab] = useState("enterprise");

  return (
    <>
      <SEO title="Pricing" description="..." />
      <div className="w-full bg-background py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="enterprise">Enterprise Plans</TabsTrigger>
              <TabsTrigger value="basic">Basic Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="enterprise">
              <EnterprisePlanConfigurator />
            </TabsContent>
            
            <TabsContent value="basic">
              <PricingSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
```

## Features Implemented

### Configuration Inputs
- **Users**: Dropdown with options (3, 25, 50, 100, 250, 500, 750+)
- **Suppliers**: Dropdown with options (500, 1K, 3K, 10K, 25K, Unlimited)
- **Groups/Sites**: Dropdown with options (5, 10, 25, 50, 100, Unlimited)
- **Protocols**: Multi-select with grouped categories
  - Risk Mitigation
  - Revenue Enablement
  - Operational Optimization
  - Procurement Team
- **Multi-Jurisdiction**: Toggle switch with helper text

### Live Recommendation Engine
- Updates in real-time as inputs change
- Shows recommended tier with "Best Fit" badge
- Displays annual pricing
- Lists included capacities
- Shows selected protocols as chips
- Displays key features
- Amber warning banner when capacity is exceeded

### Plan Comparison
- **4-Column Table**: Side-by-side comparison with checkmarks
  - Capacity metrics (users, suppliers, groups, protocols)
  - Features (compliance tracking, RBAC, analytics, etc.)
  - Support levels
- **Accordion**: Detailed breakdown of each tier
  - Expandable rows
  - Capacity and features listed

### Call-to-Actions
- **Request Proposal**: Opens modal to collect user information
- **Download Plan Comparison**: Downloads text file (ready for PDF upgrade)

### Accessibility
- Protocol selection uses accessible buttons with ARIA attributes
- Keyboard navigation supported (arrow keys, Enter, ESC)
- Click-outside to close protocol picker
- Proper focus management

## Pricing Tiers

| Tier | Annual Price | Users | Suppliers | Groups | Protocols |
|------|-------------|-------|-----------|--------|-----------|
| Enterprise Starter | $25,000 | 3 | 500 | 5 | 1 |
| Enterprise Foundation | $125,000 | 25 | 3,000 | 25 | 5 |
| Enterprise Generation 1 | $500,000 | 250 | 25,000 | 100 | 15 |
| Enterprise Generation 2 | $1,500,000 | 750+ | Unlimited | Unlimited | Unlimited |

## Testing Checklist

- [ ] Verify tabs switch correctly between Enterprise and Basic plans
- [ ] Test all dropdown selections update recommendation
- [ ] Test protocol multi-select (select/deselect, click outside, ESC key)
- [ ] Verify multi-jurisdiction toggle forces highest tier
- [ ] Test proposal modal form validation
- [ ] Test download functionality
- [ ] Verify responsive layout on mobile
- [ ] Test keyboard navigation
- [ ] Verify all links and buttons work
- [ ] Check color contrast for accessibility

## Deployment Instructions

1. **Install dependencies** (if not already installed):
   ```bash
   pnpm install
   ```

2. **Build the project**:
   ```bash
   pnpm build
   ```

3. **Test locally**:
   ```bash
   pnpm dev
   ```

4. **Deploy to production**:
   - Push changes to GitHub repository
   - Manus platform will auto-deploy from main branch

## Future Enhancements

1. **PDF Generation**: Replace text file download with actual PDF using jsPDF or backend service
2. **CRM Integration**: Connect proposal modal to Salesforce/HubSpot API
3. **Usage Scenarios**: Add preset configurations for different industries
4. **Analytics**: Track which configurations users select most often
5. **A/B Testing**: Test different pricing presentations
6. **Monthly Pricing**: Add toggle to show monthly payment options

## Notes

- The configurator uses the existing Intelleges color palette and typography
- All components are built with shadcn/ui for consistency
- The recommendation engine is client-side (no backend required)
- The existing PricingSection component remains unchanged in the "Basic Plans" tab
