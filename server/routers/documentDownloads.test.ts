import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { appRouter } from '../routers';
import { getDb } from '../db';
import { documentDownloads } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

/**
 * Integration tests for documentDownloads.recordDownload procedure
 * Focus: Company name field validation and error handling
 */
describe('documentDownloads.recordDownload - Company Name Validation', () => {
  const testEmail = `test-company-${Date.now()}@example.com`;
  
  // Create a caller with mock context
  const createCaller = () => {
    return appRouter.createCaller({
      user: null,
      req: {
        headers: { 'x-forwarded-for': '127.0.0.1' },
        socket: { remoteAddress: '127.0.0.1' }
      } as any,
      res: {} as any,
    });
  };

  beforeEach(async () => {
    // Clean up any existing test data
    const db = await getDb();
    if (db) {
      await db.delete(documentDownloads).where(eq(documentDownloads.email, testEmail));
    }
  });

  afterAll(async () => {
    // Final cleanup
    const db = await getDb();
    if (db) {
      await db.delete(documentDownloads).where(eq(documentDownloads.email, testEmail));
    }
  });

  describe('Required Field Validation', () => {
    it('should successfully record download when company name is provided', async () => {
      const caller = createCaller();

      const result = await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'John',
        lastName: 'Doe',
        company: 'Acme Corporation',
        documentTitle: 'Test Whitepaper',
        documentUrl: 'https://example.com/test.pdf',
        documentType: 'whitepaper',
      });

      expect(result).toMatchObject({
        success: true,
        downloadCount: 1,
        remainingDownloads: 2,
      });

      // Verify data was saved to database with company name
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const records = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail)).limit(1);
      const savedRecord = records[0];

      expect(savedRecord).toBeDefined();
      expect(savedRecord?.company).toBe('Acme Corporation');
      expect(savedRecord?.email).toBe(testEmail);
      expect(savedRecord?.documentTitle).toBe('Test Whitepaper');
    });

    it('should accept company names with special characters', async () => {
      const caller = createCaller();
      const specialCompanyName = "O'Reilly & Associates, Inc.";

      const result = await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'Jane',
        lastName: 'Smith',
        company: specialCompanyName,
        documentTitle: 'Test Resource',
        documentUrl: 'https://example.com/resource.pdf',
        documentType: 'capability',
      });

      expect(result.success).toBe(true);

      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const records = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail)).limit(1);
      const savedRecord = records[0];

      expect(savedRecord?.company).toBe(specialCompanyName);
    });

    it('should accept company names with numbers and hyphens', async () => {
      const caller = createCaller();
      const companyName = '3M-Tech Solutions 2024';

      const result = await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'Bob',
        lastName: 'Johnson',
        company: companyName,
        documentTitle: 'Test Protocol',
        documentUrl: 'https://example.com/protocol.pdf',
        documentType: 'protocol',
      });

      expect(result.success).toBe(true);

      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const records = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail)).limit(1);
      const savedRecord = records[0];

      expect(savedRecord?.company).toBe(companyName);
    });
  });

  describe('Optional Company Field Handling', () => {
    it('should accept undefined company name (optional field)', async () => {
      const caller = createCaller();

      const result = await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'Test',
        lastName: 'User',
        company: undefined,
        documentTitle: 'Test Document',
        documentUrl: 'https://example.com/doc.pdf',
        documentType: 'whitepaper',
      });

      expect(result.success).toBe(true);

      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const records = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail)).limit(1);
      const savedRecord = records[0];

      expect(savedRecord?.company).toBeNull();
    });
  });

  describe('Company Name in Multiple Downloads', () => {
    it('should track company name across multiple downloads by same user', async () => {
      const caller = createCaller();
      const companyName = 'Tech Industries LLC';

      // First download
      await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'John',
        lastName: 'Doe',
        company: companyName,
        documentTitle: 'Whitepaper 1',
        documentUrl: 'https://example.com/wp1.pdf',
        documentType: 'whitepaper',
      });

      // Second download
      await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'John',
        lastName: 'Doe',
        company: companyName,
        documentTitle: 'Whitepaper 2',
        documentUrl: 'https://example.com/wp2.pdf',
        documentType: 'whitepaper',
      });

      // Verify both records have company name
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const allRecords = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail));

      expect(allRecords).toHaveLength(2);
      expect(allRecords[0].company).toBe(companyName);
      expect(allRecords[1].company).toBe(companyName);
    });

    it('should enforce download limit regardless of company name', async () => {
      const caller = createCaller();

      // Download 3 times (limit is 3)
      for (let i = 1; i <= 3; i++) {
        await caller.documentDownloads.recordDownload({
          email: testEmail,
          firstName: 'John',
          lastName: 'Doe',
          company: 'Test Company',
          documentTitle: `Document ${i}`,
          documentUrl: `https://example.com/doc${i}.pdf`,
          documentType: 'whitepaper',
        });
      }

      // Fourth download should hit limit (throws error)
      try {
        await caller.documentDownloads.recordDownload({
          email: testEmail,
          firstName: 'John',
          lastName: 'Doe',
          company: 'Test Company',
          documentTitle: 'Document 4',
          documentUrl: 'https://example.com/doc4.pdf',
          documentType: 'whitepaper',
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error: any) {
        // Expect error to be thrown when limit is reached
        expect(error.message).toContain('Download limit');
      }
    });
  });

  describe('Google Sheets Integration', () => {
    it('should include company name in data structure for Google Sheets sync', async () => {
      const caller = createCaller();
      const companyName = 'Enterprise Solutions Inc';

      const result = await caller.documentDownloads.recordDownload({
        email: testEmail,
        firstName: 'Sarah',
        lastName: 'Connor',
        company: companyName,
        documentTitle: 'Compliance Guide',
        documentUrl: 'https://example.com/guide.pdf',
        documentType: 'whitepaper',
      });

      expect(result.success).toBe(true);

      // Verify the record exists with company name for Google Sheets sync
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const records = await db.select().from(documentDownloads).where(eq(documentDownloads.email, testEmail)).limit(1);
      const savedRecord = records[0];

      expect(savedRecord).toMatchObject({
        email: testEmail,
        company: companyName,
        documentTitle: 'Compliance Guide',
      });
      
      // Verify company name is present for Google Sheets sync
      expect(savedRecord?.company).toBe(companyName);
    });
  });
});
