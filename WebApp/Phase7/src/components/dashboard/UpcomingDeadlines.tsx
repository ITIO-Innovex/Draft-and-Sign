import React from 'react';
import { Clock, Calendar } from 'lucide-react';

export const UpcomingDeadlines: React.FC = () => {
  const deadlines = [
    { regulation: 'GDPR', task: 'Data Protection Impact Assessment', daysLeft: 3, priority: 'high' },
    { regulation: 'SOC 2', task: 'Quarterly Security Review', daysLeft: 7, priority: 'medium' },
    { regulation: 'PCI DSS', task: 'Vulnerability Scan Report', daysLeft: 14, priority: 'low' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-error-700 bg-error-50';
      case 'medium':
        return 'text-warning-700 bg-warning-50';
      case 'low':
        return 'text-accent-700 bg-accent-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-secondary-100 rounded-lg">
          <Clock className="h-6 w-6 text-secondary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
          <p className="text-sm text-gray-500">{deadlines.length} tasks due soon</p>
        </div>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{deadline.task}</p>
                <p className="text-xs text-gray-500">{deadline.regulation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{deadline.daysLeft} days</p>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(deadline.priority)}`}>
                {deadline.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};