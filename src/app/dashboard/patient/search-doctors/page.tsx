'use client';

import { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiCalendar, FiStar } from 'react-icons/fi';

const specialties = [
  'General Medicine', 'Cardiology', 'Dermatology', 'Orthopedics', 
  'Pediatrics', 'Neurology', 'Psychiatry', 'Gynecology', 'Ophthalmology'
];

const regions = [
  'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 
  'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana', 'Sousse'
];

// Dummy doctor data for UI demonstration
const dummyDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    region: 'Tunis',
    address: '123 Medical Center, Tunis',
    rating: 4.9,
    reviews: 127,
    available: '10:00 AM - 4:00 PM',
    nextAvailable: 'Today',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: 2,
    name: 'Dr. Ahmed Mansour',
    specialty: 'Dermatology',
    region: 'Ariana',
    address: '45 Healthcare Blvd, Ariana',
    rating: 4.7,
    reviews: 93,
    available: '9:00 AM - 5:00 PM',
    nextAvailable: 'Tomorrow',
    image: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 3,
    name: 'Dr. Fatima Zouari',
    specialty: 'Pediatrics',
    region: 'Sousse',
    address: '78 Children's Health St, Sousse',
    rating: 4.8,
    reviews: 145,
    available: '8:30 AM - 3:30 PM',
    nextAvailable: 'Today',
    image: 'https://randomuser.me/api/portraits/women/45.jpg'
  }
];

export default function SearchDoctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Find a Doctor</h1>
      
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter size={20} />
          <span>Filters</span>
        </button>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialty
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              <option value="">All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
            >
              <option value="">Any Time</option>
              <option value="today">Available Today</option>
              <option value="week">Available This Week</option>
              <option value="weekend">Available This Weekend</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Results */}
      <div className="space-y-6">
        {dummyDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Doctor Image */}
              <div className="w-full md:w-1/4 p-4 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#007E85]/20">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Doctor Details */}
              <div className="w-full md:w-2/4 p-4 border-t md:border-t-0 md:border-l border-r md:border-r-0 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-[#007E85] font-medium">{doctor.specialty}</p>
                
                <div className="mt-3 flex items-center text-gray-600">
                  <FiMapPin className="mr-2" />
                  <span>{doctor.address}</span>
                </div>
                
                <div className="mt-2 flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />
                  <span>Available: {doctor.available}</span>
                </div>
                
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{doctor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">{doctor.reviews} reviews</span>
                </div>
              </div>
              
              {/* Book Appointment */}
              <div className="w-full md:w-1/4 p-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-200">
                <span className="text-green-600 font-medium mb-2">
                  Next Available: {doctor.nextAvailable}
                </span>
                <button className="w-full py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors">
                  Book Appointment
                </button>
                <button className="w-full mt-2 py-2 border border-[#007E85] text-[#007E85] rounded-lg hover:bg-[#007E85]/10 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 