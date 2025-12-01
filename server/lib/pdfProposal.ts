/**
 * PDF proposal generation using wkhtmltopdf
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { randomBytes } from 'crypto';

const execAsync = promisify(exec);

export interface ProposalData {
  quoteId: number;
  customerName: string;
  customerEmail?: string;
  industry?: string;
  region?: string;
  tier: string;
  annualPrice: number;
  totalPrice: number;
  termYears: number;
  currency: string;
  breakdown: {
    label: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  features: string[];
  createdAt: Date;
}

/**
 * Generate HTML template for proposal
 */
function generateProposalHTML(data: ProposalData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Intelleges Proposal - Quote #${data.quoteId}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #111111;
      padding: 40px;
    }
    
    .header {
      border-bottom: 3px solid #0A3A67;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #0A3A67;
      margin-bottom: 10px;
    }
    
    .subtitle {
      color: #666666;
      font-size: 16px;
    }
    
    .section {
      margin-bottom: 30px;
    }
    
    h1 {
      font-size: 24px;
      color: #0A3A67;
      margin-bottom: 15px;
    }
    
    h2 {
      font-size: 18px;
      color: #111111;
      margin-bottom: 10px;
      border-bottom: 1px solid #E0E0E0;
      padding-bottom: 5px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .info-label {
      font-weight: 600;
      color: #666666;
    }
    
    .info-value {
      color: #111111;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    
    th {
      background-color: #F7F9FA;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #0A3A67;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #E0E0E0;
    }
    
    .text-right {
      text-align: right;
    }
    
    .total-row {
      font-weight: 600;
      background-color: #F7F9FA;
      font-size: 16px;
    }
    
    .features-list {
      list-style: none;
      padding-left: 0;
    }
    
    .features-list li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
    }
    
    .features-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #C9A635;
      font-weight: bold;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #E0E0E0;
      font-size: 12px;
      color: #666666;
      text-align: center;
    }
    
    .tier-badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #0A3A67;
      color: white;
      border-radius: 4px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Intelleges</div>
    <div class="subtitle">Enterprise Compliance Management Platform</div>
  </div>

  <div class="section">
    <h1>Proposal for ${data.customerName}</h1>
    <div class="tier-badge">${data.tier} Tier</div>
    
    <div class="info-grid">
      <div class="info-label">Quote ID:</div>
      <div class="info-value">#${data.quoteId}</div>
      
      <div class="info-label">Customer:</div>
      <div class="info-value">${data.customerName}</div>
      
      ${data.customerEmail ? `
      <div class="info-label">Email:</div>
      <div class="info-value">${data.customerEmail}</div>
      ` : ''}
      
      ${data.industry ? `
      <div class="info-label">Industry:</div>
      <div class="info-value">${data.industry}</div>
      ` : ''}
      
      ${data.region ? `
      <div class="info-label">Region:</div>
      <div class="info-value">${data.region}</div>
      ` : ''}
      
      <div class="info-label">Date:</div>
      <div class="info-value">${formatDate(data.createdAt)}</div>
      
      <div class="info-label">Contract Term:</div>
      <div class="info-value">${data.termYears} ${data.termYears === 1 ? 'Year' : 'Years'}</div>
    </div>
  </div>

  <div class="section">
    <h2>Pricing Breakdown</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th class="text-right">Quantity</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Total (Annual)</th>
        </tr>
      </thead>
      <tbody>
        ${data.breakdown.map(item => `
        <tr>
          <td>${item.label}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">${formatCurrency(item.unitPrice)}</td>
          <td class="text-right">${formatCurrency(item.total)}</td>
        </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="3">Annual Total</td>
          <td class="text-right">${formatCurrency(data.annualPrice)}</td>
        </tr>
        <tr class="total-row">
          <td colspan="3">Total (${data.termYears} ${data.termYears === 1 ? 'Year' : 'Years'})</td>
          <td class="text-right">${formatCurrency(data.totalPrice)}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Included Features</h2>
    <ul class="features-list">
      ${data.features.map(feature => `<li>${feature}</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <h2>Terms & Conditions</h2>
    <p style="margin-bottom: 10px;">
      This proposal is valid for 30 days from the date above. Pricing is subject to change after this period.
    </p>
    <p style="margin-bottom: 10px;">
      Payment terms: Net 30 days from invoice date. Annual subscription with automatic renewal unless cancelled 30 days prior to renewal date.
    </p>
    <p>
      Implementation and onboarding support included. Additional customization and integration services available upon request.
    </p>
  </div>

  <div class="footer">
    <p>Intelleges | Enterprise Compliance Management</p>
    <p>ISO 27001 Certified | Battelle Supplier of the Year</p>
    <p>For questions, contact: sales@intelleges.com</p>
  </div>
</body>
</html>
  `;
}

/**
 * Generate PDF proposal from quote data
 */
export async function generatePDFProposal(data: ProposalData): Promise<Buffer> {
  const html = generateProposalHTML(data);
  
  // Generate unique temp file names
  const tempId = randomBytes(16).toString('hex');
  const htmlPath = join(tmpdir(), `proposal-${tempId}.html`);
  const pdfPath = join(tmpdir(), `proposal-${tempId}.pdf`);
  
  try {
    // Write HTML to temp file
    await writeFile(htmlPath, html, 'utf-8');
    
    // Generate PDF using wkhtmltopdf
    await execAsync(`wkhtmltopdf --enable-local-file-access --page-size Letter --margin-top 10mm --margin-bottom 10mm --margin-left 10mm --margin-right 10mm "${htmlPath}" "${pdfPath}"`);
    
    // Read PDF file
    const fs = await import('fs/promises');
    const pdfBuffer = await fs.readFile(pdfPath);
    
    // Clean up temp files
    await unlink(htmlPath);
    await unlink(pdfPath);
    
    return pdfBuffer;
  } catch (error) {
    // Clean up temp files on error
    try {
      await unlink(htmlPath);
      await unlink(pdfPath);
    } catch {}
    
    throw new Error(`Failed to generate PDF: ${error}`);
  }
}
