import { body } from "express-validator";

export const validateNews = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("image").custom((value, { req }) => {
    // uploaded file
    if (req.file) {
      return true;
    }

    // optional
    if (!value) {
      return true;
    }

    // external URL support
    const valid = /^(https?:\/\/.*)$/i.test(value);

    if (!valid) {
      throw new Error("Invalid image URL");
    }

    return true;
  }),

  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be boolean"),
];