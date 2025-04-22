"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (user) {
        // Redirect based on user role
        switch (user.role) {
          case 'patient':
            router.push('/dashboard/patient');
            break;
          case 'doctor':
            router.push('/dashboard/doctor');
            break;
          case 'admin':
            router.push('/dashboard/admin');
            break;
          default:
            // Default to patient dashboard if role is not recognized
            router.push('/dashboard/patient');
        }
      }
    }
  }, [isAuthenticated, user, loading, router]);

  // Loading state while checking authentication
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-4 border-[#007E85] border-t-transparent rounded-full animate-spin mb-8"></div>
      <h1 className="text-3xl font-medium text-[#007E85] mb-2">Preparing Your Dashboard</h1>
      <p className="text-gray-500">Just a moment...</p>
    </div>
  );
}
