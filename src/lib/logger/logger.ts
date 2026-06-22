import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:standard' },
        }
      : undefined,
  redact: {
    paths: ['password', 'token', 'authorization', 'cookie', '*.password', '*.token'],
    censor: '[REDACTED]',
  },
});