import React, { useState } from 'react'
import { 
  Users, 
  Activity, 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Shield,
  Database,
  Globe,
  Zap,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { mockAPIAdminData, mockDeveloperAnalytics } from '../../data/mockAdminData'

export const AdminDashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const adminData = mockAPIAdminData
  const developerData = mockDeveloperAnalytics

  const overviewStats = [
    {
      name: 'Total Developers',
      value: adminData.overview.totalDevelopers.toLocaleString(),
      change: '+12.3%',
      changeType: 'increase' as const,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Daily API Calls',
      value: adminData.overview.dailyAPICalls.toLocaleString(),
      change: '+8.7%',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'System Uptime',
      value: `${adminData.overview.systemUptime}%`,
      change: '+0.2%',
      changeType: 'increase' as const,
      icon: Server,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Success Rate',
      value: `${adminData.overview.successRate}%`,
      change: '-0.1%',
      changeType: 'decrease' as const,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ]


  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Admin Dashboard</h1>
          <p className="text-gray-600">
            Monitor and manage your API platform, developers, and system performance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Alerts Section */}
      {adminData.alerts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
          <div className="space-y-3">
            {adminData.alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                alert.severity === 'high' ? 'bg-red-50 border-red-200' :
                alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.severity === 'high' ? 'text-red-500' :
                    alert.severity === 'medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      alert.severity === 'high' ? 'text-red-900' :
                      alert.severity === 'medium' ? 'text-yellow-900' :
                      'text-blue-900'
                    }`}>
                      {alert.message}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      alert.severity === 'high' ? 'text-red-700' :
                      alert.severity === 'medium' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {alert.details}
                    </p>
                  </div>
                  <button className={`text-sm font-medium ${
                    alert.severity === 'high' ? 'text-red-600 hover:text-red-700' :
                    alert.severity === 'medium' ? 'text-yellow-600 hover:text-yellow-700' :
                    'text-blue-600 hover:text-blue-700'
                  }`}>
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* API Usage Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">API Usage Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={developerData.apiUsage.dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="calls" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Developer Growth */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Developer Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={developerData.growth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalDevelopers" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Total Developers"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="activeDevelopers" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    name="Active Developers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Plan Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Developer Plans</h3>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Free', value: developerData.apiUsage.planDistribution.free, color: '#6b7280' },
                      { name: 'Starter', value: developerData.apiUsage.planDistribution.starter, color: '#3b82f6' },
                      { name: 'Professional', value: developerData.apiUsage.planDistribution.professional, color: '#10b981' },
                      { name: 'Enterprise', value: developerData.apiUsage.planDistribution.enterprise, color: '#f59e0b' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {[
                      { name: 'Free', value: developerData.apiUsage.planDistribution.free, color: '#6b7280' },
                      { name: 'Starter', value: developerData.apiUsage.planDistribution.starter, color: '#3b82f6' },
                      { name: 'Professional', value: developerData.apiUsage.planDistribution.professional, color: '#10b981' },
                      { name: 'Enterprise', value: developerData.apiUsage.planDistribution.enterprise, color: '#f59e0b' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Free', value: developerData.apiUsage.planDistribution.free, color: '#6b7280' },
                { name: 'Starter', value: developerData.apiUsage.planDistribution.starter, color: '#3b82f6' },
                { name: 'Professional', value: developerData.apiUsage.planDistribution.professional, color: '#10b981' },
                { name: 'Enterprise', value: developerData.apiUsage.planDistribution.enterprise, color: '#f59e0b' }
              ].map((plan) => (
                <div key={plan.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm font-medium">{plan.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{plan.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {adminData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.developer}</span>
                      {' '}
                      {activity.action === 'api_key_created' && 'created API key for'}
                      {activity.action === 'webhook_configured' && 'configured webhook for'}
                      {activity.action === 'plan_upgraded' && 'upgraded plan from'}
                      {' '}
                      {activity.project && <span className="font-medium">{activity.project}</span>}
                      {activity.endpoint && <code className="text-xs bg-gray-100 px-1 rounded">{activity.endpoint}</code>}
                      {activity.fromPlan && (
                        <>
                          <span className="font-medium">{activity.fromPlan}</span>
                          {' to '}
                          <span className="font-medium">{activity.toPlan}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Database</span>
                </div>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">API Gateway</span>
                </div>
                <span className="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Webhooks</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">Degraded</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Security</span>
                </div>
                <span className="text-sm font-medium text-green-600">Secure</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>Manage Developers</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                  <span>View API Analytics</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span>Security Settings</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-gray-400" />
                  <span>System Alerts</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}