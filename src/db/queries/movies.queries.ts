export const GET_ALL_MOVIES = `
  SELECT * FROM movies
  LIMIT ? OFFSET ?
`;
