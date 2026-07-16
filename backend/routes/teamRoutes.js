import express from 'express';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';

import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateTeamMember } from '../validators/teamValidator.js';

const router = express.Router();

router.get("/:id", (req, res) => {
  res.json({
    success: true,
    id: req.params.id
  });
});
router.put("/:id", (req, res, next) => {
  console.log("PUT route reached");
  next();
}),
router.get('/', getTeamMembers);

// Admin routes with validation
router.post('/', protect, adminOnly, upload.single('image'), validateTeamMember, createTeamMember);
router.put('/:id', protect, adminOnly, upload.single('image'), validateTeamMember, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

export default router;