import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Target, Plus, Eye, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const RiskAdministrator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('overview');

  const riskMetrics = {
    totalRisks: 247,
    highRisks: 18,
    mediumRisks: 89,
    lowRisks: 140,
    overdue: 12,
    mitigated: 156,
    averageRiskScore: 6.8,
    riskTrend: 'decreasing'
  };

  const riskTrends = [
    { month: 'Jan', high: 25, medium: 95, low: 120, total: 240 },
    { month: 'Feb', high: 23, medium: 92, low: 125, total: 240 },
    { month: 'Mar', high: 21, medium: 88, low: 130, total: 239 },
    { month: 'Apr', high: 19, medium: 85, low: 135, total: 239 },
    { month: 'May', high: 20, medium: 87, low: 138, total: 245 },
    { month: 'Jun', high: 18, medium: 89, low: 140, total: 247 }
  ];

  const risksByCategory = [
    { category: 'Data Privacy', high: 5, medium: 15, low: 25, total: 45, trend: '-8%' },
    { category: 'Security', high: 8, medium: 22, low: 35, total: 65, trend: '-12%' },
    { category: 'Compliance', high: 2, medium: 28, low: 45, total: 75, trend: '+3%' },
    { category: 'Operational', high: 3, medium: 24, low: 35, total: 62, trend: '-5%' }
  ];

  const criticalRisks = [
    {
      id: 'RISK-2024-001',
      title: 'Unauthorized Data Access Vulnerability',
      category: 'Data Privacy',
      regulation: 'GDPR',
      severity: 'high',
      probability: 'medium',
      impact: 'high',
      riskScore: 8.5,
      status: 'open',
      assignee: 'Sarah Johnson',
      dueDate: '2024-07-15',
      description: 'Potential unauthorized access to customer personal data through API vulnerabilities',
      mitigation: 'Implement additional authentication and access controls',
      lastUpdate: '2024-07-01'
    },
    {
      id: 'RISK-2024-002',
      title: 'Payment Data Exposure Risk',
      category: 'Security',
      regulation: 'PCI DSS',
      severity: 'high',
      probability: 'low',
      impact: 'critical',
      riskScore: 7.8,
      status: 'in-progress',
      assignee: 'Michael Chen',
      dueDate: '2024-07-10',
      description: 'Vulnerability in payment processing system could expose cardholder data',
      mitigation: 'Update payment gateway security and implement tokenization',
      lastUpdate: '2024-06-30'
    },
    {
      id: 'RISK-2024-003',
      title: 'Healthcare Data Breach Risk',
      category: 'Data Privacy',
      regulation: 'HIPAA',
      severity: 'medium',
      probability: 'medium',
      impact: 'high',
      riskScore: 6.8,
      status: 'open',
      assignee: 'David Rodriguez',
      dueDate: '2024-07-20',
      description: 'Insufficient encryption of PHI data at rest in legacy systems',
      mitigation: 'Implement end-to-end encryption for all PHI data',
      lastUpdate: '2024-06-28'
    }
  ];

  const riskAssessments = [
    {
      id: 'RA-2024-Q2-001',
      name: 'Quarterly Data Privacy Risk Assessment',
      type: 'Scheduled',
      regulation: 'GDPR',
      status: 'completed',
      assessor: 'Sarah Johnson',
      completedDate: '2024-06-30',
      risksIdentified: 12,
      highRisks: 2,
      recommendations: 8
    },
    {
      id: 'RA-2024-SEC-001',
      name: 'Security Infrastructure Assessment',
      type: 'Ad-hoc',
      regulation: 'ISO 27001',
      status: 'in-progress',
      assessor: 'Michael Chen',
      startDate: '2024-06-25',
      progress: 75,
      risksIdentified: 8,
      highRisks: 1
    },
    {
      id: 'RA-2024-FIN-001',
      name: 'Financial Controls Risk Review',
      type: 'Compliance',
      regulation: 'SOX',
      status: 'scheduled',
      assessor: 'Emily Watson',
      scheduledDate: '2024-07-15',
      scope: 'Internal Controls'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'high':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'medium':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'low':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-error-100 text-error-700';
      case 'in-progress':
        return 'bg-warning-100 text-warning-700';
      case 'resolved':
        return 'bg-accent-100 text-accent-700';
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'scheduled':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Administration</h1>
          <p className="text-gray-500 mt-1">Enterprise risk management and governance oversight</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Data Privacy">Data Privacy</option>
            <option value="Security">Security</option>
            <option value="Compliance">Compliance</option>
            <option value="Operational">Operational</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>New Risk Assessment</span>
          </button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-error-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{riskMetrics.highRisks}</p>
              <p className="text-sm text-gray-600">High Risk Items</p>
              <div className="flex items-center text-error-600 mt-1">
                <TrendingDown className="h-3 w-3" />
                <span className="text-xs ml-1">-15%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{riskMetrics.mediumRisks}</p>
              <p className="text-sm text-gray-600">Medium Risk Items</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingDown className="h-3 w-3" />
                <span className="text-xs ml-1">-8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Shield className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{riskMetrics.mitigated}</p>
              <p className="text-sm text-gray-600">Risks Mitigated</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+23%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{riskMetrics.averageRiskScore}</p>
              <p className="text-sm text-gray-600">Avg Risk Score</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingDown className="h-3 w-3" />
                <span className="text-xs ml-1">-12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Trend Analysis</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="high" stroke="#dc2626" strokeWidth={3} name="High Risk" />
                <Line type="monotone" dataKey="medium" stroke="#ea580c" strokeWidth={2} name="Medium Risk" />
                <Line type="monotone" dataKey="low" stroke="#059669" strokeWidth={2} name="Low Risk" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Distribution by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={risksByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip />
                <Bar dataKey="high" stackId="a" fill="#dc2626" name="High" />
                <Bar dataKey="medium" stackId="a" fill="#ea580c" name="Medium" />
                <Bar dataKey="low" stackId="a" fill="#059669" name="Low" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Risks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Critical Risk Management</h3>
          <p className="text-sm text-gray-500 mt-1">High-priority risks requiring immediate attention</p>
        </div>

        <div className="p-6 space-y-4">
          {criticalRisks.map((risk) => (
            <div key={risk.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{risk.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(risk.severity)}`}>
                      {risk.severity} risk
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(risk.status)}`}>
                      {risk.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{risk.description}</p>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-primary-800"><strong>Mitigation:</strong> {risk.mitigation}</p>
                  </div>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-gray-900">{risk.riskScore}</div>
                  <div className="text-sm text-gray-500">Risk Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{risk.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Regulation</p>
                  <p className="font-medium text-primary-600">{risk.regulation}</p>
                </div>
                <div>
                  <p className="text-gray-500">Assignee</p>
                  <p className="font-medium text-gray-900">{risk.assignee}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due Date</p>
                  <p className="font-medium text-gray-900">{risk.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Last updated: {risk.lastUpdate}</span>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Settings className="h-4 w-4" />
                    <span>Manage</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Management</h3>
          <p className="text-sm text-gray-500 mt-1">Scheduled and completed risk assessments</p>
        </div>

        <div className="p-6 space-y-4">
          {riskAssessments.map((assessment) => (
            <div key={assessment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{assessment.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                    {assessment.regulation}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium text-gray-900">{assessment.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Assessor</p>
                    <p className="font-medium text-gray-900">{assessment.assessor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">
                      {assessment.completedDate ? 'Completed' : assessment.startDate ? 'Started' : 'Scheduled'}
                    </p>
                    <p className="font-medium text-gray-900">
                      {assessment.completedDate || assessment.startDate || assessment.scheduledDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Risks Found</p>
                    <p className="font-medium text-gray-900">
                      {assessment.risksIdentified ? `${assessment.risksIdentified} (${assessment.highRisks} high)` : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                  <Eye className="h-4 w-4" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};