import React, { useState } from 'react';
import { Shield, Plus, Settings, Eye, AlertCircle, CheckCircle, Clock, TrendingUp, Download } from 'lucide-react';

export const RegulationManager: React.FC = () => {
  const [selectedRegulation, setSelectedRegulation] = useState('all');
  const [viewMode, setViewMode] = useState('overview');

  const regulations = [
    {
      id: 'gdpr',
      name: 'GDPR',
      fullName: 'General Data Protection Regulation',
      region: 'European Union',
      status: 'compliant',
      score: 96.2,
      lastAssessment: '2024-06-15',
      nextReview: '2024-12-15',
      requirements: 45,
      compliantRequirements: 43,
      partialRequirements: 2,
      nonCompliantRequirements: 0,
      riskLevel: 'low',
      trend: '+2.1%',
      assessmentHistory: [
        { date: '2024-06-15', score: 96.2, assessor: 'Sarah Johnson' },
        { date: '2024-03-15', score: 94.1, assessor: 'Michael Chen' },
        { date: '2023-12-15', score: 92.8, assessor: 'Sarah Johnson' }
      ],
      recentChanges: [
        { date: '2024-06-01', change: 'Updated data retention policies', impact: 'medium' },
        { date: '2024-05-15', change: 'Enhanced consent management', impact: 'high' }
      ]
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      fullName: 'Health Insurance Portability and Accountability Act',
      region: 'United States',
      status: 'compliant',
      score: 94.8,
      lastAssessment: '2024-05-20',
      nextReview: '2024-11-20',
      requirements: 38,
      compliantRequirements: 36,
      partialRequirements: 2,
      nonCompliantRequirements: 0,
      riskLevel: 'low',
      trend: '+1.5%',
      assessmentHistory: [
        { date: '2024-05-20', score: 94.8, assessor: 'David Rodriguez' },
        { date: '2024-02-20', score: 93.3, assessor: 'Emily Watson' },
        { date: '2023-11-20', score: 91.7, assessor: 'David Rodriguez' }
      ],
      recentChanges: [
        { date: '2024-05-10', change: 'Implemented additional PHI safeguards', impact: 'high' },
        { date: '2024-04-25', change: 'Updated breach notification procedures', impact: 'medium' }
      ]
    },
    {
      id: 'sox',
      name: 'SOX',
      fullName: 'Sarbanes-Oxley Act',
      region: 'United States',
      status: 'partial',
      score: 78.3,
      lastAssessment: '2024-06-01',
      nextReview: '2024-09-01',
      requirements: 52,
      compliantRequirements: 41,
      partialRequirements: 8,
      nonCompliantRequirements: 3,
      riskLevel: 'medium',
      trend: '-3.2%',
      remediationPlan: 'Q3 2024',
      assessmentHistory: [
        { date: '2024-06-01', score: 78.3, assessor: 'Emily Watson' },
        { date: '2024-03-01', score: 81.5, assessor: 'James Liu' },
        { date: '2023-12-01', score: 83.2, assessor: 'Emily Watson' }
      ],
      recentChanges: [
        { date: '2024-05-20', change: 'Identified control gaps in financial reporting', impact: 'high' },
        { date: '2024-05-05', change: 'Updated internal control documentation', impact: 'medium' }
      ]
    }
  ];

  const bulkActions = [
    { id: 'assessment', label: 'Schedule Assessment', icon: CheckCircle },
    { id: 'review', label: 'Initiate Review', icon: Eye },
    { id: 'report', label: 'Generate Report', icon: Download },
    { id: 'remediation', label: 'Plan Remediation', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-accent-100 text-accent-700';
      case 'partial':
        return 'bg-warning-100 text-warning-700';
      case 'non-compliant':
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

  const filteredRegulations = regulations.filter(reg => 
    selectedRegulation === 'all' || reg.id === selectedRegulation
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulation Management</h1>
          <p className="text-gray-500 mt-1">Comprehensive regulatory compliance oversight and management</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegulation}
            onChange={(e) => setSelectedRegulation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Regulations</option>
            {regulations.map((reg) => (
              <option key={reg.id} value={reg.id}>{reg.name}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Add Regulation</span>
          </button>
        </div>
      </div>

      {/* Regulation Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{regulations.length}</p>
              <p className="text-sm text-gray-600">Total Regulations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{regulations.filter(r => r.status === 'compliant').length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{regulations.filter(r => r.status === 'partial').length}</p>
              <p className="text-sm text-gray-600">Partial Compliance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89.8%</p>
              <p className="text-sm text-gray-600">Avg Compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Operations</h3>
        <div className="flex flex-wrap gap-3">
          {bulkActions.map((action) => (
            <button
              key={action.id}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <action.icon className="h-4 w-4" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Regulation Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Regulation Details</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'overview' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode('requirements')}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'requirements' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Requirements
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`px-3 py-1 text-sm rounded ${viewMode === 'history' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                History
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {viewMode === 'overview' && (
            <div className="space-y-6">
              {filteredRegulations.map((regulation) => (
                <div key={regulation.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-semibold text-gray-900">{regulation.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(regulation.status)}`}>
                          {regulation.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(regulation.riskLevel)}`}>
                          {regulation.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{regulation.fullName}</p>
                      <p className="text-sm text-gray-500">{regulation.region}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{regulation.score}%</div>
                      <div className={`text-sm ${regulation.trend?.startsWith('+') ? 'text-accent-600' : 'text-error-600'}`}>
                        {regulation.trend}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-accent-50 rounded-lg">
                      <p className="text-2xl font-bold text-accent-600">{regulation.compliantRequirements}</p>
                      <p className="text-sm text-gray-600">Compliant</p>
                    </div>
                    <div className="text-center p-3 bg-warning-50 rounded-lg">
                      <p className="text-2xl font-bold text-warning-600">{regulation.partialRequirements}</p>
                      <p className="text-sm text-gray-600">Partial</p>
                    </div>
                    <div className="text-center p-3 bg-error-50 rounded-lg">
                      <p className="text-2xl font-bold text-error-600">{regulation.nonCompliantRequirements}</p>
                      <p className="text-sm text-gray-600">Non-Compliant</p>
                    </div>
                    <div className="text-center p-3 bg-primary-50 rounded-lg">
                      <p className="text-2xl font-bold text-primary-600">{regulation.requirements}</p>
                      <p className="text-sm text-gray-600">Total</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Last Assessment</p>
                      <p className="font-medium text-gray-900">{regulation.lastAssessment}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Review</p>
                      <p className="font-medium text-gray-900">{regulation.nextReview || regulation.remediationPlan}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${regulation.score}%`,
                          backgroundColor: regulation.status === 'compliant' ? '#059669' : 
                                         regulation.status === 'partial' ? '#ea580c' : '#dc2626'
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                        <Eye className="h-4 w-4" />
                        <span>Details</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                        <Settings className="h-4 w-4" />
                        <span>Configure</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'requirements' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Requirements view - detailed compliance requirements breakdown</p>
            </div>
          )}

          {viewMode === 'history' && (
            <div className="text-center py-12">
              <p className="text-gray-500">History view - assessment history and compliance trends</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};