import React, { useState } from 'react';
import { BarChart3, TrendingUp, Database, Users, Settings, Eye, Download, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const BusinessIntelligenceManager: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('executive');
  const [timeRange, setTimeRange] = useState('30d');

  const biMetrics = {
    totalDashboards: 24,
    activeUsers: 156,
    dataQuality: 96.8,
    reportingAccuracy: 98.2,
    systemPerformance: '145ms',
    userAdoption: 87.3,
    dataVolume: '2.4TB',
    queriesPerDay: 15847
  };

  const executiveKPIs = [
    { name: 'Compliance ROI', value: '15.3%', trend: '+2.1%', target: '12%', status: 'exceeding' },
    { name: 'Audit Efficiency', value: '23%', trend: '+5.2%', target: '20%', status: 'exceeding' },
    { name: 'Risk Reduction', value: '34%', trend: '+8.1%', target: '25%', status: 'exceeding' },
    { name: 'Regulatory Readiness', value: '91.4%', trend: '+3.2%', target: '90%', status: 'meeting' }
  ];

  const dashboardUsage = [
    { dashboard: 'Executive Summary', users: 45, views: 1247, lastAccess: '2024-07-01' },
    { dashboard: 'Compliance Overview', users: 89, views: 3456, lastAccess: '2024-07-01' },
    { dashboard: 'Risk Analytics', users: 67, views: 2134, lastAccess: '2024-07-01' },
    { dashboard: 'Audit Performance', users: 34, views: 987, lastAccess: '2024-07-01' },
    { dashboard: 'Data Privacy Metrics', users: 56, views: 1678, lastAccess: '2024-07-01' }
  ];

  const dataQualityMetrics = [
    { source: 'Compliance Database', quality: 98.5, completeness: 99.2, accuracy: 97.8, timeliness: 98.9 },
    { source: 'Audit Logs', quality: 99.1, completeness: 99.8, accuracy: 98.4, timeliness: 99.0 },
    { source: 'Risk Register', quality: 96.3, completeness: 97.1, accuracy: 95.5, timeliness: 96.8 },
    { source: 'Training Records', quality: 94.7, completeness: 95.2, accuracy: 94.2, timeliness: 94.9 },
    { source: 'External APIs', quality: 92.1, completeness: 93.4, accuracy: 90.8, timeliness: 92.5 }
  ];

  const performanceMetrics = [
    { month: 'Jan', responseTime: 165, queries: 12500, uptime: 99.8 },
    { month: 'Feb', responseTime: 158, queries: 13200, uptime: 99.9 },
    { month: 'Mar', responseTime: 152, queries: 14100, uptime: 99.7 },
    { month: 'Apr', responseTime: 148, queries: 14800, uptime: 99.9 },
    { month: 'May', responseTime: 145, queries: 15200, uptime: 99.8 },
    { month: 'Jun', responseTime: 145, queries: 15847, uptime: 99.9 }
  ];

  const reportSchedules = [
    {
      id: 'RPT-001',
      name: 'Executive Compliance Summary',
      frequency: 'Weekly',
      recipients: 8,
      lastRun: '2024-07-01 09:00',
      nextRun: '2024-07-08 09:00',
      status: 'active',
      format: 'PDF'
    },
    {
      id: 'RPT-002',
      name: 'Risk Assessment Dashboard',
      frequency: 'Daily',
      recipients: 15,
      lastRun: '2024-07-01 06:00',
      nextRun: '2024-07-02 06:00',
      status: 'active',
      format: 'Email'
    },
    {
      id: 'RPT-003',
      name: 'Audit Trail Export',
      frequency: 'Monthly',
      recipients: 5,
      lastRun: '2024-06-01 23:00',
      nextRun: '2024-07-01 23:00',
      status: 'scheduled',
      format: 'CSV'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding':
        return 'bg-accent-100 text-accent-700';
      case 'meeting':
        return 'bg-secondary-100 text-secondary-700';
      case 'below':
        return 'bg-warning-100 text-warning-700';
      case 'active':
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
          <h1 className="text-2xl font-bold text-gray-900">Business Intelligence Manager</h1>
          <p className="text-gray-500 mt-1">Advanced analytics and business intelligence administration</p>
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
            <Plus className="h-4 w-4" />
            <span>Create Dashboard</span>
          </button>
        </div>
      </div>

      {/* BI System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{biMetrics.totalDashboards}</p>
              <p className="text-sm text-gray-600">Active Dashboards</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{biMetrics.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+12%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Database className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{biMetrics.dataQuality}%</p>
              <p className="text-sm text-gray-600">Data Quality</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">+0.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{biMetrics.systemPerformance}</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
              <div className="flex items-center text-accent-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs ml-1">-8ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive KPIs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Executive KPI Performance</h3>
          <p className="text-sm text-gray-500 mt-1">Key performance indicators for executive reporting</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveKPIs.map((kpi, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                    {kpi.status}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                  <div className="flex items-center justify-center space-x-2 mt-1">
                    <span className={`text-sm ${kpi.trend.startsWith('+') ? 'text-accent-600' : 'text-error-600'}`}>
                      {kpi.trend}
                    </span>
                    <span className="text-sm text-gray-500">vs target: {kpi.target}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">System Performance Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceMetrics}>
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
                <Line type="monotone" dataKey="responseTime" stroke="#dc2626" strokeWidth={2} name="Response Time (ms)" />
                <Line type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={2} name="Daily Queries" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Dashboard Usage Analytics</h3>
          <div className="space-y-4">
            {dashboardUsage.map((dashboard, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{dashboard.dashboard}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>{dashboard.users} users</span>
                    <span>{dashboard.views} views</span>
                    <span>Last: {dashboard.lastAccess}</span>
                  </div>
                </div>
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
            ))}
          </div>
        </div>
      </div>

      {/* Data Quality Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Data Quality Management</h3>
          <p className="text-sm text-gray-500 mt-1">Data source quality metrics and monitoring</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {dataQualityMetrics.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{source.source}</h4>
                  <span className="text-lg font-bold text-gray-900">{source.quality}%</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Completeness</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-accent-500 h-2 rounded-full"
                          style={{ width: `${source.completeness}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{source.completeness}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Accuracy</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${source.accuracy}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{source.accuracy}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Timeliness</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-secondary-500 h-2 rounded-full"
                          style={{ width: `${source.timeliness}%` }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">{source.timeliness}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Automated Report Scheduling</h3>
          <p className="text-sm text-gray-500 mt-1">Scheduled report generation and distribution</p>
        </div>

        <div className="p-6 space-y-4">
          {reportSchedules.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {report.format}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Frequency</p>
                    <p className="font-medium text-gray-900">{report.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Recipients</p>
                    <p className="font-medium text-gray-900">{report.recipients} users</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Run</p>
                    <p className="font-medium text-gray-900">{report.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Next Run</p>
                    <p className="font-medium text-gray-900">{report.nextRun}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                  <Settings className="h-4 w-4" />
                  <span>Configure</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                  <Download className="h-4 w-4" />
                  <span>Run Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};