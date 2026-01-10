import ApiError from '../utils/api-error.js';
import ApiResponse from '../utils/api-response.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

/**
 * GET ALL USERS (ADMIN ONLY)
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'USER' }).select('_id name email role');

  return res
    .status(200)
    .json(new ApiResponse(200, users, 'Users fetched successfully'));
});

/**
 * PROMOTE USER TO ADMIN
 */
export const promoteUserToAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    throw new ApiError(403, 'You cannot promote yourself');
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.role === 'ADMIN') {
    throw new ApiError(400, 'User is already an admin');
  }

  user.role = 'ADMIN';
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id: user._id, role: user.role },
        'User promoted to admin successfully',
      ),
    );
});
