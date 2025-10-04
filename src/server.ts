/**
 * Initializes and configures the Express + Apollo GraphQL server.
 *
 * @module server
 */

import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import { readFileSync } from 'fs';
import { logger } from './utils/logger';
import { resolvers } from './resolvers';
import { config } from './config';
import { ContextAPI } from './utils/interfaces';
import { moviesLoader } from './loaders/movies.loaders';
import { MoviesAdapter } from './adapters/movies.adapters';

const schemaPath = path.join(__dirname, 'graphql', 'schema.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

/**
 * Creates and configures an Apollo GraphQL server.
 *
 * @async
 * @function createServer
 * @returns {Promise<import("express").Express>} An Express app with Apollo middleware applied.
 **/
export const createServer = async () => {
  try {
    const app = express();

    // /* MIDDLEWARE */
    if (config.env === 'production') {
      app.use(helmet());
    }

    /* RATE LIMITING */
    const rateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'Too many requests, please try again later.',
    });

    app.use(rateLimiter);

    /* TRACING */
    app.use((req: Request, res: Response, next: NextFunction) => {
      const traceRequestId = uuidv4();
      (req as any).traceRequestId = traceRequestId;

      logger.info(
        {
          traceRequestId,
          method: req.method,
          url: req.url,
          query: req.query,
          body: req.body,
          headers: req.headers,
          params: req.params,
        },
        'Request initiated',
      );

      res.on('finish', () => {
        logger.info(
          {
            traceRequestId,
            statusCode: res.statusCode,
          },
          'Request completed',
        );
      });

      next();
    });

    /* SERVER PROVISION */
    const server = new ApolloServer<ContextAPI>({
      typeDefs,
      resolvers,
      introspection: config.env !== 'production',
      context: async ({ req, res }) => {
        return {
          req,
          res,
          logger,
          traceRequestId: (req as any).traceRequestId,
          moviesLoader: moviesLoader(),
          moviesAdapter: MoviesAdapter,
        };
      },
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    const port = config.port;
    app.listen(port, () => {
      logger.info(`Server listening on http://localhost:${port}/graphql`);
    });
  } catch (err: any) {
    logger.error(`Server startup error: ${err}`);
    process.exit(1);
  }
};
