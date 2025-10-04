import db from './db';
import { GET_ALL_MOVIES } from '../db/queries/movies.queries';
import { errorHandler } from './errorHandler';

/**
 * Batch loads movies by their IDs from the database.
 *
 * This function is intended for use with DataLoader or other batching utilities.
 * It fetches all movies matching the given IDs in a single SQL query, then maps
 * them back to the original order of the input IDs.
 *
 * @async
 * @function batchLoader
 * @param {readonly number[]} ids - An array of movie IDs to load in batch.
 * @returns {Promise<any[]>} A promise that resolves to an array of movie objects
 *   corresponding to the provided IDs. If a movie is not found for a given ID,
 *   `null` is returned in its place.
 *
 * @throws {Error} Will throw a wrapped error if the database query fails.
 * */
export const batchLoader = async (ids: readonly number[]): Promise<any[]> => {
  try {
    const rows = db
      .prepare(`${GET_ALL_MOVIES} WHERE id IN (${ids.map(() => '?').join(',')})`)
      .all(...ids);
    const mapRows = new Map(rows.map((row: any) => [row.id, row]));
    return ids.map((id) => mapRows.get(id) || null);
  } catch (err: any) {
    throw errorHandler(`Batch data loader error ${err.message}`);
  }
};
