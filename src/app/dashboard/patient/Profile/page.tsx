'use client';
import Profile from './Profile';
import { useState } from 'react';
import TopNavigation from '../components/topnavigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import PageContainer from '../components/pagecontainer';
import { Trash2, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Anderson',
    height: "5'6\"",
    weight: '130 lbs',
    profilePhoto: '',
  });

  const [navbarName, setNavbarName] = useState(`${profileData.firstName} ${profileData.lastName}`);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const updateProfile = (data: { firstName?: string; lastName?: string; height?: string; weight?: string; profilePhoto?: string }) => {
    setProfileData(prev => {
      const updatedProfile = { ...prev, ...data };
      setNavbarName(`${updatedProfile.firstName} ${updatedProfile.lastName}`);
      return updatedProfile;
    });
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      setError('');

      const response = await fetch('/api/patient/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      // Logout the user after successful deletion
      await logout();
      router.push('/login');
    } catch (err) {
      setError('Failed to delete account. Please try again later.');
      console.error('Delete account error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TopNavigation patientName={navbarName} avatarUrl={profileData.profilePhoto} />
      <PageContainer title="Profile Settings">
        <div className="max-w-4xl mx-auto">
          {/* Delete Account Section */}
          <div className="mt-12 bg-white rounded-xl shadow-md p-6">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
              <p className="text-gray-500 mt-1">Irreversible account actions</p>
            </div>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              )}

              {!showDeleteConfirm ? (
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                  <div>
                    <h3 className="font-medium text-gray-900">Delete Account</h3>
                    <p className="text-sm text-gray-500">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </button>
                </div>
              ) : (
                <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                  <h3 className="text-lg font-medium text-red-600 mb-4">
                    Are you sure you want to delete your account?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                      className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 ${
                        isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                      {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

