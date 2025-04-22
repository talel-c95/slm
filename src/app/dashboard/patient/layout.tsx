'use client';

import SideNavigation from "./components/sidenavigation";
import TopNavigation from "./components/topnavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/authContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['patient']}>
      <div className="flex min-h-screen bg-gradient-to-br from-[#007E85] to-[#006270]">
        <SideNavigation />
        <div className="flex-1 ml-32">
          <div className="min-h-screen bg-gray-50 rounded-l-[40px] p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-full h-40 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30 -z-10"></div>
            <div className="absolute top-1/4 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 opacity-20 -z-10"></div>
            
            <TopNavigation patientName={user ? `${user.firstName} ${user.lastName}` : 'Patient'} />
            <main className="mt-8 relative z-10">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
