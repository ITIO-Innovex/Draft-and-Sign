import React, { useState } from 'react';
import { Lock, Shield, Eye, Download, Search, Users, Database, AlertCircle } from 'lucide-react';

export const PrivacyAdministrator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const privacyMetrics = {
    totalDataSubjects: 125000,
    activeRequests: 23,
    completedRequests: 1847,
    averageResponseTime: '12 days',
    complianceScore: 98.7,
    dataBreaches: 0,
    consentRate: 94.2,
    optOutRate: 3.1
  };

  const dataCategories = [
    {
      id: 'personal-data',
      name: 'Personal Data',
      records: 125000,
      classification: 'high',
      retention: '7 years',
      encryption: 'AES-256',
      lastAudit: '2024-06-15',
      compliance: ['GDPR', 'CCPA'],
      riskLevel: 'medium',
      dataFlows: 8,
      processors: 3
    },
    {
      id: 'financial-data',
      name: 'Financial Data',
      records: 89000,
      classification: 'critical',
      retention: '10 years',
      encryption: 'AES-256',
      lastAudit: '2024-06-12',
      compliance: ['PCI DSS', 'SOX'],
      riskLevel: 'high',
      dataFlows: 5,
      processors: 2
    },
    {
      id: 'health-data',
      name: 'Health Data',
      records: 45000,
      classification: 'critical',
      retention: '6 years',
      encryption: 'AES-256',
      lastAudit: '2024-06-10',
      compliance: ['HIPAA'],
      riskLevel: 'high',
      dataFlows: 3,
      processors: 1
    }
  ];

  const privacyRequests = [
    {
      id: 'PR-2024-001',
      type: 'Data Access Request',
      regulation: 'GDPR',
      requestor: 'john.doe@email.com',
      status: 'in-progress',
      submitted: '2024-06-28',
      dueDate: '2024-07-28',
      assignee: 'Sarah Johnson',
      category: 'personal-data',
      priority: 'medium',
      progress: 65
    },
    {
      id: 'PR-2024-002',
      type: 'Data Deletion Request',
      regulation: 'CCPA',
      requestor: 'jane.smith@email.com',
      status: 'completed',
      submitted: '2024-06-25',
      completed: '2024-07-01',
      assignee: 'Michael Chen',
      category: 'personal-data',
      priority: 'high',
      progress: 100
    },
    {
      id: 'PR-2024-003',
      type: 'Data Portability Request',
      regulation: 'GDPR',
      requestor: 'mike.johnson@email.com',
      status: 'pending',
      submitted: '2024-07-01',
      dueDate: '2024-07-31',
      assignee: 'David Rodriguez',
      category: 'personal-data',
      priority: 'low',
      progress: 15
    }
  ];

  const consentManagement = [
    {
      purpose: 'Marketing Communications',
      totalSubjects: 125000,
      consented: 89500,
      consentRate: 71.6,
      optOuts: 2300,
      lastUpdate: '2024-06-30'
    },
    {
      purpose: 'Analytics and Performance',
      totalSubjects: 125000,
      consented: 118750,
      consentRate: 95.0,
      optOuts: 450,
      lastUpdate: '2024-06-30'
    },
    {
      purpose: 'Third-party Sharing',
      totalSubjects: 125000,
      consented: 67500,
      consentRate: 54.0,
      optOuts: 8900,
      lastUpdate: '2024-06-30'
    }
  ];

  const dataProcessors = [
    {
      id: 'DP-001',
      name: 'CloudStorage Inc.',
      type: 'Data Processor',
      dataTypes: ['Personal Data', 'Financial Data'],
      location: 'EU',
      contractStatus: 'active',
      lastAssessment: '2024-05-15',
      riskLevel: 'low',
      complianceScore: 96
    },
    {
      id: 'DP-002',
      name: 'Analytics Solutions Ltd.',
      type: 'Data Processor',
      dataTypes: ['Personal Data'],
      location: 'US',
      contractStatus: 'active',
      lastAssessment: '2024-04-20',
      riskLevel: 'medium',
      complianceScore: 89
    },
    {
      id: 'DP-003',
      name: 'Healthcare Systems Corp.',
      type: 'Data Processor',
      dataTypes: ['Health Data'],
      location: 'US',
      contractStatus: 'review',
      lastAssessment: '2024-03-10',
      riskLevel: 'high',
      complianceScore: 78
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
      case 'active':
        return 'bg-accent-100 text-accent-700';
      case 'review':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
      case 'low':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy Administration</h1>
          <p className="text-gray-500 mt-1">Data privacy compliance and protection management</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search privacy data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export Privacy Report</span>
          </button>
        </div>
      </div>

      {/* Privacy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{privacyMetrics.totalDataSubjects.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Data Subjects</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Eye className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{privacyMetrics.activeRequests}</p>
              <p className="text-sm text-gray-600">Active Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Shield className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{privacyMetrics.complianceScore}%</p>
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
              <p className="text-2xl font-bold text-gray-900">{privacyMetrics.averageResponseTime}</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Categories Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Categories & Classification</h3>
          <p className="text-sm text-gray-500 mt-1">Manage data types and their privacy protection status</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {dataCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getClassificationColor(category.classification)}`}>
                        {category.classification}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(category.riskLevel)}`}>
                        {category.riskLevel} risk
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {category.compliance.map((comp, index) => (
                        <span key={index} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{category.records.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Records</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Retention</p>
                    <p className="font-medium text-gray-900">{category.retention}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Encryption</p>
                    <p className="font-medium text-gray-900">{category.encryption}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Data Flows</p>
                    <p className="font-medium text-gray-900">{category.dataFlows} active</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Processors</p>
                    <p className="font-medium text-gray-900">{category.processors} third-party</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last audit: {category.lastAudit}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                      <Database className="h-4 w-4" />
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Requests Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Privacy Rights Requests</h3>
          <p className="text-sm text-gray-500 mt-1">Manage data subject requests and their processing status</p>
        </div>

        <div className="p-6 space-y-4">
          {privacyRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.type}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {request.regulation}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">Request ID: {request.id}</p>
                  <p className="text-gray-600">Requestor: {request.requestor}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{request.progress}%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>

              {request.status === 'in-progress' && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${request.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Assignee</p>
                  <p className="font-medium text-gray-900">{request.assignee}</p>
                </div>
                <div>
                  <p className="text-gray-500">Submitted</p>
                  <p className="font-medium text-gray-900">{request.submitted}</p>
                </div>
                <div>
                  <p className="text-gray-500">{request.completed ? 'Completed' : 'Due Date'}</p>
                  <p className="font-medium text-gray-900">{request.completed || request.dueDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Priority</p>
                  <p className="font-medium text-gray-900">{request.priority}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Category: {request.category}</span>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                    Process
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consent Management & Data Processors */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Consent Management</h3>
            <p className="text-sm text-gray-500 mt-1">Track consent rates and opt-out patterns</p>
          </div>

          <div className="p-6 space-y-4">
            {consentManagement.map((consent, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{consent.purpose}</h4>
                  <span className="text-lg font-bold text-gray-900">{consent.consentRate}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-accent-500 h-2 rounded-full"
                    style={{ width: `${consent.consentRate}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Consented</p>
                    <p className="font-medium text-gray-900">{consent.consented.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Opt-outs</p>
                    <p className="font-medium text-gray-900">{consent.optOuts.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Updated</p>
                    <p className="font-medium text-gray-900">{consent.lastUpdate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Data Processors</h3>
            <p className="text-sm text-gray-500 mt-1">Third-party data processor management</p>
          </div>

          <div className="p-6 space-y-4">
            {dataProcessors.map((processor) => (
              <div key={processor.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{processor.name}</h4>
                    <p className="text-sm text-gray-600">{processor.type} • {processor.location}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(processor.contractStatus)}`}>
                      {processor.contractStatus}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(processor.riskLevel)}`}>
                      {processor.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {processor.dataTypes.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Score: {processor.complianceScore}%</span>
                  <span className="text-gray-500">Last assessed: {processor.lastAssessment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};