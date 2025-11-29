/**
 * Mapping of service descriptions to their corresponding PDF documents
 */

export interface ServiceDocument {
  title: string;
  pdfPath: string;
  fileName: string;
}

export const serviceDocuments: Record<string, ServiceDocument> = {
  "collect-supplier-data": {
    title: "Collect supplier data and documentation",
    pdfPath: "/service-documents/Service_01_Collect_Supplier_Data.pdf",
    fileName: "Intelleges_Collect_Supplier_Data.pdf"
  },
  "validate-verify": {
    title: "Validate and verify information",
    pdfPath: "/service-documents/Service_02_Validate_Verify.pdf",
    fileName: "Intelleges_Validate_Verify.pdf"
  },
  "compliance-workflows": {
    title: "Manage compliance workflows",
    pdfPath: "/service-documents/Service_03_Compliance_Workflows.pdf",
    fileName: "Intelleges_Compliance_Workflows.pdf"
  },
  "supplier-vetting": {
    title: "Vet domestic and foreign suppliers",
    pdfPath: "/service-documents/Service_04_Supplier_Vetting.pdf",
    fileName: "Intelleges_Supplier_Vetting.pdf"
  },
  "shoring-transitions": {
    title: "Support offshoring, nearshoring, and re-shoring transitions",
    pdfPath: "/service-documents/Service_05_Shoring_Transitions.pdf",
    fileName: "Intelleges_Shoring_Transitions.pdf"
  },
  "investigations": {
    title: "Conduct investigations & due diligence",
    pdfPath: "/service-documents/Service_06_Investigations.pdf",
    fileName: "Intelleges_Investigations.pdf"
  },
  "environmental-scans": {
    title: "Perform environmental scans & regional assessments",
    pdfPath: "/service-documents/Service_07_Environmental_Scans.pdf",
    fileName: "Intelleges_Environmental_Scans.pdf"
  },
  "expiration-tracking": {
    title: "Track expirations, risk indicators, and quality data",
    pdfPath: "/service-documents/Service_08_Expiration_Tracking.pdf",
    fileName: "Intelleges_Expiration_Tracking.pdf"
  },
  "audit-documentation": {
    title: "Produce audit-ready documentation automatically",
    pdfPath: "/service-documents/Service_09_Audit_Ready_Documentation.pdf",
    fileName: "Intelleges_Audit_Ready_Documentation.pdf"
  }
};

// Helper function to get service document by title
export function getServiceDocumentByTitle(title: string): ServiceDocument | undefined {
  return Object.values(serviceDocuments).find(
    (doc) => doc.title.toLowerCase() === title.toLowerCase()
  );
}
