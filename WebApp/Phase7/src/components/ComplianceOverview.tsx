import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, Clock, TrendingUp, Search, Filter } from 'lucide-react';

export const ComplianceOverview: React.FC = () => {
  const [selectedRegulation, setSelectedRegulation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const regulations = [
    {
      id: 'gdpr',
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      status: 'compliant',
      score: 94,
      lastAudit: '2024-01-15',
      nextAudit: '2024-04-15',
      issues: 0,
      controls: 45,
      compliance: 98,
      region: 'EU',
      description: 'European Union data protection regulation'
    },
    {
      id: 'ccpa',
      name: 'CCPA',
      fullName: 'California Consumer Privacy Act',
      status: 'compliant',
      score: 89,
      lastAudit: '2024-01-10',
      nextAudit: '2024-04-10',
      issues: 1,
      controls: 32,
      compliance: 94,
      region: 'US-CA',
      description: 'California privacy protection law'
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      fullName: 'Health Insurance Portability and Accountability Act',
      status: 'warning',
      score: 76,
      lastAudit: '2024-01-08',
      nextAudit: '2024-04-08',
      issues: 3,
      controls: 38,
      compliance: 85,
      region: 'US',
      description: 'Healthcare data protection regulation'
    },
    {
      id: 'sox',
      name: 'SOX',
      fullName: 'Sarbanes-Oxley Act',
      status: 'pending',
      score: 92,
      lastAudit: '2023-12-20',
      nextAudit: '2024-03-20',
      issues: 0,
      controls: 52,
      compliance: 96,
      region: 'US',
      description: 'Financial reporting and corporate governance'
    },
    {
      id: 'pci',
      name: 'PCI DSS',
      fullName: 'Payment Card Industry Data Security Standard',
      status: 'compliant',
      score: 88,
      lastAudit: '2024-01-05',
      nextAudit: '2024-04-05',
      issues: 2,
      controls: 35,
      compliance: 91,
      region: 'Global',
      description: 'Payment card industry security standards'
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      fullName: 'Information Security Management Systems',
      status: 'compliant',
      score: 91,
      lastAudit: '2024-01-12',
      nextAudit: '2024-04-12',
      issues: 1,
      controls: 114,
      compliance: 93,
      region: 'Global',
      description: 'International security management standard'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="h-5 w-5 text-accent-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-accent-700 bg-accent-50 border-accent-200';
      case 'warning':
        return 'text-warning-700 bg-warning-50 border-warning-200';
      case 'pending':
        return 'text-gray-700 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredRegulations = regulations.filter(reg => 
    (selectedRegulation === 'all' || reg.status === selectedRegulation) &&
    (reg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Overview</h1>
          <p className="text-gray-500 mt-1">Monitor and manage regulatory compliance across all frameworks</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search regulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="warning">Warning</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Compliant</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-sm text-gray-600">Avg Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regulations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRegulations.map((regulation) => (
          <div key={regulation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(regulation.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{regulation.name}</h3>
                  <p className="text-sm text-gray-600">{regulation.fullName}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(regulation.status)}`}>
                {regulation.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{regulation.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Compliance Score</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${regulation.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{regulation.score}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Controls</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{regulation.controls}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Issues</p>
                <p className={`font-medium ${regulation.issues > 0 ? 'text-warning-600' : 'text-accent-600'}`}>
                  {regulation.issues}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Region</p>
                <p className="font-medium text-gray-900">{regulation.region}</p>
              </div>
              <div>
                <p className="text-gray-500">Next Audit</p>
                <p className="font-medium text-gray-900">{regulation.nextAudit}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};