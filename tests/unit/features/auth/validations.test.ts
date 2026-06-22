import { describe, it, expect } from 'vitest';
import { registerSchema } from '@/features/auth/validations/register.schema';
import { loginSchema } from '@/features/auth/validations/login.schema';
import { resetPasswordSchema } from '@/features/auth/validations/reset-password.schema';

describe('Auth Validation Schemas', () => {
  describe('Register Schema', () => {
    it('should validate a correct registration payload', () => {
      const validPayload = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'securePassword123!',
      };
      const result = registerSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject an invalid email address', () => {
      const invalidPayload = {
        name: 'John Doe',
        email: 'not-an-email',
        password: 'securePassword123!',
      };
      const result = registerSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email address');
      }
    });

    it('should reject a password that is too short', () => {
      const invalidPayload = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'short',
      };
      const result = registerSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password must be at least 8 characters long');
      }
    });
  });

  describe('Login Schema', () => {
    it('should validate a correct login payload', () => {
      const validPayload = {
        email: 'john@example.com',
        password: 'anyPassword',
      };
      const result = loginSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should lowercase and trim the email automatically', () => {
      const payload = {
        email: '  JOHN@example.COM  ',
        password: 'anyPassword',
      };
      const result = loginSchema.parse(payload);
      expect(result.email).toBe('john@example.com');
    });
  });

  describe('Reset Password Schema', () => {
    it('should validate a correct reset payload', () => {
      const validPayload = {
        token: 'some-jwt-or-random-string',
        password: 'newSecurePassword123!',
      };
      const result = resetPasswordSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject missing tokens', () => {
      const invalidPayload = {
        token: '',
        password: 'newSecurePassword123!',
      };
      const result = resetPasswordSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
    });
  });
});