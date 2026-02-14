// server/services/proposalPdf.ts
// ============================================================================
// ENTERPRISE CONFIGURATOR — Proposal PDF Generator
// INT.DOC.91 v1.1 — Section 3.3 (D8: PDFKit)
//
// DEPENDENCY: pnpm add pdfkit
//
// Generates a branded proposal PDF with:
//   - Intelleges header + logo placeholder
//   - Customer information
//   - Configuration summary
//   - Tier details + pricing
//   - Protocol listing
//   - Terms and next steps
//
// Returns: file path to generated PDF (for email attachment + storage)
// ============================================================================

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

interface ProposalPdfInput {
  proposalId: number;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  contactRole: string;
  tier: {
    key: string;
    name: string;
    priceAnnual: number;
    included: {
      usersMax: number;
      suppliersMax: number;
      groupsMax: number;
      protocolsMax: number;
    };
    features: string[];
  };
  configuration: {
    tier: string;
    users: number;
    suppliers: number;
    groups: number;
    protocols: string[];
    multiJurisdiction: boolean;
  };
}

// Intelleges brand colors
const BRAND = {
  navy: "#1E3A5F",
  blue: "#2E5D8A",
  lightBlue: "#3A7BBF",
  gray: "#666666",
  lightGray: "#F0F4F8",
  white: "#FFFFFF",
  black: "#1A1A1A",
};

// Protocol full names for display
const PROTOCOL_NAMES: Record<string, string> = {
  FAR: "Federal Acquisition Regulation",
  DFARS: "Defense Federal Acquisition Regulation Supplement",
  ITAR: "International Traffic in Arms Regulations",
  CMMC: "Cybersecurity Maturity Model Certification",
  EAR: "Export Administration Regulations",
  OFAC: "Office of Foreign Assets Control",
  FCPA: "Foreign Corrupt Practices Act",
  NIST: "NIST SP 800-171",
  CM: "Conflict Minerals (Dodd-Frank 1502)",
  UFLPA: "Uyghur Forced Labor Prevention Act",
  CFATS: "Chemical Facility Anti-Terrorism Standards",
  FISMA: "Federal Information Security Management Act",
  REPS: "Representations and Certifications",
  ESRS: "Electronic Subcontracting Reporting System",
  BAA: "Buy American Act",
  TAA: "Trade Agreements Act",
  ICS: "Industrial Classification Standards",
  GFE: "Government Furnished Equipment",
  CPARTS: "Counterfeit Parts Prevention",
  PODELAY: "Purchase Order Delay Analysis",
  PODS: "PO Delivery Schedule Management",
  AS9100: "Aerospace Quality Management System",
  CTPAT: "Customs-Trade Partnership Against Terrorism",
  SOC2: "Service Organization Controls Type 2",
  FEDRAMP: "Federal Risk and Authorization Management",
  SSJ: "Single Source Justification",
  ACPA: "Anti-Competitive Practices Analysis",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatNumber(n: number): string {
  if (n === -1) return "Unlimited";
  return new Intl.NumberFormat("en-US").format(n);
}

export async function generateProposalPdf(input: ProposalPdfInput): Promise<string> {
  // Ensure output directory exists
  const outputDir = path.resolve(process.cwd(), "uploads", "proposals");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filename = `intelleges-proposal-${input.proposalId}.pdf`;
  const filepath = path.join(outputDir, filename);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 72, bottom: 72, left: 72, right: 72 },
      info: {
        Title: `Intelleges Enterprise Proposal - ${input.contactCompany}`,
        Author: "Intelleges, Inc.",
        Subject: `${input.tier.name} Proposal`,
      },
    });

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    const pageWidth = 612 - 144; // Letter width minus margins

    // ====== HEADER ======
    doc
      .rect(0, 0, 612, 100)
      .fill(BRAND.navy);

    doc
      .fontSize(28)
      .font("Helvetica-Bold")
      .fillColor(BRAND.white)
      .text("INTELLEGES", 72, 30, { width: pageWidth });

    doc
      .fontSize(12)
      .font("Helvetica")
      .fillColor("#AABBCC")
      .text("Federal Compliance Management System", 72, 65, { width: pageWidth });

    // ====== TITLE SECTION ======
    doc
      .fillColor(BRAND.navy)
      .fontSize(22)
      .font("Helvetica-Bold")
      .text("Enterprise Proposal", 72, 130, { width: pageWidth });

    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor(BRAND.gray)
      .text(`Proposal #${input.proposalId}  |  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 72, 160);

    // ====== DIVIDER ======
    doc
      .moveTo(72, 185)
      .lineTo(540, 185)
      .strokeColor(BRAND.blue)
      .lineWidth(2)
      .stroke();

    // ====== PREPARED FOR ======
    let y = 205;

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Prepared For", 72, y);

    y += 25;
    doc.fontSize(11).font("Helvetica").fillColor(BRAND.black);
    doc.text(`${input.contactName}`, 72, y);
    y += 16;
    doc.text(`${input.contactRole}`, 72, y);
    y += 16;
    doc.text(`${input.contactCompany}`, 72, y);
    y += 16;
    doc.text(`${input.contactEmail}`, 72, y);

    // ====== RECOMMENDED PLAN ======
    y += 40;
    doc
      .rect(72, y, pageWidth, 70)
      .fill(BRAND.lightGray);

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Recommended Plan", 88, y + 12);

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .fillColor(BRAND.blue)
      .text(input.tier.name, 88, y + 32);

    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text(`${formatCurrency(input.tier.priceAnnual)} / year`, 350, y + 32, { width: 180, align: "right" });

    // ====== CONFIGURATION SUMMARY ======
    y += 90;
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Your Configuration", 72, y);

    y += 25;
    const configItems = [
      ["Users", formatNumber(input.configuration.users)],
      ["Suppliers", formatNumber(input.configuration.suppliers)],
      ["Groups / Business Units", formatNumber(input.configuration.groups)],
      ["Protocols Selected", `${input.configuration.protocols.length}`],
      ["Multi-Jurisdiction", input.configuration.multiJurisdiction ? "Yes" : "No"],
    ];

    doc.fontSize(10).font("Helvetica");
    for (const [label, value] of configItems) {
      doc.fillColor(BRAND.gray).text(label, 88, y, { width: 250 });
      doc.fillColor(BRAND.black).font("Helvetica-Bold").text(value, 350, y, { width: 180, align: "right" });
      doc.font("Helvetica");
      y += 20;
    }

    // ====== TIER CAPACITY ======
    y += 15;
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Plan Capacity", 72, y);

    y += 25;
    const capacityItems = [
      ["Maximum Users", formatNumber(input.tier.included.usersMax)],
      ["Maximum Suppliers", formatNumber(input.tier.included.suppliersMax)],
      ["Maximum Groups", formatNumber(input.tier.included.groupsMax)],
      ["Maximum Protocols", formatNumber(input.tier.included.protocolsMax)],
    ];

    doc.fontSize(10).font("Helvetica");
    for (const [label, value] of capacityItems) {
      doc.fillColor(BRAND.gray).text(label, 88, y, { width: 250 });
      doc.fillColor(BRAND.black).font("Helvetica-Bold").text(value, 350, y, { width: 180, align: "right" });
      doc.font("Helvetica");
      y += 20;
    }

    // ====== FEATURES ======
    y += 15;
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Included Features", 72, y);

    y += 25;
    doc.fontSize(10).font("Helvetica").fillColor(BRAND.black);
    for (const feature of input.tier.features) {
      doc.text(`\u2713  ${feature}`, 88, y);
      y += 18;
    }

    // ====== PAGE 2: PROTOCOLS ======
    doc.addPage();
    let y2 = 72;

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Selected Compliance Protocols", 72, y2);

    y2 += 30;
    doc.fontSize(10).font("Helvetica");

    for (const acronym of input.configuration.protocols) {
      const fullName = PROTOCOL_NAMES[acronym] || acronym;
      doc
        .font("Helvetica-Bold")
        .fillColor(BRAND.blue)
        .text(acronym, 88, y2, { continued: true })
        .font("Helvetica")
        .fillColor(BRAND.black)
        .text(` \u2014 ${fullName}`);
      y2 += 20;

      // Page break safety
      if (y2 > 680) {
        doc.addPage();
        y2 = 72;
      }
    }

    // ====== NEXT STEPS ======
    y2 += 30;
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor(BRAND.navy)
      .text("Next Steps", 72, y2);

    y2 += 25;
    const steps = [
      "1. Review this proposal and confirm your configuration requirements.",
      "2. Contact your Intelleges representative to finalize terms.",
      "3. Submit payment via credit card or approved Purchase Order.",
      "4. Your enterprise will be provisioned within 24 hours of payment confirmation.",
      "5. Your designated admin will receive login credentials via email.",
    ];

    doc.fontSize(10).font("Helvetica").fillColor(BRAND.black);
    for (const step of steps) {
      doc.text(step, 88, y2, { width: pageWidth - 32 });
      y2 += 22;
    }

    // ====== FOOTER ======
    y2 += 30;
    doc
      .moveTo(72, y2)
      .lineTo(540, y2)
      .strokeColor("#CCCCCC")
      .lineWidth(1)
      .stroke();

    y2 += 15;
    doc
      .fontSize(9)
      .fillColor(BRAND.gray)
      .text("Intelleges, Inc. | sales@intelleges.com | www.intelleges.com", 72, y2, {
        width: pageWidth,
        align: "center",
      });

    y2 += 14;
    doc.text("This proposal is valid for 30 days from the date of issue.", 72, y2, {
      width: pageWidth,
      align: "center",
    });

    y2 += 14;
    doc.text("Confidential — intended solely for the named recipient.", 72, y2, {
      width: pageWidth,
      align: "center",
    });

    // ====== FINALIZE ======
    doc.end();

    stream.on("finish", () => {
      // Return relative URL for storage/serving
      resolve(`/uploads/proposals/${filename}`);
    });

    stream.on("error", (err) => {
      reject(err);
    });
  });
}
