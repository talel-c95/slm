'use client';

import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

// Add type for event handlers
type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

export default function DeleteAccount() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<{success?: boolean; message?: string} | null>(null);
  const { deleteAccount, loading, error, logout } = useAuth();
  const router = useRouter();

  const handleDeleteAccount = async (e: ButtonClickEvent) => {
    e.preventDefault();
    setDeleteStatus(null);
    
    try {
      console.log('Frontend: Attempting to delete account...');
      
      // Manual token check for debugging
      const token = localStorage.getItem('token');
      if (!token) {
        setDeleteStatus({
          success: false,
          message: 'No authentication token found. Please log in again.'
        });
        return;
      }
      
      // Get user ID for debugging
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        console.log('Deleting account for user ID:', user.id, 'Role:', user.role);
      }
      
      try {
        // First try with the auth context method
        await deleteAccount();
      } catch (initialError) {
        console.warn('Initial delete attempt failed, trying direct API call:', initialError);
        
        // Fallback to direct API call
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        console.log(`Making direct API call to: ${API_URL}/users/me`);
        console.log(`Using token (first 10 chars): ${token.substring(0, 10)}...`);
        
        // Try all possible endpoint combinations
        let success = false;
        let lastError = null;
        
        // Approach 1: /users/me (from authContext.tsx)
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Direct API call status (/users/me):', response.status);
          
          if (response.ok) {
            console.log('Direct API call successful');
            success = true;
          } else {
            const errorData = await response.json().catch(() => ({}));
            console.error('Direct API error response:', errorData);
            lastError = new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
          }
        } catch (err) {
          console.error('Error with /users/me approach:', err);
          lastError = err;
        }
        
        // Approach 2: Try /auth/me (similar to other endpoints in this app)
        if (!success) {
          try {
            console.log(`Trying alternative API endpoint: ${API_URL}/auth/me`);
            
            const response = await fetch(`${API_URL}/auth/me`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log('Direct API call status (/auth/me):', response.status);
            
            if (response.ok) {
              console.log('/auth/me API call successful');
              success = true;
            } else {
              const errorData = await response.json().catch(() => ({}));
              console.error('/auth/me API error response:', errorData);
              lastError = new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
          } catch (err) {
            console.error('Error with /auth/me approach:', err);
            lastError = err;
          }
        }
        
        // Approach 3: Try with user ID from localStorage
        if (!success && userData) {
          try {
            const user = JSON.parse(userData);
            const userId = user.id;
            
            console.log(`Trying with user ID: ${userId}`);
            
            const response = await fetch(`${API_URL}/users/${userId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log('API call status with ID:', response.status);
            
            if (response.ok) {
              console.log('User ID API call successful');
              success = true;
            } else {
              const errorData = await response.json().catch(() => ({}));
              console.error('User ID API error response:', errorData);
              lastError = new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
          } catch (err) {
            console.error('Error with user ID approach:', err);
            lastError = err;
          }
        }
        
        // Approach 4: Try with http://localhost:5000/api/users/me directly (no environment var)
        if (!success) {
          try {
            console.log('Trying with explicit hardcoded URL');
            
            // Get a fresh token directly from localStorage
            const freshToken = localStorage.getItem('token');
            
            if (!freshToken) {
              console.error('No token found in localStorage');
              throw new Error('No authentication token available');
            }
            
            // Try with full explicit URL and properly formatted auth header
            const response = await fetch('http://localhost:5000/api/users/me', {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${freshToken.trim()}`,
                'Content-Type': 'application/json'
              }
            });
            
            console.log('Hardcoded URL call status:', response.status);
            
            if (response.ok) {
              console.log('Hardcoded URL call successful');
              success = true;
            } else {
              const errorData = await response.json().catch(() => ({}));
              console.error('Hardcoded URL error response:', errorData);
              lastError = new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
            }
          } catch (err) {
            console.error('Error with hardcoded URL approach:', err);
            lastError = err;
          }
        }
        
        // If none of the approaches worked, throw the last error
        if (!success && lastError) {
          throw lastError;
        }
      }
      
      // Set success message
      setDeleteStatus({
        success: true,
        message: 'Account deleted successfully. Redirecting to login...'
      });
      
      // Clear user data regardless of which method worked
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Make sure to call logout to clear auth context state too
      logout();
      
      // Delay redirect to allow user to see success message
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Error deleting account:', err);
      
      // Check for specific error types
      let errorMessage = 'Failed to delete account';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // Handle specific error messages
        if (errorMessage.includes('not found') || errorMessage.includes('404')) {
          errorMessage = 'Account not found or already deleted';
        } else if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
          errorMessage = 'Not authorized. Please log in again';
        } else if (errorMessage.includes('forbidden') || errorMessage.includes('403')) {
          errorMessage = 'You do not have permission to delete this account';
        }
      }
      
      setDeleteStatus({
        success: false,
        message: errorMessage
      });
    }
  };

  const handleShowConfirm = (e: ButtonClickEvent) => {
    e.preventDefault();
    setShowDeleteConfirm(true);
    setDeleteStatus(null);
  };

  const handleCancelDelete = (e: ButtonClickEvent) => {
    e.preventDefault();
    setShowDeleteConfirm(false);
    setDeleteStatus(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>
      <p className="text-gray-700 mb-6">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      
      {deleteStatus && (
        <div className={`p-4 mb-4 rounded-lg border ${
          deleteStatus.success 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          {deleteStatus.message}
        </div>
      )}
      
      {!showDeleteConfirm ? (
        <button 
          onClick={handleShowConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      ) : (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-4">
          <div className="flex items-start">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1" />
            <div>
              <h3 className="font-medium text-red-700">Are you sure you want to delete your account?</h3>
              <p className="text-sm text-red-600 mt-1">
                This will permanently delete all your personal information, medical records, appointments, and messages.
              </p>
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-70"
                >
                  {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                </button>
                <button 
                  onClick={handleCancelDelete}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}