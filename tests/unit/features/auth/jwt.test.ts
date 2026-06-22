import { describe, it, expect } from 'vitest';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyAccessToken, 
  verifyRefreshToken 
} from '@/features/auth/utils/jwt';

describe('JWT Utilities', () => {
  const mockPayload = { userId: '123', email: 'test@example.com' };

  it('should generate and verify an access token', async () => {
    const token = await generateAccessToken(mockPayload);
    expect(typeof token).toBe('string');

    const decoded = await verifyAccessToken(token);
    expect(decoded.userId).toBe(mockPayload.userId);
    expect(decoded.email).toBe(mockPayload.email);
  });

  it('should generate and verify a refresh token', async () => {
    const token = await generateRefreshToken({ userId: mockPayload.userId });
    expect(typeof token).toBe('string');

    const decoded = await verifyRefreshToken(token);
    expect(decoded.userId).toBe(mockPayload.userId);
    expect(decoded).not.toHaveProperty('email'); 
  });

  it('should throw an error for an invalid access token', async () => {
    await expect(verifyAccessToken('invalid.token.string')).rejects.toThrow('Invalid or expired access token');
  });
});