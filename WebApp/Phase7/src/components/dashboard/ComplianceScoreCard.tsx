import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';

export const ComplianceScoreCard: React.FC = () => {
  const score = 87;
  const trend = '+3.2%';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Shield className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Overall Compliance Score</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">{score}%</span>
              <div className="flex items-center text-accent-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{trend}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">Excellent compliance posture maintained</p>
      </div>
    </div>
  );
};