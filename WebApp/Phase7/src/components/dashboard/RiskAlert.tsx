import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export const RiskAlert: React.FC = () => {
  const riskScore = 23;
  const trend = '-5.1%';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-warning-100 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-warning-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Risk Level</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{riskScore}%</span>
              <div className="flex items-center text-accent-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm font-medium">{trend}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-accent-500 to-warning-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${riskScore}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Low risk - decreasing trend</p>
      </div>
    </div>
  );
};