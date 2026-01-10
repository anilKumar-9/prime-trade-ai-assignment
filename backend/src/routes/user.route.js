import express from 'express';
import {
  getAllUsers,
  promoteUserToAdmin,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/role.middleware.js';

const router = express.Router();

// ✅ GET USERS (ADMIN)
router.get('/users', verifyJwt, adminOnly, getAllUsers);

// ✅ PROMOTE USER
router.put('/users/:id/promote', verifyJwt, adminOnly, promoteUserToAdmin);

export default router;
