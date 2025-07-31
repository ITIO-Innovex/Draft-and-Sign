import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, FileText, Download, Calendar, Settings } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_assessed';
  score: number;
  lastAssessment: string;
  nextAssessment: string;
  requirements: number;
  implemented: number;
  controls: ComplianceControl[];
}

interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  status: 'implemented' | 'partial' | 'not_implemented';
  evidence: string[];
  lastReview: string;
  owner: string;
}

const mockFrameworks: ComplianceFramework[] = [
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    status: 'compliant',
    score: 96,
    lastAssessment: '2024-06-15',
    nextAssessment: '2024-12-15',
    requirements: 25,
    implemented: 24,
    controls: [
      {
        id: 'gdpr_001',
        name: 'Data Processing Lawfulness',
        description: 'Ensure all data processing has a lawful basis',
        status: 'implemented',
        evidence: ['Privacy policy', 'Consent forms', 'Legal basis documentation'],
        lastReview: '2024-06-15',
        owner: 'Legal Team',
      },
      {
        id: 'gdpr_002',
        name: 'Data Subject Rights',
        description: 'Implement mechanisms for data subject rights',
        status: 'implemented',
        evidence: ['Data access portal', 'Deletion procedures', 'Rectification process'],
        lastReview: '2024-06-15',
        owner: 'Privacy Officer',
      },
    ],
  },
  {
    id: 'ccpa',
    name: 'CCPA',
    description: 'California Consumer Privacy Act',
    status: 'compliant',
    score: 94,
    lastAssessment: '2024-06-15',
    nextAssessment: '2024-12-15',
    requirements: 18,
    implemented: 17,
    controls: [],
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    status: 'partial',
    score: 78,
    lastAssessment: '2024-05-30',
    nextAssessment: '2024-11-30',
    requirements: 32,
    implemented: 25,
    controls: [],
  },
  {
    id: 'sox',
    name: 'SOX',
    description: 'Sarbanes-Oxley Act',
    status: 'compliant',
    score: 92,
    lastAssessment: '2024-06-01',
    nextAssessment: '2024-12-01',
    requirements: 15,
    implemented: 14,
    controls: [],
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information Security Management',
    status: 'partial',
    score: 85,
    lastAssessment: '2024-05-15',
    nextAssessment: '2024-11-15',
    requirements: 114,
    implemented: 97,
    controls: [],
  },
];

export const ComplianceCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non_compliant': return 'text-red-600 bg-red-100';
      case 'not_assessed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getControlStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'not_implemented': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const overallCompliance = Math.round(
    mockFrameworks.reduce((sum, framework) => sum + framework.score, 0) / mockFrameworks.length
  );

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'frameworks', name: 'Frameworks', icon: FileText },
    { id: 'assessments', name: 'Assessments', icon: CheckCircle },
    { id: 'reports', name: 'Reports', icon: Download },
  ];

  return (
    <FeatureGate permission="audit_logs">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
            <p className="mt-1 text-gray-600">
              Monitor and manage regulatory compliance across all frameworks.
            </p>
          </div>
          
          <Button>
            <Settings className="mr-2 h-4 w-4" />
            Configure Compliance
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Compliance Score */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Overall Compliance Score</h3>
                  <p className="text-gray-600">Across all active frameworks</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">{overallCompliance}%</div>
                  <div className="text-sm text-gray-600">Excellent</div>
                </div>
              </div>
            </Card>

            {/* Framework Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFrameworks.map((framework) => (
                <Card
                  key={framework.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  onClick={() => setSelectedFramework(framework)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{framework.name}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(framework.status)}`}>
                        {framework.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600">{framework.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Compliance Score</span>
                        <span className="font-medium">{framework.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            framework.score >= 90 ? 'bg-green-600' :
                            framework.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${framework.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{framework.implemented}/{framework.requirements} controls</span>
                      <span>Next: {new Date(framework.nextAssessment).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activities */}
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Compliance Activities</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">GDPR Assessment Completed</p>
                      <p className="text-xs text-gray-500">June 15, 2024 - Score: 96%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">HIPAA Control Gap Identified</p>
                      <p className="text-xs text-gray-500">May 30, 2024 - Requires attention</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">SOX Report Generated</p>
                      <p className="text-xs text-gray-500">June 1, 2024 - Available for download</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Frameworks Tab */}
        {activeTab === 'frameworks' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {mockFrameworks.map((framework) => (
                <Card key={framework.id}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{framework.name}</h3>
                        <p className="text-gray-600">{framework.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(framework.status)}`}>
                          {framework.status.replace('_', ' ')}
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{framework.score}%</div>
                          <div className="text-sm text-gray-600">Compliance</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Requirements:</span>
                        <div className="font-medium">{framework.requirements}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Implemented:</span>
                        <div className="font-medium text-green-600">{framework.implemented}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Assessment:</span>
                        <div className="font-medium">{new Date(framework.lastAssessment).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Assessment:</span>
                        <div className="font-medium">{new Date(framework.nextAssessment).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Assessment
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Upcoming Assessments</h3>
                  <Button>
                    Schedule New Assessment
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mockFrameworks
                    .sort((a, b) => new Date(a.nextAssessment).getTime() - new Date(b.nextAssessment).getTime())
                    .map((framework) => (
                      <div key={framework.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-50 rounded">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{framework.name} Assessment</h4>
                            <p className="text-sm text-gray-600">
                              Due: {new Date(framework.nextAssessment).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {Math.ceil((new Date(framework.nextAssessment).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                          <Button variant="outline" size="sm">
                            Start Assessment
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Assessment History</h3>
                
                <div className="space-y-3">
                  {mockFrameworks.map((framework) => (
                    <div key={framework.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-50 rounded">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{framework.name} Assessment</h4>
                          <p className="text-sm text-gray-600">
                            Completed: {new Date(framework.lastAssessment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{framework.score}%</div>
                          <div className="text-sm text-gray-600">Score</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Generate Compliance Report</h3>
                  <Button>
                    Generate Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="summary">Executive Summary</option>
                      <option value="detailed">Detailed Assessment</option>
                      <option value="gap">Gap Analysis</option>
                      <option value="remediation">Remediation Plan</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Framework
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="all">All Frameworks</option>
                      {mockFrameworks.map((framework) => (
                        <option key={framework.id} value={framework.id}>
                          {framework.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-50 rounded">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Q2 2024 Compliance Summary</h4>
                        <p className="text-sm text-gray-600">Generated: July 1, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-50 rounded">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">GDPR Assessment Report</h4>
                        <p className="text-sm text-gray-600">Generated: June 15, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </FeatureGate>
  );
};