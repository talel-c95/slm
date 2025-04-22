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

// Debug middleware for /me route
router.use('/me', (req, res, next) => {
  console.log('DEBUG - /me route accessed:', req.method);
  console.log('User from token:', req.user ? { id: req.user.id, role: req.user.role } : 'No user in request');
  console.log('Headers:', JSON.stringify(req.headers));
  
  // For DELETE requests specifically, add more debugging
  if (req.method === 'DELETE') {
    console.log('DELETE /me route accessed - FULL DEBUG');
    console.log('Request headers:', req.headers);
    console.log('Authorization header:', req.headers.authorization);
    console.log('Request body:', req.body);
    console.log('Original URL:', req.originalUrl);
    console.log('Base URL:', req.baseUrl);
    console.log('Path:', req.path);
  }
  
  next();
});

// Admin only routes
router.get('/', protect, authorize('admin'), getAllUsers);

// User routes - accessible to the user themselves
router.get('/me', protect, getUserById);
router.put('/me', protect, updateUser);
router.put('/me/password', protect, changePassword);

// Allow users to delete their own account - no role restriction needed
router.delete('/me', protect, deleteUser);

// Admin route to delete any user by ID
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router; 