import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

// Register
authRouter.post('/register', registerUser);

// Login
authRouter.post('/login', loginUser);

// Logout (protected)
authRouter.post('/logout', logoutUser);

export default authRouter;
