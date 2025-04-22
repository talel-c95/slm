'use client';

import { useState } from 'react';
import { FiCalendar, FiDownload, FiEye, FiPrinter, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';

// Dummy prescription data
const prescriptions = [
  {
    id: 1,
    date: 'June 15, 2023',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '3 months' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', duration: '3 months' }
    ],
    instructions: 'Take with food in the morning. Avoid grapefruit juice while on Lisinopril.',
    qrCode: '/image/qr-placeholder.png',
    signature: '/image/signature-placeholder.png',
    verified: true
  },
  {
    id: 2,
    date: 'April 20, 2023',
    doctor: 'Dr. Ahmed Mansour',
    specialty: 'Dermatology',
    medications: [
      { name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', duration: '2 weeks' }
    ],
    instructions: 'Apply a thin layer to affected areas. Do not use on open wounds.',
    qrCode: '/image/qr-placeholder.png',
    signature: '/image/signature-placeholder.png',
    verified: true
  },
  {
    id: 3,
    date: 'June 10, 2023',
    doctor: 'Dr. Fatima Zouari',
    specialty: 'Pulmonology',
    medications: [
      { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: 'As needed', duration: 'As needed' },
      { name: 'Montelukast', dosage: '10mg', frequency: 'Once daily at bedtime', duration: '1 month' }
    ],
    instructions: 'Use inhaler as needed for shortness of breath. Take Montelukast at night.',
    qrCode: '/image/qr-placeholder.png',
    signature: '/image/signature-placeholder.png',
    verified: false
  }
];

export default function Prescriptions() {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredPrescriptions = filter === 'all' 
    ? prescriptions 
    : filter === 'verified' 
      ? prescriptions.filter(p => p.verified) 
      : prescriptions.filter(p => !p.verified);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Prescriptions</h1>
      
      {/* Filter Options */}
      <div className="mb-6 flex gap-2">
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-[#007E85] text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'verified' ? 'bg-[#007E85] text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('verified')}
        >
          Verified
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${filter === 'unverified' ? 'bg-[#007E85] text-white' : 'bg-gray-100'}`}
          onClick={() => setFilter('unverified')}
        >
          Unverified
        </button>
      </div>
      
      {/* Prescriptions List */}
      {filteredPrescriptions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No prescriptions found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <div 
              key={prescription.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPrescription(prescription)}
            >
              <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center mb-2 md:mb-0">
                  <div className="p-2 rounded-full bg-[#007E85]/10 mr-3">
                    <FiCalendar className="text-[#007E85]" />
                  </div>
                  <div>
                    <p className="font-medium">{prescription.date}</p>
                    <p className="text-sm text-gray-500">{prescription.doctor} - {prescription.specialty}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  {prescription.verified ? (
                    <span className="flex items-center text-green-600 text-sm">
                      <FiCheckCircle className="mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600 text-sm">
                      Waiting for verification
                    </span>
                  )}
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                    <FiEye />
                  </button>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {prescription.medications.length} medication{prescription.medications.length !== 1 ? 's' : ''}
                </p>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <FiPrinter size={18} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <FiDownload size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Prescription Details</h2>
                  <p className="text-gray-500">Issued on {selectedPrescription.date}</p>
                </div>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedPrescription(null)}
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Doctor</p>
                    <p className="font-medium">{selectedPrescription.doctor}</p>
                    <p className="text-sm text-[#007E85]">{selectedPrescription.specialty}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    {selectedPrescription.verified ? (
                      <span className="flex items-center text-green-600">
                        <FiCheckCircle className="mr-1" /> Verified
                      </span>
                    ) : (
                      <span className="text-yellow-600">
                        Waiting for verification
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Medications</h3>
                <div className="space-y-3">
                  {selectedPrescription.medications.map((med, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium">{med.name} - {med.dosage}</p>
                      <p className="text-sm text-gray-600">
                        {med.frequency} | Duration: {med.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">Instructions</h3>
                <p className="bg-yellow-50 p-3 rounded-lg text-gray-700">
                  {selectedPrescription.instructions}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-bold mb-2">Verification QR Code</h3>
                  <div className="border p-4 rounded-lg flex justify-center">
                    <div className="relative w-32 h-32">
                      <Image
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExamplePrescriptionCode"
                        alt="QR Code"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Doctor's Signature</h3>
                  <div className="border p-4 rounded-lg flex justify-center">
                    <div className="relative w-full h-20">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Example_image_signature.svg/800px-Example_image_signature.svg.png"
                        alt="Doctor's Signature"
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                  <FiPrinter className="mr-2" /> Print
                </button>
                <button className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center">
                  <FiDownload className="mr-2" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
