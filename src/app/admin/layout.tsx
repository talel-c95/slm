'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and has admin role
    const checkAdminAccess = () => {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          console.log('No user data found, redirecting...');
          router.push('/login');
          return;
        }

        const user = JSON.parse(userData);
        if (user.role !== 'admin') {
          console.log('User is not an admin, redirecting...');
          router.push('/dashboard');
          return;
        }

        // User is an admin, allow access
        setAuthorized(true);
      } catch (error) {
        console.error('Error checking admin access:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  // Show loading state while checking authorization
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show unauthorized message if not an admin
  if (!authorized) {
    return null; // Return null since we're redirecting
  }

  // Render admin layout if authorized
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 