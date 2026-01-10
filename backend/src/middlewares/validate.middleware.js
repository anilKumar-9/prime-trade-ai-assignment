import { validationResult } from 'express-validator';
import ApiError from '../utils/api-error.js';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  throw new ApiError(
    400,
    'Validation failed',
    errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    })),
  );
};
