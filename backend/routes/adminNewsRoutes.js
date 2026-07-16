import express from "express";

import {
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin,
} from "../controllers/newsController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

import { validateNews } from "../validators/newsValidator.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

// GET ALL - Admin only
router.get("/", protect, adminOnly, getAllNewsAdmin);

// CREATE - Admin only
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  validateNews,
  handleValidationErrors,
  createNews
);

// UPDATE - Admin only
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  validateNews,
  handleValidationErrors,
  updateNews
);

// DELETE - Admin only
router.delete("/:id", protect, adminOnly, deleteNews);

export default router;