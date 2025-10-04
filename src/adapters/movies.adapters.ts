import db from '../utils/db';
import { paginationSchema } from '../utils/validation';
import { errorHandler } from '../utils/errorHandler';
import { config } from '../config';
import { Movies } from '../utils/interfaces';
import { GET_ALL_MOVIES } from '../db/queries/movies.queries';

/**
 * Adapter for retrieving movies from the database.
 *
 * @class MoviesAdapter
 */
export class MoviesAdapter {
  /**
   * Fetch all movies with pagination support.
   *
   * @static
   * @param {object} args - Pagination arguments.
   * @param {number} args.page - Page number.
   * @param {ContextAPI} context - Context containing logger and loaders.
   * @param {GraphQLResolveInfo} info - GraphQL resolve info.
   * @returns {Promise<Movies[]>}
   */
  static async getAllMovies(args: { page?: number }, context: any, info: any): Promise<Movies[]> {
    const { error, value } = paginationSchema.validate(args);
    if (error) {
      throw errorHandler(`Invalid page number: ${args.page} ${error.message}`, 400);
    }

    const page = value.page || 1;
    const pageSize = config.paginationSize;
    const offset = (page - 1) * pageSize;

    try {
      const rows = db.prepare(GET_ALL_MOVIES).all(pageSize, offset);
      return rows.map((row: any) => ({
        ...row,
        budget: `$${row.budget.toLocaleString('en-US')}`,
      }));
    } catch (err: any) {
      context.logger.error(
        { event: 'movies', msg: info.fieldName },
        `Failed to getAllMovies adapter ${err.message}`,
      );
      throw errorHandler(`Failed to getAllMovies adapter`);
    }
  }
}
