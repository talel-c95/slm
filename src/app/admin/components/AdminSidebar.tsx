'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PieChart,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  active: boolean;
}

const NavItem = ({ href, icon, label, expanded, active }: NavItemProps) => {
  return (
    <Link 
      href={href}
      className={`flex items-center px-3 py-3 rounded-lg transition-colors group 
        ${active 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
      <div className="flex items-center justify-center w-6 h-6 mr-3">{icon}</div>
      {expanded && <span>{label}</span>}
    </Link>
  );
};

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { href: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { href: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { href: '/admin/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { href: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    { href: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' },
    { href: '/admin/analytics', icon: <PieChart size={20} />, label: 'Analytics' },
    { href: '/admin/monitoring', icon: <Activity size={20} />, label: 'Monitoring' },
    { href: '/admin/security', icon: <ShieldCheck size={20} />, label: 'Security' },
    { href: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside 
      className={`
        bg-white border-r border-gray-200 flex flex-col transition-all duration-200 
        ${expanded ? 'w-64' : 'w-16'} 
        shrink-0
      `}
    >
      {/* Logo and collapse button */}
      <div className={`flex ${expanded ? 'justify-between' : 'justify-center'} items-center p-4 border-b border-gray-200`}>
        {expanded && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold mr-2">
              HC
            </div>
            <span className="font-bold text-gray-800">HealthAdmin</span>
          </div>
        )}
        
        <button 
          onClick={() => setExpanded(!expanded)}
          className="rounded-lg p-1.5 hover:bg-gray-100 text-gray-500"
        >
          {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            expanded={expanded}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* Bottom section */}
      <div className={`p-3 border-t border-gray-200 ${expanded ? '' : 'flex justify-center'}`}>
        {expanded ? (
          <div className="flex flex-col space-y-3">
            <Link 
              href="/admin/help" 
              className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
            >
              <HelpCircle size={20} className="mr-3" />
              <span>Help & Support</span>
            </Link>
            <Link 
              href="/login" 
              className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-3 items-center">
            <Link 
              href="/admin/help" 
              className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg"
            >
              <HelpCircle size={20} />
            </Link>
            <Link 
              href="/login" 
              className="p-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }}
            >
              <LogOut size={20} />
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
} 