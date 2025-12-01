import { EnrichedCompany, isFreeEmailDomain } from "./enrichment";

export type QualificationInput = {
  name: string;
  email: string;
  company: string;
  title?: string;
  enrichment: EnrichedCompany | null;
};

export type QualificationResult = {
  score: number;
  qualified: boolean;
  reasons: string[];
  derived: {
    industry?: string;
    employeeCount?: number;
    country?: string;
    revenueBand?: string;
    website?: string;
  };
};

// Target industries for Intelleges ICP
const TARGET_INDUSTRIES = [
  "healthcare",
  "health care",
  "hospital",
  "medical",
  "pharmaceutical",
  "aerospace",
  "defense",
  "aviation",
  "manufacturing",
  "industrial",
];

// Target countries (US and Mexico only)
const TARGET_COUNTRIES = ["united states", "usa", "us", "mexico", "méxico"];

// Blocked industries (not in ICP)
const BLOCKED_INDUSTRIES = [
  "retail",
  "hospitality",
  "restaurant",
  "coaching",
  "e-commerce",
  "ecommerce",
  "real estate",
  "recruiting",
  "staffing",
  "marketing agency",
  "consulting",
  "crypto",
  "blockchain",
  "nonprofit",
  "political",
];

// Title keywords that indicate decision-maker or compliance role
const POSITIVE_TITLE_KEYWORDS = [
  "procurement",
  "supply chain",
  "compliance",
  "regulatory",
  "quality",
  "vp",
  "vice president",
  "director",
  "head of",
  "chief",
  "cpo",
  "coo",
  "ceo",
  "president",
  "manager",
];

/**
 * Score a lead based on enrichment data and qualification rules
 * 
 * Scoring model:
 * - Industry match: +50
 * - Employee count ≥1000: +25
 * - Employee count 200-999: +15
 * - HQ in US/Mexico: +10
 * - Corporate domain: +10
 * - Revenue >$100M: +20
 * - Decision-maker title: +30
 * 
 * Disqualifiers:
 * - Free email: -100
 * - Wrong industry: -80
 * - Company <200 employees: -50
 * - No enrichment data: -30
 * - Foreign country: -50
 * 
 * Threshold: 60+ points = qualified
 */
export function scoreLead(input: QualificationInput): QualificationResult {
  const { email, enrichment, title } = input;
  const reasons: string[] = [];
  let score = 0;

  const industry = enrichment?.industry?.toLowerCase();
  const employeeCount = enrichment?.employeeCount;
  const country = enrichment?.country?.toLowerCase();
  const revenueBand = enrichment?.revenueBand;

  // === CRITICAL DISQUALIFIERS ===
  
  if (isFreeEmailDomain(email)) {
    reasons.push("Free email domain (Gmail, Yahoo, etc.)");
    score -= 100;
  }

  if (industry) {
    const isBlocked = BLOCKED_INDUSTRIES.some(blocked => 
      industry.includes(blocked)
    );
    if (isBlocked) {
      reasons.push(`Blocked industry: ${enrichment?.industry}`);
      score -= 80;
    }
  }

  if (employeeCount !== undefined && employeeCount < 200) {
    reasons.push(`Company too small: ${employeeCount} employees (minimum 200)`);
    score -= 50;
  }

  if (!enrichment) {
    reasons.push("No enrichment data available (no Apollo match or API not configured)");
    score -= 30;
  }

  if (country && !TARGET_COUNTRIES.some(target => country.includes(target))) {
    reasons.push(`Non-target country: ${enrichment?.country}`);
    score -= 50;
  }

  // === POSITIVE SIGNALS ===

  if (industry) {
    const isTargetIndustry = TARGET_INDUSTRIES.some(target => 
      industry.includes(target)
    );
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

  if (!isFreeEmailDomain(email)) {
    score += 10;
    reasons.push("Corporate email domain");
  }

  // Revenue signals
  if (revenueBand) {
    const revenueStr = revenueBand.toLowerCase();
    if (revenueStr.includes("100") || revenueStr.includes("200") || revenueStr.includes("billion")) {
      score += 20;
      reasons.push(`High revenue: ${revenueBand}`);
    } else if (revenueStr.includes("50")) {
      score += 10;
      reasons.push(`Mid revenue: ${revenueBand}`);
    }
  }

  // Title signals
  if (title) {
    const titleLower = title.toLowerCase();
    const hasPositiveKeyword = POSITIVE_TITLE_KEYWORDS.some(keyword =>
      titleLower.includes(keyword)
    );
    if (hasPositiveKeyword) {
      score += 30;
      reasons.push(`Decision-maker title: ${title}`);
    }
  }

  // Determine qualification
  // Critical disqualifiers: free email, blocked industry, too small, wrong country
  const hasCriticalDisqualifier = 
    isFreeEmailDomain(email) ||
    (industry && BLOCKED_INDUSTRIES.some(blocked => industry.includes(blocked))) ||
    (employeeCount !== undefined && employeeCount < 200) ||
    (country && !TARGET_COUNTRIES.some(target => country.includes(target)));
  
  const qualified = !hasCriticalDisqualifier && score >= 60;

  if (!qualified && reasons.length === 0) {
    reasons.push(`Score below threshold: ${score} (minimum 60)`);
  }

  return {
    score,
    qualified,
    reasons,
    derived: {
      industry: enrichment?.industry,
      employeeCount: enrichment?.employeeCount,
      country: enrichment?.country,
      revenueBand: enrichment?.revenueBand,
      website: enrichment?.domain ? `https://${enrichment.domain}` : undefined,
    },
  };
}

/**
 * Get a human-readable explanation of why a lead was qualified or disqualified
 */
export function getQualificationExplanation(result: QualificationResult): string {
  if (result.qualified) {
    return `Qualified with score ${result.score}/100. ${result.reasons.join(". ")}.`;
  } else {
    return `Not qualified (score: ${result.score}/100). ${result.reasons.join(". ")}.`;
  }
}
