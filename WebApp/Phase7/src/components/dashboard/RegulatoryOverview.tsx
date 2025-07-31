import React from 'react';
import { Shield, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const RegulatoryOverview: React.FC = () => {
  const regulations = [
    { 
      name: 'GDPR', 
      status: 'compliant', 
      score: 94, 
      lastAudit: '2024-01-15',
      issues: 0 
    },
    { 
      name: 'CCPA', 
      status: 'compliant', 
      score: 89, 
      lastAudit: '2024-01-10',
      issues: 1 
    },
    { 
      name: 'HIPAA', 
      status: 'warning', 
      score: 76, 
      lastAudit: '2024-01-08',
      issues: 3 
    },
    { 
      name: 'SOX', 
      status: 'pending', 
      score: 92, 
      lastAudit: '2023-12-20',
      issues: 0 
    },
    { 
      name: 'PCI DSS', 
      status: 'compliant', 
      score: 88, 
      lastAudit: '2024-01-05',
      issues: 2 
    },
    { 
      name: 'ISO 27001', 
      status: 'compliant', 
      score: 91, 
      lastAudit: '2024-01-12',
      issues: 1 
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-4 w-4 text-accent-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      default:
        return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-accent-700 bg-accent-50';
      case 'warning':
        return 'text-warning-700 bg-warning-50';
      case 'pending':
        return 'text-gray-700 bg-gray-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Regulatory Compliance</h3>
        <span className="text-sm text-gray-500">{regulations.length} regulations monitored</span>
      </div>

      <div className="space-y-4">
        {regulations.map((regulation, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              {getStatusIcon(regulation.status)}
              <div>
                <p className="font-medium text-gray-900">{regulation.name}</p>
                <p className="text-sm text-gray-500">Last audit: {regulation.lastAudit}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{regulation.score}%</p>
                <p className="text-xs text-gray-500">{regulation.issues} issues</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(regulation.status)}`}>
                {regulation.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};