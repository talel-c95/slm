import { FiSearch, FiBell, FiMessageCircle, FiHelpCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TopNavigationProps {
  patientName: string;
  avatarUrl?: string;
}

const TopNavigation = ({ patientName, avatarUrl }: TopNavigationProps) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: "Appointment reminder: Dr. Johnson tomorrow at 10:00 AM", time: "1 hour ago", isNew: true },
    { id: 2, message: "Your prescription has been renewed", time: "3 hours ago", isNew: true },
    { id: 3, message: "Lab results are now available", time: "1 day ago", isNew: false },
  ];

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-6 py-4">
      {/* Left Section - Search */}
      <div className="relative w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Help */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Help"
          onClick={() => router.push('/help')}
        >
          <FiHelpCircle size={20} className="text-gray-600" />
        </button>
        
        {/* Messages */}
        <button 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Messages"
          onClick={() => router.push('/dashboard/patient/messages')}
        >
          <FiMessageCircle size={20} className="text-gray-600" />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FiBell size={20} className="text-gray-600" />
            {notifications.some(n => n.isNew) && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Notifications</h3>
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    Mark all as read
                  </button>
                </div>
              </div>
              
              <div className="max-h-72 overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 hover:bg-gray-50 ${notification.isNew ? 'bg-blue-50' : ''}`}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="font-medium text-gray-800">{patientName}</span>
            <span className="text-xs text-gray-500">Patient</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#007E85]">
            <img
              src={avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
