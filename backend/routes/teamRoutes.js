import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';

import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import {upload} from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.get('/', getTeamMembers);

// 👇 add multer here
router.post('/', protect, adminOnly, upload.single('image'), createTeamMember);

router.put('/:id', protect, adminOnly, upload.single('image'), updateTeamMember);

router.delete('/:id', protect, adminOnly, deleteTeamMember);

export default router;