import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Test endpoint to check server connection
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Auth route is working!' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router; 