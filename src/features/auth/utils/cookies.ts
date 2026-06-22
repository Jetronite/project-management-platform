import { cookies } from 'next/headers';
import { env } from '@/lib/env/env';
import { AUTH_CONSTANTS } from '@/constants/auth';

export async function setAuthCookies(accessToken: string, refreshToken: string): Promise<void> {
  const cookieStore = await cookies();
  const isProduction = env.NODE_ENV === 'production';

  cookieStore.set({
    name: AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE,
    value: accessToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 15 * 60, 
  });

  cookieStore.set({
    name: AUTH_CONSTANTS.REFRESH_TOKEN_COOKIE,
    value: refreshToken,
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/api/auth/refresh', 
    maxAge: 7 * 24 * 60 * 60, 
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE);
  cookieStore.delete(AUTH_CONSTANTS.REFRESH_TOKEN_COOKIE);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_CONSTANTS.ACCESS_TOKEN_COOKIE)?.value;
}