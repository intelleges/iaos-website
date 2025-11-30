import { describe, it, expect } from 'vitest';
import { appRouter } from './routers';
import { getDb } from './db';

describe('Check Limit Query', () => {
  it('should check download limit for an email', async () => {
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
      const result = await caller.documentDownloads.checkLimit({
        email: 'test-limit@example.com',
      });

      console.log('[TEST] checkLimit succeeded:', result);
      expect(result).toHaveProperty('downloadCount');
      expect(result).toHaveProperty('limitReached');
      expect(result).toHaveProperty('remainingDownloads');
    } catch (error: any) {
      console.error('[TEST] checkLimit failed with error:', error);
      console.error('[TEST] Error message:', error.message);
      console.error('[TEST] Error data:', error.data);
      throw error;
    }
  });
});
