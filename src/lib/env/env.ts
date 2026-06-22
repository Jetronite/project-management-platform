import { z } from 'zod';
import { logger } from '@/lib/logger/logger';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),
  AWS_S3_BUCKET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters long'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters long'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  logger.fatal({ errors: parsedEnv.error.format() }, 'Invalid environment variables');
  process.exit(1);
}

export const env = parsedEnv.data;
