import express from 'express';
import { getNews, getNewsById, incrementNewsView } from '../controllers/newsController.js';

const router = express.Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.patch("/:id/view", incrementNewsView);

export default router;