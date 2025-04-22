"use client";

import { useState } from "react";
import { FiSearch, FiFilter, FiUser, FiCalendar, FiFileText, FiMessageSquare, FiClock, FiPlus } from "react-icons/fi";
import Link from "next/link";

// Dummy patient data
const patients = [
  {
    id: 1,
    name: "Ahmed Ben Ali",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    age: 45,
    gender: "Male",
    phone: "+216 22 123 456",
    email: "ahmed.benali@example.com",
    lastVisit: "2023-06-10",
    nextAppointment: "2023-07-15",
    diagnosis: "Hypertension, Type 2 Diabetes",
    status: "Regular"
  },
  {
    id: 2,
    name: "Fatima Mansouri",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    age: 35,
    gender: "Female",
    phone: "+216 26 789 123",
    email: "fatima.m@example.com",
    lastVisit: "2023-06-18",
    nextAppointment: "2023-07-20",
    diagnosis: "Asthma",
    status: "Regular"
  },
  {
    id: 3,
    name: "Mohamed Karim",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    age: 28,
    gender: "Male",
    phone: "+216 55 456 789",
    email: "mohamed.k@example.com",
    lastVisit: "2023-05-25",
    nextAppointment: null,
    diagnosis: "Seasonal allergies",
    status: "Inactive"
  },
  {
    id: 4,
    name: "Lina Hakim",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    age: 52,
    gender: "Female",
    phone: "+216 98 234 567",
    email: "lina.h@example.com",
    lastVisit: "2023-06-22",
    nextAppointment: "2023-07-05",
    diagnosis: "Rheumatoid arthritis",
    status: "Regular"
  },
  {
    id: 5,
    name: "Youssef Trabelsi",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    age: 39,
    gender: "Male",
    phone: "+216 27 345 678",
    email: "youssef.t@example.com",
    lastVisit: "2023-06-05",
    nextAppointment: "2023-08-10",
    diagnosis: "Chronic back pain",
    status: "Regular"
  }
];

export default function PatientsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Filter patients based on search term and status
  const filteredPatients = patients.filter(patient => {
    const matchSearch = 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = 
      selectedStatus === "all" || 
      patient.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchSearch && matchStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Patients Management</h1>
        
        <button className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center">
          <FiPlus className="mr-2" /> Add New Patient
        </button>
      </div>
      
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search patients by name, diagnosis, or email..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div>
          <button
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Patient Status</p>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${selectedStatus === "all" ? "bg-[#007E85] text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedStatus("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${selectedStatus === "regular" ? "bg-[#007E85] text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedStatus("regular")}
                >
                  Regular
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${selectedStatus === "inactive" ? "bg-[#007E85] text-white" : "bg-gray-200 text-gray-700"}`}
                  onClick={() => setSelectedStatus("inactive")}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Patients Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={patient.avatar} alt={patient.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} yrs • {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.phone}</div>
                    <div className="text-sm text-gray-500">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(patient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.nextAppointment ? 
                        new Date(patient.nextAppointment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
                        <span className="text-gray-500">No upcoming appointment</span>
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{patient.diagnosis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === "Regular" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        className="p-1 text-gray-600 hover:text-[#007E85]"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <FiUser size={18} />
                      </button>
                      <Link href={`/dashboard/doctor/patients/${patient.id}/records`} passHref>
                        <span className="p-1 text-gray-600 hover:text-[#007E85]">
                          <FiFileText size={18} />
                        </span>
                      </Link>
                      <Link href={`/dashboard/doctor/calendar?patient=${patient.id}`} passHref>
                        <span className="p-1 text-gray-600 hover:text-[#007E85]">
                          <FiCalendar size={18} />
                        </span>
                      </Link>
                      <Link href={`/dashboard/doctor/messages?patient=${patient.id}`} passHref>
                        <span className="p-1 text-gray-600 hover:text-[#007E85]">
                          <FiMessageSquare size={18} />
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">Patient Details</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedPatient(null)}
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <img 
                    src={selectedPatient.avatar} 
                    alt={selectedPatient.name} 
                    className="w-32 h-32 rounded-full object-cover mb-4" 
                  />
                  <h3 className="text-lg font-medium text-center">{selectedPatient.name}</h3>
                  <p className="text-gray-500 text-center">{selectedPatient.age} yrs • {selectedPatient.gender}</p>
                  
                  <div className="mt-4 w-full space-y-2">
                    <button className="w-full py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors">
                      New Appointment
                    </button>
                    <button className="w-full py-2 border border-[#007E85] text-[#007E85] rounded-lg hover:bg-[#007E85]/10 transition-colors">
                      Create Medical Record
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{selectedPatient.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedPatient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Visit</p>
                      <p className="font-medium">
                        {new Date(selectedPatient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Appointment</p>
                      <p className="font-medium">
                        {selectedPatient.nextAppointment ? 
                          new Date(selectedPatient.nextAppointment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
                          'No upcoming appointment'
                        }
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className="font-medium">{selectedPatient.diagnosis}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link href={`/dashboard/doctor/patients/${selectedPatient.id}/records`} passHref>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                        <FiFileText className="mr-2" /> Medical Records
                      </span>
                    </Link>
                    <Link href={`/dashboard/doctor/calendar?patient=${selectedPatient.id}`} passHref>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                        <FiCalendar className="mr-2" /> Appointments
                      </span>
                    </Link>
                    <Link href={`/dashboard/doctor/history?patient=${selectedPatient.id}`} passHref>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                        <FiClock className="mr-2" /> History
                      </span>
                    </Link>
                    <Link href={`/dashboard/doctor/messages?patient=${selectedPatient.id}`} passHref>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                        <FiMessageSquare className="mr-2" /> Messages
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
