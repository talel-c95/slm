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
    let userId;
    
    // Check if this is a /me request or a specific user ID
    if (req.params.id) {
      userId = req.params.id;
      
      // Check authorization if requesting a specific user (not self)
      if (req.user.id.toString() !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Not authorized to access this user information' 
        });
      }
    } else {
      // /me route - use the authenticated user's ID
      userId = req.user.id;
    }
    
    const user = await User.findByPk(userId, {
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
    console.error('Error getting user:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    let userId;
    
    // Check if this is a /me request or a specific user ID
    if (req.params.id) {
      userId = req.params.id;
      
      // Check authorization (only self or admin)
      if (req.user.id.toString() !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Not authorized to update this user'
        });
      }
    } else {
      // /me route - use the authenticated user's ID
      userId = req.user.id;
    }
    
    const { 
      firstName, 
      lastName, 
      email, 
      phoneNumber,
      profileImage, 
      // Do not allow role change in basic update
      // Only admins can change roles
    } = req.body;
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user with only the fields that were provided
    const updatedFields = {};
    if (firstName !== undefined) updatedFields.firstName = firstName;
    if (lastName !== undefined) updatedFields.lastName = lastName;
    if (email !== undefined) updatedFields.email = email;
    if (phoneNumber !== undefined) updatedFields.phoneNumber = phoneNumber;
    if (profileImage !== undefined) updatedFields.profileImage = profileImage;
    
    // Only update if there are fields to update
    if (Object.keys(updatedFields).length > 0) {
      await user.update(updatedFields);
    }
    
    res.json({
      message: 'User updated successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    let userId;
    
    // Check if this is a /me request or a specific user ID
    if (req.params.id) {
      userId = req.params.id;
      
      // Check authorization (only self or admin)
      if (req.user.id.toString() !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ 
          message: 'Not authorized to change this user\'s password' 
        });
      }
    } else {
      // /me route - use the authenticated user's ID
      userId = req.user.id;
    }
    
    const { currentPassword, newPassword } = req.body;
    
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ 
        message: 'New password is required and must be at least 6 characters'
      });
    }
    
    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password (not needed for admin)
    if (req.user.id.toString() === userId) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      
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
    console.error('Error changing password:', error);
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
    console.log('Delete user request received');
    console.log('Request URL:', req.originalUrl);
    console.log('Request method:', req.method);
    console.log('Request user:', req.user ? { id: req.user.id, role: req.user.role, email: req.user.email } : 'No user');
    console.log('Request params:', req.params);
    console.log('Request path:', req.path);
    
    // Check if req.user exists at all
    if (!req.user) {
      console.error('ERROR: req.user is undefined or null');
      return res.status(401).json({ message: 'Authentication failed - no user found in request' });
    }
    
    // Check if this is a self-deletion (via /me route) or admin deleting another user
    if (req.originalUrl.includes('/me') || req.path === '/me') {
      // Self-deletion - use the authenticated user's ID
      userId = req.user.id;
      console.log('Self-deletion path detected - using authenticated userId:', userId);
    } else if (req.params.id) {
      // Admin deleting a user
      userId = req.params.id;
      console.log('Admin delete path - target userId:', userId);
      
      // Verify admin is authorized - additional safety check
      if (req.user.role !== 'admin') {
        console.log('Authorization failed: User role is not admin');
        return res.status(403).json({ 
          message: `User role ${req.user.role} is not authorized to delete other users` 
        });
      }
    } else {
      console.log('No userId found in request');
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    // Make sure userId is valid
    if (!userId) {
      console.error('ERROR: userId is undefined or null after checks');
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    // Get the user record
    console.log('Searching for user with ID:', userId);
    const user = await User.findByPk(userId);
    if (!user) {
      console.log('User not found for ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Found user to delete:', { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    
    // Delete associated role-specific record
    if (user.role === 'doctor') {
      console.log('Deleting doctor record for userId:', userId);
      await Doctor.destroy({ where: { userId } });
      console.log('Doctor record deleted');
    } else if (user.role === 'patient') {
      console.log('Deleting patient record for userId:', userId);
      await Patient.destroy({ where: { userId } });
      console.log('Patient record deleted');
    }
    
    // Delete user
    await user.destroy();
    console.log('User deleted successfully:', userId);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser controller:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
}; 