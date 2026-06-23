import { prisma } from '@/lib/prisma/prisma';

/**
 * Utility to clean the database between integration tests.
 * WARNING: Never use this outside of the test environment.
 */
export async function cleanDatabase() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('cleanDatabase can only be run in the test environment');
  }

  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
}