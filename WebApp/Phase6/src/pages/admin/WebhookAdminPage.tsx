import React, { useState } from 'react'
import { 
  Webhook, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  Pause,
  Settings
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { mockWebhookAdmin } from '../../data/mockAdminData'

export const WebhookAdminPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null)
  const webhookData = mockWebhookAdmin

  const overviewStats = [
    {
      name: 'Total Webhooks',
      value: webhookData.overview.totalWebhooks.toLocaleString(),
      change: '+8.3%',
      changeType: 'increase' as const,
      icon: Webhook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Daily Deliveries',
      value: webhookData.overview.dailyDeliveries.toLocaleString(),
      change: '+12.7%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Success Rate',
      value: `${webhookData.overview.successRate}%`,
      change: '+0.5%',
      changeType: 'increase' as const,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      name: 'Avg Delivery Time',
      value: webhookData.overview.avgDeliveryTime,
      change: '-3.2%',
      changeType: 'decrease' as const,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6']

  const retryFailedWebhook = async (webhookId: string) => {
    // Simulate retry operation
    console.log('Retrying webhook:', webhookId)
  }

  const pauseWebhook = async (webhookId: string) => {
    // Simulate pause operation
    console.log('Pausing webhook:', webhookId)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Webhook Administration</h1>
          <p className="text-gray-600">
            Monitor and manage webhook deliveries, performance, and health
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
          <button className="btn btn-outline">
            Bulk Actions
          </button>
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
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                )}
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Type Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Event Type Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={webhookData.eventTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="event" 
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
                  <Bar dataKey="deliveries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Developer Webhook Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Developer Webhook Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Developer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Webhooks</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Delivery Rate</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Avg Latency</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Last Delivery</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {webhookData.webhookStats.map((stat) => (
                    <tr key={stat.developerId} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{stat.developerName}</div>
                        <div className="text-sm text-gray-500">{stat.developerId}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{stat.webhookCount}</td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          stat.deliveryRate >= 98 ? 'bg-green-100 text-green-800' :
                          stat.deliveryRate >= 95 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {stat.deliveryRate}%
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{stat.avgLatency}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(stat.lastDelivery).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedWebhook(stat)}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Success Rate Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Success Rates</h3>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={webhookData.eventTypes.map(event => ({
                      name: event.event.split('.')[1],
                      value: event.successRate,
                      deliveries: event.deliveries
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {webhookData.eventTypes.map((entry, index) => (
                      <Cell key={`cell-${entry.event}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {webhookData.eventTypes.map((event, index) => (
                <div key={event.event} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{event.event.split('.')[1]}</span>
                  </div>
                  <span className="text-sm text-gray-600">{event.successRate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Failed Deliveries */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Failed Deliveries</h3>
            <div className="space-y-3">
              {webhookData.failedDeliveries.map((failure, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-red-900 text-sm">{failure.event}</div>
                      <div className="text-xs text-red-700 mt-1">{failure.endpoint}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => retryFailedWebhook(failure.webhookId)}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Retry"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => pauseWebhook(failure.webhookId)}
                        className="p-1 text-red-600 hover:text-red-700"
                        title="Pause"
                      >
                        <Pause className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-red-600">
                    <div>Error: {failure.error}</div>
                    <div>Attempts: {failure.attempts}</div>
                    <div>Next retry: {new Date(failure.nextRetry).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Webhook Health */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Event Processing</span>
                </div>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Delivery Queue</span>
                </div>
                <span className="text-sm font-medium text-green-600">Normal</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Retry Queue</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">Elevated</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Rate Limiting</span>
                </div>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-4 w-4 text-gray-400" />
                  <span>Retry All Failed</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Configure Alerts</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Pause className="h-4 w-4 text-gray-400" />
                  <span>Bulk Pause</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-gray-400" />
                  <span>View All Alerts</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Webhook Details Modal */}
      {selectedWebhook && (
        <WebhookDetailsModal
          webhook={selectedWebhook}
          onClose={() => setSelectedWebhook(null)}
        />
      )}
    </div>
  )
}

const WebhookDetailsModal: React.FC<{
  webhook: any
  onClose: () => void
}> = ({ webhook, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Webhook Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer Information</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">Name</div>
                  <div className="text-sm text-gray-900">{webhook.developerName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Developer ID</div>
                  <div className="text-sm text-gray-900">{webhook.developerId}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{webhook.webhookCount}</div>
                <div className="text-sm text-gray-600">Active Webhooks</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{webhook.deliveryRate}%</div>
                <div className="text-sm text-gray-600">Delivery Rate</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{webhook.avgLatency}</div>
                <div className="text-sm text-gray-600">Avg Latency</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Last Activity</h3>
            <div className="text-sm text-gray-600">
              Last delivery: {new Date(webhook.lastDelivery).toLocaleString()}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="btn btn-outline">
              Close
            </button>
            <button className="btn btn-primary">
              Manage Webhooks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}