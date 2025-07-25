import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter, Send, Eye, Plus } from 'lucide-react';

export const Reporting: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('compliance-summary');

  const reports = [
    {
      id: 'compliance-summary',
      name: 'Compliance Summary Report',
      description: 'Comprehensive overview of all regulatory compliance status',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      nextDue: '2024-02-15',
      format: 'PDF',
      status: 'current',
      regulation: 'All'
    },
    {
      id: 'gdpr-dpia',
      name: 'GDPR Data Protection Impact Assessment',
      description: 'Detailed GDPR compliance assessment and risk analysis',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-10',
      nextDue: '2024-04-10',
      format: 'PDF',
      status: 'current',
      regulation: 'GDPR'
    },
    {
      id: 'audit-trail',
      name: 'Audit Trail Report',
      description: 'Complete audit log with forensic analysis',
      frequency: 'Weekly',
      lastGenerated: '2024-01-12',
      nextDue: '2024-01-19',
      format: 'CSV',
      status: 'due-soon',
      regulation: 'All'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment Report',
      description: 'Risk analysis and mitigation strategies',
      frequency: 'Monthly',
      lastGenerated: '2024-01-08',
      nextDue: '2024-02-08',
      format: 'PDF',
      status: 'current',
      regulation: 'All'
    },
    {
      id: 'pci-compliance',
      name: 'PCI DSS Compliance Report',
      description: 'Payment card industry compliance assessment',
      frequency: 'Quarterly',
      lastGenerated: '2023-12-20',
      nextDue: '2024-03-20',
      format: 'PDF',
      status: 'overdue',
      regulation: 'PCI DSS'
    },
    {
      id: 'training-completion',
      name: 'Training Completion Report',
      description: 'Staff compliance training completion status',
      frequency: 'Monthly',
      lastGenerated: '2024-01-14',
      nextDue: '2024-02-14',
      format: 'Excel',
      status: 'current',
      regulation: 'All'
    }
  ];

  const customReportTemplates = [
    { id: 'custom-gdpr', name: 'Custom GDPR Report', fields: 12 },
    { id: 'custom-security', name: 'Security Assessment Report', fields: 8 },
    { id: 'custom-audit', name: 'Custom Audit Report', fields: 15 },
    { id: 'custom-risk', name: 'Risk Analysis Report', fields: 10 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-accent-100 text-accent-700';
      case 'due-soon':
        return 'bg-warning-100 text-warning-700';
      case 'overdue':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'due-soon':
        return 'Due Soon';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulatory Reporting</h1>
          <p className="text-gray-500 mt-1">Generate and manage compliance reports and documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="h-4 w-4" />
            <span>Filter Reports</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Create Custom Report</span>
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Active Reports</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Download className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Due Soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <Send className="h-6 w-6 text-error-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-sm text-gray-600">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Standard Compliance Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Pre-configured reports for regulatory compliance</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">Regulation: <span className="text-gray-900 font-medium">{report.regulation}</span></span>
                      <span className="text-gray-500">Format: <span className="text-gray-900 font-medium">{report.format}</span></span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p className="font-medium text-gray-900">{report.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Generated</p>
                    <p className="font-medium text-gray-900">{report.lastGenerated}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Next Due: {report.nextDue}</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors duration-200">
                      <Download className="h-4 w-4" />
                      <span>Generate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Custom Report Templates</h3>
          <p className="text-sm text-gray-500 mt-1">Build custom reports with specific data fields and formats</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customReportTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-secondary-100 rounded-lg">
                    <FileText className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-500">{template.fields} fields</p>
                  </div>
                </div>
                <button className="w-full px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors duration-200">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Automated Report Scheduling</h3>
          <p className="text-sm text-gray-500 mt-1">Configure automatic report generation and distribution</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Monthly Compliance Summary</h4>
                <p className="text-sm text-gray-500">Automatically generated on the 1st of each month</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">Active</span>
                <button className="text-sm text-primary-600 hover:text-primary-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Weekly Audit Trail Export</h4>
                <p className="text-sm text-gray-500">CSV export every Friday at 5:00 PM</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs font-medium">Active</span>
                <button className="text-sm text-primary-600 hover:text-primary-700">Edit</button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Quarterly Risk Assessment</h4>
                <p className="text-sm text-gray-500">Comprehensive risk report every quarter</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Paused</span>
                <button className="text-sm text-primary-600 hover:text-primary-700">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};