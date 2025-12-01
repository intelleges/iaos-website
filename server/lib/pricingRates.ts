/**
 * Pricing rates and tier definitions for the Intelleges pricing calculator
 */

export type Tier = 'Basic' | 'Professional' | 'Advanced' | 'Enterprise';

export interface TierDefinition {
  name: Tier;
  basePrice: number;
  includedUsers: number;
  includedSuppliers: number;
  includedProtocols: number;
  includedSites: number;
  includedPartnerTypes: number;
  features: string[];
  allowsIntegrations: boolean;
}

export interface PricingRates {
  // Per-unit pricing (annual)
  userPrice: number;
  supplierPrice: number;
  protocolPrice: number;
  sitePrice: number;
  partnerTypePrice: number;
  
  // Integration pricing (annual)
  erpIntegrationPrice: number;
  esrsSupportPrice: number;
  supportPremiumPrice: number;
}

/**
 * Tier definitions with base prices and included quantities
 */
export const TIER_DEFINITIONS: Record<Tier, TierDefinition> = {
  Basic: {
    name: 'Basic',
    basePrice: 25000,
    includedUsers: 10,
    includedSuppliers: 100,
    includedProtocols: 1,
    includedSites: 1,
    includedPartnerTypes: 0,
    features: [
      'Core compliance protocols',
      'Basic supplier management',
      'Standard support',
      'Email notifications',
    ],
    allowsIntegrations: false,
  },
  Professional: {
    name: 'Professional',
    basePrice: 60000,
    includedUsers: 25,
    includedSuppliers: 500,
    includedProtocols: 3,
    includedSites: 5,
    includedPartnerTypes: 2,
    features: [
      'All Basic features',
      'Advanced protocols',
      'Multi-site support',
      'Priority support',
      'Custom branding',
    ],
    allowsIntegrations: false,
  },
  Advanced: {
    name: 'Advanced',
    basePrice: 100000,
    includedUsers: 50,
    includedSuppliers: 1500,
    includedProtocols: 5,
    includedSites: 10,
    includedPartnerTypes: 5,
    features: [
      'All Professional features',
      'ERP integration available',
      'eSRS support available',
      'Advanced analytics',
      'Dedicated account manager',
    ],
    allowsIntegrations: true,
  },
  Enterprise: {
    name: 'Enterprise',
    basePrice: 150000,
    includedUsers: 100,
    includedSuppliers: 5000,
    includedProtocols: 10,
    includedSites: 25,
    includedPartnerTypes: 10,
    features: [
      'All Advanced features',
      'Unlimited protocols',
      'White-label option',
      'Custom integrations',
      '24/7 premium support',
      'SLA guarantees',
    ],
    allowsIntegrations: true,
  },
};

/**
 * Per-unit pricing rates (annual)
 */
export const PRICING_RATES: PricingRates = {
  userPrice: 500,
  supplierPrice: 10,
  protocolPrice: 5000,
  sitePrice: 2000,
  partnerTypePrice: 1000,
  erpIntegrationPrice: 15000,
  esrsSupportPrice: 10000,
  supportPremiumPrice: 12000,
};

/**
 * Get tier definition by name
 */
export function getTierDefinition(tier: Tier): TierDefinition {
  return TIER_DEFINITIONS[tier];
}

/**
 * Get pricing rates
 */
export function getPricingRates(): PricingRates {
  return PRICING_RATES;
}
