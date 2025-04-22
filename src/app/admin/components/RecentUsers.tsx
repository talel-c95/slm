'use client';

import { useState, useEffect } from 'react';
import { User, MoreHorizontal, ExternalLink, Ban, Trash2 } from 'lucide-react';

// Simulated user data
const DEMO_USERS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'patient',
    status: 'active',
    registered: '2023-05-12T10:34:23Z'
  },
  {
    id: 2,
    name: 'Dr. Mohammed Ahmed',
    email: 'dr.ahmed@example.com',
    role: 'doctor',
    status: 'active',
    registered: '2023-05-10T14:22:15Z'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    role: 'patient',
    status: 'active',
    registered: '2023-05-09T09:15:47Z'
  },
  {
    id: 4,
    name: 'John Williams',
    email: 'j.williams@example.com',
    role: 'patient',
    status: 'pending',
    registered: '2023-05-08T16:44:09Z'
  },
  {
    id: 5,
    name: 'Dr. Lisa Chen',
    email: 'lisa.chen@example.com',
    role: 'doctor',
    status: 'active',
    registered: '2023-05-07T11:32:01Z'
  }
];

interface UserActionsProps {
  userId: number;
}

function UserActions({ userId }: UserActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </button>
      
      {open && (
        <div 
          className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48 py-1"
          onBlur={() => setOpen(false)}
        >
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Profile
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
            <Ban className="h-4 w-4 mr-2" />
            Suspend User
          </button>
          <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </button>
        </div>
      )}
    </div>
  );
}

export default function RecentUsers() {
  const [users, setUsers] = useState(DEMO_USERS);

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get role badge style
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'doctor':
        return 'bg-blue-100 text-blue-800';
      case 'patient':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
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
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(user.status)}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(user.registered)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <UserActions userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 