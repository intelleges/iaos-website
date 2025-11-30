import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';
import fs from 'fs';
import path from 'path';

// Mock context for testing
const createMockContext = (): TrpcContext => {
  const mockReq = {
    headers: {
      'x-forwarded-for': '192.168.1.100',
    },
    socket: {
      remoteAddress: '192.168.1.100',
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

describe('Email Delivery Integration', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe('Case Study Email Delivery', () => {
    it('should verify case study PDF files exist', () => {
      const caseStudiesDir = path.join(process.cwd(), 'client', 'public', 'case-studies');
      
      // Check if directory exists
      expect(fs.existsSync(caseStudiesDir)).toBe(true);
      
      // Check if at least one PDF exists
      const files = fs.readdirSync(caseStudiesDir);
      const pdfFiles = files.filter(f => f.endsWith('.pdf'));
      
      expect(pdfFiles.length).toBeGreaterThan(0);
      console.log(`Found ${pdfFiles.length} case study PDFs`);
    });

    it('should have SendGrid configured', () => {
      expect(process.env.SENDGRID_API_KEY).toBeDefined();
      expect(process.env.SENDGRID_FROM_EMAIL).toBeDefined();
      expect(process.env.SENDGRID_FROM_NAME).toBeDefined();
    });

    it('should accept lead submission with case study filename', async () => {
      const testEmail = `test-email-${Date.now()}@example.com`;
      
      const result = await caller.leads.submit({
        name: 'Test User',
        email: testEmail,
        company: 'Test Company',
        resource: 'Annual Representations & Certifications',
        caseStudyFilename: 'Case_Study_01_Annual_Representations_Certifications_Defense_Contracting.pdf',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      
      // Email sending is attempted (may succeed or fail depending on SendGrid config)
      // We just verify the API accepts the request
      console.log('Lead submission result:', result);
    });

    it('should handle lead submission without case study filename', async () => {
      const testEmail = `test-no-pdf-${Date.now()}@example.com`;
      
      const result = await caller.leads.submit({
        name: 'Test User No PDF',
        email: testEmail,
        company: 'Test Company',
        resource: 'Test Resource',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.emailSent).toBe(false);
    });

    it('should validate email format in lead submission', async () => {
      await expect(
        caller.leads.submit({
          name: 'Test User',
          email: 'invalid-email',
          company: 'Test Company',
        })
      ).rejects.toThrow();
    });

    it('should require name and company in lead submission', async () => {
      await expect(
        caller.leads.submit({
          name: '',
          email: 'test@example.com',
          company: 'Test Company',
        })
      ).rejects.toThrow();

      await expect(
        caller.leads.submit({
          name: 'Test User',
          email: 'test@example.com',
          company: '',
        })
      ).rejects.toThrow();
    });
  });
});
