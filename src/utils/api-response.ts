import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger/logger';
import { AppError, ValidationError } from './errors';

export function successResponse<T>(data?: T, status = 200) {
  const payload: { success: boolean; data?: T } = { success: true };
  if (data !== undefined) {
    payload.data = data;
  }
  return NextResponse.json(payload, { status });
}

export function errorResponse(error: unknown) {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { success: false, message: error.message, errors: error.errors },
      { status: error.statusCode }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      { success: false, message: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  // Log unhandled exceptions
  logger.error({ err: error }, 'Unhandled Server Error');

  return NextResponse.json(
    { success: false, message: 'Internal server error' },
    { status: 500 }
  );
}