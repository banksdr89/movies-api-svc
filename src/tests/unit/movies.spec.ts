import { moviesResolvers } from '../../resolvers/movies';
import { GraphQLResolveInfo } from 'graphql';

describe('Movies Resolver', () => {
  let mockContext: any;
  let mockInfo: GraphQLResolveInfo;

  beforeEach(() => {
    mockContext = {
      logger: { info: jest.fn() },
      moviesAdapter: {
        getAllMovies: jest.fn(async (args) => {
          if (args.page !== undefined && args.page < 1) {
            throw new Error('Invalid page number');
          }

          const page = args.page ?? 1;
          const limit = args.limit ?? 50;
          const movies = Array.from({ length: 100 }, (_, i) => ({
            imdbId: `tt${i + 1}`,
            title: `Movie ${i + 1}`,
            genres: ['Drama'],
            releaseDate: '2020-01-01',
            budget: `$${(i + 1) * 1000000}`,
          }));
          const offset = (page - 1) * limit;
          return movies.slice(offset, offset + limit);
        }),
      },
    };

    mockInfo = {} as GraphQLResolveInfo;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('movies query', () => {
    it('returns first page of movies by default', async () => {
      const args = {};
      const result = await moviesResolvers.Query.movies({}, args, mockContext, mockInfo);

      expect(mockContext.logger.info).toHaveBeenCalledWith({
        event: 'movies',
        msg: 'moviesResolver',
        args,
      });

      expect(mockContext.moviesAdapter.getAllMovies).toHaveBeenCalledWith(
        args,
        mockContext,
        mockInfo,
      );

      expect(result).toHaveLength(50);
      expect(result[0].title).toBe('Movie 1');
      expect(result[0].budget).toBe('$1000000');
    });

    it('returns second page of movies with page argument', async () => {
      const result = await moviesResolvers.Query.movies({}, { page: 2 }, mockContext, mockInfo);
      expect(result).toHaveLength(50);
      expect(result[0].title).toBe('Movie 51');
    });

    it('throws error for invalid page', async () => {
      await expect(
        moviesResolvers.Query.movies({}, { page: 0 }, mockContext, mockInfo),
      ).rejects.toThrow('Invalid page number');
    });
  });
});
