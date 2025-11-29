export interface CaseStudy {
  id: string;
  number: number;
  title: string;
  industry: string;
  fileName: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "annual-reps-certs",
    number: 1,
    title: "Annual Representations & Certifications",
    industry: "Defense",
    fileName: "Case_Study_01.docx"
  },
  {
    id: "buy-american-act",
    number: 2,
    title: "Buy American Act & Country of Origin",
    industry: "Manufacturing",
    fileName: "Case_Study_02.docx"
  },
  {
    id: "conflict-minerals",
    number: 3,
    title: "Conflict Minerals Compliance",
    industry: "Electronics",
    fileName: "Case_Study_03.docx"
  },
  {
    id: "counterfeit-parts",
    number: 4,
    title: "Counterfeit Parts Prevention",
    industry: "Aerospace",
    fileName: "Case_Study_04.docx"
  },
  {
    id: "cybersecurity-cmmc",
    number: 5,
    title: "Cybersecurity & CMMC Assessment",
    industry: "Defense",
    fileName: "Case_Study_05.docx"
  },
  {
    id: "esg-sourcing",
    number: 6,
    title: "ESG & Responsible Sourcing",
    industry: "Consumer",
    fileName: "Case_Study_06.docx"
  },
  {
    id: "export-controls",
    number: 7,
    title: "Export Controls ITAR/EAR",
    industry: "Aerospace",
    fileName: "Case_Study_07.docx"
  },
  {
    id: "fcpa-anti-corruption",
    number: 8,
    title: "FCPA Anti-Corruption",
    industry: "Global",
    fileName: "Case_Study_08.docx"
  },
  {
    id: "insurance-coi",
    number: 9,
    title: "Insurance & COI Tracking",
    industry: "Construction",
    fileName: "Case_Study_09.docx"
  },
  {
    id: "product-conformance",
    number: 10,
    title: "Product Conformance & Quality",
    industry: "Automotive",
    fileName: "Case_Study_10.docx"
  },
  {
    id: "purchase-order-delays",
    number: 11,
    title: "Purchase Order Delays & Delivery",
    industry: "Manufacturing",
    fileName: "Case_Study_11.docx"
  },
  {
    id: "quality-systems",
    number: 12,
    title: "Quality Systems Assessment",
    industry: "Aerospace",
    fileName: "Case_Study_12.docx"
  },
  {
    id: "raw-materials",
    number: 13,
    title: "Raw Materials Exchange",
    industry: "Pharma",
    fileName: "Case_Study_13.docx"
  },
  {
    id: "site-security",
    number: 14,
    title: "Site Security C-TPAT/CFATS",
    industry: "Logistics",
    fileName: "Case_Study_14.docx"
  },
  {
    id: "supplier-diversity",
    number: 15,
    title: "Supplier Diversity & eSRS",
    industry: "Government",
    fileName: "Case_Study_15.docx"
  },
  {
    id: "supplier-health",
    number: 16,
    title: "Supplier Health & Financial Risk",
    industry: "Manufacturing",
    fileName: "Case_Study_16.docx"
  },
  {
    id: "sole-source-risk",
    number: 17,
    title: "Sole-Source Risk Mitigation (PODS)",
    industry: "Aerospace",
    fileName: "Case_Study_17.docx"
  }
];

export const industries = Array.from(new Set(caseStudies.map(cs => cs.industry))).sort();
