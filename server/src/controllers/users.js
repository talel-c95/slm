import User from '../models/User.js';
import { Doctor, Patient } from '../models/index.js';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get role-specific information
    let additionalInfo = {};
    if (user.role === 'doctor') {
      const doctor = await Doctor.findOne({ where: { userId: user.id } });
      if (doctor) {
        additionalInfo = { doctor };
      }
    } else if (user.role === 'patient') {
      const patient = await Patient.findOne({ where: { userId: user.id } });
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

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber,
      // Do not allow role change in basic update
      // Only admins can change roles
    } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check authorization (only self or admin)
    if (req.user.id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }
    
    // Update user
    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      phoneNumber: phoneNumber || user.phoneNumber
    });
    
    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber
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

// Change password
export const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check authorization (only self or admin)
    if (req.user.id.toString() !== id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change this user\'s password' });
    }
    
    // Verify current password (not needed for admin)
    if (req.user.id.toString() === id) {
      const isMatch = await user.checkPassword(currentPassword);
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Delete user (admin or self-deletion)
export const deleteUser = async (req, res) => {
  try {
    let userId;
    
    // Check if this is a self-deletion or admin deleting another user
    if (req.params.id) {
      // Admin deleting a user
      userId = req.params.id;
      
      // Check if user to delete exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    } else {
      // Self-deletion - use the authenticated user's ID
      userId = req.user.id;
    }
    
    // Get the user record
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete associated role-specific record
    if (user.role === 'doctor') {
      await Doctor.destroy({ where: { userId } });
    } else if (user.role === 'patient') {
      await Patient.destroy({ where: { userId } });
    }
    
    // Delete user
    await user.destroy();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}; 