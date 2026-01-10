import { body } from 'express-validator';

// REGISTER VALIDATION
export const userRegistrationValidator = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters'),

    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ];
};

// LOGIN VALIDATION
export const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address'),

    body('password').trim().notEmpty().withMessage('Password is required'),
  ];
};
