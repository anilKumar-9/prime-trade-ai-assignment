import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
} from '../controllers/task.controller.js';

import { verifyJwt } from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/role.middleware.js';

const router = express.Router();

// All routes below require login
router.use(verifyJwt);

// USER + ADMIN (own tasks for user, all for admin)
router.get('/', getTasks);

// ADMIN ONLY → all tasks
router.get('/all', adminOnly, getAllTasks);

// CRUD
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
