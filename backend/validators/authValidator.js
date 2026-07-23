import { body } from 'express-validator';

export const validateRegisterAdmin = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 80 })
    .withMessage('Name must be between 2 and 80 characters'),

  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter a valid email address'),

  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('adminSecret')
    .trim()
    .notEmpty()
    .withMessage('Admin secret is required'),
];

export const validateLoginAdmin = [
  body('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Enter a valid email address'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
];
