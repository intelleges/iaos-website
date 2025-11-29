import { describe, it, expect } from 'vitest';
import { testSendGridConnection } from './services/emailService';

describe('SendGrid Configuration', () => {
  it('should have valid SendGrid API key configured', async () => {
    const isValid = await testSendGridConnection();
    
    expect(isValid).toBe(true);
    expect(process.env.SENDGRID_API_KEY).toBeDefined();
    expect(process.env.SENDGRID_API_KEY).toMatch(/^SG\./);
  });

  it('should have sender email configured', () => {
    expect(process.env.SENDGRID_FROM_EMAIL).toBeDefined();
    expect(process.env.SENDGRID_FROM_EMAIL).toMatch(/@/);
  });

  it('should have sender name configured', () => {
    expect(process.env.SENDGRID_FROM_NAME).toBeDefined();
    expect(process.env.SENDGRID_FROM_NAME?.length).toBeGreaterThan(0);
  });
});
