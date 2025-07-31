import React, { useState } from 'react';
import { Lock, Shield, Eye, Download, Search, Filter, AlertCircle, CheckCircle, Clock, Users } from 'lucide-react';

export const DataPrivacy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dataCategories = [
    {
      id: 'personal-data',
      name: 'Personal Data',
      description: 'Personally identifiable information (PII)',
      records: 125000,
      classification: 'high',
      retention: '7 years',
      encryption: 'AES-256',
      lastAudit: '2024-01-15',
      compliance: ['GDPR', 'CCPA'],
      riskLevel: 'medium'
    },
    {
      id: 'financial-data',
      name: 'Financial Data',
      description: 'Payment and financial information',
      records: 89000,
      classification: 'critical',
      retention: '10 years',
      encryption: 'AES-256',
      lastAudit: '2024-01-12',
      compliance: ['PCI DSS', 'SOX'],
      riskLevel: 'high'
    },
    {
      id: 'health-data',
      name: 'Health Data',
      description: 'Protected health information (PHI)',
      records: 45000,
      classification: 'critical',
      retention: '6 years',
      encryption: 'AES-256',
      lastAudit: '2024-01-10',
      compliance: ['HIPAA'],
      riskLevel: 'high'
    },
    {
      id: 'employee-data',
      name: 'Employee Data',
      description: 'HR and employment records',
      records: 2500,
      classification: 'high',
      retention: '5 years',
      encryption: 'AES-256',
      lastAudit: '2024-01-08',
      compliance: ['GDPR', 'Local Labor Laws'],
      riskLevel: 'low'
    }
  ];

  const privacyRequests = [
    {
      id: 1,
      type: 'Data Access Request',
      regulation: 'GDPR',
      requestor: 'john.doe@email.com',
      status: 'in-progress',
      submitted: '2024-01-14',
      dueDate: '2024-02-13',
      category: 'personal-data',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'Data Deletion Request',
      regulation: 'CCPA',
      requestor: 'jane.smith@email.com',
      status: 'completed',
      submitted: '2024-01-12',
      dueDate: '2024-02-11',
      category: 'personal-data',
      priority: 'high'
    },
    {
      id: 3,
      type: 'Data Portability Request',
      regulation: 'GDPR',
      requestor: 'mike.johnson@email.com',
      status: 'pending',
      submitted: '2024-01-15',
      dueDate: '2024-02-14',
      category: 'personal-data',
      priority: 'low'
    }
  ];

  const dataFlows = [
    {
      id: 1,
      source: 'Customer Portal',
      destination: 'CRM System',
      dataType: 'Personal Data',
      volume: '10K records/day',
      encryption: 'TLS 1.3',
      compliance: ['GDPR', 'CCPA'],
      status: 'active'
    },
    {
      id: 2,
      source: 'Payment Gateway',
      destination: 'Financial Database',
      dataType: 'Financial Data',
      volume: '5K transactions/day',
      encryption: 'End-to-End',
      compliance: ['PCI DSS'],
      status: 'active'
    },
    {
      id: 3,
      source: 'Healthcare App',
      destination: 'Medical Records',
      dataType: 'Health Data',
      volume: '2K records/day',
      encryption: 'FIPS 140-2',
      compliance: ['HIPAA'],
      status: 'active'
    }
  ];

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'critical':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'high':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'medium':
        return 'bg-secondary-100 text-secondary-700 border-secondary-200';
      case 'low':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'in-progress':
        return 'bg-secondary-100 text-secondary-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'overdue':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Privacy & Protection</h1>
          <p className="text-gray-500 mt-1">Comprehensive data privacy compliance and protection management</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search data categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Privacy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Lock className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">261.5K</p>
              <p className="text-sm text-gray-600">Protected Records</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Eye className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Privacy Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Shield className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98.7%</p>
              <p className="text-sm text-gray-600">Compliance Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Active Incidents</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Categories & Classification</h3>
          <p className="text-sm text-gray-500 mt-1">Overview of data types and their protection status</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dataCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getClassificationColor(category.classification)}`}>
                    {category.classification}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Records</p>
                    <p className="font-medium text-gray-900">{category.records.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Retention</p>
                    <p className="font-medium text-gray-900">{category.retention}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Encryption</p>
                    <p className="font-medium text-gray-900">{category.encryption}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Audit</p>
                    <p className="font-medium text-gray-900">{category.lastAudit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {category.compliance.map((comp, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {comp}
                      </span>
                    ))}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.riskLevel === 'high' ? 'bg-error-100 text-error-700' :
                    category.riskLevel === 'medium' ? 'bg-warning-100 text-warning-700' :
                    'bg-accent-100 text-accent-700'
                  }`}>
                    {category.riskLevel} risk
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Privacy Rights Requests</h3>
          <p className="text-sm text-gray-500 mt-1">Data subject requests and their processing status</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requestor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {privacyRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{request.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{request.requestor}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                      {request.regulation}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{request.dueDate}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Flows */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Flow Monitoring</h3>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring of data transfers and processing</p>
        </div>

        <div className="p-6 space-y-4">
          {dataFlows.map((flow) => (
            <div key={flow.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Users className="h-5 w-5 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{flow.source} → {flow.destination}</h4>
                  <p className="text-sm text-gray-600">{flow.dataType} • {flow.volume}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {flow.compliance.map((comp, index) => (
                      <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{flow.encryption}</p>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-accent-100 text-accent-700 rounded-full">
                  {flow.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};