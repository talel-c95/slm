import { Doctor } from '../models/index.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
        }
      ]
    });

    res.json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const doctor = await Doctor.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
        }
      ]
    });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json({ doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update doctor profile
export const updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      specialty,
      licenseNumber,
      experience,
      education,
      availableHours,
      consultationFee,
      bio
    } = req.body;
    
    // Start transaction
    const transaction = await sequelize.transaction();
    
    try {
      // Find doctor
      const doctor = await Doctor.findByPk(id);
      
      if (!doctor) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      // Check authorization (only self or admin)
      if (doctor.userId !== req.user.id && req.user.role !== 'admin') {
        await transaction.rollback();
        return res.status(403).json({ message: 'Not authorized to update this profile' });
      }
      
      // Update doctor
      await doctor.update({
        specialty: specialty || doctor.specialty,
        licenseNumber: licenseNumber || doctor.licenseNumber,
        experience: experience || doctor.experience,
        education: education || doctor.education,
        availableHours: availableHours || doctor.availableHours,
        consultationFee: consultationFee || doctor.consultationFee,
        bio: bio || doctor.bio
      }, { transaction });
      
      await transaction.commit();
      
      // Get updated doctor with user details
      const updatedDoctor = await Doctor.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
          }
        ]
      });
      
      res.json({
        message: 'Doctor profile updated successfully',
        doctor: updatedDoctor
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Search doctors by specialty
export const searchDoctors = async (req, res) => {
  try {
    const { specialty } = req.query;
    
    const whereClause = {};
    if (specialty) {
      whereClause.specialty = specialty;
    }
    
    const doctors = await Doctor.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
        }
      ]
    });
    
    res.json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}; 