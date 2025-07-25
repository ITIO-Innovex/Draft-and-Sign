import React, { useState } from 'react';
import { CheckSquare, AlertTriangle, Clock, Target, Play, FileText, Download, Plus } from 'lucide-react';

export const ComplianceAssessment: React.FC = () => {
  const [selectedRegulation, setSelectedRegulation] = useState('all');

  const assessments = [
    {
      id: 1,
      name: 'GDPR Compliance Assessment',
      regulation: 'GDPR',
      type: 'comprehensive',
      status: 'completed',
      score: 94,
      lastRun: '2024-01-15',
      nextDue: '2024-04-15',
      duration: '45 minutes',
      controls: 45,
      passed: 42,
      failed: 2,
      pending: 1,
      riskLevel: 'low',
      assessor: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'HIPAA Security Assessment',
      regulation: 'HIPAA',
      type: 'security-focused',
      status: 'in-progress',
      score: 76,
      lastRun: '2024-01-12',
      nextDue: '2024-04-12',
      duration: '60 minutes',
      controls: 38,
      passed: 29,
      failed: 6,
      pending: 3,
      riskLevel: 'medium',
      assessor: 'Michael Chen'
    },
    {
      id: 3,
      name: 'PCI DSS Compliance Review',
      regulation: 'PCI DSS',
      type: 'technical',
      status: 'scheduled',
      score: 88,
      lastRun: '2024-01-08',
      nextDue: '2024-02-08',
      duration: '90 minutes',
      controls: 35,
      passed: 31,
      failed: 3,
      pending: 1,
      riskLevel: 'low',
      assessor: 'David Rodriguez'
    },
    {
      id: 4,
      name: 'SOX Internal Controls Assessment',
      regulation: 'SOX',
      type: 'financial',
      status: 'overdue',
      score: 92,
      lastRun: '2023-12-20',
      nextDue: '2024-01-20',
      duration: '120 minutes',
      controls: 52,
      passed: 48,
      failed: 2,
      pending: 2,
      riskLevel: 'medium',
      assessor: 'Emily Watson'
    }
  ];

  const assessmentTemplates = [
    {
      id: 'gdpr-template',
      name: 'GDPR Data Protection Assessment',
      regulation: 'GDPR',
      controls: 45,
      estimatedTime: '45 min',
      description: 'Comprehensive GDPR compliance assessment covering all articles and requirements'
    },
    {
      id: 'hipaa-template',
      name: 'HIPAA Security Rule Assessment',
      regulation: 'HIPAA',
      controls: 38,
      estimatedTime: '60 min',
      description: 'Security-focused assessment for HIPAA compliance in healthcare environments'
    },
    {
      id: 'pci-template',
      name: 'PCI DSS Technical Assessment',
      regulation: 'PCI DSS',
      controls: 35,
      estimatedTime: '90 min',
      description: 'Technical assessment for payment card industry security standards'
    },
    {
      id: 'sox-template',
      name: 'SOX Financial Controls Assessment',
      regulation: 'SOX',
      controls: 52,
      estimatedTime: '120 min',
      description: 'Internal controls assessment for financial reporting compliance'
    }
  ];

  const controlCategories = [
    {
      category: 'Data Protection',
      total: 156,
      passed: 142,
      failed: 8,
      pending: 6,
      compliance: 91
    },
    {
      category: 'Access Controls',
      total: 89,
      passed: 81,
      failed: 5,
      pending: 3,
      compliance: 91
    },
    {
      category: 'Security Measures',
      total: 124,
      passed: 108,
      failed: 12,
      pending: 4,
      compliance: 87
    },
    {
      category: 'Documentation',
      total: 67,
      passed: 59,
      failed: 6,
      pending: 2,
      compliance: 88
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'in-progress':
        return 'bg-secondary-100 text-secondary-700';
      case 'scheduled':
        return 'bg-primary-100 text-primary-700';
      case 'overdue':
        return 'bg-error-100 text-error-700';
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

  const filteredAssessments = assessments.filter(assessment => 
    selectedRegulation === 'all' || assessment.regulation === selectedRegulation
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Assessment</h1>
          <p className="text-gray-500 mt-1">Automated compliance assessments and gap analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Regulations</option>
            <option value="GDPR">GDPR</option>
            <option value="HIPAA">HIPAA</option>
            <option value="PCI DSS">PCI DSS</option>
            <option value="SOX">SOX</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>New Assessment</span>
          </button>
        </div>
      </div>

      {/* Assessment Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CheckSquare className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">87.5%</p>
              <p className="text-sm text-gray-600">Avg Compliance Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Target className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">390</p>
              <p className="text-sm text-gray-600">Controls Passed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">31</p>
              <p className="text-sm text-gray-600">Failed Controls</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Clock className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Pending Reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Assessments</h3>
          <p className="text-sm text-gray-500 mt-1">Latest compliance assessment results and status</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{assessment.name}</h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-primary-600 font-medium">{assessment.regulation}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(assessment.riskLevel)}`}>
                        {assessment.riskLevel} risk
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{assessment.score}%</div>
                    <div className="text-sm text-gray-500">Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-600">{assessment.passed}</p>
                    <p className="text-gray-500">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-error-600">{assessment.failed}</p>
                    <p className="text-gray-500">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning-600">{assessment.pending}</p>
                    <p className="text-gray-500">Pending</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Last Run</p>
                    <p className="font-medium text-gray-900">{assessment.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Next Due</p>
                    <p className="font-medium text-gray-900">{assessment.nextDue}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium text-gray-900">{assessment.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Assessor</p>
                    <p className="font-medium text-gray-900">{assessment.assessor}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{assessment.controls} controls total</span>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      <FileText className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors duration-200">
                      <Play className="h-4 w-4" />
                      <span>Run</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Control Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Control Categories Performance</h3>
          <p className="text-sm text-gray-500 mt-1">Compliance performance by control category</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {controlCategories.map((category, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{category.category}</h4>
                  <span className="text-lg font-bold text-gray-900">{category.compliance}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${category.compliance}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{category.total}</p>
                    <p className="text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-accent-600">{category.passed}</p>
                    <p className="text-gray-500">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-error-600">{category.failed}</p>
                    <p className="text-gray-500">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-warning-600">{category.pending}</p>
                    <p className="text-gray-500">Pending</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Assessment Templates</h3>
          <p className="text-sm text-gray-500 mt-1">Pre-configured assessment templates for different regulations</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {template.regulation}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{template.controls} controls</span>
                    <span>{template.estimatedTime}</span>
                  </div>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors duration-200">
                    <Play className="h-4 w-4" />
                    <span>Start</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};