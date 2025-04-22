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

// User routes
router.get('/me', protect, getUserById);
router.put('/me', protect, updateUser);
router.put('/me/password', protect, changePassword);

// Allow users to delete their own account
router.delete('/me', protect, deleteUser);

export default router; 