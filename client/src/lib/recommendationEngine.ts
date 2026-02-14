import { pricingConfig, type Tier } from "./pricingConfig";

export interface ConfigurationInputs {
  users: number;
  suppliers: number;
  groups: number;
  protocolCount: number;
  multiJurisdiction: boolean;
}

export interface RecommendationResult {
  tier: Tier;
  warnings: string[];
}

export function getRecommendation(inputs: ConfigurationInputs): RecommendationResult {
  const { users, suppliers, groups, protocolCount, multiJurisdiction } = inputs;
  const warnings: string[] = [];

  if (multiJurisdiction) {
    const commandTier = pricingConfig.tiers.find((t) => t.id === "COMMAND")!;
    return { tier: commandTier, warnings };
  }

  const starterTier = pricingConfig.tiers.find((t) => t.id === "STARTER")!;
  if (
    users <= starterTier.maxUsers &&
    suppliers <= starterTier.maxSuppliers &&
    groups <= starterTier.maxGroups &&
    protocolCount <= starterTier.maxProtocols
  ) {
    return { tier: starterTier, warnings };
  }

  const foundationTier = pricingConfig.tiers.find((t) => t.id === "FOUNDATION")!;
  if (
    users <= foundationTier.maxUsers &&
    suppliers <= foundationTier.maxSuppliers &&
    groups <= foundationTier.maxGroups &&
    protocolCount <= foundationTier.maxProtocols
  ) {
    warnings.push("Capacity exceeds Starter - upgraded recommendation to Foundation.");
    return { tier: foundationTier, warnings };
  }

  const growthTier = pricingConfig.tiers.find((t) => t.id === "GROWTH")!;
  if (
    users <= growthTier.maxUsers &&
    suppliers <= growthTier.maxSuppliers &&
    groups <= growthTier.maxGroups &&
    protocolCount <= growthTier.maxProtocols
  ) {
    warnings.push("Capacity exceeds Foundation - upgraded recommendation to Generation 1.");
    return { tier: growthTier, warnings };
  }

  const commandTier = pricingConfig.tiers.find((t) => t.id === "COMMAND")!;
  warnings.push("Capacity exceeds Generation 1 - upgraded recommendation to Generation 2.");
  return { tier: commandTier, warnings };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatCapacity(value: number, label: string): string {
  if (value === 999999) return "Unlimited";
  return value.toLocaleString() + " " + label;
}
