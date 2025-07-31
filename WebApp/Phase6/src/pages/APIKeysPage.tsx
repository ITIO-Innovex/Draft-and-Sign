import React, { useState } from 'react'
import { 
  Plus, 
  Key, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Trash2, 
  Settings,
  Calendar,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { useAPI } from '../contexts/APIContext'
import toast from 'react-hot-toast'

export const APIKeysPage: React.FC = () => {
  const { selectedProject } = useAPI()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const apiKeys = selectedProject?.apiKeys || []

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
    toast.success('API key copied to clipboard')
  }

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(keyId)) {
        newSet.delete(keyId)
      } else {
        newSet.add(keyId)
      }
      return newSet
    })
  }

  const maskKey = (key: string) => {
    return key.substring(0, 8) + '••••••••••••••••' + key.substring(key.length - 4)
  }

  // const deleteAPIKey = async () => {
  //   if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return
    
  //   toast.loading('Deleting API key...', { id: 'delete-key' })
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000))
    
  //   toast.success('API key deleted successfully!', { id: 'delete-key' })
  // }

  const getPermissionColor = (permission: string) => {
    if (permission.includes('write') || permission.includes('delete')) {
      return 'bg-red-100 text-red-800'
    } else if (permission.includes('read')) {
      return 'bg-green-100 text-green-800'
    } else {
      return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
          <p className="text-gray-600">
            Manage API keys for secure access to the DraftnSign API
            {selectedProject && (
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded">
                {selectedProject.name}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center space-x-2"
          disabled={!selectedProject}
        >
          <Plus className="h-5 w-5" />
          <span>Create API Key</span>
        </button>
      </div>

      {!selectedProject ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No project selected</h3>
          <p className="text-gray-600 mb-6">
            Please select a project to manage API keys
          </p>
        </div>
      ) : apiKeys.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No API keys yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first API key to start making requests to the DraftnSign API
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            Create API Key
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      apiKey.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        apiKey.isActive ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      <span>{apiKey.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </div>
                  
                  {/* API Key Display */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 font-mono text-sm">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </div>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                      {copiedKey === apiKey.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Permissions */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((permission) => (
                        <span
                          key={permission}
                          className={`px-2 py-1 text-xs font-medium rounded ${getPermissionColor(permission)}`}
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {apiKey.usage.thisMonth.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">This Month</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {apiKey.usage.quota.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Monthly Quota</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {((apiKey.usage.thisMonth / apiKey.usage.quota) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">Usage</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        {apiKey.rateLimit.requests}
                      </div>
                      <div className="text-xs text-gray-600">Rate Limit</div>
                    </div>
                  </div>

                  {/* Usage Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Monthly Usage</span>
                      <span className="text-sm text-gray-600">
                        {apiKey.usage.thisMonth.toLocaleString()} / {apiKey.usage.quota.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (apiKey.usage.thisMonth / apiKey.usage.quota) > 0.8 
                            ? 'bg-red-500' 
                            : (apiKey.usage.thisMonth / apiKey.usage.quota) > 0.6 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((apiKey.usage.thisMonth / apiKey.usage.quota) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                      </div>
                      {apiKey.lastUsed && (
                        <div className="flex items-center space-x-1">
                          <Activity className="h-4 w-4" />
                          <span>Last used {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    // onClick={() => deleteAPIKey(apiKey.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Warning for high usage */}
              {(apiKey.usage.thisMonth / apiKey.usage.quota) > 0.8 && (
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    This API key is approaching its monthly quota limit
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateModal && (
        <CreateAPIKeyModal
          onClose={() => setShowCreateModal(false)}
          onSave={(keyData) => {
            console.log('Creating API key:', keyData)
            setShowCreateModal(false)
            toast.success('API key created successfully!')
          }}
        />
      )}
    </div>
  )
}

const CreateAPIKeyModal: React.FC<{
  onClose: () => void
  onSave: (data: any) => void
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: [] as string[],
    rateLimit: 1000,
    expiresAt: ''
  })

  const availablePermissions = [
    { id: 'user:read', name: 'Read Users', description: 'View user information' },
    { id: 'user:write', name: 'Write Users', description: 'Create and update users' },
    { id: 'document:read', name: 'Read Documents', description: 'View documents' },
    { id: 'document:write', name: 'Write Documents', description: 'Upload and manage documents' },
    { id: 'envelope:read', name: 'Read Envelopes', description: 'View envelopes' },
    { id: 'envelope:send', name: 'Send Envelopes', description: 'Create and send envelopes' },
    { id: 'template:read', name: 'Read Templates', description: 'View templates' },
    { id: 'template:write', name: 'Write Templates', description: 'Create and manage templates' },
    { id: 'webhook:read', name: 'Read Webhooks', description: 'View webhook configurations' },
    { id: 'webhook:write', name: 'Write Webhooks', description: 'Create and manage webhooks' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create API Key</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input w-full"
              placeholder="Production API Key"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
              {availablePermissions.map((permission) => (
                <label key={permission.id} className="flex items-start space-x-3 py-2">
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{permission.name}</div>
                    <div className="text-sm text-gray-600">{permission.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate Limit (requests per hour)
            </label>
            <input
              type="number"
              value={formData.rateLimit}
              onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
              className="input w-full"
              min="100"
              max="10000"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date (Optional)
            </label>
            <input
              type="date"
              value={formData.expiresAt}
              onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
              className="input w-full"
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="text-sm text-gray-600 mt-1">
              Leave empty for no expiration
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!formData.name || formData.permissions.length === 0}
            >
              Create API Key
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}