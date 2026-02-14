// server/services/proposalEmail.ts
// ============================================================================
// ENTERPRISE CONFIGURATOR — Email Service
// INT.DOC.91 v1.1 — Section 5
//
// Uses the EXISTING SendGrid integration already in the codebase.
// Env vars: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL (already configured)
//
// Templates:
//   E1 — Proposal confirmation to prospect (with PDF attachment)
//   E4 — Internal notification to sales team
// ============================================================================

import sgMail from "@sendgrid/mail";
import fs from "fs";
import path from "path";

// Initialize with existing env var
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "sales@intelleges.com";
const FROM_NAME = "Intelleges Enterprise";
const SALES_TEAM_EMAIL = process.env.SALES_TEAM_EMAIL || "sales@intelleges.com";

// ============================================================================
// Shared Helpers
// ============================================================================
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

// ============================================================================
// E1: Proposal Confirmation to Prospect
// ============================================================================
interface ProposalConfirmationInput {
  to: string;
  contactName: string;
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
  };
  configuration: {
    tier: string;
    users: number;
    suppliers: number;
    groups: number;
    protocols: string[];
    multiJurisdiction: boolean;
  };
  proposalId: number;
  pdfUrl: string | null;
}

export async function sendProposalConfirmation(input: ProposalConfirmationInput): Promise<void> {
  const { to, contactName, tier, configuration, proposalId, pdfUrl } = input;
  const firstName = contactName.split(" ")[0];

  const protocolList = configuration.protocols.map((p) => `• ${p}`).join("\n");

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6; margin: 0; padding: 0; }
    .header { background-color: #1E3A5F; padding: 24px 32px; }
    .header h1 { color: #FFFFFF; font-size: 24px; margin: 0; }
    .header p { color: #AABBCC; font-size: 13px; margin: 4px 0 0; }
    .content { padding: 32px; max-width: 600px; }
    .tier-box { background-color: #F0F4F8; border-left: 4px solid #2E5D8A; padding: 16px 20px; margin: 20px 0; }
    .tier-name { font-size: 20px; font-weight: bold; color: #1E3A5F; margin: 0; }
    .tier-price { font-size: 18px; color: #2E5D8A; font-weight: bold; }
    .config-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .config-table td { padding: 8px 0; font-size: 14px; border-bottom: 1px solid #E8E8E8; }
    .config-table td:first-child { color: #666666; }
    .config-table td:last-child { text-align: right; font-weight: bold; }
    .protocols { background: #FAFBFC; padding: 16px; border-radius: 6px; margin: 16px 0; font-size: 13px; }
    .next-steps { margin: 24px 0; }
    .next-steps li { margin-bottom: 8px; font-size: 14px; }
    .cta-button { display: inline-block; background-color: #2E5D8A; color: #FFFFFF; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-top: 16px; }
    .footer { padding: 24px 32px; border-top: 1px solid #E8E8E8; font-size: 12px; color: #999999; }
  </style>
</head>
<body>
  <div class="header">
    <h1>INTELLEGES</h1>
    <p>Federal Compliance Management System</p>
  </div>
  <div class="content">
    <p>Dear ${firstName},</p>
    <p>Thank you for your interest in Intelleges. Based on your configuration, we've prepared a proposal for your review.</p>

    <div class="tier-box">
      <p class="tier-name">${tier.name}</p>
      <p class="tier-price">${formatCurrency(tier.priceAnnual)} / year</p>
    </div>

    <table class="config-table">
      <tr><td>Users</td><td>${formatNumber(configuration.users)}</td></tr>
      <tr><td>Suppliers</td><td>${formatNumber(configuration.suppliers)}</td></tr>
      <tr><td>Groups / Business Units</td><td>${formatNumber(configuration.groups)}</td></tr>
      <tr><td>Protocols Selected</td><td>${configuration.protocols.length}</td></tr>
      <tr><td>Multi-Jurisdiction</td><td>${configuration.multiJurisdiction ? "Yes" : "No"}</td></tr>
    </table>

    <div class="protocols">
      <strong>Selected Protocols:</strong><br>
      ${configuration.protocols.join(" &bull; ")}
    </div>

    <div class="next-steps">
      <p><strong>Next Steps:</strong></p>
      <ol>
        <li>Review the attached proposal PDF for full details.</li>
        <li>Reply to this email or contact your Intelleges representative with any questions.</li>
        <li>When ready, we'll arrange payment and provision your enterprise within 24 hours.</li>
      </ol>
    </div>

    <p>Your proposal reference: <strong>#${proposalId}</strong></p>

    <a href="https://www.intelleges.com/contact" class="cta-button">Contact Us to Proceed</a>
  </div>
  <div class="footer">
    <p>Intelleges, Inc. | sales@intelleges.com | www.intelleges.com</p>
    <p>This proposal is valid for 30 days. Confidential — intended solely for the named recipient.</p>
  </div>
</body>
</html>`;

  const textContent = `
Dear ${firstName},

Thank you for your interest in Intelleges. Based on your configuration, we've prepared a proposal for your review.

RECOMMENDED PLAN: ${tier.name}
Annual Price: ${formatCurrency(tier.priceAnnual)}

YOUR CONFIGURATION:
- Users: ${formatNumber(configuration.users)}
- Suppliers: ${formatNumber(configuration.suppliers)}
- Groups: ${formatNumber(configuration.groups)}
- Protocols: ${configuration.protocols.length} selected (${configuration.protocols.join(", ")})
- Multi-Jurisdiction: ${configuration.multiJurisdiction ? "Yes" : "No"}

NEXT STEPS:
1. Review the attached proposal PDF for full details.
2. Reply to this email with any questions.
3. When ready, we'll arrange payment and provision your enterprise within 24 hours.

Proposal Reference: #${proposalId}

Intelleges, Inc. | sales@intelleges.com | www.intelleges.com
This proposal is valid for 30 days.
`;

  // Build message
  const msg: sgMail.MailDataRequired = {
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    replyTo: { email: FROM_EMAIL, name: FROM_NAME },
    subject: `Your Intelleges Enterprise Proposal — ${tier.name}`,
    text: textContent,
    html: htmlContent,
  };

  // Attach PDF if available
  if (pdfUrl) {
    const pdfPath = path.resolve(process.cwd(), pdfUrl.replace(/^\//, ""));
    if (fs.existsSync(pdfPath)) {
      const pdfData = fs.readFileSync(pdfPath).toString("base64");
      msg.attachments = [
        {
          content: pdfData,
          filename: `intelleges-proposal-${proposalId}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ];
    }
  }

  await sgMail.send(msg);
  console.log(`[E1] Proposal confirmation sent to ${to} (proposal #${proposalId})`);
}

// ============================================================================
// E4: Internal Notification to Sales Team
// ============================================================================
interface InternalNotificationInput {
  proposalId: number;
  contactName: string;
  contactEmail: string;
  contactCompany: string;
  tier: {
    key: string;
    name: string;
    priceAnnual: number;
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

export async function sendInternalNotification(input: InternalNotificationInput): Promise<void> {
  const { proposalId, contactName, contactEmail, contactCompany, tier, configuration } = input;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #1A1A1A; line-height: 1.6; }
    .alert-box { background-color: #FFF3CD; border: 1px solid #FFEEBA; padding: 16px; border-radius: 6px; margin-bottom: 20px; }
    .detail-table { width: 100%; border-collapse: collapse; }
    .detail-table td { padding: 6px 8px; font-size: 14px; border-bottom: 1px solid #E8E8E8; }
    .detail-table td:first-child { font-weight: bold; width: 180px; color: #666; }
    .value { font-size: 20px; font-weight: bold; color: #1E3A5F; }
  </style>
</head>
<body>
  <div class="alert-box">
    <strong>New Enterprise Proposal Submitted</strong> — Requires review
  </div>

  <p class="value">${tier.name} — ${formatCurrency(tier.priceAnnual)}/yr</p>

  <table class="detail-table">
    <tr><td>Proposal ID</td><td>#${proposalId}</td></tr>
    <tr><td>Contact</td><td>${contactName}</td></tr>
    <tr><td>Email</td><td>${contactEmail}</td></tr>
    <tr><td>Company</td><td>${contactCompany}</td></tr>
    <tr><td>Tier</td><td>${tier.name} (${tier.key})</td></tr>
    <tr><td>Users</td><td>${formatNumber(configuration.users)}</td></tr>
    <tr><td>Suppliers</td><td>${formatNumber(configuration.suppliers)}</td></tr>
    <tr><td>Groups</td><td>${formatNumber(configuration.groups)}</td></tr>
    <tr><td>Protocols</td><td>${configuration.protocols.join(", ")} (${configuration.protocols.length} total)</td></tr>
    <tr><td>Multi-Jurisdiction</td><td>${configuration.multiJurisdiction ? "Yes" : "No"}</td></tr>
  </table>

  <p style="margin-top: 20px;">
    <strong>Action Required:</strong> Review proposal and follow up with prospect within 24 hours.
  </p>
</body>
</html>`;

  const msg: sgMail.MailDataRequired = {
    to: SALES_TEAM_EMAIL,
    from: { email: FROM_EMAIL, name: "Intelleges System" },
    subject: `[New Proposal] ${contactCompany} — ${tier.name} — ${formatCurrency(tier.priceAnnual)}/yr`,
    html: htmlContent,
    text: `New proposal #${proposalId} from ${contactName} (${contactCompany}). Tier: ${tier.name} at ${formatCurrency(tier.priceAnnual)}/yr. ${configuration.protocols.length} protocols selected. Follow up within 24 hours.`,
  };

  await sgMail.send(msg);
  console.log(`[E4] Internal notification sent to ${SALES_TEAM_EMAIL} (proposal #${proposalId})`);
}
