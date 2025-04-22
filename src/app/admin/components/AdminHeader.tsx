'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Settings, User } from 'lucide-react';

export default function AdminHeader() {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
  
  useEffect(() => {
    // Get user data from localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser({
          firstName: parsedUser.firstName || '',
          lastName: parsedUser.lastName || '',
          email: parsedUser.email || ''
        });
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search bar */}
        <div className="w-96 max-w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notification bell */}
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>

          {/* User profile */}
          <div className="flex items-center">
            <div className="mr-3 text-right hidden sm:block">
              <div className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
              {user.firstName && user.lastName ? (
                `${user.firstName[0]}${user.lastName[0]}`
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 