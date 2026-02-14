export interface Protocol {
  id: string;
  name: string;
  category: string;
}

export const pricingConfig = {
  version: "pricing-config-v1",
  currency: "USD",

  userOptions: [3, 25, 50, 100, 250, 500, 750],
  supplierOptions: [500, 1000, 3000, 10000, 25000, 999999],
  groupOptions: [5, 10, 25, 50, 100, 999999],

  protocols: [
    { id: "FAR", name: "Federal Acquisition Regulation (FAR)", category: "Risk Mitigation" },
    { id: "DFARS", name: "Defense Federal Acquisition Regulation (DFARS)", category: "Risk Mitigation" },
    { id: "ITAR", name: "International Traffic in Arms (ITAR)", category: "Risk Mitigation" },
    { id: "CMMC", name: "Cybersecurity Maturity Model (CMMC)", category: "Risk Mitigation" },
    { id: "EAR", name: "Export Administration Regulations (EAR)", category: "Risk Mitigation" },
    { id: "OFAC", name: "Office of Foreign Assets Control (OFAC)", category: "Risk Mitigation" },
    { id: "FCPA", name: "Foreign Corrupt Practices Act (FCPA)", category: "Risk Mitigation" },
    { id: "NIST", name: "NIST 800-171 Cybersecurity", category: "Risk Mitigation" },
    { id: "CM", name: "Counterfeit Mitigation (CM)", category: "Risk Mitigation" },
    { id: "UFLPA", name: "Uyghur Forced Labor Prevention (UFLPA)", category: "Risk Mitigation" },
    { id: "CFATS", name: "Chemical Facility Anti-Terrorism (CFATS)", category: "Risk Mitigation" },
    { id: "FISMA", name: "Federal Information Security (FISMA)", category: "Risk Mitigation" },
    { id: "REPS", name: "Representations & Certifications (REPS)", category: "Risk Mitigation" },
    { id: "ESRS", name: "Electronic Subcontracting Reporting (ESRS)", category: "Risk Mitigation" },
    { id: "BAA", name: "Buy American Act (BAA)", category: "Revenue Enablement" },
    { id: "TAA", name: "Trade Agreements Act (TAA)", category: "Revenue Enablement" },
    { id: "ICS", name: "Industrial Capabilities Survey (ICS)", category: "Revenue Enablement" },
    { id: "GFE", name: "Government Furnished Equipment (GFE)", category: "Revenue Enablement" },
    { id: "CPARTS", name: "Critical Parts Management (CPARTS)", category: "Revenue Enablement" },
    { id: "PODELAY", name: "PO Delay Tracking (PODELAY)", category: "Operational Optimization" },
    { id: "PODS", name: "PO Delivery Status (PODS)", category: "Operational Optimization" },
    { id: "AS9100", name: "AS9100 Quality Management", category: "Operational Optimization" },
    { id: "CTPAT", name: "C-TPAT Supply Chain Security", category: "Operational Optimization" },
    { id: "SOC2", name: "SOC 2 Compliance", category: "Operational Optimization" },
    { id: "FEDRAMP", name: "FedRAMP Authorization", category: "Operational Optimization" },
    { id: "SSJ", name: "Sole Source Justification (SSJ)", category: "Procurement Team" },
    { id: "ACPA", name: "Anti-Counterfeit Procurement (ACPA)", category: "Procurement Team" },
  ] as Protocol[],

  tiers: [
    {
      id: "STARTER",
      name: "Enterprise Starter",
      annualPrice: 25000,
      maxUsers: 3,
      maxSuppliers: 500,
      maxGroups: 5,
      maxProtocols: 1,
      features: [
        "Core compliance tracking",
        "Basic dashboards + CSV exports",
        "Email support",
        "Single protocol management",
      ],
    },
    {
      id: "FOUNDATION",
      name: "Enterprise Foundation",
      annualPrice: 125000,
      maxUsers: 50,
      maxSuppliers: 3000,
      maxGroups: 10,
      maxProtocols: 2,
      features: [
        "Standard dashboards + exports (PDF/Excel)",
        "Evidence repository",
        "Role-based access control (RBAC)",
        "RBAC + audit trail",
        "Standard onboarding + support",
      ],
    },
    {
      id: "GROWTH",
      name: "Enterprise Generation 1",
      annualPrice: 500000,
      maxUsers: 250,
      maxSuppliers: 15000,
      maxGroups: 50,
      maxProtocols: 5,
      features: [
        "Cross-protocol analytics",
        "Advanced analytics & reporting",
        "Executive reporting pack",
        "SLA-backed support",
        "Priority support with SLA-backed response times",
      ],
    },
    {
      id: "COMMAND",
      name: "Enterprise Generation 2",
      annualPrice: 1500000,
      maxUsers: 750,
      maxSuppliers: 999999,
      maxGroups: 999999,
      maxProtocols: 999999,
      features: [
        "Multi-jurisdiction support",
        "Custom integrations (API access)",
        "Dedicated customer success manager (CSM)",
        "API integration suite",
        "Multi-environment (Prod + Staging)",
      ],
    },
  ],
};

export type PricingConfig = typeof pricingConfig;
export type Tier = (typeof pricingConfig.tiers)[number];
