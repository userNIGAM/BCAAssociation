import express from "express";
import {
  adminRegister,
  adminLogin,
  getAdminProfile,
} from "../controllers/adminController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public (but protected with secret)
router.post("/register", adminRegister);
router.post("/login", adminLogin);

// 🔒 Protected (ADMIN ONLY)
router.get("/profile", verifyToken, isAdmin, getAdminProfile);

//me
router.get("/me", authMiddleware, (req, res) => {
   res.json({
      user: req.user
   });
});

export default router;