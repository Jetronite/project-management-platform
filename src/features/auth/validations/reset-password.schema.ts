import { z } from 'zod';

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long').max(128, 'Password is too long'),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;