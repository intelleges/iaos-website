export const pricingConfig = {
  version: "pricing-config-v1",
  currency: "USD",
  ui: {
    title: "Enterprise Licensing & Capacity Planning",
    subtitle: "Configure your enterprise scope to see the recommended plan tier.",
    ctas: {
      primary: { label: "Request Proposal", action: "REQUEST_PROPOSAL" },
      secondary: { label: "Compare Plans", action: "COMPARE_PLANS" }
    }
  },
  inputs: {
    users: {
      type: "single_select",
      label: "Users",
      options: [3, 25, 50, 100, 250, 500, 750],
      displayMap: { "750": "750+" }
    },
    suppliers: {
      type: "single_select",
      label: "Suppliers",
      options: [500, 1000, 3000, 10000, 25000, -1],
      displayMap: { "-1": "Unlimited" }
    },
    groups: {
      type: "single_select",
      label: "Groups / Business Units",
      options: [5, 10, 25, 50, 100, -1],
      displayMap: { "-1": "Unlimited" }
    },
    protocols: {
      type: "multi_select_grouped",
      label: "Protocols Required",
      maxRecommendedForTierEvaluation: true,
      groups: [
        {
          framingMode: "RISK_MITIGATION",
          label: "Risk Mitigation",
          items: ["FAR", "DFARS", "ITAR", "CMMC", "EAR", "OFAC", "FCPA", "NIST", "CM", "UFLPA", "CFATS", "FISMA", "REPS", "ESRS"]
        },
        {
          framingMode: "REVENUE_ENABLEMENT",
          label: "Revenue Enablement",
          items: ["BAA", "TAA", "ICS", "GFE", "CPARTS"]
        },
        {
          framingMode: "OPERATIONAL_OPTIMIZATION",
          label: "Operational Optimization",
          items: ["PODELAY", "PODS", "AS9100", "CTPAT", "SOC2", "FEDRAMP"]
        },
        {
          framingMode: "PROCUREMENT_TEAM",
          label: "Procurement Team",
          items: ["SSJ", "ACPA"]
        }
      ]
    },
    multiJurisdiction: {
      type: "boolean",
      label: "Multi-jurisdiction support required",
      default: false
    }
  },
  tiers: [
    {
      key: "STARTER",
      name: "Enterprise Starter",
      priceAnnual: 25000,
      included: {
        usersMax: 3,
        suppliersMax: 500,
        groupsMax: 5,
        protocolsMax: 1
      },
      features: [
        "Core compliance tracking",
        "Basic dashboards + CSV exports",
        "Email support",
        "Single protocol management"
      ]
    },
    {
      key: "FOUNDATION",
      name: "Enterprise Foundation",
      priceAnnual: 125000,
      included: {
        usersMax: 50,
        suppliersMax: 3000,
        groupsMax: 10,
        protocolsMax: 2
      },
      features: [
        "Standard dashboards + exports (PDF/Excel)",
        "Evidence repository",
        "RBAC + audit trail",
        "Standard onboarding + support"
      ]
    },
    {
      key: "GROWTH",
      name: "Enterprise Generation 1",
      priceAnnual: 500000,
      included: {
        usersMax: 250,
        suppliersMax: 15000,
        groupsMax: 50,
        protocolsMax: 5
      },
      features: [
        "Cross-protocol analytics",
        "Executive reporting pack",
        "SLA-backed support"
      ]
    },
    {
      key: "COMMAND",
      name: "Enterprise Generation 2",
      priceAnnual: 1500000,
      included: {
        usersMax: 750,
        suppliersMax: -1,
        groupsMax: -1,
        protocolsMax: -1
      },
      features: [
        "Jurisdiction mapping (US/EU/Canada/etc.)",
        "API integration suite",
        "Dedicated CSM + governance reviews",
        "Multi-environment (Prod + Staging)"
      ]
    }
  ],
  recommendationRules: [
    {
      tierKey: "STARTER",
      when: {
        multiJurisdiction: false,
        usersLte: 3,
        suppliersLte: 500,
        groupsLte: 5,
        protocolsSelectedLte: 1
      },
      message: "Recommended plan: Enterprise Starter"
    },
    {
      tierKey: "FOUNDATION",
      when: {
        multiJurisdiction: false,
        usersLte: 50,
        suppliersLte: 3000,
        groupsLte: 10,
        protocolsSelectedLte: 2
      },
      message: "Recommended plan: Enterprise Foundation"
    },
    {
      tierKey: "GROWTH",
      when: {
        multiJurisdiction: false,
        usersLte: 250,
        suppliersLte: 15000,
        groupsLte: 50,
        protocolsSelectedLte: 5
      },
      message: "Recommended plan: Enterprise Generation 1"
    },
    {
      tierKey: "COMMAND",
      when: {
        otherwise: true
      },
      message: "Recommended plan: Enterprise Generation 2"
    }
  ],
  overageMessaging: {
    bannerStyle: "warning",
    messages: {
      STARTER_TO_FOUNDATION: "Capacity exceeds Starter — upgraded recommendation to Foundation.",
      FOUNDATION_TO_GROWTH: "Capacity exceeds Foundation — upgraded recommendation to Generation 1.",
      GROWTH_TO_COMMAND: "Capacity exceeds Generation 1 — upgraded recommendation to Generation 2."
    }
  }
};

export type PricingConfig = typeof pricingConfig;
export type Tier = typeof pricingConfig.tiers[number];
