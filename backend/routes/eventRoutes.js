import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { validateEvent } from '../validators/eventValidator.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', protect, adminOnly, validateEvent, createEvent);
router.put('/:id', protect, adminOnly, validateEvent, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;