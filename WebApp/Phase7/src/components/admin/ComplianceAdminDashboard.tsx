import React, { useState } from 'react';
import { Shield, AlertTriangle, BarChart3, Users, Database, TrendingUp, CheckCircle, Clock, FileText, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export const ComplianceAdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const overviewMetrics = {
    overallComplianceScore: 94.7,
    regulationsMonitored: 8,
    compliantRegulations: 7,
    partialCompliance: 1,
    openRisks: 23,
    criticalRisks: 3,
    auditReadiness: 91.4,
    systemHealth: 98.2,
    activeUsers: 1247,
    documentsProcessed: 45678,
    complianceROI: 15.3,
    auditEfficiency: 23
  };

  const regulationStatus = [
    { regulation: 'GDPR', status: 'compliant', score: 96.2, lastAssessment: '2024-06-15', nextReview: '2024-12-15', trend: '+2.1%' },
    { regulation: 'HIPAA', status: 'compliant', score: 94.8, lastAssessment: '2024-05-20', nextReview: '2024-11-20', trend: '+1.5%' },
    { regulation: 'SOX', status: 'partial', score: 78.3, lastAssessment: '2024-06-01', remediation: 'Q3 2024', trend: '-3.2%' },
    { regulation: 'PCI DSS', status: 'compliant', score: 92.1, lastAssessment: '2024-06-10', nextReview: '2024-12-10', trend: '+0.8%' },
    { regulation: 'CCPA', status: 'compliant', score: 89.7, lastAssessment: '2024-05-25', nextReview: '2024-11-25', trend: '+1.2%' },
    { regulation: 'ISO 27001', status: 'compliant', score: 93.4, lastAssessment: '2024-06-05', nextReview: '2024-12-05', trend: '+2.3%' }
  ];

  const complianceTrends = [
    { month: 'Jan', score: 89.2, risks: 28, audits: 45 },
    { month: 'Feb', score: 91.1, risks: 25, audits: 52 },
    { month: 'Mar', score: 92.8, risks: 23, audits: 48 },
    { month: 'Apr', score: 93.5, risks: 21, audits: 56 },
    { month: 'May', score: 94.2, risks: 19, audits: 61 },
    { month: 'Jun', score: 94.7, risks: 18, audits: 58 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#059669' },
    { name: 'Medium Risk', value: 25, color: '#ea580c' },
    { name: 'High Risk', value: 10, color: '#dc2626' }
  ];

  const recentActivity = [
    {
      type: 'audit',
      action: 'GDPR Compliance Assessment Completed',
      regulation: 'GDPR',
      score: 96.2,
      timestamp: '2024-07-01T10:00:00Z',
      user: 'System Automated',
      status: 'success'
    },
    {
      type: 'risk',
      action: 'Data Breach Risk Mitigation Completed',
      risk: 'High',
      status: 'resolved',
      timestamp: '2024-07-01T09:30:00Z',
      user: 'Sarah Johnson',
      regulation: 'GDPR'
    },
    {
      type: 'compliance',
      action: 'SOX Internal Controls Review Initiated',
      regulation: 'SOX',
      timestamp: '2024-07-01T09:00:00Z',
      user: 'Michael Chen',
      status: 'in-progress'
    },
    {
      type: 'audit',
      action: 'HIPAA Security Assessment Scheduled',
      regulation: 'HIPAA',
      timestamp: '2024-07-01T08:45:00Z',
      user: 'David Rodriguez',
      status: 'scheduled'
    }
  ];

  const criticalAlerts = [
    {
      type: 'compliance',
      message: 'SOX compliance remediation due next week',
      severity: 'high',
      deadline: '2024-07-08',
      regulation: 'SOX',
      assignee: 'Emily Watson'
    },
    {
      type: 'audit',
      message: 'Quarterly audit trail review required',
      severity: 'medium',
      deadline: '2024-07-15',
      regulation: 'All',
      assignee: 'James Liu'
    },
    {
      type: 'risk',
      message: 'High-risk data processing activity detected',
      severity: 'high',
      deadline: '2024-07-05',
      regulation: 'GDPR',
      assignee: 'Sarah Johnson'
    }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'audit':
        return <FileText className="h-4 w-4 text-primary-600" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4 text-warning-600" />;
      case 'compliance':
        return <Shield className="h-4 w-4 text-accent-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Administration</h1>
          <p className="text-gray-500 mt-1">Enterprise compliance and analytics oversight dashboard</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Generate Executive Report
          </button>
        </div>
      </div>

      {/* Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.overallComplianceScore}%</p>
              <p className="text-sm text-gray-600">Overall Compliance</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+2.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.criticalRisks}</p>
              <p className="text-sm text-gray-600">Critical Risks</p>
              <div className="flex items-center text-error-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">-12%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.auditReadiness}%</p>
              <p className="text-sm text-gray-600">Audit Readiness</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+5.1%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overviewMetrics.systemHealth}%</p>
              <p className="text-sm text-gray-600">System Health</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+1.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceTrends}>
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
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} name="Compliance Score" />
                <Line type="monotone" dataKey="risks" stroke="#dc2626" strokeWidth={2} name="Open Risks" />
                <Line type="monotone" dataKey="audits" stroke="#059669" strokeWidth={2} name="Audits Completed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Distribution</h3>
          <div className="h-80 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-4">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regulation Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Regulation Compliance Status</h3>
          <p className="text-sm text-gray-500 mt-1">Current compliance status across all monitored regulations</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {regulationStatus.map((reg, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{reg.regulation}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reg.status)}`}>
                      {reg.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{reg.score}%</span>
                    <span className={`ml-2 text-sm ${reg.trend?.startsWith('+') ? 'text-accent-600' : 'text-error-600'}`}>
                      {reg.trend}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${reg.score}%`,
                      backgroundColor: reg.status === 'compliant' ? '#059669' : 
                                     reg.status === 'partial' ? '#ea580c' : '#dc2626'
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Last Assessment</p>
                    <p className="font-medium text-gray-900">{reg.lastAssessment}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{reg.nextReview ? 'Next Review' : 'Remediation'}</p>
                    <p className="font-medium text-gray-900">{reg.nextReview || reg.remediation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-500 mt-1">Latest compliance and audit activities</p>
          </div>

          <div className="p-6 space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border border-gray-100">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-primary-600">{activity.regulation}</span>
                    <span className="text-xs text-gray-500">{activity.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
            <p className="text-sm text-gray-500 mt-1">High-priority compliance and risk alerts</p>
          </div>

          <div className="p-6 space-y-4">
            {criticalAlerts.map((alert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} priority
                  </span>
                  <span className="text-xs text-gray-500">{alert.regulation}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 mb-2">{alert.message}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Assigned to: {alert.assignee}</span>
                  <span className="text-error-600 font-medium">Due: {alert.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};