import express from 'express';
import { registerAdmin, loginAdmin, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';
import { validateRegisterAdmin, validateLoginAdmin } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', authLimiter, validateRegisterAdmin, handleValidationErrors, registerAdmin);
router.post('/login', authLimiter, validateLoginAdmin, handleValidationErrors, loginAdmin);
router.get('/profile', protect, adminOnly, getProfile);

export default router;