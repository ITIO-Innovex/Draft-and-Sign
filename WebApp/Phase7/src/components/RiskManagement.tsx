import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, Target, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const RiskManagement: React.FC = () => {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('all');

  const riskTrends = [
    { month: 'Oct', score: 28 },
    { month: 'Nov', score: 32 },
    { month: 'Dec', score: 25 },
    { month: 'Jan', score: 23 },
  ];

  const risksByCategory = [
    { category: 'Data Privacy', high: 2, medium: 5, low: 8 },
    { category: 'Security', high: 1, medium: 3, low: 12 },
    { category: 'Compliance', high: 0, medium: 4, low: 15 },
    { category: 'Operational', high: 3, medium: 7, low: 6 },
  ];

  const risks = [
    {
      id: 1,
      title: 'Unauthorized Data Access',
      category: 'Data Privacy',
      regulation: 'GDPR',
      severity: 'high',
      probability: 'medium',
      impact: 'high',
      riskScore: 85,
      status: 'open',
      assignee: 'Sarah Johnson',
      dueDate: '2024-02-15',
      description: 'Potential unauthorized access to customer personal data through unsecured API endpoints',
      mitigation: 'Implement additional authentication and access controls'
    },
    {
      id: 2,
      title: 'Payment Data Exposure',
      category: 'Security',
      regulation: 'PCI DSS',
      severity: 'high',
      probability: 'low',
      impact: 'high',
      riskScore: 72,
      status: 'in-progress',
      assignee: 'Michael Chen',
      dueDate: '2024-02-10',
      description: 'Vulnerability in payment processing system could expose card data',
      mitigation: 'Update payment gateway security and implement tokenization'
    },
    {
      id: 3,
      title: 'Healthcare Data Breach',
      category: 'Data Privacy',
      regulation: 'HIPAA',
      severity: 'medium',
      probability: 'medium',
      impact: 'high',
      riskScore: 68,
      status: 'open',
      assignee: 'David Rodriguez',
      dueDate: '2024-02-20',
      description: 'Insufficient encryption of PHI data at rest',
      mitigation: 'Implement end-to-end encryption for all PHI data'
    },
    {
      id: 4,
      title: 'Compliance Documentation Gap',
      category: 'Compliance',
      regulation: 'SOX',
      severity: 'medium',
      probability: 'high',
      impact: 'medium',
      riskScore: 56,
      status: 'resolved',
      assignee: 'Emily Watson',
      dueDate: '2024-01-30',
      description: 'Missing documentation for financial controls audit trail',
      mitigation: 'Complete documentation and establish regular review process'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredRisks = risks.filter(risk => 
    selectedRiskCategory === 'all' || risk.category === selectedRiskCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Risk Management</h1>
          <p className="text-gray-500 mt-1">Identify, assess, and mitigate compliance and security risks</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
          <Plus className="h-4 w-4" />
          <span>New Risk Assessment</span>
        </button>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-error-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-sm text-gray-600">High Risk Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">19</p>
              <p className="text-sm text-gray-600">Medium Risk Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Shield className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">41</p>
              <p className="text-sm text-gray-600">Low Risk Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingDown className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">23%</p>
              <p className="text-sm text-gray-600">Overall Risk Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Trend Analysis</h3>
          <div className="h-64">
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
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Distribution by Category</h3>
          <div className="h-64">
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
                <Bar dataKey="high" stackId="a" fill="#dc2626" />
                <Bar dataKey="medium" stackId="a" fill="#ea580c" />
                <Bar dataKey="low" stackId="a" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Risk Register</h3>
            <select
              value={selectedRiskCategory}
              onChange={(e) => setSelectedRiskCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Data Privacy">Data Privacy</option>
              <option value="Security">Security</option>
              <option value="Compliance">Compliance</option>
              <option value="Operational">Operational</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredRisks.map((risk) => (
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
                  <p className="text-sm text-primary-600 font-medium">Mitigation: {risk.mitigation}</p>
                </div>
                <div className="text-right ml-6">
                  <div className="text-2xl font-bold text-gray-900">{risk.riskScore}</div>
                  <div className="text-sm text-gray-500">Risk Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};