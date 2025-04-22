import express from 'express';
import { 
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
  searchDoctors
} from '../controllers/doctors.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllDoctors);
router.get('/search', searchDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.put('/:id', protect, updateDoctorProfile);

export default router; 