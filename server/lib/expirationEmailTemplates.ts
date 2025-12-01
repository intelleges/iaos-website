/**
 * Email templates for quote expiration notifications
 */

export interface ExpirationEmailData {
  customerName: string;
  quoteId: number;
  tier: string;
  totalPrice: number;
  currency: string;
  expiresAt: Date;
  daysRemaining: number;
}

/**
 * Generate HTML email for expiration reminder (7 days before)
 */
export function generateExpirationReminderEmail(data: ExpirationEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Intelleges Quote Expires Soon</title>
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
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .urgency-box {
      background: linear-gradient(135deg, #FFF4E6 0%, #FFE8CC 100%);
      border-left: 4px solid #FF9800;
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .urgency-title {
      font-size: 18px;
      font-weight: 600;
      color: #E65100;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .urgency-icon {
      font-size: 24px;
      margin-right: 10px;
    }
    .urgency-text {
      font-size: 16px;
      color: #333333;
      margin-bottom: 10px;
    }
    .expiration-date {
      font-size: 18px;
      font-weight: 600;
      color: #E65100;
    }
    .quote-summary {
      background-color: #F7F9FA;
      border-left: 4px solid: #C9A635;
      padding: 20px;
      margin: 30px 0;
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
    .cta-section {
      text-align: center;
      margin: 30px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #FF9800;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0;
    }
    .secondary-cta {
      display: inline-block;
      background-color: #0A3A67;
      color: #ffffff;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px;
    }
    .footer {
      background-color: #F7F9FA;
      padding: 30px;
      text-align: center;
      border-top: 1px solid: #E0E0E0;
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
        This is a friendly reminder that your Intelleges quote is expiring soon. We wanted to give you advance notice so you have time to review and take action if needed.
      </div>

      <!-- Urgency Box -->
      <div class="urgency-box">
        <div class="urgency-title">
          <span class="urgency-icon">⏰</span>
          Quote Expiring Soon
        </div>
        <div class="urgency-text">
          Your quote will expire in <strong>${data.daysRemaining} ${data.daysRemaining === 1 ? 'day' : 'days'}</strong>.
        </div>
        <div class="expiration-date">
          Expiration Date: ${formatDate(data.expiresAt)}
        </div>
      </div>

      <!-- Quote Summary -->
      <div class="quote-summary">
        <div class="quote-detail">
          <span class="quote-detail-label">Quote ID:</span>
          <span class="quote-detail-value">#${data.quoteId}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Tier:</span>
          <span class="quote-detail-value">${data.tier}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Total Investment:</span>
          <span class="quote-detail-value">${formatCurrency(data.totalPrice)}</span>
        </div>
      </div>

      <div class="message">
        <strong>What happens after expiration?</strong><br>
        After the expiration date, this quote will no longer be valid. If you'd like to proceed, we recommend taking action soon to lock in your pricing and configuration.
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="https://calendly.com/intelleges/demo" class="cta-button">Schedule a Call</a>
        <a href="mailto:sales@intelleges.com?subject=Quote%20${data.quoteId}%20-%20Questions" class="secondary-cta">Ask Questions</a>
      </div>

      <div class="message">
        If you need more time to review or have any questions about the quote, please don't hesitate to reach out. We're here to help!
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
 * Generate HTML email for quote expiration (on expiration day)
 */
export function generateQuoteExpiredEmail(data: ExpirationEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Intelleges Quote Has Expired</title>
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
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .expired-box {
      background: #FFF3F3;
      border-left: 4px solid #D32F2F;
      padding: 20px;
      margin: 30px 0;
      border-radius: 4px;
    }
    .expired-title {
      font-size: 18px;
      font-weight: 600;
      color: #C62828;
      margin-bottom: 10px;
    }
    .expired-text {
      font-size: 16px;
      color: #333333;
    }
    .quote-summary {
      background-color: #F7F9FA;
      border-left: 4px solid #C9A635;
      padding: 20px;
      margin: 30px 0;
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
      margin: 10px;
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
        We wanted to let you know that your Intelleges quote has expired as of ${formatDate(data.expiresAt)}.
      </div>

      <!-- Expired Box -->
      <div class="expired-box">
        <div class="expired-title">Quote Expired</div>
        <div class="expired-text">
          This quote is no longer valid. However, we'd be happy to provide you with an updated quote if you're still interested.
        </div>
      </div>

      <!-- Quote Summary -->
      <div class="quote-summary">
        <div class="quote-detail">
          <span class="quote-detail-label">Quote ID:</span>
          <span class="quote-detail-value">#${data.quoteId}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Tier:</span>
          <span class="quote-detail-value">${data.tier}</span>
        </div>
        
        <div class="quote-detail">
          <span class="quote-detail-label">Previous Total:</span>
          <span class="quote-detail-value">${formatCurrency(data.totalPrice)}</span>
        </div>
      </div>

      <div class="message">
        <strong>Still interested?</strong><br>
        If you'd like to move forward with Intelleges, we can quickly generate a new quote for you with current pricing. Your configuration and requirements are already on file, so it's a simple process.
      </div>

      <!-- CTA -->
      <div class="cta-section">
        <a href="https://calendly.com/intelleges/demo" class="cta-button">Schedule a Call</a>
        <a href="mailto:sales@intelleges.com?subject=Quote%20${data.quoteId}%20-%20Request%20New%20Quote" class="cta-button">Request New Quote</a>
      </div>

      <div class="message">
        We understand that enterprise decisions take time. If you have any questions or need clarification on anything, please don't hesitate to reach out. We're here to help!
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
 * Generate plain text version of expiration reminder email
 */
export function generateExpirationReminderText(data: ExpirationEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return `
Hello ${data.customerName},

This is a friendly reminder that your Intelleges quote is expiring soon. We wanted to give you advance notice so you have time to review and take action if needed.

⏰ QUOTE EXPIRING SOON
Your quote will expire in ${data.daysRemaining} ${data.daysRemaining === 1 ? 'day' : 'days'}.
Expiration Date: ${formatDate(data.expiresAt)}

QUOTE SUMMARY
-------------
Quote ID: #${data.quoteId}
Tier: ${data.tier}
Total Investment: ${formatCurrency(data.totalPrice)}

WHAT HAPPENS AFTER EXPIRATION?
After the expiration date, this quote will no longer be valid. If you'd like to proceed, we recommend taking action soon to lock in your pricing and configuration.

NEXT STEPS
----------
Schedule a call: https://calendly.com/intelleges/demo
Ask questions: sales@intelleges.com (Subject: Quote ${data.quoteId} - Questions)

If you need more time to review or have any questions about the quote, please don't hesitate to reach out. We're here to help!

Best regards,
The Intelleges Team
sales@intelleges.com
+1-917-818-0225

---
© ${new Date().getFullYear()} Intelleges. All rights reserved.
  `.trim();
}

/**
 * Generate plain text version of quote expired email
 */
export function generateQuoteExpiredText(data: ExpirationEmailData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return `
Hello ${data.customerName},

We wanted to let you know that your Intelleges quote has expired as of ${formatDate(data.expiresAt)}.

QUOTE EXPIRED
This quote is no longer valid. However, we'd be happy to provide you with an updated quote if you're still interested.

QUOTE SUMMARY
-------------
Quote ID: #${data.quoteId}
Tier: ${data.tier}
Previous Total: ${formatCurrency(data.totalPrice)}

STILL INTERESTED?
If you'd like to move forward with Intelleges, we can quickly generate a new quote for you with current pricing. Your configuration and requirements are already on file, so it's a simple process.

NEXT STEPS
----------
Schedule a call: https://calendly.com/intelleges/demo
Request new quote: sales@intelleges.com (Subject: Quote ${data.quoteId} - Request New Quote)

We understand that enterprise decisions take time. If you have any questions or need clarification on anything, please don't hesitate to reach out. We're here to help!

Best regards,
The Intelleges Team
sales@intelleges.com
+1-917-818-0225

---
© ${new Date().getFullYear()} Intelleges. All rights reserved.
  `.trim();
}
