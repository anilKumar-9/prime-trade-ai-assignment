import ApiResponse from '../utils/api-response.js';
import ApiError from '../utils/api-error.js';
import { User } from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

/**
 * REGISTER USER
 * Default role = USER
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({ name, email, password });

  const safeUser = await User.findById(user._id).select('-password');

  return res
    .status(201)
    .json(new ApiResponse(201, safeUser, 'User registered successfully'));
});

/**
 * LOGIN USER
 * Same for USER & ADMIN
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = user.generateAccessToken();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      'Login successful',
    ),
  );
});

/**
 * LOGOUT USER
 * JWT logout = client deletes token
 * NO token verification needed
 */
export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});
