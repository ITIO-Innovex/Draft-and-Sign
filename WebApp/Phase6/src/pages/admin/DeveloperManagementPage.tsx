import React, { useState } from 'react'
import { 
  Search, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock,
  Building,
  Calendar,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { mockDevelopers } from '../../data/mockAdminData'

export const DeveloperManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState<string>('')

  const developers = mockDevelopers.filter(dev => {
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dev.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dev.company.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || dev.status === statusFilter
    const matchesPlan = planFilter === 'all' || dev.plan === planFilter
    
    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'suspended':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-100 text-purple-800'
      case 'professional':
        return 'bg-blue-100 text-blue-800'
      case 'starter':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDeveloperAction = (developer: any, action: string) => {
    setSelectedDeveloper(developer)
    setActionType(action)
    setShowActionModal(true)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Management</h1>
          <p className="text-gray-600">
            Manage developer accounts, plans, and access controls
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-outline">
            Export Data
          </button>
          <button className="btn btn-primary">
            Invite Developer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="free">Free</option>
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Developer Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Developer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Plan</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">API Usage</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Last Active</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {developers.map((developer) => (
                <tr key={developer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-sm">
                          {developer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{developer.name}</div>
                        <div className="text-sm text-gray-500">{developer.email}</div>
                        <div className="text-sm text-gray-500">{developer.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(developer.status)}`}>
                      {getStatusIcon(developer.status)}
                      <span className="capitalize">{developer.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(developer.plan)}`}>
                      {developer.plan.charAt(0).toUpperCase() + developer.plan.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {developer.apiUsage.thisMonth.toLocaleString()} / {developer.apiUsage.quota.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${
                          (developer.apiUsage.thisMonth / developer.apiUsage.quota) > 0.8 
                            ? 'bg-red-500' 
                            : (developer.apiUsage.thisMonth / developer.apiUsage.quota) > 0.6 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((developer.apiUsage.thisMonth / developer.apiUsage.quota) * 100, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(developer.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDeveloper(developer)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        View
                      </button>
                      <div className="relative">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Developer Details Modal */}
      {selectedDeveloper && !showActionModal && (
        <DeveloperDetailsModal
          developer={selectedDeveloper}
          onClose={() => setSelectedDeveloper(null)}
          onAction={handleDeveloperAction}
        />
      )}

      {/* Action Modal */}
      {showActionModal && selectedDeveloper && (
        <DeveloperActionModal
          developer={selectedDeveloper}
          actionType={actionType}
          onClose={() => {
            setShowActionModal(false)
            setSelectedDeveloper(null)
            setActionType('')
          }}
          onConfirm={() => {
            // Handle action
            setShowActionModal(false)
            setSelectedDeveloper(null)
            setActionType('')
          }}
        />
      )}
    </div>
  )
}

const DeveloperDetailsModal: React.FC<{
  developer: any
  onClose: () => void
  onAction: (developer: any, action: string) => void
}> = ({ developer, onClose, onAction }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Developer Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Developer Info */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold text-2xl">
                    {developer.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{developer.name}</h3>
                <p className="text-gray-600">{developer.email}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{developer.company}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    Joined {new Date(developer.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    Last active {new Date(developer.lastActive).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    developer.status === 'active' ? 'bg-green-100 text-green-800' :
                    developer.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {developer.status === 'active' ? <CheckCircle className="h-3 w-3" /> :
                     developer.status === 'suspended' ? <XCircle className="h-3 w-3" /> :
                     <Clock className="h-3 w-3" />}
                    <span className="capitalize">{developer.status}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Plan</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    developer.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                    developer.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                    developer.plan === 'starter' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {developer.plan.charAt(0).toUpperCase() + developer.plan.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Usage */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">API Usage</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {developer.apiUsage.thisMonth.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {developer.apiUsage.quota.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Quota</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    (developer.apiUsage.thisMonth / developer.apiUsage.quota) > 0.8 
                      ? 'bg-red-500' 
                      : (developer.apiUsage.thisMonth / developer.apiUsage.quota) > 0.6 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((developer.apiUsage.thisMonth / developer.apiUsage.quota) * 100, 100)}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {((developer.apiUsage.thisMonth / developer.apiUsage.quota) * 100).toFixed(1)}% of quota used
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Projects</h4>
              <div className="space-y-3">
                {developer.projects.map((project: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-600">{project.apiKeys} API keys</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {project.requests.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">requests</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => onAction(developer, 'upgrade')}
                  className="btn btn-primary"
                >
                  Upgrade Plan
                </button>
                <button
                  onClick={() => onAction(developer, 'adjust_quota')}
                  className="btn btn-outline"
                >
                  Adjust Quota
                </button>
                <button
                  onClick={() => onAction(developer, 'suspend')}
                  className="btn text-red-600 hover:bg-red-50"
                >
                  Suspend Account
                </button>
                <button
                  onClick={() => onAction(developer, 'reset_keys')}
                  className="btn btn-outline"
                >
                  Reset API Keys
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DeveloperActionModal: React.FC<{
  developer: any
  actionType: string
  onClose: () => void
  onConfirm: () => void
}> = ({ developer, actionType, onClose, onConfirm }) => {
  const [formData, setFormData] = useState<any>({})

  const getActionTitle = () => {
    switch (actionType) {
      case 'upgrade':
        return 'Upgrade Developer Plan'
      case 'adjust_quota':
        return 'Adjust API Quota'
      case 'suspend':
        return 'Suspend Developer Account'
      case 'reset_keys':
        return 'Reset API Keys'
      default:
        return 'Developer Action'
    }
  }

  const getActionContent = () => {
    switch (actionType) {
      case 'upgrade':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">
              Upgrade {developer.name}'s plan to provide additional features and higher limits.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Plan
              </label>
              <select
                value={formData.newPlan || ''}
               onChange={(e) => setFormData((prev: any) => ({ ...prev, reason: e.target.value }))}

                className="input w-full"
              >
                <option value="">Select plan</option>
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        )
      case 'adjust_quota':
        return (
          <div className="space-y-4">
            <p className="text-gray-600">
              Adjust the monthly API quota for {developer.name}.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Monthly Quota
              </label>
              <input
                type="number"
                value={formData.newQuota || developer.apiUsage.quota}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, newQuota: parseInt(e.target.value) }))}
                className="input w-full"
                min="1000"
                step="1000"
              />
            </div>
          </div>
        )
      case 'suspend':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-red-800 font-medium">
                This action will suspend {developer.name}'s account and disable API access.
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Suspension
              </label>
              <textarea
                value={formData.reason || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, reason: e.target.value }))}
                className="input w-full h-24"
                placeholder="Enter reason for suspension..."
                required
              />
            </div>
          </div>
        )
      case 'reset_keys':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-800 font-medium">
                This will invalidate all existing API keys for {developer.name}.
              </span>
            </div>
            <p className="text-gray-600">
              The developer will need to generate new API keys to continue using the service.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{getActionTitle()}</h3>
        
        {getActionContent()}

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${
              actionType === 'suspend' || actionType === 'reset_keys'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'btn-primary'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}