import ApiError from '../utils/api-error.js';

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    throw new ApiError(403, 'Admin access only');
  }
  next();
};
