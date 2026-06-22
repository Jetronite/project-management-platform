import { describe, it, expect } from 'vitest';
import { NotFoundError, ValidationError, AppError } from '../../../src/utils/errors';

describe('Error Utilities', () => {
  it('should instantiate NotFoundError correctly', () => {
    const error = new NotFoundError('Task not found');
    expect(error.statusCode).toBe(404);
    expect(error.code).toBe('NOT_FOUND');
    expect(error.message).toBe('Task not found');
    expect(error.isOperational).toBe(true);
    expect(error instanceof AppError).toBe(true);
  });

  it('should instantiate ValidationError with optional error records', () => {
    const errors = { email: ['Invalid format'] };
    const error = new ValidationError('Validation failed', errors);
    expect(error.statusCode).toBe(422);
    expect(error.errors).toEqual(errors);
  });
});