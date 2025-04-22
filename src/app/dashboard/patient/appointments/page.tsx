'use client';

import { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiUser, FiDollarSign, FiPlus, FiCheck, FiX } from 'react-icons/fi';

// Dummy appointment data
const appointments = [
  {
    id: 1,
    doctor: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    date: '2023-07-20',
    time: '10:00 AM',
    duration: '30 minutes',
    location: 'Medical Center, 123 Health St, Tunis',
    price: 120,
    status: 'upcoming',
    isPaid: true,
    notes: 'Regular check-up for blood pressure and heart rate monitoring.'
  },
  {
    id: 2,
    doctor: {
      name: 'Dr. Ahmed Mansour',
      specialty: 'Dermatology',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    date: '2023-06-15',
    time: '2:30 PM',
    duration: '45 minutes',
    location: 'Skin Care Clinic, 45 Medical Blvd, Ariana',
    price: 150,
    status: 'completed',
    isPaid: true,
    notes: 'Follow-up on skin condition treatment.'
  },
  {
    id: 3,
    doctor: {
      name: 'Dr. Fatima Zouari',
      specialty: 'Pulmonology',
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    date: '2023-06-05',
    time: '11:15 AM',
    duration: '60 minutes',
    location: 'Respiratory Clinic, 78 Lung Health Ave, Sousse',
    price: 200,
    status: 'cancelled',
    isPaid: false,
    notes: 'Consultation for breathing difficulties and possible asthma.'
  }
];

// Dummy available doctors
const availableDoctors = [
  {
    id: 101,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    availableDates: [
      { date: '2023-07-25', slots: ['9:00 AM', '11:30 AM', '2:00 PM'] },
      { date: '2023-07-26', slots: ['10:00 AM', '1:30 PM', '4:00 PM'] },
      { date: '2023-07-27', slots: ['9:30 AM', '12:00 PM', '3:30 PM'] }
    ],
    price: 120
  },
  {
    id: 102,
    name: 'Dr. Ahmed Mansour',
    specialty: 'Dermatology',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    availableDates: [
      { date: '2023-07-24', slots: ['8:30 AM', '10:30 AM', '3:00 PM'] },
      { date: '2023-07-25', slots: ['9:00 AM', '12:30 PM', '2:30 PM'] },
      { date: '2023-07-28', slots: ['11:00 AM', '1:00 PM', '4:30 PM'] }
    ],
    price: 150
  },
  {
    id: 103,
    name: 'Dr. Fatima Zouari',
    specialty: 'Pulmonology',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    availableDates: [
      { date: '2023-07-24', slots: ['10:00 AM', '1:00 PM', '3:30 PM'] },
      { date: '2023-07-26', slots: ['9:30 AM', '11:30 AM', '2:00 PM'] },
      { date: '2023-07-29', slots: ['8:30 AM', '12:30 PM', '3:00 PM'] }
    ],
    price: 200
  }
];

export default function Appointments() {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Booking states
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const filteredAppointments = appointments.filter(app => {
    if (selectedTab === 'upcoming') return app.status === 'upcoming';
    if (selectedTab === 'past') return app.status === 'completed';
    if (selectedTab === 'cancelled') return app.status === 'cancelled';
    return true;
  });
  
  const availableSlotsForSelectedDate = selectedDoctor?.availableDates.find(
    d => d.date === selectedDate
  )?.slots || [];
  
  const resetBookingForm = () => {
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  const openBookingModal = () => {
    resetBookingForm();
    setShowBookingModal(true);
  };
  
  const handleBookAppointment = () => {
    // In a real app, this would send the booking data to the backend
    alert('Appointment booked successfully!');
    setShowBookingModal(false);
    resetBookingForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <button 
          className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center"
          onClick={openBookingModal}
        >
          <FiPlus className="mr-2" /> Book New Appointment
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${selectedTab === 'upcoming' ? 'text-[#007E85] border-b-2 border-[#007E85]' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedTab === 'past' ? 'text-[#007E85] border-b-2 border-[#007E85]' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('past')}
        >
          Past
        </button>
        <button 
          className={`px-4 py-2 font-medium ${selectedTab === 'cancelled' ? 'text-[#007E85] border-b-2 border-[#007E85]' : 'text-gray-500'}`}
          onClick={() => setSelectedTab('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {selectedTab} appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => setSelectedAppointment(appointment)}
            >
              <div className="p-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div className="md:col-span-2 flex items-center">
                  <img
                    src={appointment.doctor.avatar}
                    alt={appointment.doctor.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{appointment.doctor.name}</h3>
                    <p className="text-sm text-[#007E85]">{appointment.doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiCalendar className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-500">{appointment.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FiClock className="text-gray-400 mr-2" />
                  <p className="text-sm">{appointment.duration}</p>
                </div>
                
                <div className="hidden md:flex items-center">
                  <FiDollarSign className="text-gray-400 mr-2" />
                  <p className="text-sm">${appointment.price}</p>
                </div>
                
                <div>
                  {appointment.status === 'upcoming' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Upcoming
                    </span>
                  )}
                  {appointment.status === 'completed' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  )}
                  {appointment.status === 'cancelled' && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                <div className="flex items-center">
                  <FiMapPin className="text-gray-400 mr-2" />
                  <p className="text-sm text-gray-600 truncate">{appointment.location}</p>
                </div>
                
                {appointment.status === 'upcoming' && (
                  <div>
                    <button className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors text-sm">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">Book New Appointment</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowBookingModal(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Select a Doctor</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableDoctors.map((doctor) => (
                    <div 
                      key={doctor.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedDoctor?.id === doctor.id ? 'border-[#007E85] bg-[#007E85]/5' : 'hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={doctor.avatar}
                          alt={doctor.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-[#007E85]">{doctor.specialty}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Fee: ${doctor.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedDoctor && (
                <>
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Select a Date</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedDoctor.availableDates.map((dateObj, index) => (
                        <div 
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedDate === dateObj.date ? 'border-[#007E85] bg-[#007E85]/5' : 'hover:border-gray-400'
                          }`}
                          onClick={() => {
                            setSelectedDate(dateObj.date);
                            setSelectedTime('');
                          }}
                        >
                          <p className="font-medium">
                            {new Date(dateObj.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-sm text-gray-600">{dateObj.slots.length} time slots available</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-2">Select a Time</h3>
                      <div className="flex flex-wrap gap-3">
                        {availableSlotsForSelectedDate.map((slot, index) => (
                          <button
                            key={index}
                            className={`py-2 px-4 border rounded-lg transition-colors ${
                              selectedTime === slot ? 'border-[#007E85] bg-[#007E85]/5 text-[#007E85]' : 'hover:border-gray-400'
                            }`}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className={`px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center ${
                    !(selectedDoctor && selectedDate && selectedTime) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!(selectedDoctor && selectedDate && selectedTime)}
                  onClick={handleBookAppointment}
                >
                  <FiCheck className="mr-2" /> Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
                  <p className="text-gray-500">
                    {new Date(selectedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedAppointment(null)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <img
                    src={selectedAppointment.doctor.avatar}
                    alt={selectedAppointment.doctor.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium text-lg">{selectedAppointment.doctor.name}</h3>
                    <p className="text-[#007E85]">{selectedAppointment.doctor.specialty}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {new Date(selectedAppointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="font-medium">{selectedAppointment.time} ({selectedAppointment.duration})</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedAppointment.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    {selectedAppointment.status === 'upcoming' && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Upcoming
                      </span>
                    )}
                    {selectedAppointment.status === 'completed' && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    )}
                    {selectedAppointment.status === 'cancelled' && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-700 p-3 bg-gray-50 rounded-lg">
                  {selectedAppointment.notes}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="text-xl font-bold">${selectedAppointment.price}</p>
                  {selectedAppointment.isPaid ? (
                    <span className="text-xs text-green-600 font-medium">Paid</span>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">Unpaid</span>
                  )}
                </div>
                
                {selectedAppointment.status === 'upcoming' && (
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      Cancel Appointment
                    </button>
                    <button className="px-4 py-2 border border-[#007E85] text-[#007E85] rounded-lg hover:bg-[#007E85]/10 transition-colors">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
