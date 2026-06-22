import bcrypt from 'bcrypt';
import { AUTH_CONSTANTS } from '@/constants/auth';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, AUTH_CONSTANTS.PASSWORD_SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}