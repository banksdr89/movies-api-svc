import Joi from 'joi';

// Validate movieId
export const movieIdSchema = Joi.object({
  id: Joi.string().required(),
});

// Validate pagination
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
});
