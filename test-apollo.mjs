#!/usr/bin/env node

/**
 * Apollo API Integration Test
 * 
 * This script tests the complete qualification flow:
 * 1. Apollo API connection
 * 2. Company enrichment from email domain
 * 3. Lead scoring engine
 * 4. Qualification decision
 */

import 'dotenv/config';

// Test configuration
const TEST_CASES = [
  {
    name: 'John Smith',
    email: 'john.smith@boeing.com',
    company: 'Boeing',
    title: 'VP of Procurement',
    expectedQualified: true,
    description: 'Large aerospace company with decision-maker title'
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    company: 'Some Company',
    title: 'Manager',
    expectedQualified: false,
    description: 'Free email domain (should be disqualified)'
  },
  {
    name: 'Bob Johnson',
    email: 'bob@lockheedmartin.com',
    company: 'Lockheed Martin',
    title: 'Director of Supply Chain',
    expectedQualified: true,
    description: 'Large defense contractor with relevant title'
  }
];

// Apollo API enrichment function
async function enrichCompanyFromApollo(email) {
  const apiKey = process.env.APOLLO_API_KEY;
  
  if (!apiKey) {
    console.error('❌ APOLLO_API_KEY not found in environment variables');
    return null;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return null;
  }

  try {
    console.log(`   🔍 Enriching domain: ${domain}`);
    
    const response = await fetch('https://api.apollo.io/v1/organizations/enrich', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify({ domain }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   ❌ Apollo API error (${response.status}): ${errorText}`);
      return null;
    }

    const data = await response.json();
    const org = data.organization;

    if (!org) {
      console.log(`   ⚠️  No organization data found for ${domain}`);
      return null;
    }

    const enrichment = {
      domain,
      name: org.name,
      industry: org.industry,
      employeeCount: org.estimated_num_employees,
      country: org.country,
      revenueBand: org.estimated_annual_revenue,
      website: org.website_url,
    };

    console.log(`   ✅ Enriched: ${enrichment.name} (${enrichment.industry}, ${enrichment.employeeCount} employees)`);
    return enrichment;
  } catch (error) {
    console.error(`   ❌ Enrichment error: ${error.message}`);
    return null;
  }
}

// Simplified scoring function (matches server/lib/qualification.ts logic)
function scoreLead(input) {
  const { email, enrichment, title } = input;
  const reasons = [];
  let score = 0;

  const industry = enrichment?.industry?.toLowerCase();
  const employeeCount = enrichment?.employeeCount;
  const country = enrichment?.country?.toLowerCase();
  const revenueBand = enrichment?.revenueBand;

  const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com', 'protonmail.com'];
  const BLOCKED_INDUSTRIES = ['retail', 'hospitality', 'restaurant', 'food service', 'crypto', 'cannabis', 'gambling'];
  const TARGET_INDUSTRIES = ['healthcare', 'aerospace', 'defense', 'manufacturing', 'pharmaceutical', 'medical device'];
  const TARGET_COUNTRIES = ['united states', 'mexico', 'us', 'usa'];

  // Check free email
  const domain = email.split('@')[1]?.toLowerCase();
  const isFreeEmail = FREE_EMAIL_DOMAINS.includes(domain);

  if (isFreeEmail) {
    reasons.push("Free email domain (Gmail, Yahoo, etc.)");
    score -= 100;
  }

  // Check blocked industry
  if (industry) {
    const isBlocked = BLOCKED_INDUSTRIES.some(blocked => industry.includes(blocked));
    if (isBlocked) {
      reasons.push(`Blocked industry: ${enrichment?.industry}`);
      score -= 80;
    }
  }

  // Check company size
  if (employeeCount !== undefined && employeeCount < 200) {
    reasons.push(`Company too small: ${employeeCount} employees (minimum 200)`);
    score -= 50;
  }

  // Check enrichment availability
  if (!enrichment) {
    reasons.push("No enrichment data available");
    score -= 30;
  }

  // Check country
  if (country && !TARGET_COUNTRIES.some(target => country.includes(target))) {
    reasons.push(`Non-target country: ${enrichment?.country}`);
    score -= 50;
  }

  // Positive signals
  if (industry) {
    const isTargetIndustry = TARGET_INDUSTRIES.some(target => industry.includes(target));
    if (isTargetIndustry) {
      score += 50;
      reasons.push(`Target industry match: ${enrichment?.industry}`);
    }
  }

  if (employeeCount !== undefined) {
    if (employeeCount >= 1000) {
      score += 25;
      reasons.push(`Large enterprise: ${employeeCount}+ employees`);
    } else if (employeeCount >= 200) {
      score += 15;
      reasons.push(`Mid-size company: ${employeeCount} employees`);
    }
  }

  if (country && TARGET_COUNTRIES.some(target => country.includes(target))) {
    score += 10;
    reasons.push(`Target country: ${enrichment?.country}`);
  }

  if (!isFreeEmail) {
    score += 10;
    reasons.push("Corporate email domain");
  }

  if (revenueBand) {
    const revenueStr = revenueBand.toLowerCase();
    if (revenueStr.includes('billion') || revenueStr.includes('$100m')) {
      score += 20;
      reasons.push(`High revenue: ${revenueBand}`);
    } else if (revenueStr.includes('$50') || revenueStr.includes('$75')) {
      score += 10;
      reasons.push(`Mid revenue: ${revenueBand}`);
    }
  }

  if (title) {
    const titleLower = title.toLowerCase();
    const positiveKeywords = ['vp', 'vice president', 'director', 'chief', 'head of', 'procurement', 'supply chain', 'compliance', 'regulatory', 'quality'];
    const hasPositiveKeyword = positiveKeywords.some(keyword => titleLower.includes(keyword));
    
    if (hasPositiveKeyword) {
      score += 30;
      reasons.push(`Decision-maker title: ${title}`);
    }
  }

  const qualified = score >= 60;

  return {
    qualified,
    score,
    reasons,
    enrichment,
  };
}

// Run tests
async function runTests() {
  console.log('🧪 Apollo API Integration Test\n');
  console.log('═'.repeat(80));
  
  // Check API key
  if (!process.env.APOLLO_API_KEY) {
    console.error('\n❌ APOLLO_API_KEY not set in environment variables');
    console.error('   Please add it to your .env file or environment\n');
    process.exit(1);
  }
  
  console.log('✅ Apollo API key found\n');
  console.log('═'.repeat(80));

  let passedTests = 0;
  let failedTests = 0;

  for (const testCase of TEST_CASES) {
    console.log(`\n📋 Test Case: ${testCase.description}`);
    console.log('─'.repeat(80));
    console.log(`   Name: ${testCase.name}`);
    console.log(`   Email: ${testCase.email}`);
    console.log(`   Company: ${testCase.company}`);
    console.log(`   Title: ${testCase.title || 'N/A'}`);
    console.log('');

    // Enrich
    const enrichment = await enrichCompanyFromApollo(testCase.email);
    
    // Score
    const result = scoreLead({
      name: testCase.name,
      email: testCase.email,
      company: testCase.company,
      title: testCase.title,
      enrichment,
    });

    // Display results
    console.log('\n   📊 Scoring Results:');
    console.log(`   Score: ${result.score}`);
    console.log(`   Qualified: ${result.qualified ? '✅ YES' : '❌ NO'}`);
    console.log('\n   Reasons:');
    result.reasons.forEach(reason => {
      console.log(`   • ${reason}`);
    });

    // Verify expectation
    const testPassed = result.qualified === testCase.expectedQualified;
    if (testPassed) {
      console.log(`\n   ✅ TEST PASSED (Expected: ${testCase.expectedQualified ? 'Qualified' : 'Not Qualified'})`);
      passedTests++;
    } else {
      console.log(`\n   ❌ TEST FAILED (Expected: ${testCase.expectedQualified ? 'Qualified' : 'Not Qualified'}, Got: ${result.qualified ? 'Qualified' : 'Not Qualified'})`);
      failedTests++;
    }

    console.log('═'.repeat(80));
  }

  // Summary
  console.log(`\n📈 Test Summary:`);
  console.log(`   Total Tests: ${TEST_CASES.length}`);
  console.log(`   Passed: ${passedTests} ✅`);
  console.log(`   Failed: ${failedTests} ❌`);
  console.log('');

  if (failedTests === 0) {
    console.log('🎉 All tests passed! Apollo API integration is working correctly.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Review the scoring logic or test expectations.\n');
    process.exit(1);
  }
}

// Run
runTests().catch(error => {
  console.error('\n❌ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
});
