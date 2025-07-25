import React, { useState } from 'react';
import { Globe, TrendingUp, AlertCircle, Calendar, FileText, Bell, Search, Filter, ExternalLink } from 'lucide-react';

export const RegulatoryIntelligence: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedRegulation, setSelectedRegulation] = useState('all');

  const regulatoryUpdates = [
    {
      id: 1,
      title: 'GDPR Article 25 Implementation Guidelines Updated',
      regulation: 'GDPR',
      region: 'EU',
      type: 'guidance',
      severity: 'medium',
      publishDate: '2024-01-15',
      effectiveDate: '2024-03-15',
      summary: 'European Data Protection Board releases updated guidelines on data protection by design and by default.',
      impact: 'Organizations must review and update their privacy engineering practices.',
      source: 'European Data Protection Board',
      status: 'active',
      affectedSystems: ['Customer Portal', 'Data Processing Systems']
    },
    {
      id: 2,
      title: 'California Privacy Rights Act (CPRA) Enforcement Update',
      regulation: 'CCPA/CPRA',
      region: 'US-CA',
      type: 'enforcement',
      severity: 'high',
      publishDate: '2024-01-12',
      effectiveDate: '2024-01-12',
      summary: 'California Privacy Protection Agency announces increased enforcement activities and penalty guidelines.',
      impact: 'Higher penalties for non-compliance. Review consent mechanisms and data processing agreements.',
      source: 'California Privacy Protection Agency',
      status: 'active',
      affectedSystems: ['Customer Database', 'Marketing Systems']
    },
    {
      id: 3,
      title: 'HIPAA Security Rule Technical Safeguards Clarification',
      regulation: 'HIPAA',
      region: 'US',
      type: 'clarification',
      severity: 'medium',
      publishDate: '2024-01-10',
      effectiveDate: '2024-02-10',
      summary: 'HHS provides clarification on encryption requirements for PHI in cloud environments.',
      impact: 'Review cloud storage configurations and encryption implementations for PHI data.',
      source: 'Department of Health and Human Services',
      status: 'pending',
      affectedSystems: ['Healthcare Database', 'Cloud Storage']
    },
    {
      id: 4,
      title: 'PCI DSS v4.0 Migration Deadline Reminder',
      regulation: 'PCI DSS',
      region: 'Global',
      type: 'deadline',
      severity: 'high',
      publishDate: '2024-01-08',
      effectiveDate: '2024-03-31',
      summary: 'Final reminder for migration from PCI DSS v3.2.1 to v4.0 before mandatory compliance date.',
      impact: 'Complete migration to PCI DSS v4.0 requirements including new authentication and testing procedures.',
      source: 'PCI Security Standards Council',
      status: 'urgent',
      affectedSystems: ['Payment Gateway', 'E-commerce Platform']
    }
  ];

  const complianceCalendar = [
    {
      id: 1,
      title: 'GDPR Data Protection Impact Assessment Review',
      regulation: 'GDPR',
      date: '2024-02-15',
      type: 'assessment',
      priority: 'high',
      description: 'Quarterly review of high-risk processing activities'
    },
    {
      id: 2,
      title: 'SOX Internal Controls Testing',
      regulation: 'SOX',
      date: '2024-02-20',
      type: 'testing',
      priority: 'critical',
      description: 'Annual testing of financial reporting controls'
    },
    {
      id: 3,
      title: 'HIPAA Risk Assessment Update',
      regulation: 'HIPAA',
      date: '2024-02-28',
      type: 'assessment',
      priority: 'medium',
      description: 'Semi-annual security risk assessment for PHI systems'
    },
    {
      id: 4,
      title: 'PCI DSS Vulnerability Scan',
      regulation: 'PCI DSS',
      date: '2024-03-01',
      type: 'scan',
      priority: 'high',
      description: 'Quarterly vulnerability scanning of cardholder data environment'
    }
  ];

  const regulatoryTrends = [
    {
      trend: 'AI Governance Regulations',
      description: 'Increasing focus on AI transparency and algorithmic accountability',
      regions: ['EU', 'US', 'UK'],
      timeline: 'Q2 2024',
      impact: 'High',
      preparationStatus: 'In Progress'
    },
    {
      trend: 'Cross-Border Data Transfer Rules',
      description: 'Stricter requirements for international data transfers',
      regions: ['EU', 'APAC'],
      timeline: 'Q3 2024',
      impact: 'Medium',
      preparationStatus: 'Planning'
    },
    {
      trend: 'Cybersecurity Incident Reporting',
      description: 'Mandatory breach notification timelines being reduced',
      regions: ['US', 'EU', 'APAC'],
      timeline: 'Q1 2024',
      impact: 'High',
      preparationStatus: 'Implemented'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error-100 text-error-700 border-error-200';
      case 'medium':
        return 'bg-warning-100 text-warning-700 border-warning-200';
      case 'low':
        return 'bg-accent-100 text-accent-700 border-accent-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-error-100 text-error-700';
      case 'active':
        return 'bg-warning-100 text-warning-700';
      case 'pending':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-error-100 text-error-700';
      case 'high':
        return 'bg-warning-100 text-warning-700';
      case 'medium':
        return 'bg-secondary-100 text-secondary-700';
      case 'low':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regulatory Intelligence</h1>
          <p className="text-gray-500 mt-1">Stay informed about regulatory changes and compliance requirements</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Regions</option>
            <option value="EU">European Union</option>
            <option value="US">United States</option>
            <option value="US-CA">California</option>
            <option value="APAC">Asia Pacific</option>
            <option value="Global">Global</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Bell className="h-4 w-4" />
            <span>Set Alerts</span>
          </button>
        </div>
      </div>

      {/* Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Globe className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">47</p>
              <p className="text-sm text-gray-600">Active Updates</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Calendar className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Upcoming Deadlines</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Tracking Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Regulatory Updates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Regulatory Updates</h3>
          <p className="text-sm text-gray-500 mt-1">Latest regulatory changes and their impact on your organization</p>
        </div>

        <div className="p-6 space-y-6">
          {regulatoryUpdates.map((update) => (
            <div key={update.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{update.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(update.severity)}`}>
                      {update.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                      {update.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <span className="font-medium text-primary-600">{update.regulation}</span>
                    <span>{update.region}</span>
                    <span>{update.type}</span>
                    <span>Published: {update.publishDate}</span>
                    <span>Effective: {update.effectiveDate}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{update.summary}</p>
                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-warning-800"><strong>Impact:</strong> {update.impact}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Source</p>
                  <p className="font-medium text-gray-900">{update.source}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Affected Systems</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {update.affectedSystems.map((system, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">View full documentation</span>
                </div>
                <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors duration-200">
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Calendar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Compliance Calendar</h3>
            <p className="text-sm text-gray-500 mt-1">Upcoming compliance deadlines and activities</p>
          </div>

          <div className="p-6 space-y-4">
            {complianceCalendar.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-primary-600 font-medium">{item.regulation}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Emerging Regulatory Trends</h3>
            <p className="text-sm text-gray-500 mt-1">Future regulatory developments to monitor</p>
          </div>

          <div className="p-6 space-y-4">
            {regulatoryTrends.map((trend, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{trend.trend}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trend.preparationStatus === 'Implemented' ? 'bg-accent-100 text-accent-700' :
                    trend.preparationStatus === 'In Progress' ? 'bg-warning-100 text-warning-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {trend.preparationStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Regions</p>
                    <p className="font-medium text-gray-900">{trend.regions.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Timeline</p>
                    <p className="font-medium text-gray-900">{trend.timeline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};