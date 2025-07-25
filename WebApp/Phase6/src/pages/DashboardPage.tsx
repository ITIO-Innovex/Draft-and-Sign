import React from 'react'
import { Link } from 'react-router-dom'
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  Code,
  Zap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useAPI } from '../contexts/APIContext'
import { mockAnalyticsData } from '../data/mockData'

export const DashboardPage: React.FC = () => {
  const { projects } = useAPI()
  const analytics = mockAnalyticsData

  const quickStats = [
    {
      name: 'Total Requests',
      value: analytics.overview.totalRequests.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: Activity
    },
    {
      name: 'Success Rate',
      value: `${((analytics.overview.totalRequests - analytics.overview.totalErrors) / analytics.overview.totalRequests * 100).toFixed(1)}%`,
      change: '+0.3%',
      changeType: 'increase' as const,
      icon: CheckCircle
    },
    {
      name: 'Avg Latency',
      value: `${analytics.overview.avgLatency}ms`,
      change: '-5.2%',
      changeType: 'decrease' as const,
      icon: Clock
    },
    {
      name: 'API Uptime',
      value: `${analytics.overview.uptime}%`,
      change: '+0.1%',
      changeType: 'increase' as const,
      icon: TrendingUp
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'api_call',
      message: 'New envelope created via API',
      time: '2 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'webhook',
      message: 'Webhook delivery successful',
      time: '5 minutes ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'error',
      message: 'Rate limit exceeded for key_001',
      time: '12 minutes ago',
      status: 'error'
    },
    {
      id: 4,
      type: 'api_call',
      message: 'Document uploaded successfully',
      time: '18 minutes ago',
      status: 'success'
    }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Dashboard</h1>
        <p className="text-gray-600">
          Monitor your API usage, performance, and integration health
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary-50 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-green-500 mr-1" />
                )}
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* API Usage Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">API Usage Trends</h2>
              <Link
                to="/analytics"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View detailed analytics →
              </Link>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.usage.daily}>
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
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="errors" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Endpoints */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top API Endpoints</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.usage.endpoints.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="endpoint" 
                    stroke="#6b7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
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
                  <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h2>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.apiKeys.length} API keys</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {project.usage.totalRequests.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">requests</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/projects"
              className="block w-full text-center mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all projects →
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/api-keys"
                className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Code className="h-4 w-4 mr-3 text-gray-400" />
                Generate API Key
              </Link>
              <Link
                to="/webhooks"
                className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Zap className="h-4 w-4 mr-3 text-gray-400" />
                Configure Webhook
              </Link>
              <Link
                to="/testing"
                className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BarChart3 className="h-4 w-4 mr-3 text-gray-400" />
                Test API Endpoint
              </Link>
              <Link
                to="/support"
                className="flex items-center p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Users className="h-4 w-4 mr-3 text-gray-400" />
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}