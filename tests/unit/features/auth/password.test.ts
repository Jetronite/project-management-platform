import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '@/features/auth/utils/password';

describe('Password Utilities', () => {
  it('should hash a password successfully', async () => {
    const password = 'securePassword123';
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should return true for matching passwords', async () => {
    const password = 'securePassword123';
    const hash = await hashPassword(password);
    const isValid = await verifyPassword(password, hash);
    
    expect(isValid).toBe(true);
  });

  it('should return false for incorrect passwords', async () => {
    const password = 'securePassword123';
    const hash = await hashPassword(password);
    const isValid = await verifyPassword('wrongPassword', hash);
    
    expect(isValid).toBe(false);
  });
});