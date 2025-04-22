import { Patient } from '../models/index.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

// Get patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const patient = await Patient.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
        }
      ]
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Check authorization (only self, assigned doctor, or admin)
    if (
      patient.User.id !== req.user.id && 
      req.user.role !== 'admin' && 
      !(req.user.role === 'doctor')
    ) {
      return res.status(403).json({ message: 'Not authorized to view this patient' });
    }
    
    res.json({ patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update patient profile
export const updatePatientProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      dateOfBirth,
      bloodType,
      allergies,
      medicalHistory,
      address,
      emergencyContact
    } = req.body;
    
    // Start transaction
    const transaction = await sequelize.transaction();
    
    try {
      // Find patient
      const patient = await Patient.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id']
          }
        ]
      });
      
      if (!patient) {
        await transaction.rollback();
        return res.status(404).json({ message: 'Patient not found' });
      }
      
      // Check authorization (only self or admin)
      if (patient.User.id !== req.user.id && req.user.role !== 'admin') {
        await transaction.rollback();
        return res.status(403).json({ message: 'Not authorized to update this profile' });
      }
      
      // Update patient
      await patient.update({
        dateOfBirth: dateOfBirth || patient.dateOfBirth,
        bloodType: bloodType || patient.bloodType,
        allergies: allergies || patient.allergies,
        medicalHistory: medicalHistory || patient.medicalHistory,
        address: address || patient.address,
        emergencyContact: emergencyContact || patient.emergencyContact
      }, { transaction });
      
      await transaction.commit();
      
      // Get updated patient with user details
      const updatedPatient = await Patient.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
          }
        ]
      });
      
      res.json({
        message: 'Patient profile updated successfully',
        patient: updatedPatient
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

// Get all patients (admin and doctors only)
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'profileImage']
        }
      ]
    });

    res.json({ patients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}; 