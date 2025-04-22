'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiFilter, FiDownload, FiEdit3, FiTrash2, FiEye, FiX } from 'react-icons/fi';
import Link from 'next/link';

// Dummy data for medical records
const medicalRecordsData = [
  {
    id: 1,
    patientName: 'Ahmed Ben Ali',
    patientId: 'P10045',
    recordType: 'Consultation',
    createdDate: '2023-06-10',
    lastUpdated: '2023-06-10',
    status: 'Complete',
    diagnosis: 'Seasonal allergic rhinitis',
    symptoms: ['Nasal congestion', 'Sneezing', 'Itchy eyes'],
    treatment: 'Prescribed antihistamines and nasal corticosteroid spray',
    notes: 'Patient reported improvement with previous treatment. Recommended to avoid allergen exposure when possible.'
  },
  {
    id: 2,
    patientName: 'Fatima Mansouri',
    patientId: 'P10062',
    recordType: 'Lab Results',
    createdDate: '2023-06-05',
    lastUpdated: '2023-06-07',
    status: 'Complete',
    diagnosis: 'Monitoring Diabetes Type 2',
    labResults: {
      hba1c: '7.2%',
      fastingGlucose: '136 mg/dL',
      lipidProfile: {
        totalCholesterol: '195 mg/dL',
        ldl: '118 mg/dL',
        hdl: '42 mg/dL',
        triglycerides: '150 mg/dL'
      }
    },
    treatment: 'Adjusted metformin dosage to 1000mg twice daily',
    notes: 'Patient is adhering to medication but struggles with dietary recommendations. Referred to nutritionist.'
  },
  {
    id: 3,
    patientName: 'Mohamed Karim',
    patientId: 'P10078',
    recordType: 'Follow-up',
    createdDate: '2023-05-28',
    lastUpdated: '2023-05-28',
    status: 'Complete',
    diagnosis: 'Controlled Hypertension',
    vitalSigns: {
      bloodPressure: '138/85 mmHg',
      heartRate: '72 bpm',
      respiratoryRate: '14/min',
      temperature: '36.7°C',
      oxygenSaturation: '98%'
    },
    treatment: 'Continuing current medication regimen: Amlodipine 5mg daily',
    notes: 'Blood pressure slightly elevated but within acceptable range. Patient reports compliance with medication and moderate physical activity 3x weekly.'
  },
  {
    id: 4,
    patientName: 'Nour Benali',
    patientId: 'P10103',
    recordType: 'Radiology',
    createdDate: '2023-06-15',
    lastUpdated: '2023-06-17',
    status: 'Pending Review',
    procedureType: 'Chest X-ray',
    radiologyFindings: 'Awaiting radiologist report',
    ordering: 'For suspected pneumonia',
    notes: 'Patient presented with cough, fever, and shortness of breath for 5 days. Prescribed antibiotics pending results.'
  },
  {
    id: 5,
    patientName: 'Ahmed Ben Ali',
    patientId: 'P10045',
    recordType: 'Prescription',
    createdDate: '2023-06-10',
    lastUpdated: '2023-06-10',
    status: 'Active',
    medications: [
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '30 days' },
      { name: 'Fluticasone Nasal Spray', dosage: '50mcg', frequency: 'Two sprays in each nostril daily', duration: '30 days' }
    ],
    notes: 'For seasonal allergic rhinitis management'
  }
];

// Record type options
const recordTypes = [
  'All Types',
  'Consultation',
  'Follow-up',
  'Lab Results',
  'Radiology',
  'Prescription',
  'Operation',
  'Vaccination'
];

export default function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  // Filter records based on search term, type, and date range
  const filteredRecords = medicalRecordsData.filter(record => {
    // Filter by search term
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by record type
    const matchesType = selectedType === 'All Types' || record.recordType === selectedType;
    
    // Filter by date range
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const recordDate = new Date(record.createdDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      matchesDateRange = recordDate >= startDate && recordDate <= endDate;
    }
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  const handleCloseRecord = () => {
    setSelectedRecord(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Medical Records</h1>
        
        <button 
          className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center"
          onClick={() => setShowNewRecord(true)}
        >
          <FiPlus className="mr-2" /> New Record
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="flex gap-2">
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {recordTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            
            <button 
              className={`px-4 py-3 border ${showFilters ? 'border-[#007E85] bg-[#007E85] text-white' : 'border-gray-300 bg-white text-gray-700'} rounded-lg flex items-center transition-colors`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter className="mr-2" /> Filters
            </button>
          </div>
        </div>
        
        {/* Additional Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Records List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Record Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{record.patientName}</div>
                  <div className="text-sm text-gray-500">ID: {record.patientId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.recordType}</div>
                  {record.diagnosis && (
                    <div className="text-sm text-gray-500">{record.diagnosis}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(record.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  {record.lastUpdated !== record.createdDate && (
                    <div className="text-xs text-gray-500">
                      Updated: {new Date(record.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    record.status === 'Complete' 
                      ? 'bg-green-100 text-green-800' 
                      : record.status === 'Pending Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      className="text-gray-600 hover:text-[#007E85]"
                      onClick={() => handleViewRecord(record)}
                    >
                      <FiEye size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-[#007E85]">
                      <FiEdit3 size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <FiTrash2 size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-[#007E85]">
                      <FiDownload size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Record Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">{selectedRecord.recordType} Record</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseRecord}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedRecord.patientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Patient ID</p>
                      <p className="font-medium">{selectedRecord.patientId}</p>
                    </div>
                  </div>
                </div>
                
                {/* Record Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Record Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Record Type</p>
                      <p className="font-medium">{selectedRecord.recordType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created Date</p>
                      <p className="font-medium">
                        {new Date(selectedRecord.createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{selectedRecord.status}</p>
                    </div>
                  </div>
                  
                  {/* Diagnosis */}
                  {selectedRecord.diagnosis && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Diagnosis</p>
                      <p className="font-medium">{selectedRecord.diagnosis}</p>
                    </div>
                  )}
                  
                  {/* Symptoms */}
                  {selectedRecord.symptoms && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Symptoms</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedRecord.symptoms.map((symptom, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Lab Results */}
                  {selectedRecord.labResults && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Lab Results</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(selectedRecord.labResults).map(([key, value]) => {
                            if (typeof value === 'object') {
                              return (
                                <div key={key} className="col-span-full">
                                  <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                  <div className="ml-4 mt-1">
                                    {Object.entries(value).map(([subKey, subValue]) => (
                                      <div key={subKey} className="flex justify-between border-b border-gray-200 py-1 last:border-0">
                                        <span className="text-sm capitalize">{subKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-sm font-medium">{subValue}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div key={key} className="flex justify-between border-b border-gray-200 py-1">
                                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="text-sm font-medium">{value}</span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Vital Signs */}
                  {selectedRecord.vitalSigns && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Vital Signs</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(selectedRecord.vitalSigns).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Medications */}
                  {selectedRecord.medications && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Medications</p>
                      {selectedRecord.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2 last:mb-0">
                          <p className="font-medium">{med.name} {med.dosage}</p>
                          <p className="text-sm">{med.frequency} for {med.duration}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Treatment */}
                  {selectedRecord.treatment && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Treatment</p>
                      <p>{selectedRecord.treatment}</p>
                    </div>
                  )}
                  
                  {/* Notes */}
                  {selectedRecord.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p>{selectedRecord.notes}</p>
                    </div>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <FiDownload className="mr-2" /> Download
                  </button>
                  <button className="px-4 py-2 text-white bg-[#007E85] rounded-lg hover:bg-[#006e75] flex items-center">
                    <FiEdit3 className="mr-2" /> Edit Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New Record Form (simplified) - In a real app, this would be a complex form */}
      {showNewRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create New Medical Record</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewRecord(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Record Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                      placeholder="Enter patient ID"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                      placeholder="Patient name will appear here"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]">
                      <option value="">Select record type</option>
                      {recordTypes.filter(type => type !== 'All Types').map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                {/* Diagnosis Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    placeholder="Enter diagnosis"
                  />
                </div>
                
                {/* Symptoms Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    rows={3}
                    placeholder="Enter symptoms, separated by commas"
                  ></textarea>
                </div>
                
                {/* Vital Signs */}
                <div>
                  <h3 className="text-md font-medium text-gray-800 mb-3">Vital Signs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 120/80 mmHg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Heart Rate</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 75 bpm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 37.0°C"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Respiratory Rate</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 16/min"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Saturation</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 98%"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                        placeholder="e.g., 70 kg"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Treatment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    rows={3}
                    placeholder="Enter treatment details"
                  ></textarea>
                </div>
                
                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    rows={3}
                    placeholder="Enter any additional notes"
                  ></textarea>
                </div>
                
                {/* Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" className="hidden" id="fileUpload" multiple />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="text-gray-500">
                        <p>Drag and drop files here, or click to select files</p>
                        <p className="text-sm mt-1">PDF, JPEG, PNG (Max. 10MB each)</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowNewRecord(false)}
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75]">
                    Save Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 