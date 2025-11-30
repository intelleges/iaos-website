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


// ============================================================================
// EXECUTIVE SUMMARY EMAIL AUTOMATION
// ============================================================================

interface SendExecutiveSummaryParams {
  toEmail: string;
  firstName: string;
  lastName: string;
  company: string;
}

/**
 * Send Executive Summary PDF immediately after form submission (Day 0)
 */
export async function sendExecutiveSummaryEmail(params: SendExecutiveSummaryParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured. Please set SENDGRID_API_KEY environment variable.');
  }

  const { toEmail, firstName, lastName, company } = params;
  const fullName = `${firstName} ${lastName}`;

  // For now, we'll send without PDF attachment - user needs to provide the actual PDF file
  // TODO: Add actual Executive Summary PDF file path
  const emailHtml = createExecutiveSummaryEmailTemplate(firstName, company);
  const emailText = createExecutiveSummaryEmailTextVersion(firstName, company);

  const msg = {
    to: toEmail,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: 'Your Intelleges Executive Summary - Federal Compliance Automation',
    text: emailText,
    html: emailHtml,
    // TODO: Add PDF attachment when file is provided
    // attachments: [{
    //   content: pdfBase64,
    //   filename: 'Intelleges-Executive-Summary.pdf',
    //   type: 'application/pdf',
    //   disposition: 'attachment',
    // }],
  };

  try {
    await sgMail.send(msg);
    console.log(`Executive Summary email sent successfully to ${toEmail}`);
  } catch (error: any) {
    console.error('SendGrid error:', error);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    throw new Error(`Failed to send Executive Summary email: ${error.message}`);
  }
}

/**
 * Send Day 3 follow-up email with case study highlights
 */
export async function sendDay3FollowUpEmail(params: SendExecutiveSummaryParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured.');
  }

  const { toEmail, firstName, company } = params;

  const emailHtml = createDay3FollowUpTemplate(firstName, company);
  const emailText = createDay3FollowUpTextVersion(firstName, company);

  const msg = {
    to: toEmail,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: 'Real-World Success Stories: How Organizations Like Yours Use Intelleges',
    text: emailText,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log(`Day 3 follow-up email sent successfully to ${toEmail}`);
  } catch (error: any) {
    console.error('Failed to send Day 3 follow-up:', error);
    throw new Error(`Failed to send Day 3 follow-up email: ${error.message}`);
  }
}

/**
 * Send Day 7 follow-up email with consultation reminder
 */
export async function sendDay7FollowUpEmail(params: SendExecutiveSummaryParams): Promise<void> {
  if (!SENDGRID_API_KEY) {
    throw new Error('SendGrid API key not configured.');
  }

  const { toEmail, firstName, company } = params;

  const emailHtml = createDay7FollowUpTemplate(firstName, company);
  const emailText = createDay7FollowUpTextVersion(firstName, company);

  const msg = {
    to: toEmail,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject: 'Ready to Transform Your Compliance Operations?',
    text: emailText,
    html: emailHtml,
  };

  try {
    await sgMail.send(msg);
    console.log(`Day 7 follow-up email sent successfully to ${toEmail}`);
  } catch (error: any) {
    console.error('Failed to send Day 7 follow-up:', error);
    throw new Error(`Failed to send Day 7 follow-up email: ${error.message}`);
  }
}

// ============================================================================
// EMAIL TEMPLATES - EXECUTIVE SUMMARY
// ============================================================================

function createExecutiveSummaryEmailTemplate(firstName: string, company: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Intelleges Executive Summary</title>
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
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Federal Compliance Management System
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #0A3A67; font-size: 24px; font-weight: 300;">
                Hi ${firstName},
              </h2>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for downloading the Intelleges Executive Summary! Your document has been sent and should arrive in your inbox within the next few minutes.
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #0A3A67; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #0A3A67; font-size: 18px; font-weight: 500;">
                  📄 What's Inside
                </p>
                <ul style="margin: 10px 0 0; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                  <li>How to structure supplier compliance workflows</li>
                  <li>Support for FOIC, eSRS, CMMC, and audit readiness</li>
                  <li>How procurement teams reduce risk and documentation errors</li>
                  <li>Real-world examples from national labs & aerospace manufacturers</li>
                </ul>
              </div>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Want to see how Intelleges can help ${company}?</strong>
              </p>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                We're happy to spend <strong>30 minutes with you free of charge</strong> answering any questions you or your team might have about federal compliance, supplier management, or how Intelleges can streamline your operations.
              </p>
              
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 50px; background: #0A3A67;">
                    <a href="https://calendly.com/intelleges/30min" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                      Schedule Your Free 30-Minute Consultation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
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
                <a href="https://www.intelleges.com" style="color: #0A3A67; text-decoration: none;">www.intelleges.com</a> | 
                <a href="mailto:info@intelleges.com" style="color: #0A3A67; text-decoration: none;">info@intelleges.com</a> | 
                <a href="tel:+19178180225" style="color: #0A3A67; text-decoration: none;">(917) 818-0225</a>
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

function createExecutiveSummaryEmailTextVersion(firstName: string, company: string): string {
  return `
Hi ${firstName},

Thank you for downloading the Intelleges Executive Summary! Your document has been sent and should arrive in your inbox within the next few minutes.

WHAT'S INSIDE:
- How to structure supplier compliance workflows
- Support for FOIC, eSRS, CMMC, and audit readiness
- How procurement teams reduce risk and documentation errors
- Real-world examples from national labs & aerospace manufacturers

Want to see how Intelleges can help ${company}?

We're happy to spend 30 minutes with you free of charge answering any questions you or your team might have about federal compliance, supplier management, or how Intelleges can streamline your operations.

Schedule Your Free 30-Minute Consultation:
https://calendly.com/intelleges/30min

Best regards,
The Intelleges Team

---
Intelleges | Enterprise Compliance Management
ISO 27001 Certified • Battelle Supplier of the Year
www.intelleges.com | info@intelleges.com | (917) 818-0225
  `.trim();
}

// ============================================================================
// DAY 3 FOLLOW-UP TEMPLATE - CASE STUDY HIGHLIGHTS
// ============================================================================

function createDay3FollowUpTemplate(firstName: string, company: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real-World Success Stories</title>
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
                Hi ${firstName},
              </h2>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                I wanted to follow up on the Executive Summary you downloaded and share some real-world examples of how organizations are using Intelleges to transform their compliance operations.
              </p>
              
              <!-- Battelle Case Study -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #0A3A67; font-size: 18px; font-weight: 500;">
                  🏆 Battelle - Supplier of the Year
                </p>
                <p style="margin: 10px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                  <strong>95% reduction</strong> in manual data collection time<br>
                  <strong>Q1 2023</strong> critical microchips delivered in record time<br>
                  <strong>100% compliance</strong> with FAR requirements
                </p>
                <p style="margin: 10px 0 0; color: #666666; font-size: 14px; font-style: italic; line-height: 1.6;">
                  "Thanks to their support, we have been able to transform our supply chain, reduce costs and improve our processes."
                  <br>— Ed McFarland, VP of Contracts, Battelle
                </p>
              </div>
              
              <!-- Key Benefits -->
              <p style="margin: 20px 0 10px; color: #0A3A67; font-size: 18px; font-weight: 500;">
                How Intelleges Helps Organizations Like ${company}:
              </p>
              
              <ul style="margin: 10px 0 20px; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li><strong>Automate supplier onboarding</strong> - No more email chains or spreadsheets</li>
                <li><strong>Ensure audit readiness</strong> - FOIC, eSRS, CMMC compliance built-in</li>
                <li><strong>Reduce risk</strong> - Real-time visibility into supplier compliance status</li>
                <li><strong>Save time</strong> - 95% reduction in manual data collection</li>
              </ul>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>Ready to see how this applies to ${company}?</strong>
              </p>
              
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 50px; background: #0A3A67;">
                    <a href="https://calendly.com/intelleges/30min" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                      Schedule Your Free Consultation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
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
                <a href="https://www.intelleges.com" style="color: #0A3A67; text-decoration: none;">www.intelleges.com</a> | 
                <a href="mailto:info@intelleges.com" style="color: #0A3A67; text-decoration: none;">info@intelleges.com</a> | 
                <a href="tel:+19178180225" style="color: #0A3A67; text-decoration: none;">(917) 818-0225</a>
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

function createDay3FollowUpTextVersion(firstName: string, company: string): string {
  return `
Hi ${firstName},

I wanted to follow up on the Executive Summary you downloaded and share some real-world examples of how organizations are using Intelleges to transform their compliance operations.

BATTELLE - SUPPLIER OF THE YEAR:
• 95% reduction in manual data collection time
• Q1 2023 critical microchips delivered in record time
• 100% compliance with FAR requirements

"Thanks to their support, we have been able to transform our supply chain, reduce costs and improve our processes."
— Ed McFarland, VP of Contracts, Battelle

HOW INTELLEGES HELPS ORGANIZATIONS LIKE ${company.toUpperCase()}:
• Automate supplier onboarding - No more email chains or spreadsheets
• Ensure audit readiness - FOIC, eSRS, CMMC compliance built-in
• Reduce risk - Real-time visibility into supplier compliance status
• Save time - 95% reduction in manual data collection

Ready to see how this applies to ${company}?

Schedule Your Free Consultation:
https://calendly.com/intelleges/30min

Best regards,
The Intelleges Team

---
Intelleges | Enterprise Compliance Management
ISO 27001 Certified • Battelle Supplier of the Year
www.intelleges.com | info@intelleges.com | (917) 818-0225
  `.trim();
}

// ============================================================================
// DAY 7 FOLLOW-UP TEMPLATE - CONSULTATION REMINDER
// ============================================================================

function createDay7FollowUpTemplate(firstName: string, company: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ready to Transform Your Compliance Operations?</title>
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
                Hi ${firstName},
              </h2>
              
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                It's been a week since you downloaded our Executive Summary. I wanted to check in and see if you have any questions about how Intelleges can help ${company} streamline compliance operations.
              </p>
              
              <!-- Quick Recap -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #0A3A67; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0 0 10px; color: #0A3A67; font-size: 18px; font-weight: 500;">
                  Quick Recap: What Intelleges Does
                </p>
                <ul style="margin: 10px 0 0; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                  <li>Automates supplier compliance workflows (FOIC, eSRS, CMMC)</li>
                  <li>Eliminates email chains and spreadsheets</li>
                  <li>Ensures 100% audit readiness</li>
                  <li>Reduces manual data collection by 95%</li>
                </ul>
              </div>
              
              <!-- Free Consultation Offer -->
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>We're offering a free 30-minute consultation</strong> where we can:
              </p>
              
              <ul style="margin: 10px 0 20px; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                <li>Answer any questions about federal compliance requirements</li>
                <li>Show you how Intelleges works with a personalized demo</li>
                <li>Discuss how ${company} can benefit from automation</li>
                <li>Provide a customized implementation plan</li>
              </ul>
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                <strong>No pressure, no sales pitch</strong> - just helpful answers to your compliance challenges.
              </p>
              
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 50px; background: #0A3A67;">
                    <a href="https://calendly.com/intelleges/30min" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 500;">
                      Schedule Your Free 30-Minute Consultation
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Or if you prefer, you can reach us directly:
              </p>
              
              <table role="presentation" style="width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #f8f9fa; border-radius: 4px;">
                    <p style="margin: 0; color: #333333; font-size: 16px;">
                      📞 <strong>(917) 818-0225</strong><br>
                      📧 <strong>info@intelleges.com</strong>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
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
                <a href="https://www.intelleges.com" style="color: #0A3A67; text-decoration: none;">www.intelleges.com</a> | 
                <a href="mailto:info@intelleges.com" style="color: #0A3A67; text-decoration: none;">info@intelleges.com</a> | 
                <a href="tel:+19178180225" style="color: #0A3A67; text-decoration: none;">(917) 818-0225</a>
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

function createDay7FollowUpTextVersion(firstName: string, company: string): string {
  return `
Hi ${firstName},

It's been a week since you downloaded our Executive Summary. I wanted to check in and see if you have any questions about how Intelleges can help ${company} streamline compliance operations.

QUICK RECAP: WHAT INTELLEGES DOES
• Automates supplier compliance workflows (FOIC, eSRS, CMMC)
• Eliminates email chains and spreadsheets
• Ensures 100% audit readiness
• Reduces manual data collection by 95%

WE'RE OFFERING A FREE 30-MINUTE CONSULTATION WHERE WE CAN:
• Answer any questions about federal compliance requirements
• Show you how Intelleges works with a personalized demo
• Discuss how ${company} can benefit from automation
• Provide a customized implementation plan

No pressure, no sales pitch - just helpful answers to your compliance challenges.

Schedule Your Free 30-Minute Consultation:
https://calendly.com/intelleges/30min

Or if you prefer, you can reach us directly:
📞 (917) 818-0225
📧 info@intelleges.com

Best regards,
The Intelleges Team

---
Intelleges | Enterprise Compliance Management
ISO 27001 Certified • Battelle Supplier of the Year
www.intelleges.com | info@intelleges.com | (917) 818-0225
  `.trim();
}
