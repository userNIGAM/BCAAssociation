import express from "express";
import { registerTeam } from "../controllers/teamController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { adminLogin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", verifyToken, isAdmin, registerTeam);
router.post("/lgoin", verifyToken, isAdmin, adminLogin)

export default router;