'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Activity, Calendar, MessageSquare, 
  ShoppingBag, DollarSign, CheckSquare, AlertTriangle
} from 'lucide-react';
import DashboardCard from './components/DashboardCard';
import RecentUsers from './components/RecentUsers';
import LatestActivities from './components/LatestActivities';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    patients: 0,
    appointments: 0,
    messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated data loading
    // In a real app, you would fetch this from your API
    setTimeout(() => {
      setStats({
        users: 1245,
        doctors: 42,
        patients: 1203,
        appointments: 187,
        messages: 324
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin control panel</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Total Users"
          value={stats.users}
          change="+12.5%"
          trend="up"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          color="blue"
        />
        <DashboardCard 
          title="Doctors"
          value={stats.doctors}
          change="+5.2%"
          trend="up"
          icon={<Activity className="h-6 w-6 text-green-600" />}
          color="green"
        />
        <DashboardCard 
          title="Patients"
          value={stats.patients}
          change="+16.8%"
          trend="up"
          icon={<Users className="h-6 w-6 text-purple-600" />}
          color="purple"
        />
        <DashboardCard 
          title="Appointments"
          value={stats.appointments}
          change="+7.4%"
          trend="up"
          icon={<Calendar className="h-6 w-6 text-amber-600" />}
          color="amber"
        />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard 
          title="Messages"
          value={stats.messages}
          change="+22.1%"
          trend="up"
          icon={<MessageSquare className="h-6 w-6 text-indigo-600" />}
          color="indigo"
        />
        <DashboardCard 
          title="Revenue"
          value="$24,500"
          change="+8.3%"
          trend="up"
          icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
          color="emerald"
        />
        <DashboardCard 
          title="Fulfilled Orders"
          value="95.8%"
          change="+2.3%"
          trend="up"
          icon={<CheckSquare className="h-6 w-6 text-teal-600" />}
          color="teal"
        />
        <DashboardCard 
          title="Pending Issues"
          value="12"
          change="-5.1%"
          trend="down"
          icon={<AlertTriangle className="h-6 w-6 text-rose-600" />}
          color="rose"
        />
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <RecentUsers />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Latest Activities</h2>
          <LatestActivities />
        </div>
      </div>
    </div>
  );
} 