import express from 'express';
import {
  getMessages,
  createMessage,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { contactLimiter } from '../middleware/rateLimitMiddleware.js';
import { validateMessage } from '../validators/messageValidator.js';

const router = express.Router();

router.get('/', protect, adminOnly, getMessages);
router.post('/', contactLimiter, validateMessage, createMessage);
router.put('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;