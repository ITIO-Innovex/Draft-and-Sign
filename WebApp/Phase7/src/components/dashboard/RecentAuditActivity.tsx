import React from 'react';
import { FileSearch, User, Calendar, ExternalLink } from 'lucide-react';

export const RecentAuditActivity: React.FC = () => {
  const auditActivities = [
    {
      id: 1,
      type: 'Data Access Review',
      regulation: 'GDPR',
      user: 'Michael Chen',
      timestamp: '2 hours ago',
      status: 'completed',
      description: 'Reviewed data access permissions for EU customers'
    },
    {
      id: 2,
      type: 'Security Assessment',
      regulation: 'SOC 2',
      user: 'Sarah Johnson',
      timestamp: '4 hours ago',
      status: 'in-progress',
      description: 'Quarterly security controls assessment'
    },
    {
      id: 3,
      type: 'Policy Update',
      regulation: 'CCPA',
      user: 'David Rodriguez',
      timestamp: '6 hours ago',
      status: 'completed',
      description: 'Updated privacy policy for California residents'
    },
    {
      id: 4,
      type: 'Compliance Training',
      regulation: 'HIPAA',
      user: 'Emily Watson',
      timestamp: '1 day ago',
      status: 'completed',
      description: 'Completed mandatory HIPAA training certification'
    },
    {
      id: 5,
      type: 'Risk Assessment',
      regulation: 'PCI DSS',
      user: 'James Liu',
      timestamp: '1 day ago',
      status: 'requires-action',
      description: 'Identified payment processing vulnerabilities'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'in-progress':
        return 'bg-secondary-100 text-secondary-700';
      case 'requires-action':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Audit Activity</h3>
        <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors duration-200">
          <span className="text-sm font-medium">View all</span>
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {auditActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileSearch className="h-4 w-4 text-primary-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status.replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <User className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.user}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
                <span className="text-xs font-medium text-primary-600">{activity.regulation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};