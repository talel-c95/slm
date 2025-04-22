import User from './User.js';
import Doctor from './Doctor.js';
import Patient from './Patient.js';
import Appointment from './Appointment.js';

// Define any additional associations here
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Patient.hasMany(Appointment, { foreignKey: 'patientId' });

export {
  User,
  Doctor,
  Patient,
  Appointment
}; 