import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Play,
  Pause,
  Trash2,
  Download,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Users,
  HardDrive
} from 'lucide-react';
import { mockProcessingQueueData } from '../../data/adminMockData';
import { formatNumber } from '../../utils';

interface FileProcessingManagerProps {
  onBack: () => void;
}

export const FileProcessingManager: React.FC<FileProcessingManagerProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [queueData, setQueueData] = useState(mockProcessingQueueData);

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'pending', name: 'Pending' },
    { id: 'processing', name: 'Processing' },
    { id: 'completed', name: 'Completed' },
    { id: 'failed', name: 'Failed' },
    { id: 'paused', name: 'Paused' }
  ];

  const filteredJobs = queueData.jobs.filter(job => {
    const matchesSearch = job.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.tool.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return RefreshCw;
      case 'completed': return CheckCircle;
      case 'failed': return XCircle;
      case 'paused': return Pause;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const pauseJob = (jobId: string) => {
    setQueueData(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => 
        job.id === jobId ? { ...job, status: 'paused' } : job
      )
    }));
  };

  const resumeJob = (jobId: string) => {
    setQueueData(prev => ({
      ...prev,
      jobs: prev.jobs.map(job => 
        job.id === jobId ? { ...job, status: 'pending' } : job
      )
    }));
  };

  const cancelJob = (jobId: string) => {
    setQueueData(prev => ({
      ...prev,
      jobs: prev.jobs.filter(job => job.id !== jobId)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">File Processing Manager</h1>
            <p className="text-gray-600">Monitor and manage PDF processing queue</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Queue</span>
          </button>
        </div>
      </div>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatNumber(queueData.summary.totalJobs)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {queueData.summary.processing}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Queue Length</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {queueData.summary.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {queueData.summary.storageUsed}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files, users, or tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {statusOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>Showing {filteredJobs.length} of {queueData.jobs.length} jobs</span>
          </div>
        </div>
      </div>

      {/* Processing Queue */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Processing Queue</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">File</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tool</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Priority</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Progress</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Started</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => {
                const StatusIcon = getStatusIcon(job.status);
                return (
                  <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{job.fileName}</div>
                        <div className="text-sm text-gray-500">{job.fileSize}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{job.user}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{job.tool}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${
                          job.status === 'processing' ? 'animate-spin' : ''
                        }`} />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getPriorityColor(job.priority)}`}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            job.status === 'completed' ? 'bg-green-600' :
                            job.status === 'failed' ? 'bg-red-600' :
                            job.status === 'processing' ? 'bg-blue-600' : 'bg-gray-400'
                          }`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{job.progress}%</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(job.startedAt).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {job.status === 'processing' && (
                          <button
                            onClick={() => pauseJob(job.id)}
                            className="p-1 text-yellow-600 hover:text-yellow-700 transition-colors"
                            title="Pause"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                        {job.status === 'paused' && (
                          <button
                            onClick={() => resumeJob(job.id)}
                            className="p-1 text-green-600 hover:text-green-700 transition-colors"
                            title="Resume"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {(job.status === 'pending' || job.status === 'paused') && (
                          <button
                            onClick={() => cancelJob(job.id)}
                            className="p-1 text-red-600 hover:text-red-700 transition-colors"
                            title="Cancel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {job.status === 'completed' && (
                          <button
                            className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};