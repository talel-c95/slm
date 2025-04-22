'use client';

import { useState } from 'react';
import { FiCalendar, FiCheck, FiX, FiAlertCircle, FiFileText, FiEye } from 'react-icons/fi';

// Dummy medical record data
const medicalRecords = [
  {
    id: 1,
    date: 'May 15, 2023',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    diagnosis: 'Hypertension',
    treatment: 'Prescribed Lisinopril 10mg daily',
    notes: 'Follow-up in 3 months, maintain low sodium diet',
    status: 'approved',
    documents: [
      { id: 1, name: 'Blood Test Results.pdf', type: 'PDF' },
      { id: 2, name: 'ECG Report.pdf', type: 'PDF' }
    ]
  },
  {
    id: 2,
    date: 'March 3, 2023',
    doctor: 'Dr. Ahmed Mansour',
    specialty: 'Dermatology',
    diagnosis: 'Eczema',
    treatment: 'Prescribed hydrocortisone cream',
    notes: 'Avoid hot water, use gentle soap, moisturize regularly',
    status: 'approved',
    documents: [
      { id: 3, name: 'Skin Exam Photos.jpg', type: 'Image' }
    ]
  },
  {
    id: 3,
    date: 'June 10, 2023',
    doctor: 'Dr. Fatima Zouari',
    specialty: 'Pulmonology',
    diagnosis: 'Mild Asthma',
    treatment: 'Prescribed albuterol inhaler as needed',
    notes: 'Avoid triggers, monitor peak flow readings',
    status: 'pending',
    documents: [
      { id: 4, name: 'Lung Function Test.pdf', type: 'PDF' },
      { id: 5, name: 'Chest X-Ray.pdf', type: 'PDF' }
    ]
  }
];

export default function MedicalHistory() {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Medical History</h1>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#007E85]">
          <p className="text-gray-500">Total Records</p>
          <p className="text-2xl font-bold">{medicalRecords.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-gray-500">Approved Records</p>
          <p className="text-2xl font-bold">
            {medicalRecords.filter(record => record.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <p className="text-gray-500">Pending Approval</p>
          <p className="text-2xl font-bold">
            {medicalRecords.filter(record => record.status === 'pending').length}
          </p>
        </div>
      </div>
      
      {/* Medical Records List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b font-medium flex items-center">
          <div className="w-1/6">Date</div>
          <div className="w-1/6">Doctor</div>
          <div className="w-1/6">Specialty</div>
          <div className="w-2/6">Diagnosis</div>
          <div className="w-1/6">Status</div>
        </div>
        
        {medicalRecords.map((record) => (
          <div 
            key={record.id} 
            className="p-4 border-b hover:bg-gray-50 transition-colors flex items-center cursor-pointer"
            onClick={() => setSelectedRecord(record)}
          >
            <div className="w-1/6 flex items-center">
              <FiCalendar className="mr-2 text-gray-400" />
              {record.date}
            </div>
            <div className="w-1/6">{record.doctor}</div>
            <div className="w-1/6 text-[#007E85]">{record.specialty}</div>
            <div className="w-2/6">{record.diagnosis}</div>
            <div className="w-1/6">
              {record.status === 'approved' ? (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
                  <FiCheck className="mr-1" /> Approved
                </span>
              ) : (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit">
                  <FiAlertCircle className="mr-1" /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">Medical Record Details</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedRecord(null)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedRecord.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doctor</p>
                  <p className="font-medium">{selectedRecord.doctor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialty</p>
                  <p className="font-medium text-[#007E85]">{selectedRecord.specialty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  {selectedRecord.status === 'approved' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center w-fit">
                      <FiCheck className="mr-1" /> Approved
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center w-fit">
                      <FiAlertCircle className="mr-1" /> Pending
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                <p className="font-medium">{selectedRecord.diagnosis}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Treatment</p>
                <p>{selectedRecord.treatment}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Doctor's Notes</p>
                <p>{selectedRecord.notes}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Documents</p>
                <div className="space-y-2">
                  {selectedRecord.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <FiFileText className="mr-2 text-[#007E85]" />
                        <span>{doc.name}</span>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <FiEye className="text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedRecord.status === 'pending' && (
                <div className="flex justify-end gap-3 border-t pt-4">
                  <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center">
                    <FiX className="mr-2" /> Reject Changes
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center">
                    <FiCheck className="mr-2" /> Approve
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
