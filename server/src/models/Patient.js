import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
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
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  bloodType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  allergies: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  emergencyContact: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Establish relationship with User
Patient.belongsTo(User, { foreignKey: 'userId' });

export default Patient; 