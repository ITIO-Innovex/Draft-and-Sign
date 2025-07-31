import React, { useState } from 'react';
import { FileSearch, Shield, AlertTriangle, Download, Search, Filter, Eye, Lock, Calendar, Database } from 'lucide-react';

export const AuditAdministrator: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const auditMetrics = {
    totalLogs: 2847563,
    todayLogs: 12847,
    integrityScore: 99.97,
    retentionCompliance: 100,
    forensicCases: 3,
    activeCases: 1,
    storageUsed: '2.4 TB',
    compressionRatio: '4.2:1'
  };

  const auditCategories = [
    { name: 'Authentication', count: 45678, percentage: 32.1, trend: '+2.3%' },
    { name: 'Data Access', count: 38924, percentage: 27.4, trend: '+1.8%' },
    { name: 'System Changes', count: 23456, percentage: 16.5, trend: '-0.5%' },
    { name: 'Compliance Events', count: 18732, percentage: 13.2, trend: '+4.2%' },
    { name: 'Security Events', count: 15234, percentage: 10.8, trend: '+0.9%' }
  ];

  const forensicCases = [
    {
      id: 'FC-2024-001',
      title: 'Unauthorized Data Access Investigation',
      status: 'active',
      priority: 'high',
      investigator: 'Sarah Johnson',
      created: '2024-06-28',
      lastUpdate: '2024-07-01',
      evidence: 247,
      timeline: '2024-06-25 to 2024-06-27',
      regulation: 'GDPR',
      description: 'Investigation into potential unauthorized access to customer personal data'
    },
    {
      id: 'FC-2024-002',
      title: 'Financial Data Integrity Audit',
      status: 'completed',
      priority: 'medium',
      investigator: 'Michael Chen',
      created: '2024-06-15',
      completed: '2024-06-30',
      evidence: 156,
      timeline: '2024-06-10 to 2024-06-20',
      regulation: 'SOX',
      description: 'Forensic audit of financial data integrity and control effectiveness'
    },
    {
      id: 'FC-2024-003',
      title: 'Healthcare Data Breach Analysis',
      status: 'pending',
      priority: 'high',
      investigator: 'David Rodriguez',
      created: '2024-07-01',
      evidence: 89,
      timeline: '2024-06-28 to 2024-06-30',
      regulation: 'HIPAA',
      description: 'Analysis of potential PHI data breach incident'
    }
  ];

  const auditIntegrity = [
    { system: 'Authentication Logs', integrity: 99.98, lastCheck: '2024-07-01 14:30', status: 'verified' },
    { system: 'Data Access Logs', integrity: 99.97, lastCheck: '2024-07-01 14:25', status: 'verified' },
    { system: 'System Change Logs', integrity: 99.99, lastCheck: '2024-07-01 14:20', status: 'verified' },
    { system: 'Compliance Logs', integrity: 99.96, lastCheck: '2024-07-01 14:15', status: 'verified' },
    { system: 'Security Event Logs', integrity: 99.95, lastCheck: '2024-07-01 14:10', status: 'warning' }
  ];

  const retentionPolicies = [
    { regulation: 'GDPR', category: 'Personal Data Access', retention: '7 years', current: '2.1 years avg', compliance: 100 },
    { regulation: 'HIPAA', category: 'PHI Access Logs', retention: '6 years', current: '1.8 years avg', compliance: 100 },
    { regulation: 'SOX', category: 'Financial Controls', retention: '7 years', current: '3.2 years avg', compliance: 100 },
    { regulation: 'PCI DSS', category: 'Payment Logs', retention: '1 year', current: '8 months avg', compliance: 100 },
    { regulation: 'General', category: 'System Logs', retention: '3 years', current: '1.5 years avg', compliance: 100 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-warning-100 text-warning-700';
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'pending':
        return 'bg-secondary-100 text-secondary-700';
      case 'verified':
        return 'bg-accent-100 text-accent-700';
      case 'warning':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
          <h1 className="text-2xl font-bold text-gray-900">Audit Administration</h1>
          <p className="text-gray-500 mt-1">Comprehensive audit trail management and forensic analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export Audit Data</span>
          </button>
        </div>
      </div>

      {/* Audit Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Database className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{auditMetrics.totalLogs.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Audit Logs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Shield className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{auditMetrics.integrityScore}%</p>
              <p className="text-sm text-gray-600">Integrity Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <FileSearch className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{auditMetrics.forensicCases}</p>
              <p className="text-sm text-gray-600">Forensic Cases</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Calendar className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{auditMetrics.retentionCompliance}%</p>
              <p className="text-sm text-gray-600">Retention Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Audit Log Categories</h3>
          <p className="text-sm text-gray-500 mt-1">Distribution and trends of audit log categories</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {auditCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{category.count.toLocaleString()}</span>
                      <span className={`text-sm ${category.trend.startsWith('+') ? 'text-accent-600' : 'text-error-600'}`}>
                        {category.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">{category.percentage}% of total</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forensic Cases */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Forensic Investigation Cases</h3>
          <p className="text-sm text-gray-500 mt-1">Active and completed forensic investigations</p>
        </div>

        <div className="p-6 space-y-4">
          {forensicCases.map((case_) => (
            <div key={case_.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{case_.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                      {case_.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                      {case_.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{case_.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Case ID: {case_.id}</span>
                    <span>Regulation: {case_.regulation}</span>
                    <span>Evidence: {case_.evidence} items</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Investigator</p>
                  <p className="font-medium text-gray-900">{case_.investigator}</p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-medium text-gray-900">{case_.created}</p>
                </div>
                <div>
                  <p className="text-gray-500">Timeline</p>
                  <p className="font-medium text-gray-900">{case_.timeline}</p>
                </div>
                <div>
                  <p className="text-gray-500">{case_.completed ? 'Completed' : 'Last Update'}</p>
                  <p className="font-medium text-gray-900">{case_.completed || case_.lastUpdate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Forensic evidence secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Download className="h-4 w-4" />
                    <span>Export Evidence</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Integrity & Retention */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Audit Trail Integrity</h3>
            <p className="text-sm text-gray-500 mt-1">Tamper-evident verification and integrity monitoring</p>
          </div>

          <div className="p-6 space-y-4">
            {auditIntegrity.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{system.system}</h4>
                  <p className="text-sm text-gray-500">Last check: {system.lastCheck}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{system.integrity}%</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                      {system.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Retention Policy Compliance</h3>
            <p className="text-sm text-gray-500 mt-1">Regulatory retention requirements and compliance status</p>
          </div>

          <div className="p-6 space-y-4">
            {retentionPolicies.map((policy, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{policy.category}</h4>
                    <p className="text-sm text-gray-500">{policy.regulation}</p>
                  </div>
                  <span className="text-lg font-bold text-accent-600">{policy.compliance}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Required</p>
                    <p className="font-medium text-gray-900">{policy.retention}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Current Avg</p>
                    <p className="font-medium text-gray-900">{policy.current}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};