import db from '../utils/db';
import { paginationSchema } from '../utils/validation';
import { errorHandler } from '../utils/errorHandler';
import { config } from '../config';
import { Movies } from '../utils/interfaces';
import { selectFields, buildSQL } from '../utils/index';

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

    const selectedFields = selectFields(info);
    const columns = selectedFields.includes('*')
      ? '*'
      : selectedFields.filter(Boolean).join(', ') || '*';

    try {
      const sql = buildSQL(columns);
      const rows: any = db.prepare(sql).all(pageSize, offset);
      if (columns.includes('budget')) {
        return rows.map((row: any) => ({
          ...row,
          budget: `$${row.budget.toLocaleString('en-US')}`,
        }));
      } else {
        return rows;
      }
    } catch (err: any) {
      context.logger.error(
        { event: 'movies', msg: info.fieldName },
        `Failed to getAllMovies adapter ${err.message}`,
      );
      throw errorHandler(`Failed to getAllMovies adapter`);
    }
  }
}
