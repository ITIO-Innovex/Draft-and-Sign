import React, { useState } from 'react';
import { Network, Zap, Settings, CheckCircle, AlertCircle, Clock, ExternalLink, Plus } from 'lucide-react';

export const GRCIntegrations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const integrations = [
    {
      id: 1,
      name: 'ServiceNow GRC',
      category: 'GRC Platform',
      type: 'Enterprise GRC',
      status: 'connected',
      lastSync: '2024-01-15 14:30',
      syncFrequency: 'Real-time',
      dataFlow: 'Bidirectional',
      features: ['Risk Management', 'Compliance Monitoring', 'Audit Management'],
      description: 'Enterprise governance, risk, and compliance platform integration',
      version: 'v2.1',
      uptime: '99.9%',
      recordsSync: '125,000'
    },
    {
      id: 2,
      name: 'RSA Archer',
      category: 'Risk Management',
      type: 'Risk Platform',
      status: 'connected',
      lastSync: '2024-01-15 14:25',
      syncFrequency: 'Hourly',
      dataFlow: 'Import',
      features: ['Risk Assessment', 'Control Testing', 'Issue Management'],
      description: 'Integrated risk management and compliance platform',
      version: 'v1.8',
      uptime: '99.7%',
      recordsSync: '89,000'
    },
    {
      id: 3,
      name: 'MetricStream',
      category: 'Compliance',
      type: 'Compliance Platform',
      status: 'connected',
      lastSync: '2024-01-15 14:20',
      syncFrequency: 'Daily',
      dataFlow: 'Export',
      features: ['Policy Management', 'Training Tracking', 'Incident Management'],
      description: 'Comprehensive compliance and risk management solution',
      version: 'v3.0',
      uptime: '99.8%',
      recordsSync: '67,000'
    },
    {
      id: 4,
      name: 'LogicGate',
      category: 'Risk Management',
      type: 'Risk Platform',
      status: 'pending',
      lastSync: 'Never',
      syncFrequency: 'Scheduled',
      dataFlow: 'Bidirectional',
      features: ['Risk Registers', 'Control Frameworks', 'Reporting'],
      description: 'Cloud-based risk management and compliance platform',
      version: 'v2.5',
      uptime: 'N/A',
      recordsSync: '0'
    },
    {
      id: 5,
      name: 'Splunk Enterprise Security',
      category: 'Security',
      type: 'SIEM Platform',
      status: 'connected',
      lastSync: '2024-01-15 14:35',
      syncFrequency: 'Real-time',
      dataFlow: 'Import',
      features: ['Security Monitoring', 'Incident Response', 'Threat Intelligence'],
      description: 'Security information and event management platform',
      version: 'v4.2',
      uptime: '99.9%',
      recordsSync: '2,450,000'
    },
    {
      id: 6,
      name: 'Microsoft Purview',
      category: 'Data Governance',
      type: 'Data Platform',
      status: 'error',
      lastSync: '2024-01-15 12:15',
      syncFrequency: 'Hourly',
      dataFlow: 'Bidirectional',
      features: ['Data Classification', 'Privacy Management', 'Information Protection'],
      description: 'Unified data governance and compliance solution',
      version: 'v1.9',
      uptime: '98.5%',
      recordsSync: '156,000'
    }
  ];

  const integrationCategories = [
    { name: 'GRC Platform', count: 3, icon: Network },
    { name: 'Risk Management', count: 2, icon: AlertCircle },
    { name: 'Compliance', count: 4, icon: CheckCircle },
    { name: 'Security', count: 2, icon: Settings },
    { name: 'Data Governance', count: 1, icon: Network }
  ];

  const availableIntegrations = [
    {
      name: 'Workiva',
      category: 'Compliance',
      description: 'Cloud platform for compliance and risk reporting',
      features: ['SOX Compliance', 'ESG Reporting', 'Risk Management']
    },
    {
      name: 'OneTrust',
      category: 'Privacy',
      description: 'Privacy, security, and third-party risk platform',
      features: ['Privacy Management', 'Cookie Compliance', 'Vendor Risk']
    },
    {
      name: 'Resolver',
      category: 'Risk Management',
      description: 'Integrated risk management software',
      features: ['Incident Management', 'Business Continuity', 'Audit Management']
    },
    {
      name: 'NAVEX Global',
      category: 'Ethics & Compliance',
      description: 'Ethics and compliance management platform',
      features: ['Policy Management', 'Training', 'Hotline Reporting']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-accent-100 text-accent-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'error':
        return 'bg-error-100 text-error-700';
      case 'disconnected':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-accent-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-error-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredIntegrations = integrations.filter(integration => 
    selectedCategory === 'all' || integration.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GRC Integrations</h1>
          <p className="text-gray-500 mt-1">Connect with third-party governance, risk, and compliance systems</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {integrationCategories.map((category) => (
              <option key={category.name} value={category.name}>{category.name}</option>
            ))}
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Plus className="h-4 w-4" />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      {/* Integration Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Network className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Total Integrations</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">9</p>
              <p className="text-sm text-gray-600">Active Connections</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Zap className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2.8M</p>
              <p className="text-sm text-gray-600">Records Synced</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">99.2%</p>
              <p className="text-sm text-gray-600">Avg Uptime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Integrations</h3>
          <p className="text-sm text-gray-500 mt-1">Currently connected GRC systems and their status</p>
        </div>

        <div className="p-6 space-y-6">
          {filteredIntegrations.map((integration) => (
            <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Network className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{integration.name}</h4>
                    <p className="text-gray-600">{integration.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-primary-600 font-medium">{integration.category}</span>
                      <span className="text-sm text-gray-500">{integration.type}</span>
                      <span className="text-sm text-gray-500">v{integration.version}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(integration.status)}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Last Sync</p>
                  <p className="font-medium text-gray-900">{integration.lastSync}</p>
                </div>
                <div>
                  <p className="text-gray-500">Sync Frequency</p>
                  <p className="font-medium text-gray-900">{integration.syncFrequency}</p>
                </div>
                <div>
                  <p className="text-gray-500">Data Flow</p>
                  <p className="font-medium text-gray-900">{integration.dataFlow}</p>
                </div>
                <div>
                  <p className="text-gray-500">Uptime</p>
                  <p className="font-medium text-gray-900">{integration.uptime}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span>{integration.recordsSync} records synchronized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    <Settings className="h-4 w-4" />
                    <span>Configure</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Integrations</h3>
          <p className="text-sm text-gray-500 mt-1">Additional GRC platforms available for integration</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableIntegrations.map((integration, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{integration.name}</h4>
                    <p className="text-gray-600 mt-1">{integration.description}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {integration.category}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Key Features</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Ready to connect</span>
                  <button className="flex items-center space-x-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    <Plus className="h-4 w-4" />
                    <span>Connect</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Integration Categories</h3>
          <p className="text-sm text-gray-500 mt-1">Browse integrations by category type</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {integrationCategories.map((category, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                <category.icon className="h-8 w-8 mx-auto mb-3 text-primary-600" />
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{category.count} integrations</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};