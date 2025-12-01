/**
 * Pricing calculator logic for configuration-based pricing
 */

import { getTierDefinition, getPricingRates, Tier } from './pricingRates';

export interface PricingRequest {
  tier: Tier;
  customerName?: string;
  customerEmail?: string;
  industry?: string;
  region?: string;
  users: number;
  suppliers: number;
  protocols: number;
  sites: number;
  partnerTypes: number;
  erpIntegration: boolean;
  esrsSupport: boolean;
  supportPremium: boolean;
  termYears?: number;
  currency?: string;
}

export interface PricingResult {
  tier: Tier;
  basePrice: number;
  usersPrice: number;
  suppliersPrice: number;
  protocolsPrice: number;
  sitesPrice: number;
  partnerTypesPrice: number;
  erpIntegrationPrice: number;
  esrsSupportPrice: number;
  supportPremiumPrice: number;
  annualPrice: number;
  termYears: number;
  totalPrice: number;
  currency: string;
  breakdown: {
    label: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

/**
 * Calculate pricing based on configuration
 */
export function calculatePricing(request: PricingRequest): PricingResult {
  const tierDef = getTierDefinition(request.tier);
  const rates = getPricingRates();
  const termYears = request.termYears || 1;
  const currency = request.currency || 'USD';

  // Calculate excess quantities
  const excessUsers = Math.max(0, request.users - tierDef.includedUsers);
  const excessSuppliers = Math.max(0, request.suppliers - tierDef.includedSuppliers);
  const excessProtocols = Math.max(0, request.protocols - tierDef.includedProtocols);
  const excessSites = Math.max(0, request.sites - tierDef.includedSites);
  const excessPartnerTypes = Math.max(0, request.partnerTypes - tierDef.includedPartnerTypes);

  // Calculate line item prices (annual)
  const basePrice = tierDef.basePrice;
  const usersPrice = excessUsers * rates.userPrice;
  const suppliersPrice = excessSuppliers * rates.supplierPrice;
  const protocolsPrice = excessProtocols * rates.protocolPrice;
  const sitesPrice = excessSites * rates.sitePrice;
  const partnerTypesPrice = excessPartnerTypes * rates.partnerTypePrice;

  // Integration pricing (only for Advanced and Enterprise tiers)
  const erpIntegrationPrice = tierDef.allowsIntegrations && request.erpIntegration
    ? rates.erpIntegrationPrice
    : 0;
  const esrsSupportPrice = tierDef.allowsIntegrations && request.esrsSupport
    ? rates.esrsSupportPrice
    : 0;
  const supportPremiumPrice = request.supportPremium ? rates.supportPremiumPrice : 0;

  // Calculate annual and total prices
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

  const totalPrice = annualPrice * termYears;

  // Build breakdown
  const breakdown = [
    { label: `${request.tier} Tier (Base)`, quantity: 1, unitPrice: basePrice, total: basePrice },
  ];

  if (excessUsers > 0) {
    breakdown.push({
      label: `Additional Users`,
      quantity: excessUsers,
      unitPrice: rates.userPrice,
      total: usersPrice,
    });
  }

  if (excessSuppliers > 0) {
    breakdown.push({
      label: `Additional Suppliers`,
      quantity: excessSuppliers,
      unitPrice: rates.supplierPrice,
      total: suppliersPrice,
    });
  }

  if (excessProtocols > 0) {
    breakdown.push({
      label: `Additional Protocols`,
      quantity: excessProtocols,
      unitPrice: rates.protocolPrice,
      total: protocolsPrice,
    });
  }

  if (excessSites > 0) {
    breakdown.push({
      label: `Additional Sites`,
      quantity: excessSites,
      unitPrice: rates.sitePrice,
      total: sitesPrice,
    });
  }

  if (excessPartnerTypes > 0) {
    breakdown.push({
      label: `Additional Partner Types`,
      quantity: excessPartnerTypes,
      unitPrice: rates.partnerTypePrice,
      total: partnerTypesPrice,
    });
  }

  if (erpIntegrationPrice > 0) {
    breakdown.push({
      label: `ERP Integration`,
      quantity: 1,
      unitPrice: rates.erpIntegrationPrice,
      total: erpIntegrationPrice,
    });
  }

  if (esrsSupportPrice > 0) {
    breakdown.push({
      label: `eSRS Support`,
      quantity: 1,
      unitPrice: rates.esrsSupportPrice,
      total: esrsSupportPrice,
    });
  }

  if (supportPremiumPrice > 0) {
    breakdown.push({
      label: `Premium Support`,
      quantity: 1,
      unitPrice: rates.supportPremiumPrice,
      total: supportPremiumPrice,
    });
  }

  return {
    tier: request.tier,
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
    termYears,
    totalPrice,
    currency,
    breakdown,
  };
}

/**
 * Validate pricing request
 */
export function validatePricingRequest(request: PricingRequest): string[] {
  const errors: string[] = [];

  if (!['Basic', 'Professional', 'Advanced', 'Enterprise'].includes(request.tier)) {
    errors.push('Invalid tier');
  }

  if (request.users < 0) errors.push('Users must be non-negative');
  if (request.suppliers < 0) errors.push('Suppliers must be non-negative');
  if (request.protocols < 0) errors.push('Protocols must be non-negative');
  if (request.sites < 0) errors.push('Sites must be non-negative');
  if (request.partnerTypes < 0) errors.push('Partner types must be non-negative');

  const tierDef = getTierDefinition(request.tier);
  if (!tierDef.allowsIntegrations && (request.erpIntegration || request.esrsSupport)) {
    errors.push(`${request.tier} tier does not support integrations`);
  }

  return errors;
}
