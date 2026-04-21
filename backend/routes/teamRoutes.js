import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getTeamMembers);
router.post('/', protect, adminOnly, createTeamMember);
router.put('/:id', protect, adminOnly, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

export default router;