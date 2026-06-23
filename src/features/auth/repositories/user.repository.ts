import { BaseRepository, TransactionClient } from '@/lib/core/base.repository';
import { Prisma, User } from '@prisma/client';

export class UserRepository extends BaseRepository {
  constructor(transactionContext?: TransactionClient) {
    super(transactionContext);
  }

  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async updatePassword(id: string, passwordHash: string): Promise<User> {
    return this.db.user.update({
      where: { id },
      data: { passwordHash },
    });
  }
}