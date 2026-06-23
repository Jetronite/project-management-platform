import { BaseRepository, TransactionClient } from '@/lib/core/base.repository';
import { Prisma, Session } from '@prisma/client';

export class SessionRepository extends BaseRepository {
  constructor(transactionContext?: TransactionClient) {
    super(transactionContext);
  }

  async createSession(data: Prisma.SessionCreateInput): Promise<Session> {
    return this.db.session.create({
      data,
    });
  }

  async findSession(refreshToken: string): Promise<(Session & { user: Prisma.UserGetPayload<{}> }) | null> {
    return this.db.session.findFirst({
      where: { refreshToken },
      include: { user: true },
    });
  }

  async revokeSession(id: string): Promise<void> {
    await this.db.session.delete({
      where: { id },
    });
  }

  async revokeAllSessions(userId: string): Promise<void> {
    await this.db.session.deleteMany({
      where: { userId },
    });
  }
}