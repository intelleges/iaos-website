/**
 * Pricing Rate Table and Tier Definitions
 * 
 * This file contains the authoritative pricing model for Intelleges.
 * Based on configuration-based pricing: users, suppliers, sites, protocols, integrations.
 * 
 * Internal use only - not exposed to public.
 */

export type Tier = 'Basic' | 'Professional' | 'Advanced' | 'Enterprise';

export interface TierDefinition {
  basePrice: number;
  includedUsers: number;
  includedSuppliers: number;
  includedProtocols: number;
  includedSites: number;
  allowsERP: boolean;
  allowsESRS: boolean;
  supportLevel: string;
}

export interface PricingRates {
  user: number;
  supplier: number;
  protocol: number;
  site: number;
  partnerType: number;
  erpIntegration: number;
  esrsSupport: number;
  supportPremium: number;
}

/**
 * Tier Definitions
 * 
 * Basic: $25,000 - Small teams, single-site, email support
 * Professional: $60,000 - Regional orgs, 3 sites, email support
 * Advanced: $100,000 - Complex regulated orgs, 10 sites, phone+email, ERP+eSRS allowed
 * Enterprise: $150,000+ - Global enterprises, unlimited everything, dedicated TAM
 */
export const TIER_DEFINITIONS: Record<Tier, TierDefinition> = {
  Basic: {
    basePrice: 25000,
    includedUsers: 10,
    includedSuppliers: 500,
    includedProtocols: 1,
    includedSites: 1,
    allowsERP: false,
    allowsESRS: false,
    supportLevel: 'Email only',
  },
  Professional: {
    basePrice: 60000,
    includedUsers: 25,
    includedSuppliers: 1000,
    includedProtocols: 1,
    includedSites: 3,
    allowsERP: false,
    allowsESRS: false,
    supportLevel: 'Email only',
  },
  Advanced: {
    basePrice: 100000,
    includedUsers: 50,
    includedSuppliers: 1500,
    includedProtocols: 1,
    includedSites: 10,
    allowsERP: true,
    allowsESRS: true,
    supportLevel: 'Phone + Email',
  },
  Enterprise: {
    basePrice: 150000,
    includedUsers: Number.MAX_SAFE_INTEGER,
    includedSuppliers: Number.MAX_SAFE_INTEGER,
    includedProtocols: Number.MAX_SAFE_INTEGER,
    includedSites: Number.MAX_SAFE_INTEGER,
    allowsERP: true,
    allowsESRS: true,
    supportLevel: 'Dedicated TAM',
  },
};

/**
 * Pricing Rates (per unit, annual)
 * 
 * These rates apply to quantities beyond tier inclusions
 */
export const PRICING_RATES: PricingRates = {
  user: 150,              // $150 per extra user per year
  supplier: 40,           // $40 per extra supplier per year
  protocol: 10000,        // $10,000 per additional protocol
  site: 5000,             // $5,000 per additional site
  partnerType: 2500,      // $2,500 per partner type
  erpIntegration: 25000,  // $25,000 for ERP integration (Advanced/Enterprise only)
  esrsSupport: 10000,     // $10,000 for eSRS support (Advanced/Enterprise only)
  supportPremium: 10000,  // $10,000 for weekly leadership support
};

/**
 * Get tier definition by name
 */
export function getTierDefinition(tier: Tier): TierDefinition {
  return TIER_DEFINITIONS[tier];
}

/**
 * Get all pricing rates
 */
export function getPricingRates(): PricingRates {
  return PRICING_RATES;
}

/**
 * Validate if a tier allows a specific integration
 */
export function tierAllowsIntegration(tier: Tier, integration: 'ERP' | 'eSRS'): boolean {
  const tierDef = getTierDefinition(tier);
  if (integration === 'ERP') {
    return tierDef.allowsERP;
  }
  if (integration === 'eSRS') {
    return tierDef.allowsESRS;
  }
  return false;
}
