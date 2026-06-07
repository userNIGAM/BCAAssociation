import express from 'express';
import { registerAdmin, loginAdmin, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Public (but protected with secret) - Apply rate limiting
router.post('/register', authLimiter, registerAdmin);
router.post('/login', authLimiter, loginAdmin);

// Protected (ADMIN ONLY)
router.get('/profile', protect, adminOnly, getProfile);

export default router;