import express from 'express';
import { 
  getPatientById,
  updatePatientProfile,
  getAllPatients
} from '../controllers/patients.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Admin and doctor only routes
router.get('/', protect, authorize('admin', 'doctor'), getAllPatients);

// Protected routes
router.get('/:id', protect, getPatientById);
router.put('/:id', protect, updatePatientProfile);

export default router; 