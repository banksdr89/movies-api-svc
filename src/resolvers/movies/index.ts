import Joi from 'joi';
import DataLoader from 'dataloader';
import db from '../../utils/db';
import { paginationSchema } from '../../utils/validation';
import { errorHandler } from '../../utils/errorHandler';

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 50;

const Query = {
  movies: (_: any, args: { page?: number }) => {
    const { error, value } = paginationSchema.validate(args);
    
    if (error) {
      throw errorHandler(`Invalid page number: ${error.message}`, 400);
    }

    const page = value.page;
    const offset = (page - 1) * PAGE_SIZE;
    const rows = db
      .prepare(
        `SELECT *
           FROM movies
           LIMIT ? OFFSET ?`,
      )
      .all(PAGE_SIZE, offset);

    return rows.map((row: any) => ({
      ...row,
      budget: `$${row.budget.toLocaleString('en-US')}`,
    }));
  },
};

export default { Query };
