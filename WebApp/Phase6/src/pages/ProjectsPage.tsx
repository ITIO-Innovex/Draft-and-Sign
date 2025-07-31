import React, { useState } from 'react'
import { 
  Plus, 
  FolderOpen, 
  Settings, 
  Trash2, 
  Key, 
  BarChart3, 
  Users,
  Activity,
  Edit
} from 'lucide-react'
import { useAPI } from '../contexts/APIContext'
import toast from 'react-hot-toast'

export const ProjectsPage: React.FC = () => {
  const { projects, selectedProject, setSelectedProject, createProject, updateProject, deleteProject } = useAPI()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)

  const handleCreateProject = (projectData: any) => {
    createProject({
      ...projectData,
      userId: 'user_123',
      apiKeys: [],
      webhooks: [],
      usage: {
        totalRequests: 0,
        totalErrors: 0,
        avgLatency: 0,
        topEndpoints: [],
        dailyUsage: []
      }
    })
    setShowCreateModal(false)
    toast.success('Project created successfully!')
  }

  const handleEditProject = (project: any) => {
    setEditingProject(project)
    setShowEditModal(true)
  }

  const handleUpdateProject = (projectData: any) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData)
      setShowEditModal(false)
      setEditingProject(null)
      toast.success('Project updated successfully!')
    }
  }

  const handleDeleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteProject(projectId)
      toast.success('Project deleted successfully!')
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">
            Organize your API integrations and manage access keys by project
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`bg-white rounded-lg border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
              selectedProject?.id === project.id
                ? 'border-primary-300 shadow-md'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="p-6">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditProject(project)
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProject(project.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-600 mb-6 line-clamp-2">{project.description}</p>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{project.apiKeys.length}</div>
                  <div className="text-sm text-gray-600">API Keys</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {project.usage.totalRequests.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Requests</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Activity className="h-4 w-4" />
                  <span>
                    {project.usage.totalErrors > 0 
                      ? `${((project.usage.totalRequests - project.usage.totalErrors) / project.usage.totalRequests * 100).toFixed(1)}% success`
                      : '100% success'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`w-2 h-2 rounded-full ${
                    selectedProject?.id === project.id ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-xs text-gray-500">
                    {selectedProject?.id === project.id ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Last updated {new Date(project.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  {project.webhooks.length > 0 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {project.webhooks.length} webhook{project.webhooks.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first project to start organizing your API integrations
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              Create Project
            </button>
          </div>
        )}
      </div>

      {/* Selected Project Details */}
      {selectedProject && (
        <div className="mt-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleEditProject(selectedProject)}
                  className="btn btn-outline flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Project Overview */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedProject.apiKeys.length}</div>
                    <div className="text-sm text-gray-600">API Keys</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedProject.usage.totalRequests.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedProject.usage.avgLatency}ms
                    </div>
                    <div className="text-sm text-gray-600">Avg Latency</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedProject.webhooks.length}</div>
                    <div className="text-sm text-gray-600">Webhooks</div>
                  </div>
                </div>

                {/* Top Endpoints */}
                {selectedProject.usage.topEndpoints.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Endpoints</h3>
                    <div className="space-y-3">
                      {selectedProject.usage.topEndpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <code className="text-sm font-mono text-gray-900">{endpoint.endpoint}</code>
                            <div className="text-xs text-gray-500">
                              {endpoint.requests.toLocaleString()} requests • {endpoint.avgLatency} avg
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {endpoint.errorRate.toFixed(1)}%
                            </div>
                            <div className="text-xs text-gray-500">error rate</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Key className="h-4 w-4 text-gray-400" />
                      <span>Manage API Keys</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                      <span>View Analytics</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-4 w-4 text-gray-400" />
                      <span>Configure Webhooks</span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>Team Access</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <ProjectModal
          title="Create New Project"
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateProject}
        />
      )}

      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <ProjectModal
          title="Edit Project"
          project={editingProject}
          onClose={() => {
            setShowEditModal(false)
            setEditingProject(null)
          }}
          onSave={handleUpdateProject}
        />
      )}
    </div>
  )
}

const ProjectModal: React.FC<{
  title: string
  project?: any
  onClose: () => void
  onSave: (data: any) => void
}> = ({ title, project, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input w-full"
              placeholder="My API Project"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input w-full h-24"
              placeholder="Describe what this project is for..."
              required
            />
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
              disabled={!formData.name || !formData.description}
            >
              {project ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}