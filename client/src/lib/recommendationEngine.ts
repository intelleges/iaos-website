import { pricingConfig, Tier } from './pricingConfig';

export interface ConfigurationInputs {
  users: number;
  suppliers: number;
  groups: number;
  protocols: string[];
  multiJurisdiction: boolean;
}

export interface RecommendationResult {
  tier: Tier;
  overageMessage: string | null;
}

export function getRecommendation(inputs: ConfigurationInputs): RecommendationResult {
  const { users, suppliers, groups, protocols, multiJurisdiction } = inputs;
  const protocolsCount = protocols.length;

  // If multi-jurisdiction is enabled, always recommend COMMAND
  if (multiJurisdiction) {
    const commandTier = pricingConfig.tiers.find(t => t.key === 'COMMAND')!;
    return {
      tier: commandTier,
      overageMessage: null
    };
  }

  // Check Starter tier
  const starterTier = pricingConfig.tiers.find(t => t.key === 'STARTER')!;
  if (
    users <= starterTier.included.usersMax &&
    suppliers <= starterTier.included.suppliersMax &&
    groups <= starterTier.included.groupsMax &&
    protocolsCount <= starterTier.included.protocolsMax
  ) {
    return {
      tier: starterTier,
      overageMessage: null
    };
  }

  // Check Foundation tier
  const foundationTier = pricingConfig.tiers.find(t => t.key === 'FOUNDATION')!;
  if (
    users <= foundationTier.included.usersMax &&
    suppliers <= foundationTier.included.suppliersMax &&
    groups <= foundationTier.included.groupsMax &&
    protocolsCount <= foundationTier.included.protocolsMax
  ) {
    return {
      tier: foundationTier,
      overageMessage: pricingConfig.overageMessaging.messages.STARTER_TO_FOUNDATION
    };
  }

  // Check Growth tier
  const growthTier = pricingConfig.tiers.find(t => t.key === 'GROWTH')!;
  if (
    users <= growthTier.included.usersMax &&
    suppliers <= growthTier.included.suppliersMax &&
    groups <= growthTier.included.groupsMax &&
    protocolsCount <= growthTier.included.protocolsMax
  ) {
    return {
      tier: growthTier,
      overageMessage: pricingConfig.overageMessaging.messages.FOUNDATION_TO_GROWTH
    };
  }

  // Default to Command tier
  const commandTier = pricingConfig.tiers.find(t => t.key === 'COMMAND')!;
  return {
    tier: commandTier,
    overageMessage: pricingConfig.overageMessaging.messages.GROWTH_TO_COMMAND
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCapacity(value: number, label: string): string {
  if (value === -1) return 'Unlimited';
  return `${value.toLocaleString()} ${label}`;
}
