import Database from 'better-sqlite3';
import path from 'path';
import { config } from '../config';

const dbPath = path.resolve(__dirname, `..${config.db.movies}`);
const db = new Database(dbPath, { verbose: console.log });

export default db;
