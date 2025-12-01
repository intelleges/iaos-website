/**
 * Automated Pricing Calculator Test Suite
 * Based on: Intelleges_Pricing_Calculator_Test_Plan_v2.docx
 * 
 * This script validates all pricing calculations against the standardized test configurations
 */

import { calculatePricing, type PricingRequest } from './server/lib/pricingCalculator';

interface TestCase {
  name: string;
  config: PricingRequest;
  expectedAnnual: number;
  expectedTotal?: number;
  description: string;
}

const testCases: TestCase[] = [
  // Config A: Basic Tier - Minimum
  {
    name: 'A.1.1 - Basic Tier Minimum',
    description: 'Basic tier with all included quantities (no overages)',
    config: {
      tier: 'Basic',
      customerName: 'Test Customer A',
      customerEmail: 'test-a@example.com',
      users: 10,
      suppliers: 100,
      protocols: 1,
      sites: 1,
      partnerTypes: 0,
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: false,
      termYears: 1,
    },
    expectedAnnual: 25000,
    expectedTotal: 25000,
  },

  // Config A.1.2: Basic Tier - With Overages and Premium Support
  {
    name: 'A.1.2 - Basic Tier With Overages',
    description: 'Basic tier with moderate usage beyond included quantities',
    config: {
      tier: 'Basic',
      customerName: 'Test Customer A2',
      customerEmail: 'test-a2@example.com',
      users: 20, // 10 excess
      suppliers: 250, // 150 excess
      protocols: 2, // 1 excess
      sites: 3, // 2 excess
      partnerTypes: 1, // 1 excess
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: true,
      termYears: 1,
    },
    expectedAnnual: 53500,
    // $25,000 + $5,000 + $1,500 + $5,000 + $4,000 + $1,000 + $12,000
    expectedTotal: 53500,
  },

  // Config B: Professional Tier - With Overages
  {
    name: 'A.2.2 - Professional Tier Moderate Overages',
    description: 'Professional tier with moderate usage (Config B from test plan)',
    config: {
      tier: 'Professional',
      customerName: 'Test Customer B',
      customerEmail: 'test-b@example.com',
      users: 40, // 15 excess
      suppliers: 800, // 300 excess
      protocols: 5, // 2 excess
      sites: 8, // 3 excess
      partnerTypes: 4, // 2 excess
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: true,
      termYears: 1,
    },
    expectedAnnual: 100500,
    // $60,000 + (15×$500) + (300×$10) + (2×$5,000) + (3×$2,000) + (2×$1,000) + $12,000
    expectedTotal: 100500,
  },

  // Config C: Advanced Tier - Celestica Configuration
  {
    name: 'A.3.3 - Advanced Tier Celestica',
    description: 'Critical real-world enterprise configuration (Config C)',
    config: {
      tier: 'Advanced',
      customerName: 'Celestica',
      customerEmail: 'celestica@example.com',
      users: 75, // 25 excess
      suppliers: 2000, // 500 excess
      protocols: 8, // 3 excess
      sites: 15, // 5 excess
      partnerTypes: 8, // 3 excess
      erpIntegration: true,
      esrsSupport: true,
      supportPremium: true,
      termYears: 1,
    },
    expectedAnnual: 182500,
    // $100,000 + (25×$500) + (500×$10) + (3×$5,000) + (5×$2,000) + (3×$1,000) + $15,000 + $10,000 + $12,000
    expectedTotal: 182500,
  },

  // Config D: Enterprise Tier - 3-Year Contract
  {
    name: 'A.5.2 - Enterprise 3-Year Contract',
    description: 'Enterprise tier with all integrations, 3-year term (Config D)',
    config: {
      tier: 'Enterprise',
      customerName: 'Test Customer D',
      customerEmail: 'test-d@example.com',
      users: 100, // all included
      suppliers: 5000, // all included
      protocols: 10, // all included
      sites: 25, // all included
      partnerTypes: 10, // all included
      erpIntegration: true,
      esrsSupport: true,
      supportPremium: true,
      termYears: 3,
    },
    expectedAnnual: 187000,
    // $150,000 + $15,000 + $10,000 + $12,000 = $187,000
    expectedTotal: 561000,
    // $187,000 × 3 years = $561,000
  },

  // Config E: Edge Case - Very Large Quantities
  {
    name: 'A.7.3 - Edge Case Large Quantities',
    description: 'Verify system handles large numbers without overflow (Config E)',
    config: {
      tier: 'Enterprise',
      customerName: 'Test Customer E',
      customerEmail: 'test-e@example.com',
      users: 10000, // 9,900 excess
      suppliers: 50000, // 45,000 excess
      protocols: 100, // 90 excess
      sites: 500, // 475 excess
      partnerTypes: 100, // 90 excess
      erpIntegration: true,
      esrsSupport: true,
      supportPremium: true,
      termYears: 5,
    },
    expectedAnnual: 7077000,
    // $150,000 + (9,900×$500) + (45,000×$10) + (90×$5,000) + (475×$2,000) + (90×$1,000) + $15,000 + $10,000 + $12,000
    // = $150,000 + $4,950,000 + $450,000 + $450,000 + $950,000 + $90,000 + $37,000
    // = $7,077,000
    expectedTotal: 35385000,
    // $7,077,000 × 5 years = $35,385,000
  },

  // A.3.1: Advanced Tier - Minimum Configuration
  {
    name: 'A.3.1 - Advanced Tier Minimum',
    description: 'Advanced tier with included quantities only',
    config: {
      tier: 'Advanced',
      customerName: 'Test Customer A31',
      customerEmail: 'test-a31@example.com',
      users: 50,
      suppliers: 1500,
      protocols: 5,
      sites: 10,
      partnerTypes: 5,
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: false,
      termYears: 1,
    },
    expectedAnnual: 100000,
    expectedTotal: 100000,
  },

  // A.3.2: Advanced Tier - With All Integrations
  {
    name: 'A.3.2 - Advanced All Integrations',
    description: 'Advanced tier with included amounts + all integrations',
    config: {
      tier: 'Advanced',
      customerName: 'Test Customer A32',
      customerEmail: 'test-a32@example.com',
      users: 50,
      suppliers: 1500,
      protocols: 5,
      sites: 10,
      partnerTypes: 5,
      erpIntegration: true,
      esrsSupport: true,
      supportPremium: true,
      termYears: 1,
    },
    expectedAnnual: 137000,
    // $100,000 + $15,000 + $10,000 + $12,000
    expectedTotal: 137000,
  },

  // A.4.1: Enterprise Tier - Minimum Configuration
  {
    name: 'A.4.1 - Enterprise Tier Minimum',
    description: 'Enterprise tier with included quantities only',
    config: {
      tier: 'Enterprise',
      customerName: 'Test Customer A41',
      customerEmail: 'test-a41@example.com',
      users: 100,
      suppliers: 5000,
      protocols: 10,
      sites: 25,
      partnerTypes: 10,
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: false,
      termYears: 1,
    },
    expectedAnnual: 150000,
    expectedTotal: 150000,
  },

  // A.4.2: Enterprise Tier - Full Configuration
  {
    name: 'A.4.2 - Enterprise Full Config',
    description: 'Enterprise tier with significant overages and all integrations',
    config: {
      tier: 'Enterprise',
      customerName: 'Test Customer A42',
      customerEmail: 'test-a42@example.com',
      users: 150, // 50 excess
      suppliers: 7500, // 2,500 excess
      protocols: 15, // 5 excess
      sites: 40, // 15 excess
      partnerTypes: 15, // 5 excess
      erpIntegration: true,
      esrsSupport: true,
      supportPremium: true,
      termYears: 1,
    },
    expectedAnnual: 297000,
    // $150,000 + (50×$500) + (2,500×$10) + (5×$5,000) + (15×$2,000) + (5×$1,000) + $15,000 + $10,000 + $12,000
    // = $150,000 + $25,000 + $25,000 + $25,000 + $30,000 + $5,000 + $37,000
    // = $297,000
    expectedTotal: 297000,
  },

  // A.7.2: Below Included Amount (Professional tier with 20 users, included is 25)
  {
    name: 'A.7.2 - Below Included Amount',
    description: 'Verify quantities below included amounts don\'t cause negative charges',
    config: {
      tier: 'Professional',
      customerName: 'Test Customer A72',
      customerEmail: 'test-a72@example.com',
      users: 20, // 5 below included 25
      suppliers: 400, // 100 below included 500
      protocols: 2, // 1 below included 3
      sites: 3, // 2 below included 5
      partnerTypes: 1, // 1 below included 2
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: false,
      termYears: 1,
    },
    expectedAnnual: 60000,
    // Should be base price only, no negative charges
    expectedTotal: 60000,
  },

  // A.7.4: Zero Quantities
  {
    name: 'A.7.4 - Zero Quantities',
    description: 'Verify system handles zero quantities without errors',
    config: {
      tier: 'Basic',
      customerName: 'Test Customer A74',
      customerEmail: 'test-a74@example.com',
      users: 0,
      suppliers: 0,
      protocols: 0,
      sites: 0,
      partnerTypes: 0,
      erpIntegration: false,
      esrsSupport: false,
      supportPremium: false,
      termYears: 1,
    },
    expectedAnnual: 25000,
    // Should be base price only
    expectedTotal: 25000,
  },
];

// Test runner
function runTests() {
  console.log('='.repeat(80));
  console.log('INTELLEGES PRICING CALCULATOR - AUTOMATED TEST SUITE');
  console.log('='.repeat(80));
  console.log('');

  let passed = 0;
  let failed = 0;
  const failures: Array<{ name: string; expected: number; actual: number; field: string }> = [];

  for (const testCase of testCases) {
    console.log(`\n📋 ${testCase.name}`);
    console.log(`   ${testCase.description}`);
    console.log(`   Config: ${testCase.config.tier} | ${testCase.config.users}u ${testCase.config.suppliers}s ${testCase.config.protocols}p ${testCase.config.sites}st ${testCase.config.partnerTypes}pt | ${testCase.config.termYears}yr`);
    
    try {
      const result = calculatePricing(testCase.config);
      
      // Check annual price
      if (result.annualPrice === testCase.expectedAnnual) {
        console.log(`   ✅ Annual Price: $${result.annualPrice.toLocaleString()} (PASS)`);
        passed++;
      } else {
        console.log(`   ❌ Annual Price: Expected $${testCase.expectedAnnual.toLocaleString()}, Got $${result.annualPrice.toLocaleString()} (FAIL)`);
        failed++;
        failures.push({
          name: testCase.name,
          expected: testCase.expectedAnnual,
          actual: result.annualPrice,
          field: 'annualPrice',
        });
      }

      // Check total price if specified
      if (testCase.expectedTotal !== undefined) {
        if (result.totalPrice === testCase.expectedTotal) {
          console.log(`   ✅ Total Price: $${result.totalPrice.toLocaleString()} (PASS)`);
          passed++;
        } else {
          console.log(`   ❌ Total Price: Expected $${testCase.expectedTotal.toLocaleString()}, Got $${result.totalPrice.toLocaleString()} (FAIL)`);
          failed++;
          failures.push({
            name: testCase.name,
            expected: testCase.expectedTotal,
            actual: result.totalPrice,
            field: 'totalPrice',
          });
        }
      }

      // Show breakdown for failed tests
      if (result.annualPrice !== testCase.expectedAnnual) {
        console.log('   📊 Breakdown:');
        result.breakdown.forEach(item => {
          console.log(`      ${item.label}: ${item.quantity} × $${item.unitPrice.toLocaleString()} = $${item.total.toLocaleString()}`);
        });
      }

    } catch (error) {
      console.log(`   ❌ ERROR: ${error instanceof Error ? error.message : String(error)}`);
      failed++;
      failures.push({
        name: testCase.name,
        expected: testCase.expectedAnnual,
        actual: -1,
        field: 'error',
      });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests: ${testCases.length}`);
  console.log(`Assertions: ${passed + failed}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

  if (failures.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('FAILED TESTS DETAIL');
    console.log('='.repeat(80));
    failures.forEach(f => {
      console.log(`\n❌ ${f.name} (${f.field})`);
      console.log(`   Expected: $${f.expected.toLocaleString()}`);
      console.log(`   Actual:   $${f.actual.toLocaleString()}`);
      console.log(`   Diff:     $${(f.actual - f.expected).toLocaleString()}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log(failed === 0 ? '✅ ALL TESTS PASSED - READY FOR MANUAL TESTING' : '❌ TESTS FAILED - FIX ISSUES BEFORE MANUAL TESTING');
  console.log('='.repeat(80));
  console.log('');

  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests();
