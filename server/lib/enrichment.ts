export type EnrichedCompany = {
  domain?: string;
  name?: string;
  industry?: string;
  employeeCount?: number;
  country?: string;
  revenueBand?: string; // e.g. "0-50M", "50-200M", "200M+"
};

/**
 * Enrich company data using Apollo.io API
 * Falls back gracefully if API key is not configured or enrichment fails
 */
export async function enrichCompanyFromApollo(
  email: string,
  company: string
): Promise<EnrichedCompany | null> {
  const apiKey = process.env.APOLLO_API_KEY;
  
  if (!apiKey) {
    console.warn("[Enrichment] APOLLO_API_KEY not configured, skipping enrichment");
    return null;
  }

  try {
    const domain = email.split("@")[1] ?? "";
    
    // Apollo.io enrichment endpoint
    // Docs: https://apolloio.github.io/apollo-api-docs/?shell#enrich-people
    const res = await fetch("https://api.apollo.io/v1/organizations/enrich", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({
        domain,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`[Enrichment] Apollo API failed (${res.status}):`, errorText);
      return null;
    }

    const data = await res.json() as any;
    const org = data.organization || {};

    // Map Apollo response to our internal structure
    return {
      domain: org.primary_domain || org.website_url || domain,
      name: org.name || company,
      industry: org.industry || org.industry_tag_list?.[0],
      employeeCount: org.estimated_num_employees,
      country: org.country,
      revenueBand: org.estimated_annual_revenue || org.annual_revenue,
    };
  } catch (err) {
    console.error("[Enrichment] Apollo enrichment error:", err);
    return null;
  }
}

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

/**
 * Check if email domain is a free/personal email provider
 */
export function isFreeEmailDomain(email: string): boolean {
  const FREE_EMAIL_DOMAINS = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "proton.me",
    "protonmail.com",
    "icloud.com",
    "live.com",
    "msn.com",
    "aol.com",
    "mail.com",
    "zoho.com",
  ];
  
  const domain = extractDomain(email);
  return FREE_EMAIL_DOMAINS.includes(domain);
}
