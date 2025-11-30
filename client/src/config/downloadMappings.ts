/**
 * THE MASTER DOWNLOAD MAPPING TABLE
 * 
 * Single source of truth for:
 * - Which capability → maps to which PDF
 * - Tooltip text
 * - Case study references
 * - Download flow logic (gated vs public)
 * 
 * This makes the system declarative, centralized, and impossible to break by accident.
 */

export const capabilityDownloads = {
  "collect-supplier-data": {
    title: "Collect supplier data and documentation",
    pdf: "/pdfs/collect-supplier-data.pdf",
    tooltip: "Download the Supplier Documentation & Collection Summary",
    gating: true,
    caseStudies: ["foic-vetting", "supplier-onboarding", "rfi-rfp"]
  },
  "validate-verify": {
    title: "Validate and verify information",
    pdf: "/pdfs/validate-verify.pdf",
    tooltip: "Download Validation & Verification Overview",
    gating: true,
    caseStudies: ["compliance-verification", "supplier-risk"]
  },
  "manage-workflows": {
    title: "Manage compliance workflows",
    pdf: "/pdfs/compliance-workflows.pdf",
    tooltip: "Download Compliance Workflow Guide",
    gating: true,
    caseStudies: ["foic-workflow", "sbir-tracking", "far-dfars"]
  },
  "vet-suppliers": {
    title: "Vet domestic and foreign suppliers",
    pdf: "/pdfs/vet-domestic-foreign.pdf",
    tooltip: "Download Supplier Vetting Framework",
    gating: true,
    caseStudies: ["national-lab-vetting", "sole-source-vetting"]
  },
  "supply-chain-transitions": {
    title: "Support offshoring, nearshoring, and re-shoring transitions",
    pdf: "/pdfs/nearshoring-transitions.pdf",
    tooltip: "Download Nearshoring Transition Whitepaper",
    gating: false, // Public download, no email capture
    caseStudies: ["mexico-nearshoring"]
  },
  "investigations-due-diligence": {
    title: "Conduct investigations & due diligence",
    pdf: "/pdfs/due-diligence.pdf",
    tooltip: "Download Due Diligence Checklist & Framework",
    gating: true,
    caseStudies: ["investigations"]
  },
  "environmental-scans": {
    title: "Perform environmental scans & regional assessments",
    pdf: "/pdfs/environmental-assessment.pdf",
    tooltip: "Download Environmental & Regional Assessment Summary",
    gating: true,
    caseStudies: ["environmental-compliance"]
  },
  "track-quality-data": {
    title: "Track expirations, risk indicators, and quality data",
    pdf: "/pdfs/risk-indicators.pdf",
    tooltip: "Download Risk Indicators Overview",
    gating: true,
    caseStudies: ["risk-dashboard", "expiring-certificates"]
  },
  "audit-documentation": {
    title: "Produce audit-ready documentation automatically",
    pdf: "/pdfs/audit-ready-automation.pdf",
    tooltip: "Download Audit-Ready Automation Overview",
    gating: true,
    caseStudies: ["audit-automation"]
  }
} as const;

export type CapabilityKey = keyof typeof capabilityDownloads;
