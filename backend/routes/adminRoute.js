import express from "express";
import { registerAdmin, loginAdmin, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public (but protected with secret)
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected (ADMIN ONLY)
router.get("/profile", protect, adminOnly, getProfile);

export default router;