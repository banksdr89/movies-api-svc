import Database from 'better-sqlite3';
import path from 'path';
import { config } from '../config';
import { DatabaseConfig } from './interfaces';

/**
 * Creates a new SQLite database instance with optional configuration.
 *
 * @param {DBConfig} [dbConfig] - Optional database configuration.
 * @param {string} [dbConfig.path] - Path to the SQLite database file.
 * @param {boolean} [dbConfig.verbose] - Enable verbose logging (defaults to false in production).
 * @returns {Database} A Better-SQLite3 database instance.
 *
 * @example
 * const db = createDatabase({ path: './data/movies.db', verbose: true });
 */
export function connectDatabase(dbConfig?: DatabaseConfig) {
  const databasePath = path.resolve(__dirname, `..${config.db.movies}`);
  const verboseLog =
    (dbConfig?.verbose ?? config.env !== 'production') ? { verbose: console.log } : {};

  return new Database(databasePath, verboseLog);
}

// Default database instance (uses config from environment)
const db = connectDatabase();
export default db;
