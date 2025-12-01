/**
 * PDF Proposal Generator
 * 
 * Generates professional PDF proposals from pricing quotes.
 * Uses a shell command to convert HTML to PDF.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

interface ProposalData {
  quoteId: number;
  customerName: string;
  industry?: string;
  region?: string;
  tier: string;
  pricing: {
    basePrice: number;
    usersPrice: number;
    suppliersPrice: number;
    protocolsPrice: number;
    sitesPrice: number;
    partnerTypesPrice: number;
    erpIntegrationPrice: number;
    esrsSupportPrice: number;
    supportPremiumPrice: number;
    annualPrice: number;
    totalPriceForTerm: number;
    termYears: number;
    extraUsers: number;
    extraSuppliers: number;
    extraProtocols: number;
    extraSites: number;
  };
  configuration: {
    users: number;
    suppliers: number;
    protocols: number;
    sites: number;
    partnerTypes: number;
    erpIntegration: boolean;
    esrsSupport: boolean;
    supportPremium: boolean;
  };
  tierInclusions: {
    includedUsers: number;
    includedSuppliers: number;
    includedProtocols: number;
    includedSites: number;
    supportLevel: string;
    allowsERP: boolean;
  };
  notes?: string;
  createdAt: Date;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function generateProposalHTML(data: ProposalData): string {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      margin: 0.75in;
      size: letter;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #111111;
    }
    .header {
      border-bottom: 3px solid #0A3A67;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24pt;
      font-weight: bold;
      color: #0A3A67;
    }
    .tagline {
      font-size: 10pt;
      color: #666666;
      margin-top: 5px;
    }
    h1 {
      font-size: 20pt;
      color: #0A3A67;
      margin: 30px 0 15px 0;
    }
    h2 {
      font-size: 14pt;
      color: #0A3A67;
      margin: 20px 0 10px 0;
      border-bottom: 1px solid #E0E0E0;
      padding-bottom: 5px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 20px 0;
    }
    .info-item {
      padding: 10px;
      background: #F7F9FA;
      border-left: 3px solid #C9A635;
    }
    .info-label {
      font-size: 9pt;
      color: #666666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 12pt;
      font-weight: 600;
      color: #111111;
      margin-top: 3px;
    }
    .pricing-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .pricing-table th {
      background: #0A3A67;
      color: white;
      padding: 12px;
      text-align: left;
      font-size: 10pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .pricing-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #E0E0E0;
    }
    .pricing-table tr:last-child td {
      border-bottom: none;
    }
    .pricing-table .amount {
      text-align: right;
      font-weight: 600;
    }
    .total-row {
      background: #EEF3F7;
      font-weight: bold;
      font-size: 12pt;
    }
    .total-row td {
      padding: 15px 12px;
      border-top: 2px solid #0A3A67;
    }
    .tier-box {
      background: #EEF3F7;
      border: 2px solid #0A3A67;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .tier-title {
      font-size: 16pt;
      font-weight: bold;
      color: #0A3A67;
      margin-bottom: 15px;
    }
    .tier-features {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .tier-feature {
      font-size: 10pt;
      padding: 8px 0;
    }
    .tier-feature strong {
      color: #0A3A67;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #E0E0E0;
      font-size: 9pt;
      color: #666666;
      text-align: center;
    }
    .notes {
      background: #FFF9E6;
      border-left: 4px solid #C9A635;
      padding: 15px;
      margin: 20px 0;
      font-size: 10pt;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Intelleges</div>
    <div class="tagline">Enterprise Compliance Management Platform</div>
  </div>

  <h1>Pricing Proposal</h1>
  
  <div class="info-grid">
    <div class="info-item">
      <div class="info-label">Customer</div>
      <div class="info-value">${data.customerName}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Proposal Date</div>
      <div class="info-value">${today}</div>
    </div>
    ${data.industry ? `
    <div class="info-item">
      <div class="info-label">Industry</div>
      <div class="info-value">${data.industry}</div>
    </div>
    ` : ''}
    ${data.region ? `
    <div class="info-item">
      <div class="info-label">Region</div>
      <div class="info-value">${data.region}</div>
    </div>
    ` : ''}
    <div class="info-item">
      <div class="info-label">Quote ID</div>
      <div class="info-value">#${data.quoteId}</div>
    </div>
    <div class="info-item">
      <div class="info-label">Contract Term</div>
      <div class="info-value">${data.pricing.termYears} Year${data.pricing.termYears > 1 ? 's' : ''}</div>
    </div>
  </div>

  <div class="tier-box">
    <div class="tier-title">${data.tier} Tier</div>
    <div class="tier-features">
      <div class="tier-feature">
        <strong>Users:</strong> ${data.tierInclusions.includedUsers === Number.MAX_SAFE_INTEGER ? 'Unlimited' : data.tierInclusions.includedUsers.toLocaleString()}
      </div>
      <div class="tier-feature">
        <strong>Suppliers:</strong> ${data.tierInclusions.includedSuppliers === Number.MAX_SAFE_INTEGER ? 'Unlimited' : data.tierInclusions.includedSuppliers.toLocaleString()}
      </div>
      <div class="tier-feature">
        <strong>Protocols:</strong> ${data.tierInclusions.includedProtocols === Number.MAX_SAFE_INTEGER ? 'Unlimited' : data.tierInclusions.includedProtocols}
      </div>
      <div class="tier-feature">
        <strong>Sites:</strong> ${data.tierInclusions.includedSites === Number.MAX_SAFE_INTEGER ? 'Unlimited' : data.tierInclusions.includedSites}
      </div>
      <div class="tier-feature">
        <strong>Support:</strong> ${data.tierInclusions.supportLevel}
      </div>
      <div class="tier-feature">
        <strong>ERP/eSRS:</strong> ${data.tierInclusions.allowsERP ? 'Available' : 'Not Available'}
      </div>
    </div>
  </div>

  <h2>Configuration</h2>
  <table class="pricing-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th class="amount">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${data.tier} Tier - Base License</td>
        <td>1</td>
        <td class="amount">${formatCurrency(data.pricing.basePrice)}</td>
      </tr>
      ${data.pricing.extraUsers > 0 ? `
      <tr>
        <td>Additional Users</td>
        <td>${data.pricing.extraUsers} × $150</td>
        <td class="amount">${formatCurrency(data.pricing.usersPrice)}</td>
      </tr>
      ` : ''}
      ${data.pricing.extraSuppliers > 0 ? `
      <tr>
        <td>Additional Suppliers</td>
        <td>${data.pricing.extraSuppliers} × $40</td>
        <td class="amount">${formatCurrency(data.pricing.suppliersPrice)}</td>
      </tr>
      ` : ''}
      ${data.pricing.extraProtocols > 0 ? `
      <tr>
        <td>Additional Protocols</td>
        <td>${data.pricing.extraProtocols} × $10,000</td>
        <td class="amount">${formatCurrency(data.pricing.protocolsPrice)}</td>
      </tr>
      ` : ''}
      ${data.pricing.extraSites > 0 ? `
      <tr>
        <td>Additional Sites</td>
        <td>${data.pricing.extraSites} × $5,000</td>
        <td class="amount">${formatCurrency(data.pricing.sitesPrice)}</td>
      </tr>
      ` : ''}
      ${data.configuration.partnerTypes > 0 ? `
      <tr>
        <td>Partner Types</td>
        <td>${data.configuration.partnerTypes} × $2,500</td>
        <td class="amount">${formatCurrency(data.pricing.partnerTypesPrice)}</td>
      </tr>
      ` : ''}
      ${data.configuration.erpIntegration ? `
      <tr>
        <td>ERP Integration</td>
        <td>1</td>
        <td class="amount">${formatCurrency(data.pricing.erpIntegrationPrice)}</td>
      </tr>
      ` : ''}
      ${data.configuration.esrsSupport ? `
      <tr>
        <td>eSRS Support</td>
        <td>1</td>
        <td class="amount">${formatCurrency(data.pricing.esrsSupportPrice)}</td>
      </tr>
      ` : ''}
      ${data.configuration.supportPremium ? `
      <tr>
        <td>Premium Support - Weekly Leadership Access</td>
        <td>1</td>
        <td class="amount">${formatCurrency(data.pricing.supportPremiumPrice)}</td>
      </tr>
      ` : ''}
    </tbody>
    <tfoot>
      <tr class="total-row">
        <td colspan="2">Annual Price</td>
        <td class="amount">${formatCurrency(data.pricing.annualPrice)}</td>
      </tr>
      ${data.pricing.termYears > 1 ? `
      <tr class="total-row">
        <td colspan="2">Total (${data.pricing.termYears} Years)</td>
        <td class="amount">${formatCurrency(data.pricing.totalPriceForTerm)}</td>
      </tr>
      ` : ''}
    </tfoot>
  </table>

  ${data.notes ? `
  <div class="notes">
    <strong>Notes:</strong><br>
    ${data.notes.replace(/\n/g, '<br>')}
  </div>
  ` : ''}

  <h2>Next Steps</h2>
  <p>
    This proposal is valid for 30 days from the date above. To proceed:
  </p>
  <ol>
    <li>Review the configuration and pricing details</li>
    <li>Contact your Intelleges representative with any questions</li>
    <li>Sign the service agreement to activate your account</li>
  </ol>

  <div class="footer">
    <p>
      <strong>Intelleges</strong> | Enterprise Compliance Management<br>
      ISO 27001 Certified • Battelle Supplier of the Year<br>
      For questions, contact: sales@intelleges.com
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate PDF proposal from quote data
 * Returns the file path to the generated PDF
 */
export async function generatePDFProposal(data: ProposalData): Promise<string> {
  const html = generateProposalHTML(data);
  
  // Write HTML to temp file
  const tempHtmlPath = path.join('/tmp', `proposal-${data.quoteId}-${Date.now()}.html`);
  const tempPdfPath = path.join('/tmp', `proposal-${data.quoteId}-${Date.now()}.pdf`);
  
  await writeFile(tempHtmlPath, html, 'utf-8');
  
  try {
    // Use manus-md-to-pdf utility (it can handle HTML too)
    // If not available, we'll use a simple approach
    await execAsync(`wkhtmltopdf ${tempHtmlPath} ${tempPdfPath}`);
  } catch (error) {
    // Fallback: just return the HTML path if PDF generation fails
    console.error('PDF generation failed:', error);
    throw new Error('PDF generation is not available. Please install wkhtmltopdf.');
  } finally {
    // Clean up HTML file
    await unlink(tempHtmlPath).catch(() => {});
  }
  
  return tempPdfPath;
}
