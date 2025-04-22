'use client';

import { 
  User, Calendar, MessageSquare, AlertCircle, 
  CheckCircle, FileText, Settings, Shield 
} from 'lucide-react';

// Simulated activity data
const DEMO_ACTIVITIES = [
  {
    id: 1,
    action: 'New user registered',
    user: 'David Kim',
    timestamp: '2023-05-15T08:30:45Z',
    type: 'user',
    details: 'New patient account created'
  },
  {
    id: 2,
    action: 'Appointment scheduled',
    user: 'Emma Rodriguez',
    timestamp: '2023-05-15T07:15:22Z',
    type: 'appointment',
    details: 'Scheduled with Dr. Lisa Chen for May 20th'
  },
  {
    id: 3,
    action: 'Support message received',
    user: 'John Williams',
    timestamp: '2023-05-14T23:42:11Z',
    type: 'message',
    details: 'Billing inquiry about insurance claim'
  },
  {
    id: 4,
    action: 'System alert',
    user: 'System',
    timestamp: '2023-05-14T18:10:00Z',
    type: 'alert',
    details: 'Database backup completed successfully'
  },
  {
    id: 5,
    action: 'Task completed',
    user: 'Dr. Mohammed Ahmed',
    timestamp: '2023-05-14T15:33:29Z',
    type: 'task',
    details: 'Updated patient records for billing'
  },
  {
    id: 6,
    action: 'Report generated',
    user: 'Admin',
    timestamp: '2023-05-14T11:22:17Z',
    type: 'report',
    details: 'Monthly financial summary for April 2023'
  },
  {
    id: 7,
    action: 'Settings updated',
    user: 'Admin',
    timestamp: '2023-05-14T09:15:05Z',
    type: 'settings',
    details: 'Changed notification preferences for system'
  },
  {
    id: 8,
    action: 'Security alert',
    user: 'System',
    timestamp: '2023-05-13T22:05:33Z',
    type: 'security',
    details: 'Multiple failed login attempts detected'
  }
];

export default function LatestActivities() {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than 24 hours, show relative time
    if (diff < 24 * 60 * 60 * 1000) {
      const hours = Math.floor(diff / (60 * 60 * 1000));
      
      if (hours < 1) {
        const minutes = Math.floor(diff / (60 * 1000));
        return minutes < 1 ? 'Just now' : `${minutes}m ago`;
      }
      
      return `${hours}h ago`;
    }
    
    // Format date for older activities
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'task':
        return <CheckCircle className="h-5 w-5 text-teal-500" />;
      case 'report':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'settings':
        return <Settings className="h-5 w-5 text-gray-500" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {DEMO_ACTIVITIES.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== DEMO_ACTIVITIES.length - 1 ? (
                <span 
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" 
                  aria-hidden="true" 
                />
              ) : null}
              
              <div className="relative flex items-start space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                
                <div className="min-w-0 flex-1 py-1.5">
                  <div className="text-sm text-gray-500 flex justify-between">
                    <div>
                      <span className="font-medium text-gray-900">{activity.user}</span>
                      {' '}
                      <span>{activity.action}</span>
                    </div>
                    <time className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(activity.timestamp)}
                    </time>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {activity.details}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 