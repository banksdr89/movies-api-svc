import DataLoader from 'dataloader';
import { Movies } from '../utils/interfaces';
import { batchLoader } from '../utils/dataloader';

/**
 * Creates a DataLoader instance for batching and caching movie fetches by ID.
 *
 * This loader batches multiple movie ID requests into a single database query
 * using `batchLoader`, and caches the results to avoid redundant queries
 * during a single request lifecycle.
 *
 * @async
 * @function moviesLoader
 * @returns {Promise<DataLoader<number, Movies>>} A promise that resolves to a
 *   DataLoader instance where:
 *     - The key type is `number` (movie ID)
 *     - The value type is `Movies` (movie object)
 *
 * @see {@link batchLoader} for the underlying batch fetching logic.
 */
export const moviesLoader = async () => {
  return new DataLoader<number, Movies>(async (keys: readonly number[]) => batchLoader(keys));
};
