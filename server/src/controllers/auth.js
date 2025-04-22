import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Doctor, Patient } from '../models/index.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Register a new user
export const register = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role,
      phoneNumber,
      // Doctor specific fields
      specialty,
      licenseNumber,
      // Patient specific fields
      dateOfBirth,
      bloodType
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || 'patient',
      phoneNumber
    });

    // Create role-specific record
    if (role === 'doctor') {
      if (!specialty || !licenseNumber) {
        return res.status(400).json({ message: 'Doctor must have specialty and license number' });
      }
      
      await Doctor.create({
        userId: user.id,
        specialty,
        licenseNumber
      });
    } else if (role === 'patient' || !role) {
      await Patient.create({
        userId: user.id,
        dateOfBirth: dateOfBirth || null,
        bloodType: bloodType || null
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get additional info based on role
    let additionalInfo = {};
    if (user.role === 'doctor') {
      const doctor = await Doctor.findOne({ where: { userId: user.id } });
      if (doctor) {
        additionalInfo = { doctorId: doctor.id };
      }
    } else if (user.role === 'patient') {
      const patient = await Patient.findOne({ where: { userId: user.id } });
      if (patient) {
        additionalInfo = { patientId: patient.id };
      }
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        ...additionalInfo
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });

    // Get additional info based on role
    let additionalInfo = {};
    if (user.role === 'doctor') {
      const doctor = await Doctor.findOne({ 
        where: { userId: user.id } 
      });
      if (doctor) {
        additionalInfo = { doctor };
      }
    } else if (user.role === 'patient') {
      const patient = await Patient.findOne({ 
        where: { userId: user.id } 
      });
      if (patient) {
        additionalInfo = { patient };
      }
    }

    res.json({
      user: {
        ...user.dataValues,
        ...additionalInfo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}; 