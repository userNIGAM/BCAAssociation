import express from 'express';
import {
  createNews,
  updateNews,
  deleteNews,
  getAllNewsAdmin
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { validateNews } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly); // Protect all admin routes

router.get('/', getAllNewsAdmin);
router.post('/', validateNews, createNews);
router.put('/:id', validateNews, updateNews);
router.delete('/:id', deleteNews);

export default router;