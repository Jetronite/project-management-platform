import { prisma } from '@/lib/prisma/prisma';
import { PrismaClient } from '@prisma/client';

export type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

/**
 * Foundation for the Repository Pattern.
 * Ensures consistent database access and facilitates Prisma transaction propagation.
 */
export abstract class BaseRepository {
  protected db: PrismaClient | TransactionClient;

  constructor(transactionContext?: TransactionClient) {
    this.db = transactionContext || prisma;
  }
}