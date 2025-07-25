import React, { useState } from 'react'
import { 
  Download, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Code,
  Bug,
  Calendar,
  Users
} from 'lucide-react'
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts'
import { mockSDKAdmin } from '../../data/mockAdminData'

export const SDKAdminPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedSDK, setSelectedSDK] = useState<any>(null)
  const sdkData = mockSDKAdmin

  const overviewStats = [
    {
      name: 'Total Downloads',
      value: sdkData.overview.totalDownloads.toLocaleString(),
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: Download,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Monthly Downloads',
      value: sdkData.overview.monthlyDownloads.toLocaleString(),
      change: '+8.7%',
      changeType: 'increase' as const,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Average Rating',
      value: sdkData.overview.avgRating.toString(),
      change: '+0.2',
      changeType: 'increase' as const,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Open Issues',
      value: sdkData.overview.issuesReported.toString(),
      change: '-12%',
      changeType: 'decrease' as const,
      icon: Bug,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ]

  const getLanguageIcon = (language: string) => {
    const icons: Record<string, string> = {
      'JavaScript': '🟨',
      'Python': '🐍',
      'Java': '☕',
      'C#': '🔷'
    }
    return icons[language] || '📦'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SDK Administration</h1>
          <p className="text-gray-600">
            Monitor SDK downloads, performance, and developer feedback
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="btn btn-outline">
            Generate Report
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
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    stat.name === 'Open Issues' ? 'text-red-500' : 'text-green-500'
                  }`} />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                )}
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' && stat.name === 'Open Issues'
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">from last period</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Download Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Download Trends by Language</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sdkData.downloadTrends}>
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
                  <Area 
                    type="monotone" 
                    dataKey="javascript" 
                    stackId="1"
                    stroke="#f59e0b" 
                    fill="#f59e0b"
                    fillOpacity={0.6}
                    name="JavaScript"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="python" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Python"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="java" 
                    stackId="1"
                    stroke="#ef4444" 
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Java"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="csharp" 
                    stackId="1"
                    stroke="#8b5cf6" 
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                    name="C#"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* SDK Performance Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">SDK Performance Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Language</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Version</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Downloads</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Monthly</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Rating</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Issues</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Last Updated</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sdkData.sdkStats.map((sdk) => (
                    <tr key={sdk.language} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{getLanguageIcon(sdk.language)}</span>
                          <span className="font-medium text-gray-900">{sdk.language}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">v{sdk.version}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{sdk.downloads.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{sdk.monthlyDownloads.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{sdk.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          sdk.issues === 0 ? 'bg-green-100 text-green-800' :
                          sdk.issues <= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sdk.issues}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(sdk.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedSDK(sdk)}
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
          {/* Top Performing SDK */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing SDK</h3>
            <div className="text-center">
              <div className="text-4xl mb-2">{getLanguageIcon(sdkData.overview.topLanguage)}</div>
              <div className="font-semibold text-gray-900">{sdkData.overview.topLanguage}</div>
              <div className="text-sm text-gray-600">Most downloaded this month</div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {sdkData.sdkStats.find(s => s.language === sdkData.overview.topLanguage)?.monthlyDownloads.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">Downloads</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">
                    {sdkData.sdkStats.find(s => s.language === sdkData.overview.topLanguage)?.rating}
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Issues */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
            <div className="space-y-3">
              {sdkData.recentIssues.map((issue, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getLanguageIcon(issue.sdkLanguage)}</span>
                      <span className="text-sm font-medium text-gray-900">{issue.sdkLanguage}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{issue.title}</h4>
                  <div className="text-xs text-gray-600">
                    <div>Reported by: {issue.reportedBy}</div>
                    <div>Created: {new Date(issue.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SDK Health */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">SDK Health Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Build Pipeline</span>
                </div>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Test Coverage</span>
                </div>
                <span className="text-sm font-medium text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Documentation</span>
                </div>
                <span className="text-sm font-medium text-yellow-600">Needs Update</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-700">Security Scan</span>
                </div>
                <span className="text-sm font-medium text-green-600">Passed</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Code className="h-4 w-4 text-gray-400" />
                  <span>Trigger Build</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Bug className="h-4 w-4 text-gray-400" />
                  <span>View All Issues</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>Developer Feedback</span>
                </div>
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Release Schedule</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SDK Details Modal */}
      {selectedSDK && (
        <SDKDetailsModal
          sdk={selectedSDK}
          onClose={() => setSelectedSDK(null)}
        />
      )}
    </div>
  )
}

const SDKDetailsModal: React.FC<{
  sdk: any
  onClose: () => void
}> = ({ sdk, onClose }) => {
  const getLanguageIcon = (language: string) => {
    const icons: Record<string, string> = {
      'JavaScript': '🟨',
      'Python': '🐍',
      'Java': '☕',
      'C#': '🔷'
    }
    return icons[language] || '📦'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">SDK Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{getLanguageIcon(sdk.language)}</span>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{sdk.language} SDK</h3>
              <p className="text-gray-600">Version {sdk.version}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{sdk.downloads.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Downloads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{sdk.monthlyDownloads.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Monthly Downloads</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{sdk.rating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{sdk.issues}</div>
              <div className="text-sm text-gray-600">Open Issues</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Last Updated</h4>
            <p className="text-gray-600">{new Date(sdk.lastUpdated).toLocaleDateString()}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="btn btn-outline">
              Close
            </button>
            <button className="btn btn-primary">
              Manage SDK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}