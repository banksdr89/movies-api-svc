import { GraphQLResolveInfo } from 'graphql';
import { ContextAPI } from '../../utils/interfaces';

/**
 * GraphQL resolvers for the Movies API Subgraph.
 *
 * @namespace resolvers
 */
export const moviesResolvers = {
  Query: {
    /**
     * Fetches a paginated list of movies.
     *
     * @function movies
     * @param {object} _ - Unused root resolver argument.
     * @param {object} args - Query arguments.
     * @param {number} [args.page=1] - The page number.
     * @param {ContextAPI} context - GraphQL context including loaders and adapters.
     * @param {GraphQLResolveInfo} info - Resolver info.
     * @returns {Movies[]} Paginated list of movies.
     */
    movies: (
      _: unknown,
      args: { page?: number },
      context: ContextAPI,
      info?: GraphQLResolveInfo,
    ) => {
      context.logger.info({ event: 'movies', msg: 'moviesResolver', args });
      return context.moviesAdapter.getAllMovies(args, context, info);
    },
  },
};
