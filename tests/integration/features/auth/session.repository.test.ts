import { describe, it, expect, beforeEach } from 'vitest';
import { SessionRepository } from '@/features/auth/repositories/session.repository';
import { UserRepository } from '@/features/auth/repositories/user.repository';
import { cleanDatabase } from '../../../setup/test-db';
import { addDays } from '@/utils/date';

describe('SessionRepository Integration', () => {
  const sessionRepository = new SessionRepository();
  const userRepository = new UserRepository();
  let testUserId: string;

  beforeEach(async () => {
    await cleanDatabase();
    
    // Seed a user to satisfy the foreign key constraint
    const user = await userRepository.create({
      email: 'sessionuser@example.com',
      passwordHash: 'hash',
      name: 'Session User',
    });
    testUserId = user.id;
  });

  it('should create and find a session', async () => {
    const expiresAt = addDays(new Date(), 7);
    const session = await sessionRepository.createSession({
      refreshToken: 'mock_refresh_token',
      expiresAt,
      user: { connect: { id: testUserId } },
    });

    expect(session.id).toBeDefined();

    const foundSession = await sessionRepository.findSession('mock_refresh_token');
    expect(foundSession).not.toBeNull();
    expect(foundSession?.user.email).toBe('sessionuser@example.com');
  });

  it('should revoke a specific session', async () => {
    const session = await sessionRepository.createSession({
      refreshToken: 'revoke_token',
      expiresAt: addDays(new Date(), 7),
      user: { connect: { id: testUserId } },
    });

    await sessionRepository.revokeSession(session.id);

    const foundSession = await sessionRepository.findSession('revoke_token');
    expect(foundSession).toBeNull();
  });

  it('should revoke all sessions for a specific user', async () => {
    await sessionRepository.createSession({
      refreshToken: 'token_1',
      expiresAt: addDays(new Date(), 7),
      user: { connect: { id: testUserId } },
    });

    await sessionRepository.createSession({
      refreshToken: 'token_2',
      expiresAt: addDays(new Date(), 7),
      user: { connect: { id: testUserId } },
    });

    await sessionRepository.revokeAllSessions(testUserId);

    const session1 = await sessionRepository.findSession('token_1');
    const session2 = await sessionRepository.findSession('token_2');

    expect(session1).toBeNull();
    expect(session2).toBeNull();
  });
});