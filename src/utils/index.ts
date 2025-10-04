import { GraphQLResolveInfo, FieldNode, SelectionNode } from 'graphql';

/**
 * Returns only select fields requested from a GraphQLResolveInfo object.
 *
 * @param info - GraphQL resolve info from the resolver
 * @returns A list of field names requested in the query, or ['*'] if none found.
 */
export const selectFields = (info: GraphQLResolveInfo): string[] => {
  if (!info?.fieldNodes?.length) {
    return ['*'];
  }

  const fieldNode: FieldNode = info.fieldNodes[0];
  if (!fieldNode.selectionSet?.selections?.length) {
    return ['*'];
  }

  const fields: string[] = fieldNode.selectionSet.selections
    .map((selection: SelectionNode) => {
      if (selection.kind === 'Field' && selection.name?.value) {
        return selection.name.value;
      }
      return null;
    })
    .filter(Boolean) as string[];
  return fields.length > 0 ? fields : ['*'];
};

export const buildSQL = (fields: string): string => {
  return `SELECT ${fields} FROM movies
  LIMIT ? OFFSET ?`;
};
