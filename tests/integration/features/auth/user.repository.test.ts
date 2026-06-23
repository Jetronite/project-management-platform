import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepository } from '@/features/auth/repositories/user.repository';
import { cleanDatabase } from '../../../setup/test-db';

describe('UserRepository Integration', () => {
  const userRepository = new UserRepository();

  beforeEach(async () => {
    await cleanDatabase();
  });

  it('should create a user successfully', async () => {
    const user = await userRepository.create({
      email: 'test@example.com',
      passwordHash: 'hashed_password123',
      name: 'Test User',
    });

    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  it('should find a user by email', async () => {
    await userRepository.create({
      email: 'lookup@example.com',
      passwordHash: 'hash',
      name: 'Lookup User',
    });

    const foundUser = await userRepository.findByEmail('lookup@example.com');
    expect(foundUser).not.toBeNull();
    expect(foundUser?.name).toBe('Lookup User');
  });

  it('should find a user by ID', async () => {
    const createdUser = await userRepository.create({
      email: 'idtest@example.com',
      passwordHash: 'hash',
      name: 'ID Test User',
    });

    const foundUser = await userRepository.findById(createdUser.id);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toBe('idtest@example.com');
  });

  it('should update a user password', async () => {
    const user = await userRepository.create({
      email: 'password@example.com',
      passwordHash: 'old_hash',
      name: 'Password User',
    });

    const updatedUser = await userRepository.updatePassword(user.id, 'new_hash_123');
    expect(updatedUser.passwordHash).toBe('new_hash_123');
  });
});