import { body } from "express-validator";

export const validateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),

  body("shortDesc")
    .trim()
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 500 })
    .withMessage("Short description cannot exceed 500 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be in valid ISO8601 format"),

  body("time")
    .optional()
    .trim()
    .matches(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/)
    .withMessage("Time must be in HH:MM format"),

  body("venue")
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage("Venue cannot exceed 300 characters"),

  body("banner")
    .optional()
    .trim()
    .isURL()
    .withMessage("Banner must be a valid URL"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];
