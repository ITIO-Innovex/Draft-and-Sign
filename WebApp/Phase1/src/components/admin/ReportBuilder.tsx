import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, Plus, Trash2, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FeatureGate } from '../ui/FeatureGate';

interface ReportConfig {
  id: string;
  name: string;
  type: 'usage' | 'financial' | 'security' | 'performance';
  metrics: string[];
  filters: Record<string, any>;
  schedule?: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  lastGenerated?: string;
  status: 'active' | 'draft' | 'paused';
}

const mockReports: ReportConfig[] = [
  {
    id: '1',
    name: 'Monthly Revenue Report',
    type: 'financial',
    metrics: ['revenue', 'subscriptions', 'churn'],
    filters: { timeRange: '30d', organizations: 'all' },
    schedule: 'monthly',
    recipients: ['ceo@company.com', 'cfo@company.com'],
    lastGenerated: '2024-07-01T00:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    name: 'Security Incidents',
    type: 'security',
    metrics: ['failed_logins', 'threats', 'vulnerabilities'],
    filters: { severity: 'high', timeRange: '7d' },
    schedule: 'weekly',
    recipients: ['security@company.com'],
    lastGenerated: '2024-06-30T00:00:00Z',
    status: 'active',
  },
  {
    id: '3',
    name: 'Platform Performance',
    type: 'performance',
    metrics: ['uptime', 'response_time', 'error_rate'],
    filters: { timeRange: '24h' },
    schedule: 'daily',
    recipients: ['ops@company.com'],
    lastGenerated: '2024-07-01T06:00:00Z',
    status: 'active',
  },
];

export const ReportBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState<ReportConfig | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const reportTypes = [
    { id: 'usage', name: 'Usage Analytics', color: 'bg-blue-100 text-blue-800' },
    { id: 'financial', name: 'Financial', color: 'bg-green-100 text-green-800' },
    { id: 'security', name: 'Security', color: 'bg-red-100 text-red-800' },
    { id: 'performance', name: 'Performance', color: 'bg-purple-100 text-purple-800' },
  ];

  const availableMetrics = {
    usage: ['active_users', 'documents_created', 'signatures_completed', 'api_calls'],
    financial: ['revenue', 'subscriptions', 'churn', 'ltv', 'cac'],
    security: ['failed_logins', 'threats', 'vulnerabilities', 'incidents'],
    performance: ['uptime', 'response_time', 'error_rate', 'throughput'],
  };

  const getTypeColor = (type: string) => {
    const typeConfig = reportTypes.find(t => t.id === type);
    return typeConfig?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatLastGenerated = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const tabs = [
    { id: 'reports', name: 'Reports' },
    { id: 'builder', name: 'Report Builder' },
    { id: 'scheduled', name: 'Scheduled Reports' },
  ];

  return (
    <FeatureGate permission="platform_analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Report Builder</h1>
            <p className="mt-1 text-gray-600">
              Create custom reports and schedule automated delivery.
            </p>
          </div>
          
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Saved Reports</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Generated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-500">{report.metrics.length} metrics</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.schedule || 'Manual'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatLastGenerated(report.lastGenerated)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Report Builder Tab */}
        {activeTab === 'builder' && (
          <div className="space-y-6">
            <Card>
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Create Custom Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Report Name"
                    placeholder="Enter report name"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {reportTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Metrics
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableMetrics.usage.map((metric) => (
                      <label key={metric} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm text-gray-700">{metric.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Range
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Manual</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Format
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="csv">CSV</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Recipients
                  </label>
                  <Input
                    placeholder="Enter email addresses separated by commas"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline">
                    Save Template
                  </Button>
                  <Button variant="ghost">
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Scheduled Reports Tab */}
        {activeTab === 'scheduled' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="text-center space-y-2">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-sm text-gray-600">Scheduled Reports</div>
                </div>
              </Card>
              
              <Card>
                <div className="text-center space-y-2">
                  <BarChart3 className="h-8 w-8 text-green-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">156</div>
                  <div className="text-sm text-gray-600">Reports Generated</div>
                </div>
              </Card>
              
              <Card>
                <div className="text-center space-y-2">
                  <Download className="h-8 w-8 text-purple-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">89%</div>
                  <div className="text-sm text-gray-600">Delivery Success Rate</div>
                </div>
              </Card>
            </div>

            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Scheduled Reports</h3>
                
                <div className="space-y-3">
                  {mockReports.filter(r => r.schedule).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <p className="text-sm text-gray-500">
                            {report.schedule} • Next: Tomorrow 9:00 AM
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </FeatureGate>
  );
};