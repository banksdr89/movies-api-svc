import dotenv from 'dotenv';
dotenv.config();

export const config = {
  db: {
    movies: process.env.MOVIES_DB_PATH,
    ratings: process.env.RATINGS_DB_PATH,
  },
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  env: process.env.NODE_ENV || 'development',
  sqlitePath: process.env.SQLITE_PATH || './movies.db',
  redisUrl: process.env.REDIS_URL || null,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS
    ? Number(process.env.RATE_LIMIT_WINDOW_MS)
    : 60000,
  rateLimitMax: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 100,
};
