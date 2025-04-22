import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes
export const protect = async (req, res, next) => {
  console.log('Auth middleware - Checking authorization');
  console.log('Method:', req.method, 'URL:', req.originalUrl);
  
  try {
    let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token extracted from headers (first 15 chars):', token.substring(0, 15) + '...');
    }
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
    
    try {
      // Verify token
      console.log('Attempting to verify token with JWT_SECRET');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, user ID:', decoded.id);
      
      // Get user from token
      console.log('Looking up user with ID:', decoded.id);
      const user = await User.findByPk(decoded.id);
      
      if (!user) {
        console.log('User not found for ID:', decoded.id);
        return res.status(401).json({ message: 'User not found' });
      }
      
      console.log('User found:', { id: user.id, role: user.role });
      
      // Add user to request object
      req.user = user;
      next();
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError);
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to restrict access based on roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log('Role check:', { userRole: req.user.role, allowedRoles: roles });
    
    if (!roles.includes(req.user.role)) {
      console.log('Role not authorized:', req.user.role);
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this resource` 
      });
    }
    
    console.log('Role authorized:', req.user.role);
    next();
  };
}; 