import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download,
  TrendingUp,
  Clock,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  BarChart3
} from 'lucide-react';
import { mockToolUsageData } from '../../data/adminMockData';
import { formatNumber, formatPercentage } from '../../utils';

interface ToolUsageMonitorProps {
  onBack: () => void;
}

export const ToolUsageMonitor: React.FC<ToolUsageMonitorProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('usage');
  const [timeRange, setTimeRange] = useState('24h');

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'conversion', name: 'Conversion' },
    { id: 'editing', name: 'Editing' },
    { id: 'pages', name: 'Page Management' },
    { id: 'security', name: 'Security' },
    { id: 'optimization', name: 'Optimization' },
    { id: 'ocr', name: 'OCR' },
    { id: 'forms', name: 'Forms' },
    { id: 'utilities', name: 'Utilities' }
  ];

  const filteredTools = mockToolUsageData.tools
    .filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'usage': return b.usage - a.usage;
        case 'success_rate': return b.successRate - a.successRate;
        case 'avg_time': return parseFloat(a.avgProcessingTime) - parseFloat(b.avgProcessingTime);
        case 'errors': return b.errorCount - a.errorCount;
        default: return 0;
      }
    });

  const getStatusColor = (successRate: number) => {
    if (successRate >= 98) return 'text-green-600';
    if (successRate >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (successRate: number) => {
    if (successRate >= 98) return CheckCircle;
    if (successRate >= 95) return AlertCircle;
    return AlertCircle;
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
            <h1 className="text-2xl font-bold text-gray-900">PDF Tool Usage Monitor</h1>
            <p className="text-gray-600">Track and analyze PDF tool performance and usage</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Operations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatNumber(mockToolUsageData.summary.totalOperations)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Tools</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockToolUsageData.summary.activeTools}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatPercentage(mockToolUsageData.summary.avgSuccessRate)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Processing</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {mockToolUsageData.summary.avgProcessingTime}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="usage">Sort by Usage</option>
              <option value="success_rate">Sort by Success Rate</option>
              <option value="avg_time">Sort by Processing Time</option>
              <option value="errors">Sort by Error Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Tool Performance ({filteredTools.length} tools)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Tool Name</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Usage</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Success Rate</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Avg Time</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Errors</th>
                <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool, index) => {
                const StatusIcon = getStatusIcon(tool.successRate);
                return (
                  <tr key={tool.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize">
                        {tool.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">
                        {formatNumber(tool.usage)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {tool.uniqueUsers} users
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`text-sm font-medium ${getStatusColor(tool.successRate)}`}>
                        {formatPercentage(tool.successRate)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {tool.avgProcessingTime}s
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-red-600 font-medium">
                        {tool.errorCount}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatPercentage(tool.errorRate)} rate
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <StatusIcon className={`w-4 h-4 ${getStatusColor(tool.successRate)}`} />
                        <span className={`text-sm font-medium ${getStatusColor(tool.successRate)}`}>
                          {tool.successRate >= 98 ? 'Excellent' : 
                           tool.successRate >= 95 ? 'Good' : 'Needs Attention'}
                        </span>
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