import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';

describe('Download Limit Modal Test', () => {
  const testEmail = 'limittest@intelleges-qa.com';
  const testName = 'Limit Test User';
  const testCompany = 'Intelleges Limit Testing';

  it('should allow 2nd download', async () => {
    const caller = appRouter.createCaller({ req: { headers: {} } } as any);
    
    const result = await caller.documentDownloads.recordDownload({
      email: testEmail,
      name: testName,
      company: testCompany,
      documentTitle: 'The Future of Supply Chain Risk',
      documentUrl: 'https://files.manuscdn.com/whitepaper-supply-chain-risk.pdf',
      documentType: 'whitepaper',
    });

    console.log('[TEST] 2nd download result:', result);
    expect(result.success).toBe(true);
    expect(result.downloadCount).toBe(2);
    expect(result.remainingDownloads).toBe(1);
  });

  it('should allow 3rd download', async () => {
    const caller = appRouter.createCaller({ req: { headers: {} } } as any);
    
    const result = await caller.documentDownloads.recordDownload({
      email: testEmail,
      name: testName,
      company: testCompany,
      documentTitle: 'Intelleges Platform Datasheet',
      documentUrl: 'https://files.manuscdn.com/datasheet-platform.pdf',
      documentType: 'whitepaper',
    });

    console.log('[TEST] 3rd download result:', result);
    expect(result.success).toBe(true);
    expect(result.downloadCount).toBe(3);
    expect(result.remainingDownloads).toBe(0);
  });

  it('should reject 4th download and trigger limit modal', async () => {
    const caller = appRouter.createCaller({ req: { headers: {} } } as any);
    
    try {
      await caller.documentDownloads.recordDownload({
        email: testEmail,
        name: testName,
        company: testCompany,
        documentTitle: 'Audit Preparation Handbook',
        documentUrl: 'https://files.manuscdn.com/guide-audit-prep.pdf',
        documentType: 'whitepaper',
      });
      
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: any) {
      console.log('[TEST] 4th download correctly rejected:', error.message);
      expect(error.message).toContain('Download limit reached');
      expect(error.code).toBe('PRECONDITION_FAILED');
    }
  });

  it('should verify checkLimit returns correct status after 3 downloads', async () => {
    const caller = appRouter.createCaller({ req: { headers: {} } } as any);
    
    const limitCheck = await caller.documentDownloads.checkLimit({
      email: testEmail,
    });

    console.log('[TEST] Limit check after 3 downloads:', limitCheck);
    expect(limitCheck.canDownload).toBe(false);
    expect(limitCheck.downloadCount).toBe(3);
    expect(limitCheck.remainingDownloads).toBe(0);
  });
});
