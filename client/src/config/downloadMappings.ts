/**
 * INTELLEGES COMPLETE DOWNLOAD MAPPING SYSTEM
 * 
 * Single source of truth for all 47+ downloadable assets across the website:
 * - 9 Capability PDFs
 * - 17 Case Study PDFs
 * - 9 Service One-Pager PDFs
 * - 3 Core Marketing Documents
 * 
 * Three-tier gating system:
 * - "public": Direct download (no gate)
 * - "email": Email capture modal → download
 * - "calendly": Calendly meeting booking → email with download link
 */

export type GatingType = "public" | "email" | "calendly";

export interface DownloadAsset {
  title: string;
  filename: string;
  tooltip: string;
  gating: GatingType;
  caseStudies?: readonly string[];
  industry?: string;
  description?: string;
}

// ============================================================================
// SECTION 1: CAPABILITY PDFs (9 Total)
// ============================================================================

export const capabilityDownloads = {
  "collect-supplier-data": {
    title: "Collect supplier data and documentation",
    filename: "collect-supplier-data.pdf",
    tooltip: "Download the Supplier Documentation & Collection Summary",
    gating: "email" as GatingType,
    caseStudies: ["foic-vetting", "supplier-onboarding", "rfi-rfp"]
  },
  "validate-verify": {
    title: "Validate and verify information",
    filename: "validate-verify.pdf",
    tooltip: "Download Validation & Verification Overview",
    gating: "email" as GatingType,
    caseStudies: ["compliance-verification", "supplier-risk"]
  },
  "manage-workflows": {
    title: "Manage compliance workflows",
    filename: "compliance-workflows.pdf",
    tooltip: "Download Compliance Workflow Guide",
    gating: "email" as GatingType,
    caseStudies: ["foic-workflow", "sbir-tracking", "far-dfars"]
  },
  "vet-suppliers": {
    title: "Vet domestic and foreign suppliers",
    filename: "vet-domestic-foreign.pdf",
    tooltip: "Download Supplier Vetting Framework",
    gating: "email" as GatingType,
    caseStudies: ["national-lab-vetting", "sole-source-vetting"]
  },
  "supply-chain-transitions": {
    title: "Support offshoring, nearshoring, and re-shoring transitions",
    filename: "nearshoring-transitions.pdf",
    tooltip: "Download Nearshoring Transition Whitepaper",
    gating: "email" as GatingType,
    caseStudies: ["mexico-nearshoring"]
  },
  "investigations-due-diligence": {
    title: "Conduct investigations & due diligence",
    filename: "due-diligence.pdf",
    tooltip: "Download Due Diligence Checklist & Framework",
    gating: "email" as GatingType,
    caseStudies: ["investigations"]
  },
  "environmental-scans": {
    title: "Perform environmental scans & regional assessments",
    filename: "environmental-assessment.pdf",
    tooltip: "Download Environmental & Regional Assessment Summary",
    gating: "email" as GatingType,
    caseStudies: ["environmental-compliance"]
  },
  "track-quality-data": {
    title: "Track expirations, risk indicators, and quality data",
    filename: "risk-indicators.pdf",
    tooltip: "Download Risk Indicators Overview",
    gating: "email" as GatingType,
    caseStudies: ["risk-dashboard", "expiring-certificates"]
  },
  "audit-documentation": {
    title: "Produce audit-ready documentation automatically",
    filename: "audit-ready-automation.pdf",
    tooltip: "Download Audit-Ready Automation Overview",
    gating: "email" as GatingType,
    caseStudies: ["audit-automation"]
  }
} as const;

// ============================================================================
// SECTION 2: CASE STUDY PDFs (17 Total)
// ============================================================================

export const caseStudyDownloads = {
  "reps-certs": {
    title: "Reps & Certs / FOIC Vetting",
    filename: "Case_Study_01_Reps_Certs.pdf",
    tooltip: "Download Aerospace & Defense FOIC Vetting Case Study",
    gating: "calendly" as GatingType,
    industry: "Aerospace & Defense",
    description: "Annual representations and certifications compliance automation"
  },
  "small-business": {
    title: "Small Business Compliance & SBA Programs",
    filename: "Case_Study_02_Small_Business.pdf",
    tooltip: "Download Small Business Programs Case Study",
    gating: "calendly" as GatingType,
    industry: "Aerospace & Defense",
    description: "SBIR/STTR and small business set-aside compliance"
  },
  "itar-ear": {
    title: "ITAR / EAR Export Compliance",
    filename: "Case_Study_03_ITAR_EAR.pdf",
    tooltip: "Download Export Control Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Aerospace & Defense",
    description: "International Traffic in Arms Regulations compliance"
  },
  "cmmc-nist": {
    title: "CMMC 2.0 & NIST 800-171 Cybersecurity",
    filename: "Case_Study_04_CMMC_NIST.pdf",
    tooltip: "Download Cybersecurity Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Aerospace & Defense",
    description: "Cybersecurity Maturity Model Certification compliance"
  },
  "buy-american": {
    title: "Buy American Act & Trade Agreements",
    filename: "Case_Study_05_Buy_American.pdf",
    tooltip: "Download Buy American Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Construction / Government",
    description: "Domestic content verification and trade agreement compliance"
  },
  "insurance": {
    title: "Insurance & Indemnification",
    filename: "Case_Study_06_Insurance.pdf",
    tooltip: "Download Insurance Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Logistics / 3PL",
    description: "Certificate of insurance tracking and verification"
  },
  "product-conformance": {
    title: "Product Conformance (Automotive)",
    filename: "Case_Study_07_Product_Conformance.pdf",
    tooltip: "Download Automotive Product Conformance Case Study",
    gating: "calendly" as GatingType,
    industry: "Manufacturing / Automotive",
    description: "PPAP and product conformance documentation automation"
  },
  "po-delays": {
    title: "PO Delays & Delivery Forecasts",
    filename: "Case_Study_08_PO_Delays.pdf",
    tooltip: "Download Supply Chain Visibility Case Study",
    gating: "calendly" as GatingType,
    industry: "Electronics / Semiconductor",
    description: "Purchase order delay tracking and delivery forecasting"
  },
  "fsv": {
    title: "Foreign Supplier Verification (FSV)",
    filename: "Case_Study_09_FSV.pdf",
    tooltip: "Download Foreign Supplier Verification Case Study",
    gating: "calendly" as GatingType,
    industry: "Critical Infrastructure / Energy",
    description: "FSMA foreign supplier verification program compliance"
  },
  "nearshoring": {
    title: "Offshoring / Nearshoring Transitions",
    filename: "Case_Study_10_Nearshoring.pdf",
    tooltip: "Download Nearshoring Transition Case Study",
    gating: "calendly" as GatingType,
    industry: "Electronics / Consumer",
    description: "Mexico nearshoring and supply chain transition management"
  },
  "due-diligence": {
    title: "Investigations & Due Diligence",
    filename: "Case_Study_11_Due_Diligence.pdf",
    tooltip: "Download Due Diligence Investigation Case Study",
    gating: "calendly" as GatingType,
    industry: "Financial Services",
    description: "Third-party risk assessment and due diligence workflows"
  },
  "environmental": {
    title: "Environmental Scans & Regional Profiling",
    filename: "Case_Study_12_Environmental.pdf",
    tooltip: "Download Environmental Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Energy / Renewables",
    description: "ESG and environmental compliance data collection"
  },
  "quality-systems": {
    title: "Quality Systems (ISO, AS9100, GMP)",
    filename: "Case_Study_13_Quality_Systems.pdf",
    tooltip: "Download Quality Systems Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Healthcare / Pharma",
    description: "ISO 9001, AS9100, and GMP quality system compliance"
  },
  "conflict-minerals": {
    title: "Conflict Minerals (CMRT/EMRT)",
    filename: "Case_Study_14_Conflict_Minerals.pdf",
    tooltip: "Download Conflict Minerals Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Electronics / EV / Semiconductor",
    description: "Dodd-Frank conflict minerals reporting compliance"
  },
  "counterfeit-parts": {
    title: "Counterfeit Parts Prevention",
    filename: "Case_Study_15_Counterfeit_Parts.pdf",
    tooltip: "Download Counterfeit Parts Prevention Case Study",
    gating: "calendly" as GatingType,
    industry: "Aviation MRO",
    description: "AS6174 counterfeit parts avoidance compliance"
  },
  "site-security": {
    title: "Site Security (C-TPAT/CFATS)",
    filename: "Case_Study_16_Site_Security.pdf",
    tooltip: "Download Site Security Compliance Case Study",
    gating: "calendly" as GatingType,
    industry: "Chemical / Hazmat",
    description: "C-TPAT and CFATS facility security compliance"
  },
  "pods": {
    title: "PODS Sole-Source Justification",
    filename: "Case_Study_17_PODS.pdf",
    tooltip: "Download Sole-Source Justification Case Study",
    gating: "calendly" as GatingType,
    industry: "Aerospace & Defense",
    description: "FAR Part 12 sole-source justification automation"
  }
} as const;

// ============================================================================
// SECTION 3: SERVICE ONE-PAGER PDFs (9 Total)
// ============================================================================

export const serviceDownloads = {
  "reps-certs-service": {
    title: "Reps & Certs Compliance Service",
    filename: "Service_Reps_Certs.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/uUdaxEZihzIGXfpV.pdf",
    tooltip: "Download Reps & Certs Service Overview",
    gating: "email" as GatingType,
    description: "Annual representations and certifications compliance service"
  },
  "export-control": {
    title: "Export Control (ITAR/EAR) Service",
    filename: "Service_Export_Control.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/RQXFbnBJTeZksAVU.pdf",
    tooltip: "Download Export Control Service Overview",
    gating: "email" as GatingType,
    description: "ITAR and EAR export compliance service"
  },
  "cybersecurity": {
    title: "Cybersecurity (CMMC/NIST) Service",
    filename: "Service_Cybersecurity.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/DfrrnZSuxRPLgXFc.pdf",
    tooltip: "Download Cybersecurity Service Overview",
    gating: "email" as GatingType,
    description: "CMMC 2.0 and NIST 800-171 compliance service"
  },
  "small-business-service": {
    title: "Small Business Programs Service",
    filename: "Service_Small_Business.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/YYNGmfUtKqXLwVUx.pdf",
    tooltip: "Download Small Business Programs Service Overview",
    gating: "email" as GatingType,
    description: "SBIR/STTR and small business compliance service"
  },
  "conflict-minerals-service": {
    title: "Conflict Minerals Service",
    filename: "Service_Conflict_Minerals.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/qRefSgZnoRMJDbvJ.pdf",
    tooltip: "Download Conflict Minerals Service Overview",
    gating: "email" as GatingType,
    description: "Dodd-Frank conflict minerals compliance service"
  },
  "buy-american-service": {
    title: "Buy American Compliance Service",
    filename: "Service_Buy_American.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/rsPBBfYhWxhxCHZl.pdf",
    tooltip: "Download Buy American Service Overview",
    gating: "email" as GatingType,
    description: "Buy American Act and BAA compliance service"
  },
  "supplier-risk": {
    title: "Supplier Risk Management Service",
    filename: "Service_Supplier_Risk.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/YXSbuxoixWhTfFCj.pdf",
    tooltip: "Download Supplier Risk Service Overview",
    gating: "email" as GatingType,
    description: "Third-party risk assessment and monitoring service"
  },
  "quality-systems-service": {
    title: "Quality Systems (ISO/AS9100) Service",
    filename: "Service_Quality_Systems.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/CBjsNyACfPafkSVT.pdf",
    tooltip: "Download Quality Systems Service Overview",
    gating: "email" as GatingType,
    description: "ISO 9001 and AS9100 quality compliance service"
  },
  "environmental-coi": {
    title: "Environmental & COI Tracking Service",
    filename: "Service_Environmental_COI.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/IIgUTiwNsbmMbULJ.pdf",
    tooltip: "Download Environmental & COI Service Overview",
    gating: "email" as GatingType,
    description: "ESG and certificate of insurance tracking service"
  },
  "compliance-maturity-model": {
    title: "Compliance Maturity Model",
    filename: "Compliance_Maturity_Model.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/dOInHIoAFriHMlIE.pdf",
    tooltip: "Download Compliance Maturity Model Framework",
    gating: "email" as GatingType,
    description: "Framework for assessing and improving organizational compliance maturity"
  },
  "current-compliance-landscape": {
    title: "Current Compliance Landscape",
    filename: "Current_Compliance_Landscape.pdf",
    cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/89620106/sApjtmZgYGrjYCct.pdf",
    tooltip: "Download Current Compliance Landscape Report",
    gating: "email" as GatingType,
    description: "Overview of current regulatory compliance requirements and trends"
  }
} as const;

// ============================================================================
// SECTION 4: CORE MARKETING DOCUMENTS (3 Total)
// ============================================================================

export const marketingDownloads = {
  "full-whitepaper": {
    title: "Complete Compliance & Supply Chain Intelligence Guide",
    filename: "Intelleges_Compliance_Supply_Chain_Intelligence_Guide.pdf",
    tooltip: "Download the complete 15-page whitepaper (requires meeting)",
    gating: "calendly" as GatingType,
    description: "Comprehensive guide to enterprise compliance automation (15 pages)"
  },
  "executive-summary": {
    title: "Executive Summary",
    filename: "Intelleges_Executive_Summary.pdf",
    tooltip: "Download the 3-page executive summary",
    gating: "email" as GatingType,
    description: "Quick overview of Intelleges platform capabilities (3 pages)"
  },
  "content-library": {
    title: "Content Library Index",
    filename: "Intelleges_Content_Library_Index.pdf",
    tooltip: "Download the public content library index",
    gating: "public" as GatingType,
    description: "Complete index of all available resources and case studies"
  }
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CapabilityKey = keyof typeof capabilityDownloads;
export type CaseStudyKey = keyof typeof caseStudyDownloads;
export type ServiceKey = keyof typeof serviceDownloads;
export type MarketingKey = keyof typeof marketingDownloads;

export type DownloadKey = CapabilityKey | CaseStudyKey | ServiceKey | MarketingKey;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getDownloadAsset(key: DownloadKey): DownloadAsset | undefined {
  if (key in capabilityDownloads) {
    const asset = capabilityDownloads[key as CapabilityKey];
    return { ...asset, filename: `pdfs/capabilities/${asset.filename}` };
  }
  if (key in caseStudyDownloads) {
    const asset = caseStudyDownloads[key as CaseStudyKey];
    return { ...asset, filename: `pdfs/case-studies/${asset.filename}` };
  }
  if (key in serviceDownloads) {
    const asset = serviceDownloads[key as ServiceKey];
    return { ...asset, filename: `pdfs/services/${asset.filename}` };
  }
  if (key in marketingDownloads) {
    const asset = marketingDownloads[key as MarketingKey];
    return { ...asset, filename: `pdfs/marketing/${asset.filename}` };
  }
  return undefined;
}

export function getAllDownloads() {
  return {
    capabilities: capabilityDownloads,
    caseStudies: caseStudyDownloads,
    services: serviceDownloads,
    marketing: marketingDownloads
  };
}
