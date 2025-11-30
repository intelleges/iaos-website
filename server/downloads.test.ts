import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from './routers';
import type { TrpcContext } from './_core/context';

// Mock context for testing
const createMockContext = (): TrpcContext => {
  const mockReq = {
    headers: {
      'x-forwarded-for': '192.168.1.1',
    },
    socket: {
      remoteAddress: '192.168.1.1',
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

describe('Download Protection API', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe('downloads.validate', () => {
    it('should return validation result with proper structure', async () => {
      const result = await caller.downloads.validate({
        email: 'test@example.com',
        resource: 'Test Case Study',
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('allowed');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('message');
      expect(typeof result.allowed).toBe('boolean');
    });

    it('should validate email format', async () => {
      await expect(
        caller.downloads.validate({
          email: 'invalid-email',
          resource: 'Test Case Study',
        })
      ).rejects.toThrow();
    });

    it('should require resource name', async () => {
      await expect(
        caller.downloads.validate({
          email: 'test@example.com',
          resource: '',
        })
      ).rejects.toThrow();
    });
  });

  describe('downloads.record', () => {
    it('should record a download successfully', async () => {
      const result = await caller.downloads.record({
        email: 'newuser@example.com',
        resource: 'Case Study 01',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should validate email format when recording', async () => {
      await expect(
        caller.downloads.record({
          email: 'invalid-email',
          resource: 'Test Case Study',
        })
      ).rejects.toThrow();
    });
  });

  describe('Rate Limiting', () => {
    it('should return rate limit information in validation response', async () => {
      const testEmail = `ratelimit-${Date.now()}@example.com`;
      
      // Validate returns proper structure
      const validation = await caller.downloads.validate({
        email: testEmail,
        resource: 'Test Resource',
      });
      
      expect(validation).toBeDefined();
      expect(validation).toHaveProperty('allowed');
      expect(validation).toHaveProperty('reason');
      expect(validation).toHaveProperty('message');
      expect(typeof validation.allowed).toBe('boolean');
      
      // If blocked, should have proper error details
      if (!validation.allowed) {
        expect(validation.reason).toMatch(/email_limit|ip_limit/);
        expect(validation.message).toContain('maximum of 3 downloads');
      }
    });
  });
});

describe('Lead Capture API', () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe('leads.submit', () => {
    it('should submit a lead successfully', async () => {
      const result = await caller.leads.submit({
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Acme Corporation',
        resource: 'Case Study 01',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should validate required fields', async () => {
      await expect(
        caller.leads.submit({
          name: '',
          email: 'test@example.com',
          company: 'Test Company',
        })
      ).rejects.toThrow();

      await expect(
        caller.leads.submit({
          name: 'John Doe',
          email: 'invalid-email',
          company: 'Test Company',
        })
      ).rejects.toThrow();

      await expect(
        caller.leads.submit({
          name: 'John Doe',
          email: 'test@example.com',
          company: '',
        })
      ).rejects.toThrow();
    });

    it('should accept optional resource field', async () => {
      const result = await caller.leads.submit({
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        company: 'Tech Corp',
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
  });
});
