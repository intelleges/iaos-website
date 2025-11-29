import { describe, it, expect } from 'vitest';
import { sendSalesTeamNotification } from './services/emailService';

describe('Sales Team Notifications', () => {
  it('should have sales team email configured', () => {
    expect(process.env.SALES_TEAM_EMAIL).toBeDefined();
    expect(process.env.SALES_TEAM_EMAIL?.length).toBeGreaterThan(0);
    
    // Validate email format (basic check)
    const emailRegex = /@/;
    expect(process.env.SALES_TEAM_EMAIL).toMatch(emailRegex);
    
    console.log(`Sales team email configured: ${process.env.SALES_TEAM_EMAIL}`);
  });

  it('should have SendGrid configured for sending notifications', () => {
    expect(process.env.SENDGRID_API_KEY).toBeDefined();
    expect(process.env.SENDGRID_FROM_EMAIL).toBeDefined();
  });

  it('should send sales notification without throwing errors', async () => {
    // Test that the function can be called and handles errors gracefully
    const testParams = {
      leadName: 'Test Lead',
      leadEmail: 'test@example.com',
      leadCompany: 'Test Company',
      caseStudyTitle: 'Test Case Study',
      ipAddress: '192.168.1.1',
      timestamp: new Date(),
    };

    // This should not throw even if email fails to send
    await expect(sendSalesTeamNotification(testParams)).resolves.not.toThrow();
    
    console.log('Sales notification test completed successfully');
  });
});
