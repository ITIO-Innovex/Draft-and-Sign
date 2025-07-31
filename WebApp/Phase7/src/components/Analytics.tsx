import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Target, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const complianceMetrics = [
    { month: 'Aug', gdpr: 92, ccpa: 88, hipaa: 75, pci: 85, sox: 90 },
    { month: 'Sep', gdpr: 94, ccpa: 89, hipaa: 73, pci: 87, sox: 91 },
    { month: 'Oct', gdpr: 93, ccpa: 91, hipaa: 76, pci: 88, sox: 92 },
    { month: 'Nov', gdpr: 95, ccpa: 88, hipaa: 78, pci: 90, sox: 93 },
    { month: 'Dec', gdpr: 94, ccpa: 89, hipaa: 76, pci: 88, sox: 92 },
    { month: 'Jan', gdpr: 94, ccpa: 89, hipaa: 76, pci: 88, sox: 92 },
  ];

  const auditActivity = [
    { name: 'Jan 1-7', audits: 12, issues: 3, resolved: 8 },
    { name: 'Jan 8-14', audits: 15, issues: 5, resolved: 12 },
    { name: 'Jan 15-21', audits: 18, issues: 2, resolved: 15 },
    { name: 'Jan 22-28', audits: 14, issues: 4, resolved: 11 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#059669' },
    { name: 'Medium Risk', value: 25, color: '#ea580c' },
    { name: 'High Risk', value: 10, color: '#dc2626' },
  ];

  const regulationBreakdown = [
    { regulation: 'GDPR', score: 94, trend: '+2%', color: '#3b82f6' },
    { regulation: 'CCPA', score: 89, trend: '+1%', color: '#0891b2' },
    { regulation: 'HIPAA', score: 76, trend: '-1%', color: '#ea580c' },
    { regulation: 'PCI DSS', score: 88, trend: '+3%', color: '#059669' },
    { regulation: 'SOX', score: 92, trend: '+1%', color: '#7c3aed' },
    { regulation: 'ISO 27001', score: 91, trend: '+2%', color: '#dc2626' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-500 mt-1">Comprehensive business intelligence and compliance analytics</p>
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
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89.2%</p>
              <p className="text-sm text-gray-600">Avg Compliance Score</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+2.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Activity className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-gray-600">Audit Activities</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+12%</span>
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
              <p className="text-2xl font-bold text-gray-900">14</p>
              <p className="text-sm text-gray-600">Open Issues</p>
              <div className="flex items-center text-error-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">-8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">96.5%</p>
              <p className="text-sm text-gray-600">Resolution Rate</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+1.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Score Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complianceMetrics}>
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
                  domain={[65, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line type="monotone" dataKey="gdpr" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="ccpa" stroke="#0891b2" strokeWidth={2} />
                <Line type="monotone" dataKey="hipaa" stroke="#ea580c" strokeWidth={2} />
                <Line type="monotone" dataKey="pci" stroke="#059669" strokeWidth={2} />
                <Line type="monotone" dataKey="sox" stroke="#7c3aed" strokeWidth={2} />
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Audit Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
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
                <Bar dataKey="audits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="issues" fill="#ea580c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regulation Performance</h3>
          <div className="space-y-4">
            {regulationBreakdown.map((reg, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: reg.color }}
                  />
                  <span className="font-medium text-gray-900">{reg.regulation}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">{reg.score}%</span>
                    <span className={`ml-2 text-sm ${reg.trend.startsWith('+') ? 'text-accent-600' : 'text-error-600'}`}>
                      {reg.trend}
                    </span>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${reg.score}%`,
                        backgroundColor: reg.color 
                      }}
                    />
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