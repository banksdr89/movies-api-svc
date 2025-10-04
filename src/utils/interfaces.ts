import { moviesLoader } from '../loaders/movies.loaders';
import { MoviesAdapter } from '../adapters/movies.adapters';
import { logger } from './logger';
import { Request, Response } from 'express';

export interface Movies {
  movieId: number;
  imdbId: string;
  title: string;
  overview: string;
  productionCompanies: string;
  releaseDate: string;
  budget: number;
  revenue: number;
  runtime: number;
  language: string;
  genres: string;
  status: string;
}

export interface ContextAPI {
  moviesLoader: ReturnType<typeof moviesLoader>;
  moviesAdapter: typeof MoviesAdapter;
  req: Request;
  res: Response;
  logger: typeof logger;
}

export interface DatabaseConfig {
  path?: string;
  verbose?: boolean;
}
