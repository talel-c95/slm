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
      <div className="flex min-h-screen bg-[#007E85]">
        <SideNavigation />
        <div className="flex-1 ml-32">
          <div className="min-h-screen bg-gray-50 rounded-l-[40px] p-8">
            <TopNavigation patientName={user ? `${user.firstName} ${user.lastName}` : 'Patient'} />
            <main className="mt-8">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
