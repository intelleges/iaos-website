import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Initialize SendGrid with API key from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@intelleges.com';
const FROM_NAME = process.env.SENDGRID_FROM_NAME || 'Intelleges';
const SALES_TEAM_EMAIL = process.env.SALES_TEAM_EMAIL || '';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface SendCaseStudyEmailParams {
  toEmail: string;
  toName: string;
  company: string;
  caseStudyTitle: string;
  pdfFilePath: string;
}

/**
 * Send case study PDF via email using SendGrid
 */
export async function sendCaseStudyEmail(params: SendCaseStudyEmailParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured. Please set SENDGRID_API_KEY environment variable.');
  }

  const { toEmail, toName, company, caseStudyTitle, pdfFilePath } = params;

  // Read PDF file and convert to base64
  const pdfBuffer = fs.readFileSync(pdfFilePath);
  const pdfBase64 = pdfBuffer.toString('base64');
  const pdfFileName = path.basename(pdfFilePath);

  // Create email content
  const emailHtml = createEmailTemplate(toName, company, caseStudyTitle);
  const emailText = createEmailTextVersion(toName, company, caseStudyTitle);

  const msg = {
    to: toEmail,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: `Your Intelleges Case Study: ${caseStudyTitle}`,
    text: emailText,
    html: emailHtml,
    attachments: [
      {
        content: pdfBase64,
        filename: pdfFileName,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };

  try {
    await sgMail.send(msg);
    console.log(`Case study email sent successfully to ${toEmail}`);
  } catch (error: any) {
    console.error('SendGrid error:', error);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * Create HTML email template
 */
function createEmailTemplate(name: string, company: string, caseStudyTitle: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Intelleges Case Study</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0A3A67 0%, #1a5a8f 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: -0.5px;">
                Intelleges
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #0A3A67; font-size: 24px; font-weight: 300;">
                Hi ${name},
              </h2>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in Intelleges! As requested, we've attached the case study:
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #0A3A67; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; color: #0A3A67; font-size: 18px; font-weight: 500;">
                  ${caseStudyTitle}
                </p>
              </div>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                This case study demonstrates how organizations like ${company} can streamline compliance, reduce risk, and eliminate manual data collection with Intelleges.
              </p>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Want to see how Intelleges can help ${company}?</strong>
              </p>
              
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 50px; background: #0A3A67;">
                    <a href="https://www.intelleges.com/contact" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                      Schedule a Demo
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #0A3A67;">The Intelleges Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; color: #666666; font-size: 14px; text-align: center;">
                <strong>Intelleges</strong> | Enterprise Compliance Management
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                ISO 27001 Certified • Battelle Supplier of the Year
              </p>
              <p style="margin: 15px 0 0; color: #999999; font-size: 12px; text-align: center;">
                <a href="https://www.intelleges.com" style="color: #0A3A67; text-decoration: none;">www.intelleges.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Create plain text email version
 */
function createEmailTextVersion(name: string, company: string, caseStudyTitle: string): string {
  return `
Hi ${name},

Thank you for your interest in Intelleges! As requested, we've attached the case study:

${caseStudyTitle}

This case study demonstrates how organizations like ${company} can streamline compliance, reduce risk, and eliminate manual data collection with Intelleges.

Want to see how Intelleges can help ${company}?

Schedule a demo: https://www.intelleges.com/contact

Best regards,
The Intelleges Team

---
Intelleges | Enterprise Compliance Management
ISO 27001 Certified • Battelle Supplier of the Year
www.intelleges.com
  `.trim();
}

interface SendSalesNotificationParams {
  leadName: string;
  leadEmail: string;
  leadCompany: string;
  caseStudyTitle: string;
  ipAddress?: string;
  timestamp: Date;
}

/**
 * Send notification to sales team about new lead
 */
export async function sendSalesTeamNotification(params: SendSalesNotificationParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured. Skipping sales notification.');
    return;
  }

  if (!SALES_TEAM_EMAIL) {
    console.warn('Sales team email not configured. Skipping sales notification.');
    return;
  }

  const { leadName, leadEmail, leadCompany, caseStudyTitle, ipAddress, timestamp } = params;

  // Create notification email content
  const emailHtml = createSalesNotificationTemplate(params);
  const emailText = createSalesNotificationTextVersion(params);

  const msg = {
    to: SALES_TEAM_EMAIL,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: `🎯 New Lead: ${leadName} from ${leadCompany} - ${caseStudyTitle}`,
    text: emailText,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log(`Sales notification sent to ${SALES_TEAM_EMAIL} for lead ${leadEmail}`);
  } catch (error: any) {
    console.error('Failed to send sales notification:', error);
    // Don't throw - we don't want to block the user experience if sales notification fails
  }
}

/**
 * Create HTML sales notification template
 */
function createSalesNotificationTemplate(params: SendSalesNotificationParams): string {
  const { leadName, leadEmail, leadCompany, caseStudyTitle, ipAddress, timestamp } = params;
  const formattedDate = timestamp.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                🎯 New Lead Alert
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #059669; font-size: 18px; font-weight: 600;">
                Someone just downloaded a case study!
              </p>
              
              <!-- Lead Information -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #10b981;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Name:</strong>
                          <span style="color: #1f2937; font-size: 16px; margin-left: 10px;">${leadName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Email:</strong>
                          <a href="mailto:${leadEmail}" style="color: #0A3A67; font-size: 16px; margin-left: 10px; text-decoration: none;">${leadEmail}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Company:</strong>
                          <span style="color: #1f2937; font-size: 16px; margin-left: 10px;">${leadCompany}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;">
                          <strong style="color: #374151; font-size: 14px;">Interested In:</strong>
                          <span style="color: #1f2937; font-size: 16px; margin-left: 10px;">${caseStudyTitle}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Metadata -->
              <div style="margin: 30px 0; padding: 20px; background-color: #f9fafb; border-radius: 6px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">
                  <strong>Timestamp:</strong> ${formattedDate}
                </p>
                ${ipAddress ? `<p style="margin: 0; color: #6b7280; font-size: 13px;"><strong>IP Address:</strong> ${ipAddress}</p>` : ''}
              </div>
              
              <!-- Action Items -->
              <div style="margin: 30px 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #92400e; font-size: 14px; font-weight: 600;">
                  ⚡ Recommended Next Steps:
                </p>
                <ul style="margin: 10px 0 0 20px; padding: 0; color: #78350f; font-size: 14px; line-height: 1.6;">
                  <li>Follow up within 24 hours while interest is high</li>
                  <li>Reference the specific case study they downloaded</li>
                  <li>Offer a personalized demo focused on their industry</li>
                </ul>
              </div>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 50px; background: #0A3A67;">
                    <a href="mailto:${leadEmail}" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                      📧 Email ${leadName}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-align: center;">
                This is an automated notification from your Intelleges website
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Create plain text sales notification version
 */
function createSalesNotificationTextVersion(params: SendSalesNotificationParams): string {
  const { leadName, leadEmail, leadCompany, caseStudyTitle, ipAddress, timestamp } = params;
  const formattedDate = timestamp.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return `
🎯 NEW LEAD ALERT

Someone just downloaded a case study!

LEAD INFORMATION:
------------------
Name: ${leadName}
Email: ${leadEmail}
Company: ${leadCompany}
Interested In: ${caseStudyTitle}

TIMESTAMP: ${formattedDate}
${ipAddress ? `IP ADDRESS: ${ipAddress}` : ''}

RECOMMENDED NEXT STEPS:
- Follow up within 24 hours while interest is high
- Reference the specific case study they downloaded
- Offer a personalized demo focused on their industry

Email ${leadName}: mailto:${leadEmail}

---
This is an automated notification from your Intelleges website
  `.trim();
}

/**
 * Test SendGrid configuration
 */
export async function testSendGridConnection(): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    // SendGrid doesn't have a direct "test connection" endpoint,
    // but we can verify the API key format
    if (SENDGRID_API_KEY.startsWith('SG.')) {
      console.log('SendGrid API key format is valid');
      return true;
    } else {
      console.error('SendGrid API key format is invalid');
      return false;
    }
  } catch (error) {
    console.error('SendGrid connection test failed:', error);
    return false;
  }
}
