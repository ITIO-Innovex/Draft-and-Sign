import React, { useState } from 'react';
import { FileText, Download, Calendar, Send, Eye, Plus, Settings, BarChart3 } from 'lucide-react';

export const ReportingAdministrator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const reportingMetrics = {
    totalReports: 156,
    scheduledReports: 24,
    automatedReports: 18,
    customReports: 12,
    reportsSentToday: 8,
    avgGenerationTime: '2.3 min',
    successRate: 98.7,
    storageUsed: '1.2 GB'
  };

  const reportTemplates = [
    {
      id: 'RPT-EXEC-001',
      name: 'Executive Compliance Summary',
      category: 'Executive',
      regulation: 'All',
      frequency: 'Weekly',
      recipients: 8,
      lastGenerated: '2024-07-01 09:00',
      nextScheduled: '2024-07-08 09:00',
      status: 'active',
      format: 'PDF',
      size: '2.4 MB',
      sections: ['Compliance Overview', 'Risk Summary', 'Key Metrics', 'Action Items']
    },
    {
      id: 'RPT-GDPR-001',
      name: 'GDPR Compliance Report',
      category: 'Regulatory',
      regulation: 'GDPR',
      frequency: 'Monthly',
      recipients: 15,
      lastGenerated: '2024-06-30 23:00',
      nextScheduled: '2024-07-31 23:00',
      status: 'active',
      format: 'PDF',
      size: '5.8 MB',
      sections: ['Data Processing Activities', 'Privacy Rights Requests', 'Breach Incidents', 'DPO Report']
    },
    {
      id: 'RPT-AUDIT-001',
      name: 'Audit Trail Export',
      category: 'Operational',
      regulation: 'All',
      frequency: 'Daily',
      recipients: 5,
      lastGenerated: '2024-07-01 06:00',
      nextScheduled: '2024-07-02 06:00',
      status: 'active',
      format: 'CSV',
      size: '15.2 MB',
      sections: ['Authentication Logs', 'Data Access Logs', 'System Changes', 'Security Events']
    },
    {
      id: 'RPT-RISK-001',
      name: 'Risk Assessment Dashboard',
      category: 'Risk Management',
      regulation: 'All',
      frequency: 'Bi-weekly',
      recipients: 12,
      lastGenerated: '2024-06-28 14:00',
      nextScheduled: '2024-07-12 14:00',
      status: 'active',
      format: 'HTML',
      size: '1.1 MB',
      sections: ['Risk Register', 'Mitigation Status', 'Trend Analysis', 'Recommendations']
    }
  ];

  const reportDistribution = [
    {
      id: 'DIST-001',
      name: 'Board of Directors',
      reportTypes: ['Executive Summary', 'Risk Overview'],
      members: 8,
      frequency: 'Monthly',
      deliveryMethod: 'Secure Email',
      lastDelivery: '2024-06-30',
      status: 'active'
    },
    {
      id: 'DIST-002',
      name: 'Compliance Team',
      reportTypes: ['GDPR Report', 'Audit Trail', 'Risk Assessment'],
      members: 15,
      frequency: 'Weekly',
      deliveryMethod: 'Portal Access',
      lastDelivery: '2024-07-01',
      status: 'active'
    },
    {
      id: 'DIST-003',
      name: 'External Auditors',
      reportTypes: ['Audit Trail', 'Control Testing'],
      members: 5,
      frequency: 'On-demand',
      deliveryMethod: 'Secure Portal',
      lastDelivery: '2024-06-25',
      status: 'active'
    },
    {
      id: 'DIST-004',
      name: 'Regulatory Authorities',
      reportTypes: ['Compliance Reports', 'Breach Notifications'],
      members: 3,
      frequency: 'As Required',
      deliveryMethod: 'Regulatory Portal',
      lastDelivery: '2024-06-15',
      status: 'active'
    }
  ];

  const reportPerformance = [
    { month: 'Jan', generated: 145, delivered: 142, failed: 3, avgTime: 2.1 },
    { month: 'Feb', generated: 152, delivered: 149, failed: 3, avgTime: 2.0 },
    { month: 'Mar', generated: 148, delivered: 146, failed: 2, avgTime: 1.9 },
    { month: 'Apr', generated: 156, delivered: 154, failed: 2, avgTime: 2.2 },
    { month: 'May', generated: 162, delivered: 160, failed: 2, avgTime: 2.1 },
    { month: 'Jun', generated: 159, delivered: 157, failed: 2, avgTime: 2.3 }
  ];

  const customReports = [
    {
      id: 'CUSTOM-001',
      name: 'SOX Controls Effectiveness',
      creator: 'Emily Watson',
      created: '2024-06-20',
      lastRun: '2024-06-30',
      parameters: ['Date Range', 'Control Category', 'Business Unit'],
      dataSource: 'Compliance Database',
      format: 'Excel',
      status: 'active'
    },
    {
      id: 'CUSTOM-002',
      name: 'Privacy Impact Assessment Summary',
      creator: 'Sarah Johnson',
      created: '2024-06-15',
      lastRun: '2024-06-28',
      parameters: ['Assessment Type', 'Risk Level', 'Department'],
      dataSource: 'Privacy Management System',
      format: 'PDF',
      status: 'active'
    },
    {
      id: 'CUSTOM-003',
      name: 'Training Completion Analytics',
      creator: 'Michael Chen',
      created: '2024-06-10',
      lastRun: '2024-06-25',
      parameters: ['Training Module', 'Employee Group', 'Completion Status'],
      dataSource: 'Training System',
      format: 'Dashboard',
      status: 'draft'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent-100 text-accent-700';
      case 'draft':
        return 'bg-secondary-100 text-secondary-700';
      case 'paused':
        return 'bg-warning-100 text-warning-700';
      case 'error':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Executive':
        return 'bg-primary-100 text-primary-700';
      case 'Regulatory':
        return 'bg-secondary-100 text-secondary-700';
      case 'Operational':
        return 'bg-warning-100 text-warning-700';
      case 'Risk Management':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reporting Administration</h1>
          <p className="text-gray-500 mt-1">Manage automated reporting and regulatory documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Executive">Executive</option>
            <option value="Regulatory">Regulatory</option>
            <option value="Operational">Operational</option>
            <option value="Risk Management">Risk Management</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Create Report</span>
          </button>
        </div>
      </div>

      {/* Reporting Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reportingMetrics.totalReports}</p>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reportingMetrics.scheduledReports}</p>
              <p className="text-sm text-gray-600">Scheduled Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Send className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reportingMetrics.successRate}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{reportingMetrics.avgGenerationTime}</p>
              <p className="text-sm text-gray-600">Avg Generation Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
          <p className="text-sm text-gray-500 mt-1">Manage automated report templates and scheduling</p>
        </div>

        <div className="p-6 space-y-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{template.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span>Regulation: {template.regulation}</span>
                    <span>Format: {template.format}</span>
                    <span>Size: {template.size}</span>
                    <span>Recipients: {template.recipients}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {template.sections.map((section, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Frequency</p>
                  <p className="font-medium text-gray-900">{template.frequency}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Generated</p>
                  <p className="font-medium text-gray-900">{template.lastGenerated}</p>
                </div>
                <div>
                  <p className="text-gray-500">Next Scheduled</p>
                  <p className="font-medium text-gray-900">{template.nextScheduled}</p>
                </div>
                <div>
                  <p className="text-gray-500">Template ID</p>
                  <p className="font-medium text-gray-900">{template.id}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Automated report generation</span>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Settings className="h-4 w-4" />
                    <span>Configure</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                    <Download className="h-4 w-4" />
                    <span>Generate Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Distribution & Custom Reports */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Distribution Groups</h3>
            <p className="text-sm text-gray-500 mt-1">Manage report distribution and recipient groups</p>
          </div>

          <div className="p-6 space-y-4">
            {reportDistribution.map((group) => (
              <div key={group.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{group.name}</h4>
                    <p className="text-sm text-gray-600">{group.members} members • {group.frequency}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>
                    {group.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {group.reportTypes.map((type, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                      {type}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Method: {group.deliveryMethod}</span>
                  <span className="text-gray-500">Last: {group.lastDelivery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
            <p className="text-sm text-gray-500 mt-1">User-created custom reports and analytics</p>
          </div>

          <div className="p-6 space-y-4">
            {customReports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">Created by {report.creator}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Data Source</p>
                    <p className="font-medium text-gray-900">{report.dataSource}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Format</p>
                    <p className="font-medium text-gray-900">{report.format}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-medium text-gray-900">{report.created}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Run</p>
                    <p className="font-medium text-gray-900">{report.lastRun}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {report.parameters.map((param, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {param}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ID: {report.id}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-2 py-1 text-sm text-primary-600 hover:text-primary-700">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button className="flex items-center space-x-1 px-2 py-1 text-sm text-primary-600 hover:text-primary-700">
                      <Settings className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
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