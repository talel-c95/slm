import express from 'express';
import { 
  getAllUsers,
  getUserById,
  updateUser,
  changePassword,
  deleteUser
} from '../controllers/users.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin only routes
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

// Protected routes (user's own profile or admin)
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.put('/:id/password', protect, changePassword);

export default router; 