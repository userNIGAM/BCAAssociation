import { body } from 'express-validator';

export const validateNews = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters')
    .escape(),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('image')
    .optional()
    .isURL().withMessage('Invalid image URL')
    .matches(/\.(jpg|jpeg|png|gif|webp|svg)$/i).withMessage('Invalid image format'),
  body('isPublished')
    .optional()
    .isBoolean().withMessage('isPublished must be a boolean')
];