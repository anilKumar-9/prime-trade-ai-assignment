import ApiError from '../utils/api-error.js';
import ApiResponse from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { Task } from '../models/task.model.js';

/**
 * CREATE TASK
 * USER  → assigned to self
 * ADMIN → can assign to any user
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, userId } = req.body;

  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  if (!title) {
    throw new ApiError(400, 'Title is required');
  }

  let assignedUserId = req.user._id;

  // Admin can assign task to any user
  if (req.user.role === 'ADMIN') {
    if (!userId) {
      throw new ApiError(400, 'userId is required for admin');
    }
    assignedUserId = userId;
  }

  const task = await Task.create({
    title,
    description,
    userId: assignedUserId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, 'Task created successfully'));
});

/**
 * GET TASKS
 * USER  → own tasks
 * ADMIN → all tasks
 */
export const getTasks = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const filter = req.user.role === 'ADMIN' ? {} : { userId: req.user._id };

  const tasks = await Task.find(filter).populate('userId', 'name email');

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, 'Tasks fetched successfully'));
});

/**
 * GET SINGLE TASK
 */
export const getTaskById = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const task = await Task.findById(req.params.id).populate(
    'userId',
    'name email',
  );

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  // USER can access only own tasks
  if (
    req.user.role !== 'ADMIN' &&
    task.userId._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, 'Access denied');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, task, 'Task fetched successfully'));
});

/**
 * UPDATE TASK
 */
export const updateTask = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (
    req.user.role !== 'ADMIN' &&
    task.userId.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, 'Access denied');
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, 'Task updated'));
});

/**
 * DELETE TASK
 */
export const deleteTask = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'Unauthorized');
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (
    req.user.role !== 'ADMIN' &&
    task.userId.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, 'Access denied');
  }

  await task.deleteOne();

  return res.status(200).json(new ApiResponse(200, {}, 'Task deleted'));
});

/**
 * GET ALL TASKS (ADMIN ONLY)
 */
export const getAllTasks = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    throw new ApiError(403, 'Admins only');
  }

  const tasks = await Task.find({}).populate('userId', 'name email');

  return res.status(200).json(new ApiResponse(200, tasks, 'All tasks fetched'));
});
