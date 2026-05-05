import express from "express";

import {
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin,
} from "../controllers/newsController.js";

import { protect } from "../middleware/authMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

import { validateNews } from "../validators/newsValidator.js";

const router = express.Router();

// GET ALL
router.get("/", protect, getAllNewsAdmin);

// CREATE
router.post(
  "/",
  protect,
  upload.single("image"),
  validateNews,
  createNews
);

// UPDATE
router.put(
  "/:id",
  protect,
  upload.single("image"),
  validateNews,
  updateNews
);

// DELETE
router.delete("/:id", protect, deleteNews);

export default router;