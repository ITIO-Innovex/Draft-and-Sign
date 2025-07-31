import React, { useState } from 'react'
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Server,
  Globe,
  Zap,
  Database,
  BarChart3,
  Eye,
  Settings
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar
} from 'recharts'
import { mockAPIMonitoring } from '../../data/mockAdminData'

export const APIMonitoringPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h')
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null)
  const monitoring = mockAPIMonitoring

  const performanceMetrics = [
    {
      name: 'Response Time',
      value: `${monitoring.performance.avgResponseTime}ms`,
      change: '-5.2%',
      changeType: 'decrease' as const,
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Throughput',
      value: `${monitoring.performance.requestsPerSecond}/s`,
      change: '+12.3%',
      changeType: 'increase' as const,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Error Rate',
      value: `${monitoring.performance.errorRate}%`,
      change: '+0.3%',
      changeType: 'increase' as const,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'Uptime',
      value: `${monitoring.performance.uptime}%`,
      change: '+0.1%',
      changeType: 'increase' as const,
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Monitoring</h1>
          <p className="text-gray-600">
            Monitor API performance, health, and usage patterns
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
            Configure Alerts
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    metric.name === 'Error Rate' ? 'text-red-500' : 'text-green-500'
                  }`} />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' && metric.name === 'Error Rate'
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Health Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">System Health Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {monitoring.systemHealth.map((service, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                service.status === 'healthy' ? 'bg-green-100' :
                service.status === 'degraded' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                {service.name === 'API Gateway' && <Globe className={`h-5 w-5 ${
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'degraded' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />}
                {service.name === 'Database' && <Database className={`h-5 w-5 ${
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'degraded' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />}
                {service.name === 'Cache' && <Zap className={`h-5 w-5 ${
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'degraded' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />}
                {service.name === 'Load Balancer' && <Server className={`h-5 w-5 ${
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'degraded' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />}
              </div>
              <div>
                <div className="font-medium text-gray-900">{service.name}</div>
                <div className={`text-sm ${
                  service.status === 'healthy' ? 'text-green-600' :
                  service.status === 'degraded' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>
                <div className="text-xs text-gray-500">{service.responseTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Response Time Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Response Time Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monitoring.responseTimeTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="p50" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="50th percentile"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="p95" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="95th percentile"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="p99" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="99th percentile"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Request Volume */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Request Volume</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monitoring.requestVolume}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
                    dataKey="requests" 
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="errors" 
                    stroke="#ef4444" 
                    fill="#ef4444"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Endpoints */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Top API Endpoints</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monitoring.topEndpoints.slice(0, 8)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} />
                  <YAxis 
                    type="category" 
                    dataKey="endpoint" 
                    stroke="#6b7280" 
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="requests" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Endpoint Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint Performance</h3>
            <div className="space-y-3">
              {monitoring.topEndpoints.slice(0, 5).map((endpoint, index) => (
                <div 
                  key={index} 
                  className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
                  onClick={() => setSelectedEndpoint(endpoint)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-gray-900">{endpoint.endpoint}</code>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <Settings className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>
                      <div className="font-medium">{endpoint.requests.toLocaleString()}</div>
                      <div>requests</div>
                    </div>
                    <div>
                      <div className="font-medium">{endpoint.avgLatency}</div>
                      <div>avg latency</div>
                    </div>
                    <div>
                      <div className={`font-medium ${
                        endpoint.errorRate > 1 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {endpoint.errorRate.toFixed(1)}%
                      </div>
                      <div>error rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Errors */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Errors</h3>
            <div className="space-y-3">
              {monitoring.recentErrors.map((error, index) => (
                <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <code className="text-sm font-mono text-red-900">{error.endpoint}</code>
                    <span className="text-xs text-red-600">
                      {new Date(error.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-red-700">{error.error}</p>
                  <div className="text-xs text-red-600 mt-1">
                    Status: {error.statusCode} | Count: {error.count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Alerts</h3>
            <div className="space-y-3">
              {monitoring.alerts.map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                  alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        alert.severity === 'critical' ? 'text-red-900' :
                        alert.severity === 'warning' ? 'text-yellow-900' :
                        'text-blue-900'
                      }`}>
                        {alert.message}
                      </div>
                      <div className={`text-xs mt-1 ${
                        alert.severity === 'critical' ? 'text-red-700' :
                        alert.severity === 'warning' ? 'text-yellow-700' :
                        'text-blue-700'
                      }`}>
                        {alert.details}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                  <span>View Detailed Analytics</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-gray-400" />
                  <span>Configure Alerts</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Performance Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoint Details Modal */}
      {selectedEndpoint && (
        <EndpointDetailsModal
          endpoint={selectedEndpoint}
          onClose={() => setSelectedEndpoint(null)}
        />
      )}
    </div>
  )
}

const EndpointDetailsModal: React.FC<{
  endpoint: any
  onClose: () => void
}> = ({ endpoint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Endpoint Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Endpoint</h3>
            <code className="block p-3 bg-gray-100 rounded-lg text-sm">{endpoint.endpoint}</code>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{endpoint.requests.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Requests</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{endpoint.avgLatency}</div>
              <div className="text-sm text-gray-600">Avg Latency</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Rate</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    endpoint.errorRate > 5 ? 'bg-red-500' :
                    endpoint.errorRate > 1 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(endpoint.errorRate * 10, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{endpoint.errorRate.toFixed(2)}%</span>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="btn btn-outline">
              Close
            </button>
            <button className="btn btn-primary">
              Configure Monitoring
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}