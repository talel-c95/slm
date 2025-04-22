'use client';

import { useState } from 'react';
import { 
  Search, Filter, UserPlus, Download, Trash2, Edit, Eye, 
  User, CheckCircle, XCircle, ChevronLeft, ChevronRight 
} from 'lucide-react';

// Simulated user data
const DEMO_USERS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: ['John Smith', 'Sarah Johnson', 'Mohammed Al-Fayed', 'Emma Rodriguez', 'David Kim', 
         'Lisa Chen', 'Ahmed Hassan', 'Maria Garcia', 'James Wilson', 'Aisha Patel'][i % 10],
  email: ['john@example.com', 'sarah@example.com', 'mohammed@example.com', 'emma@example.com', 
          'david@example.com', 'lisa@example.com', 'ahmed@example.com', 'maria@example.com', 
          'james@example.com', 'aisha@example.com'][i % 10],
  role: ['patient', 'doctor', 'patient', 'patient', 'admin', 'doctor', 'patient', 'doctor', 'patient', 'admin'][i % 10],
  status: ['active', 'active', 'inactive', 'active', 'active', 'inactive', 'active', 'active', 'inactive', 'active'][i % 10],
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
}));

export default function UsersPage() {
  const [users, setUsers] = useState(DEMO_USERS);
  const [filteredUsers, setFilteredUsers] = useState(DEMO_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  
  const pageSize = 10;
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  
  // Handle search and filtering
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, roleFilter, statusFilter);
  };
  
  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    applyFilters(searchTerm, role, statusFilter);
  };
  
  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, roleFilter, status);
  };
  
  const applyFilters = (term: string, role: string, status: string) => {
    let result = [...users];
    
    // Apply search term
    if (term) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(term.toLowerCase()) || 
        user.email.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Apply role filter
    if (role !== 'all') {
      result = result.filter(user => user.role === role);
    }
    
    // Apply status filter
    if (status !== 'all') {
      result = result.filter(user => user.status === status);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1);
  };
  
  // Pagination helpers
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  // Select all users on current page
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageUserIds = paginatedUsers.map(user => user.id);
      setSelectedUsers([...selectedUsers, ...pageUserIds]);
    } else {
      const pageUserIds = new Set(paginatedUsers.map(user => user.id));
      setSelectedUsers(selectedUsers.filter(id => !pageUserIds.has(id)));
    }
  };
  
  // Toggle select single user
  const handleSelectUser = (id: number) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(dateString));
  };
  
  // Handle bulk actions
  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      setUsers(users.filter(user => !selectedUsers.includes(user.id)));
      setFilteredUsers(filteredUsers.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <UserPlus className="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Role Filter */}
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={roleFilter}
                onChange={(e) => handleRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="w-full md:w-48">
            <div className="relative">
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Export */}
          <div>
            <button className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="h-5 w-5 mr-2 text-gray-500" />
              Export
            </button>
          </div>
        </div>
        
        {/* Selected Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
            <div className="text-sm text-blue-700">
              {selectedUsers.length} users selected
            </div>
            <button 
              className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center text-sm"
              onClick={handleBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </button>
          </div>
        )}
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      onChange={handleSelectAll}
                      checked={paginatedUsers.length > 0 && paginatedUsers.every(user => selectedUsers.includes(user.id))}
                    />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'doctor' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500 mr-1.5" />
                          <span className="text-sm text-gray-900">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-500 mr-1.5" />
                          <span className="text-sm text-gray-900">Inactive</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <Eye className="h-5 w-5 text-gray-500" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <Edit className="h-5 w-5 text-blue-500" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, filteredUsers.length)}
                </span>{' '}
                of <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Calculate page numbers to show centered around current page
                  const pageOffset = Math.floor(5 / 2);
                  let pageNum = currentPage - pageOffset + i;
                  
                  // Handle edge cases
                  if (pageNum <= 0) pageNum = i + 1;
                  if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  
                  // Skip if out of range (just a fallback check)
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNum
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 