import express from 'express';
import cors from 'cors';

import healthCheckRouter from './routes/healthcheck.route.js';
import authRouter from './routes/auth.route.js';
import taskRouter from './routes/task.route.js';
import userRoutes from './routes/user.route.js';

import morganMiddleware from './middlewares/morgan.middleware.js';
import logger from './utils/logger.js';

const app = express();

// Disable ETag
app.set('etag', false);

// Body parsers
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Static files
app.use(express.static('public'));

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// ✅ MORGAN + WINSTON LOGGER
app.use(morganMiddleware);

// Routes
app.use('/api/v1/healthcheck', healthCheckRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1', userRoutes);

// Root
app.get('/', (req, res) => {
  res.send('API is running');
});

// ❌ Global error handler
app.use((err, req, res, next) => {
  logger.error(err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
