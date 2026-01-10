import jwt from 'jsonwebtoken';
import ApiError from '../utils/api-error.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Token missing');
  }

  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    throw new ApiError(401, 'User not found');
  }

  req.user = user;
  next();
});

