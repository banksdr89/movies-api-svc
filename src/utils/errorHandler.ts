import { GraphQLError } from 'graphql';

export function errorHandler(message: string, code = 400) {
  return new GraphQLError(message, {
    extensions: { code: code.toString() },
  });
}
