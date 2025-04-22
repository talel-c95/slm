'use client';

import { useState } from 'react';
import { Calendar, Clock, FileText, Activity, ChevronRight, Bell, User, Heart, Clipboard, Globe, ChevronDown } from 'lucide-react';
import PageContainer from "./components/pagecontainer";
import { useRouter } from 'next/navigation';

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2025-04-15',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Neurologist',
    date: '2025-04-20',
    time: '02:30 PM',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300'
  }
];

const medications = [
  {
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2025-01-15',
    endDate: '2025-07-15'
  },
  {
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-02-01',
    endDate: '2025-08-01'
  }
];

const recentTests = [
  {
    name: 'Complete Blood Count',
    date: '2025-03-01',
    status: 'Completed',
    result: 'Normal'
  },
  {
    name: 'Lipid Panel',
    date: '2025-03-01',
    status: 'Completed',
    result: 'Review Required'
  },
  {
    name: 'Thyroid Function',
    date: '2025-02-15',
    status: 'Completed',
    result: 'Normal'
  }
];

// Health metrics
const healthMetrics = [
  { name: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
  { name: 'Heart Rate', value: '72 bpm', status: 'normal' },
  { name: 'Blood Glucose', value: '95 mg/dL', status: 'normal' },
  { name: 'Cholesterol', value: '180 mg/dL', status: 'warning' }
];

// Available languages
const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' }
];

export default function PatientDashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Anderson',
    height: "5'6\"",
    weight: '130 lbs',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <PageContainer title="Patient Dashboard">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10">
        <div className="relative">
          <button 
            className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm text-sm" 
            onClick={() => setShowLanguages(!showLanguages)}
          >
            <Globe className="h-4 w-4 text-blue-600" />
            {languages.find(lang => lang.code === currentLanguage)?.name}
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {showLanguages && (
            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-40 z-50">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setShowLanguages(false);
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Patient Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-xl p-6 mb-8 text-white">
        <div className="flex items-center">
          <div className="h-20 w-20 rounded-full border-4 border-white overflow-hidden">
            <img
              src={profileData.profilePhoto}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
            <div className="flex gap-8 mt-1 text-blue-100">
              <div>
                <span className="text-xs opacity-80">Height</span>
                <p>{profileData.height}</p>
              </div>
              <div>
                <span className="text-xs opacity-80">Weight</span>
                <p>{profileData.weight}</p>
              </div>
              <div>
                <span className="text-xs opacity-80">Blood Type</span>
                <p>A+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Health Metrics */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Health Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthMetrics.map((metric) => (
                <div key={metric.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <p className="text-gray-500 text-sm">{metric.name}</p>
                    <span className={`h-2 w-2 rounded-full ${
                      metric.status === 'normal' ? 'bg-green-500' : 
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></span>
                  </div>
                  <p className="text-xl font-medium mt-1">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              </div>
              <button 
                onClick={() => router.push('/dashboard/patient/appointments')} 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  {appointment.image ? (
                    <img
                      src={appointment.image}
                      alt={appointment.doctor}
                      className="h-14 w-14 rounded-full object-cover border-2 border-gray-100"
                    />
                  ) : null}
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{appointment.doctor}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-500">{appointment.time}</p>
                  </div>
                  <button 
                    className="ml-4 bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition-colors"
                    aria-label="View appointment details"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test Results */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-6">
              <Activity className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Recent Test Results</h2>
            </div>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.name} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <div>
                    <h3 className="font-medium">{test.name}</h3>
                    <p className="text-sm text-gray-500">Date: {test.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      test.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {test.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Current Medications */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Current Medications</h2>
              </div>
            </div>
            <div className="space-y-4">
              {medications.map((medication) => (
                <div key={medication.name} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                  <h3 className="font-medium">{medication.name}</h3>
                  <p className="text-sm text-gray-500">Dosage: {medication.dosage}</p>
                  <p className="text-sm text-gray-500">Frequency: {medication.frequency}</p>
                  <div className="mt-2 text-xs text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {medication.startDate} - {medication.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="ml-3">Schedule Appointment</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="ml-3">Request Medical Records</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center">
                  <Clipboard className="h-5 w-5 text-blue-600" />
                  <span className="ml-3">View Lab Results</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 text-left border rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="ml-3">Track Health Metrics</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-md p-6 border border-blue-100">
            <h2 className="text-xl font-semibold mb-4">Health Tip</h2>
            <p className="text-gray-600">Stay hydrated! Aim to drink at least 8 glasses of water daily to support your overall health and wellness.</p>
            <div className="mt-4 text-right">
              <button className="text-blue-600 text-sm font-medium">Read More Tips</button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}