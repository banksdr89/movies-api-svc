import pino from 'pino';

/**
 * Application-wide Pino logger instance.
 *
 * @constant
 * @type {import("pino").Logger}
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  base: null,
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: true },
        }
      : undefined,
});
