import { SignJWT, jwtVerify } from 'jose';
import { env } from '@/lib/env/env';
import { AUTH_CONSTANTS } from '@/constants/auth';

export interface JwtPayload {
  userId: string;
  email: string;
  [key: string]: unknown;
}

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(env.JWT_REFRESH_SECRET);

export async function generateAccessToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRES_IN)
    .sign(accessSecret);
}

export async function generateRefreshToken(payload: Pick<JwtPayload, 'userId'>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRES_IN)
    .sign(refreshSecret);
}

export async function verifyAccessToken(token: string): Promise<JwtPayload> {
  try {
    const { payload } = await jwtVerify(token, accessSecret);
    return payload as unknown as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
}

export async function verifyRefreshToken(token: string): Promise<Pick<JwtPayload, 'userId'>> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret);
    return payload as unknown as Pick<JwtPayload, 'userId'>;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
}