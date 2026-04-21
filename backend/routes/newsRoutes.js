import express from 'express';
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', protect, adminOnly, createNews);
router.put('/:id', protect, adminOnly, updateNews);
router.delete('/:id', protect, adminOnly, deleteNews);

export default router;