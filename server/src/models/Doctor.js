import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  experience: {
    type: DataTypes.INTEGER, // years of experience
    allowNull: true
  },
  education: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  availableHours: {
    type: DataTypes.JSON, // Store availability as JSON
    allowNull: true
  },
  consultationFee: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Establish relationship with User
Doctor.belongsTo(User, { foreignKey: 'userId' });

export default Doctor; 