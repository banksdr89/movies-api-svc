import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import { typeDefs, resolvers } from "./schema";
import path from 'path';
import cors from 'cors';
import { readFileSync } from 'fs';
import { logger } from './utils/logger';
import { resolvers } from './resolvers';
import { config } from './config';

const schemaPath = path.join(__dirname, 'graphql', 'schema.graphql');
const typeDefs = readFileSync(schemaPath, 'utf8');

export const createServer = async () => {
  try {
    const app = express();

    app.use((req, res, next) => {
      const { method, url, headers, query, body, params } = req;
      logger.info(
        {
          method,
          url,
          query,
          body,
          params,
        },
        'Incoming request',
      );
      next();
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: config.env !== 'production',
    });

    await server.start();

    server.applyMiddleware({ app, path: '/graphql' });

    const port = config.port;
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}/graphql`);
    });
  } catch (err) {
    process.exit(1);
  }
};
