/**
 * Pricing Calculator Service
 * 
 * Core business logic for calculating annual contract values
 * based on configuration (users, suppliers, sites, protocols, integrations).
 */

import {
  Tier,
  getTierDefinition,
  getPricingRates,
  tierAllowsIntegration,
} from './pricingRates';

export interface PricingRequest {
  tier: Tier;
  
  // Customer profile (optional metadata)
  customerName?: string;
  industry?: string;
  region?: string;
  
  // Configuration
  users: number;
  suppliers: number;
  protocols: number;
  sites: number;
  partnerTypes: number;
  
  // Feature flags
  erpIntegration: boolean;
  esrsSupport: boolean;
  supportPremium: boolean;
  
  // Optional
  termYears?: number;
  currency?: string;
}

export interface PricingResponse {
  tier: Tier;
  currency: string;
  termYears: number;
  
  // Included amounts (from tier)
  includedUsers: number;
  includedSuppliers: number;
  includedProtocols: number;
  includedSites: number;
  
  // Configuration requested
  configuredUsers: number;
  configuredSuppliers: number;
  configuredProtocols: number;
  configuredSites: number;
  configuredPartnerTypes: number;
  
  // Extras calculated
  extraUsers: number;
  extraSuppliers: number;
  extraProtocols: number;
  extraSites: number;
  
  // Line items (annual)
  basePrice: number;
  usersPrice: number;
  suppliersPrice: number;
  protocolsPrice: number;
  sitesPrice: number;
  partnerTypesPrice: number;
  erpIntegrationPrice: number;
  esrsSupportPrice: number;
  supportPremiumPrice: number;
  
  // Totals
  annualPrice: number;
  totalPriceForTerm: number;
  
  // Metadata
  customerName?: string;
  industry?: string;
  region?: string;
}

/**
 * Calculate pricing based on configuration
 * 
 * This is the core pricing engine that:
 * 1. Loads tier inclusions
 * 2. Calculates extras beyond tier limits
 * 3. Applies integration fees (only if tier allows)
 * 4. Sums all line items
 * 5. Returns detailed breakdown
 * 
 * Example: Celestica configuration should yield ~$129K
 */
export function calculatePricing(req: PricingRequest): PricingResponse {
  const { tier } = req;
  const termYears = req.termYears ?? 1;
  const currency = req.currency ?? 'USD';
  
  // Get tier definition and rates
  const tierDef = getTierDefinition(tier);
  const rates = getPricingRates();
  
  // 1) Included per tier
  const includedUsers = tierDef.includedUsers;
  const includedSuppliers = tierDef.includedSuppliers;
  const includedProtocols = tierDef.includedProtocols;
  const includedSites = tierDef.includedSites;
  
  // 2) Extras (never negative)
  const extraUsers = Math.max(0, req.users - includedUsers);
  const extraSuppliers = Math.max(0, req.suppliers - includedSuppliers);
  const extraProtocols = Math.max(0, req.protocols - includedProtocols);
  const extraSites = Math.max(0, req.sites - includedSites);
  
  // 3) Base price
  const basePrice = tierDef.basePrice;
  
  // 4) Line items
  const usersPrice = extraUsers * rates.user;
  const suppliersPrice = extraSuppliers * rates.supplier;
  const protocolsPrice = extraProtocols * rates.protocol;
  const sitesPrice = extraSites * rates.site;
  const partnerTypesPrice = (req.partnerTypes || 0) * rates.partnerType;
  
  // Only Advanced/Enterprise can add ERP/eSRS
  const erpIntegrationPrice =
    tierAllowsIntegration(tier, 'ERP') && req.erpIntegration
      ? rates.erpIntegration
      : 0;
  
  const esrsSupportPrice =
    tierAllowsIntegration(tier, 'eSRS') && req.esrsSupport
      ? rates.esrsSupport
      : 0;
  
  const supportPremiumPrice = req.supportPremium ? rates.supportPremium : 0;
  
  // 5) Totals
  const annualPrice =
    basePrice +
    usersPrice +
    suppliersPrice +
    protocolsPrice +
    sitesPrice +
    partnerTypesPrice +
    erpIntegrationPrice +
    esrsSupportPrice +
    supportPremiumPrice;
  
  const totalPriceForTerm = annualPrice * termYears;
  
  // 6) Build response
  const response: PricingResponse = {
    tier,
    currency,
    termYears,
    
    includedUsers,
    includedSuppliers,
    includedProtocols,
    includedSites,
    
    configuredUsers: req.users,
    configuredSuppliers: req.suppliers,
    configuredProtocols: req.protocols,
    configuredSites: req.sites,
    configuredPartnerTypes: req.partnerTypes,
    
    extraUsers,
    extraSuppliers,
    extraProtocols,
    extraSites,
    
    basePrice,
    usersPrice,
    suppliersPrice,
    protocolsPrice,
    sitesPrice,
    partnerTypesPrice,
    erpIntegrationPrice,
    esrsSupportPrice,
    supportPremiumPrice,
    
    annualPrice,
    totalPriceForTerm,
    
    customerName: req.customerName,
    industry: req.industry,
    region: req.region,
  };
  
  return response;
}

/**
 * Format price as USD currency string
 */
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Validate pricing request
 */
export function validatePricingRequest(req: Partial<PricingRequest>): string[] {
  const errors: string[] = [];
  
  if (!req.tier) {
    errors.push('Tier is required');
  } else if (!['Basic', 'Professional', 'Advanced', 'Enterprise'].includes(req.tier)) {
    errors.push('Invalid tier');
  }
  
  if (req.users === undefined || req.users < 0) {
    errors.push('Users must be a non-negative number');
  }
  
  if (req.suppliers === undefined || req.suppliers < 0) {
    errors.push('Suppliers must be a non-negative number');
  }
  
  if (req.protocols === undefined || req.protocols < 0) {
    errors.push('Protocols must be a non-negative number');
  }
  
  if (req.sites === undefined || req.sites < 0) {
    errors.push('Sites must be a non-negative number');
  }
  
  if (req.partnerTypes === undefined || req.partnerTypes < 0) {
    errors.push('Partner types must be a non-negative number');
  }
  
  return errors;
}
