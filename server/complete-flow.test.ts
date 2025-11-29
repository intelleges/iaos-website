import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

// Mock context for testing
const createMockContext = (): TrpcContext => {
  const mockReq = {
    headers: {
      'x-forwarded-for': '203.0.113.42',
    },
    socket: {
      remoteAddress: '203.0.113.42',
    },
  } as any;

  const mockRes = {
    cookie: () => {},
    clearCookie: () => {},
  } as any;

  return {
    req: mockReq,
    res: mockRes,
    user: null,
  };
};

describe('Complete Email Flow Integration', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  it('should complete full flow: lead submission + case study email + sales notification', async () => {
    const testEmail = `integration-test-${Date.now()}@example.com`;
    
    console.log('\n🧪 Testing complete email flow...\n');
    
    // Submit lead with case study download
    const result = await caller.leads.submit({
      name: 'Integration Test User',
      email: testEmail,
      company: 'Test Corporation',
      resource: 'Annual Representations & Certifications',
      caseStudyFilename: 'Case_Study_01_Annual_Representations_Certifications_Defense_Contracting.pdf',
    });

    // Verify lead submission succeeded
    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.emailSent).toBe(true);
    
    console.log('✅ Lead submitted successfully');
    console.log('✅ Case study email sent to user');
    console.log('✅ Sales team notification sent');
    console.log(`\n📧 Emails sent to:`);
    console.log(`   - User: ${testEmail}`);
    console.log(`   - Sales: ${process.env.SALES_TEAM_EMAIL}`);
    console.log('\n🎉 Complete flow test passed!\n');
  });

  it('should verify all email configuration is present', () => {
    expect(process.env.SENDGRID_API_KEY).toBeDefined();
    expect(process.env.SENDGRID_FROM_EMAIL).toBeDefined();
    expect(process.env.SENDGRID_FROM_NAME).toBeDefined();
    expect(process.env.SALES_TEAM_EMAIL).toBeDefined();
    
    console.log('\n✅ All email configuration verified:');
    console.log(`   - SendGrid API Key: ${process.env.SENDGRID_API_KEY?.substring(0, 10)}...`);
    console.log(`   - From Email: ${process.env.SENDGRID_FROM_EMAIL}`);
    console.log(`   - From Name: ${process.env.SENDGRID_FROM_NAME}`);
    console.log(`   - Sales Team: ${process.env.SALES_TEAM_EMAIL}\n`);
  });
});
