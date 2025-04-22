'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const colorClasses = {
  blue: { 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-100' 
  },
  green: { 
    bg: 'bg-green-50', 
    text: 'text-green-600', 
    border: 'border-green-100' 
  },
  red: { 
    bg: 'bg-red-50', 
    text: 'text-red-600', 
    border: 'border-red-100' 
  },
  amber: { 
    bg: 'bg-amber-50', 
    text: 'text-amber-600', 
    border: 'border-amber-100' 
  },
  purple: { 
    bg: 'bg-purple-50', 
    text: 'text-purple-600', 
    border: 'border-purple-100' 
  },
  indigo: { 
    bg: 'bg-indigo-50', 
    text: 'text-indigo-600', 
    border: 'border-indigo-100' 
  },
  emerald: { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-600', 
    border: 'border-emerald-100' 
  },
  teal: { 
    bg: 'bg-teal-50', 
    text: 'text-teal-600', 
    border: 'border-teal-100' 
  },
  rose: { 
    bg: 'bg-rose-50', 
    text: 'text-rose-600', 
    border: 'border-rose-100' 
  }
};

export default function DashboardCard({ 
  title, value, change, trend, icon, color = 'blue' 
}: DashboardCardProps) {
  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  
  return (
    <div className={`bg-white rounded-lg border ${colors.border} shadow-sm p-6 hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <p className={`ml-2 text-sm font-medium flex items-center ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              {change}
            </p>
          </div>
        </div>
        <div className={`${colors.bg} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
} 