'use client';

import { useState } from 'react';
import { FiSearch, FiPlus, FiDownload, FiShare2, FiX, FiCheck, FiPrinter } from 'react-icons/fi';
import Link from 'next/link';

// Dummy data for existing prescriptions
const existingPrescriptions = [
  {
    id: 1,
    patientName: 'Ahmed Ben Ali',
    patientId: 101,
    date: '2023-06-15',
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain', duration: '5 days' }
    ],
    status: 'Active'
  },
  {
    id: 2,
    patientName: 'Fatima Mansouri',
    patientId: 102,
    date: '2023-06-12',
    medications: [
      { name: 'Loratadine', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
    ],
    status: 'Active'
  },
  {
    id: 3,
    patientName: 'Mohamed Karim',
    patientId: 103,
    date: '2023-05-30',
    medications: [
      { name: 'Salbutamol Inhaler', dosage: '100mcg', frequency: '2 puffs as needed', duration: '30 days' },
      { name: 'Fluticasone Propionate', dosage: '250mcg', frequency: '2 puffs twice daily', duration: '30 days' }
    ],
    status: 'Expired'
  }
];

// Dummy medications database
const medicationsDatabase = [
  { id: 1, name: 'Amoxicillin', category: 'Antibiotic', formulations: ['250mg capsule', '500mg capsule', '125mg/5ml suspension'] },
  { id: 2, name: 'Ibuprofen', category: 'NSAID', formulations: ['200mg tablet', '400mg tablet', '600mg tablet', '100mg/5ml suspension'] },
  { id: 3, name: 'Loratadine', category: 'Antihistamine', formulations: ['10mg tablet'] },
  { id: 4, name: 'Paracetamol', category: 'Analgesic', formulations: ['500mg tablet', '250mg/5ml suspension'] },
  { id: 5, name: 'Salbutamol', category: 'Bronchodilator', formulations: ['100mcg inhaler', '2mg tablet', '4mg tablet'] },
  { id: 6, name: 'Omeprazole', category: 'Proton Pump Inhibitor', formulations: ['20mg capsule', '40mg capsule'] },
  { id: 7, name: 'Metformin', category: 'Antidiabetic', formulations: ['500mg tablet', '850mg tablet', '1000mg tablet'] },
  { id: 8, name: 'Atorvastatin', category: 'Statin', formulations: ['10mg tablet', '20mg tablet', '40mg tablet'] },
  { id: 9, name: 'Fluticasone Propionate', category: 'Corticosteroid', formulations: ['50mcg nasal spray', '125mcg inhaler', '250mcg inhaler'] },
  { id: 10, name: 'Amlodipine', category: 'Calcium Channel Blocker', formulations: ['5mg tablet', '10mg tablet'] }
];

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  
  // New prescription state
  const [newPrescription, setNewPrescription] = useState({
    patientId: '',
    patientName: '',
    medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
    notes: ''
  });
  
  // Filter prescriptions based on search
  const filteredPrescriptions = existingPrescriptions.filter(prescription => 
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding a medication to new prescription
  const handleAddMedication = () => {
    setNewPrescription({
      ...newPrescription,
      medications: [
        ...newPrescription.medications,
        { name: '', dosage: '', frequency: '', duration: '', instructions: '' }
      ]
    });
  };

  // Handle removing a medication from new prescription
  const handleRemoveMedication = (index) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications.splice(index, 1);
    setNewPrescription({
      ...newPrescription,
      medications: updatedMedications
    });
  };

  // Handle change in medication fields
  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...newPrescription.medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setNewPrescription({
      ...newPrescription,
      medications: updatedMedications
    });
  };

  // Handle saving new prescription
  const handleSavePrescription = () => {
    // In a real app, this would save to a database
    alert('Prescription saved successfully!');
    setShowNewPrescription(false);
    setNewPrescription({
      patientId: '',
      patientName: '',
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      notes: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Prescriptions</h1>
        
        <button 
          className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75] transition-colors flex items-center"
          onClick={() => setShowNewPrescription(true)}
        >
          <FiPlus className="mr-2" /> New Prescription
        </button>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search prescriptions by patient name..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007E85]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      
      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medications</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prescription.patientName}</div>
                  <div className="text-sm text-gray-500">ID: {prescription.patientId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(prescription.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {prescription.medications.map((med, index) => (
                      <div key={index} className={index > 0 ? 'mt-2' : ''}>
                        <span className="font-medium">{med.name}</span> {med.dosage}, {med.frequency}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    prescription.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prescription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      className="p-1 text-gray-600 hover:text-[#007E85]"
                      onClick={() => setSelectedPrescription(prescription)}
                    >
                      <span className="sr-only">View</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </button>
                    <button className="p-1 text-gray-600 hover:text-[#007E85]">
                      <FiPrinter size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-[#007E85]">
                      <FiDownload size={18} />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-[#007E85]">
                      <FiShare2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* New Prescription Modal */}
      {showNewPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">New Prescription</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewPrescription(false)}
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                      value={newPrescription.patientId}
                      onChange={(e) => setNewPrescription({...newPrescription, patientId: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                      value={newPrescription.patientName}
                      onChange={(e) => setNewPrescription({...newPrescription, patientName: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Medications */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-800">Medications</h3>
                    <button 
                      className="text-[#007E85] hover:text-[#006e75] flex items-center"
                      onClick={handleAddMedication}
                    >
                      <FiPlus className="mr-1" /> Add Medication
                    </button>
                  </div>
                  
                  {newPrescription.medications.map((medication, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Medication #{index + 1}</h4>
                        {newPrescription.medications.length > 1 && (
                          <button 
                            className="text-red-500"
                            onClick={() => handleRemoveMedication(index)}
                          >
                            <FiX />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                            value={medication.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                            list={`medications-${index}`}
                          />
                          <datalist id={`medications-${index}`}>
                            {medicationsDatabase.map(med => (
                              <option key={med.id} value={med.name} />
                            ))}
                          </datalist>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                            value={medication.dosage}
                            onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                            value={medication.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                          >
                            <option value="">Select frequency</option>
                            <option value="Once daily">Once daily</option>
                            <option value="Twice daily">Twice daily</option>
                            <option value="Three times daily">Three times daily</option>
                            <option value="Four times daily">Four times daily</option>
                            <option value="Every 4 hours">Every 4 hours</option>
                            <option value="Every 6 hours">Every 6 hours</option>
                            <option value="Every 8 hours">Every 8 hours</option>
                            <option value="As needed">As needed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <div className="flex gap-2">
                            <input 
                              type="number" 
                              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                              min="1"
                              value={medication.duration.split(' ')[0] || ''}
                              onChange={(e) => handleMedicationChange(index, 'duration', `${e.target.value} ${medication.duration.split(' ')[1] || 'days'}`)}
                            />
                            <select 
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                              value={medication.duration.split(' ')[1] || 'days'}
                              onChange={(e) => handleMedicationChange(index, 'duration', `${medication.duration.split(' ')[0] || ''} ${e.target.value}`)}
                            >
                              <option value="days">Days</option>
                              <option value="weeks">Weeks</option>
                              <option value="months">Months</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                          rows={2}
                          value={medication.instructions}
                          onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                          placeholder="E.g., Take with food, Avoid alcohol, etc."
                        ></textarea>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes or Instructions</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#007E85]"
                    rows={3}
                    value={newPrescription.notes}
                    onChange={(e) => setNewPrescription({...newPrescription, notes: e.target.value})}
                    placeholder="Any additional information for the patient..."
                  ></textarea>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowNewPrescription(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#007E85] text-white rounded-lg hover:bg-[#006e75]"
                    onClick={handleSavePrescription}
                  >
                    Save Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Prescription Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-gray-800">Prescription Details</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedPrescription(null)}
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Dr. Sarah Ahmed</h3>
                      <p className="text-gray-600">Cardiologist</p>
                      <p className="text-gray-600">License #: TNMC12345</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">Date: {new Date(selectedPrescription.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      <p className="text-gray-600">Prescription #: RX-{selectedPrescription.id.toString().padStart(6, '0')}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Patient Information:</h4>
                    <p>Name: {selectedPrescription.patientName}</p>
                    <p>ID: {selectedPrescription.patientId}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-2">Medications</h4>
                  {selectedPrescription.medications.map((med, index) => (
                    <div key={index} className="mb-4 pb-4 border-b last:border-0">
                      <div className="flex items-start">
                        <div className="text-[#007E85] mr-3 mt-1">
                          <FiCheck />
                        </div>
                        <div>
                          <p className="font-semibold">{med.name} {med.dosage}</p>
                          <p className="text-gray-700">{med.frequency} for {med.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">This prescription is digitally signed and verified.</p>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-600 hover:text-[#007E85] bg-gray-100 rounded-lg">
                        <FiPrinter size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#007E85] bg-gray-100 rounded-lg">
                        <FiDownload size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-[#007E85] bg-gray-100 rounded-lg">
                        <FiShare2 size={18} />
                      </button>
                    </div>
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