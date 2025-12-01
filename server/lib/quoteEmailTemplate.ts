/**
 * Email template generator for quote delivery
 */

export interface QuoteEmailData {
  customerName: string;
  quoteId: number;
  tier: string;
  annualPrice: number;
  totalPrice: number;
  termYears: number;
  currency: string;
}

/**
 * Generate HTML email template for quote delivery
 */
export function generateQuoteEmail(data: QuoteEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Intelleges Quote</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #111111;
      margin: 0;
      padding: 0;
      background-color: #F7F9FA;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #0A3A67 0%, #1B5A8E 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
      margin-bottom: 10px;
    }
    .header-subtitle {
      color: #E8EEF2;
      font-size: 16px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #111111;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      color: #333333;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .quote-summary {
      background-color: #F7F9FA;
      border-left: 4px solid #C9A635;
      padding: 20px;
      margin: 30px 0;
    }
    .quote-summary-title {
      font-size: 18px;
      font-weight: 600;
      color: #0A3A67;
      margin-bottom: 15px;
    }
    .quote-detail {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 15px;
    }
    .quote-detail-label {
      color: #666666;
    }
    .quote-detail-value {
      font-weight: 600;
      color: #111111;
    }
    .quote-total {
      border-top: 2px solid #E0E0E0;
      padding-top: 15px;
      margin-top: 15px;
    }
    .quote-total .quote-detail-value {
      font-size: 20px;
      color: #C9A635;
    }
    .cta-section {
      text-align: center;
      margin: 30px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #0A3A67;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0;
    }
    .attachment-notice {
      background-color: #EEF3F7;
      border: 1px solid #C9D6E0;
      border-radius: 6px;
      padding: 20px;
      margin: 30px 0;
      text-align: center;
    }
    .attachment-icon {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .attachment-text {
      font-size: 15px;
      color: #333333;
    }
    .footer {
      background-color: #F7F9FA;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #E0E0E0;
    }
    .footer-text {
      font-size: 14px;
      color: #666666;
      margin-bottom: 10px;
    }
    .footer-link {
      color: #0A3A67;
      text-decoration: none;
    }
    .trust-badges {
      margin-top: 20px;
      font-size: 13px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">Intelleges</div>
      <div class="header-subtitle">Enterprise Compliance Management</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="greeting">Hello ${data.customerName},</div>
      
      <div class="message">
        Thank you for your interest in Intelleges! We're pleased to provide you with a customized quote for our ${data.tier} tier enterprise compliance platform.
      </div>

      <div class="message">
        Our platform will help you streamline supplier data collection, automate compliance validation, and generate audit-ready documentation—replacing email chains, spreadsheets, and manual follow-ups with a unified, efficient system.
      </div>

      <!-- Quote Summary -->
      <div class="quote-summary">
        <div class="quote-summary-title">Quote Summary</div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Quote ID:</span>
          <span class="quote-detail-value">#${data.quoteId}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Tier:</span>
          <span class="quote-detail-value">${data.tier}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Annual Price:</span>
          <span class="quote-detail-value">${formatCurrency(data.annualPrice)}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Contract Term:</span>
          <span class="quote-detail-value">${data.termYears} ${data.termYears === 1 ? 'Year' : 'Years'}</span>
        </div>
        
        <div class="quote-total">
          <div class="quote-detail">
            <span class="quote-detail-label">Total Investment:</span>
            <span class="quote-detail-value">${formatCurrency(data.totalPrice)}</span>
          </div>
        </div>
      </div>

      <!-- Attachment Notice -->
      <div class="attachment-notice">
        <div class="attachment-icon">📄</div>
        <div class="attachment-text">
          <strong>Detailed Proposal Attached</strong><br>
          Please find your complete pricing proposal with full breakdown and feature details in the attached PDF.
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="https://calendly.com/intelleges/demo" class="cta-button">Schedule a Demo</a>
      </div>

      <div class="message">
        We'd love to show you how Intelleges can transform your compliance operations. Our team is ready to answer any questions and help you get started.
      </div>

      <div class="message">
        This quote is valid for 30 days. If you have any questions or would like to discuss customization options, please don't hesitate to reach out.
      </div>

      <div class="message" style="margin-top: 30px;">
        Best regards,<br>
        <strong>The Intelleges Team</strong><br>
        <a href="mailto:sales@intelleges.com" style="color: #0A3A67;">sales@intelleges.com</a><br>
        +1-917-818-0225
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-text">
        <a href="https://intelleges.com" class="footer-link">intelleges.com</a>
      </div>
      <div class="trust-badges">
        ISO 27001 Certified | Battelle Supplier of the Year
      </div>
      <div class="footer-text" style="margin-top: 20px; font-size: 12px;">
        © ${new Date().getFullYear()} Intelleges. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate plain text version of quote email (fallback)
 */
export function generateQuoteEmailText(data: QuoteEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return `
Hello ${data.customerName},

Thank you for your interest in Intelleges! We're pleased to provide you with a customized quote for our ${data.tier} tier enterprise compliance platform.

Our platform will help you streamline supplier data collection, automate compliance validation, and generate audit-ready documentation—replacing email chains, spreadsheets, and manual follow-ups with a unified, efficient system.

QUOTE SUMMARY
-------------
Quote ID: #${data.quoteId}
Tier: ${data.tier}
Annual Price: ${formatCurrency(data.annualPrice)}
Contract Term: ${data.termYears} ${data.termYears === 1 ? 'Year' : 'Years'}
Total Investment: ${formatCurrency(data.totalPrice)}

ATTACHED DOCUMENT
-----------------
Please find your complete pricing proposal with full breakdown and feature details in the attached PDF.

NEXT STEPS
----------
Schedule a demo: https://calendly.com/intelleges/demo

We'd love to show you how Intelleges can transform your compliance operations. Our team is ready to answer any questions and help you get started.

This quote is valid for 30 days. If you have any questions or would like to discuss customization options, please don't hesitate to reach out.

Best regards,
The Intelleges Team
sales@intelleges.com
+1-917-818-0225

---
ISO 27001 Certified | Battelle Supplier of the Year
© ${new Date().getFullYear()} Intelleges. All rights reserved.
  `.trim();
}
