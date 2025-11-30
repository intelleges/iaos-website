import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import { getDb } from './db';

describe('Document Download Mutation', () => {
  it('should record a document download', async () => {
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    // Create a mock context
    const mockCtx = {
      user: null,
      req: {
        headers: {
          'x-forwarded-for': '127.0.0.1'
        },
        socket: {
          remoteAddress: '127.0.0.1'
        }
      } as any,
      res: {} as any,
    };

    const caller = appRouter.createCaller(mockCtx);

    try {
      const result = await caller.documentDownloads.recordDownload({
        email: 'vitest@test.com',
        name: 'Vitest User',
        company: 'Test Company',
        documentTitle: 'Test Document',
        documentUrl: 'https://example.com/test.pdf',
        documentType: 'capability',
      });

      console.log('[TEST] Mutation succeeded:', result);
      expect(result.success).toBe(true);
    } catch (error: any) {
      console.error('[TEST] Mutation failed with error:', error);
      console.error('[TEST] Error message:', error.message);
      console.error('[TEST] Error data:', error.data);
      console.error('[TEST] Error shape:', error.shape);
      throw error;
    }
  });
});
