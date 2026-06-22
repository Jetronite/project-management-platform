import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { env } from '@/lib/env/env';

const SALT_ROUNDS = 12;
const encodedSecret = new TextEncoder().encode(env.JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function signJwt(payload: Record<string, unknown>, expiresIn = '7d'): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedSecret);
}

export async function verifyJwt<T>(token: string): Promise<T> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as T;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}