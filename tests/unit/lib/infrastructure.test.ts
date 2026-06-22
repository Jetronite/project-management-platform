// Mock external SDKs to prevent actual network requests during unit tests
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: class {
      $connect = vi.fn();
      $disconnect = vi.fn();
    },
  };
});

vi.mock('ioredis', () => {
  return {
    Redis: class {
      connect = vi.fn();
      disconnect = vi.fn();
    },
  };
});

vi.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: class {
      send = vi.fn();
    },
  };
});

vi.mock('resend', () => {
  return {
    Resend: class {
      emails = {
        send: vi.fn(),
      };
    },
  };
});

import { describe, it, expect, vi } from 'vitest';
import { prisma } from '../../../src/lib/prisma/prisma';
import { redis } from '../../../src/lib/redis/redis';
import { s3Client } from '../../../src/lib/s3/s3';
import { resend } from '../../../src/lib/email/resend';

describe('Infrastructure Initializers', () => {
  it('should instantiate Prisma client successfully', () => {
    expect(prisma).toBeDefined();
  });

  it('should instantiate Redis client successfully', () => {
    expect(redis).toBeDefined();
  });

  it('should instantiate S3 client successfully', () => {
    expect(s3Client).toBeDefined();
  });

  it('should instantiate Resend client successfully', () => {
    expect(resend).toBeDefined();
  });
});