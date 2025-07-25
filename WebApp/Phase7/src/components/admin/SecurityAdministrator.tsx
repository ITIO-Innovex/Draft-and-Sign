import React, { useState } from 'react';
import { Shield, Lock, AlertTriangle, Users, Database, Key, Eye, Settings } from 'lucide-react';

export const SecurityAdministrator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const securityMetrics = {
    securityScore: 94.8,
    activeThreats: 3,
    blockedAttacks: 1247,
    vulnerabilities: 8,
    patchCompliance: 98.2,
    accessViolations: 12,
    encryptionCoverage: 99.7,
    backupIntegrity: 100
  };

  const securityControls = [
    {
      category: 'Identity & Access Management',
      controls: [
        { name: 'Multi-Factor Authentication', status: 'enabled', coverage: 100, lastUpdate: '2024-06-30' },
        { name: 'Privileged Access Management', status: 'enabled', coverage: 95, lastUpdate: '2024-06-28' },
        { name: 'Single Sign-On', status: 'enabled', coverage: 87, lastUpdate: '2024-06-25' },
        { name: 'Access Review Process', status: 'enabled', coverage: 92, lastUpdate: '2024-06-20' }
      ]
    },
    {
      category: 'Data Protection',
      controls: [
        { name: 'Data Encryption at Rest', status: 'enabled', coverage: 99.7, lastUpdate: '2024-06-30' },
        { name: 'Data Encryption in Transit', status: 'enabled', coverage: 100, lastUpdate: '2024-06-30' },
        { name: 'Data Loss Prevention', status: 'enabled', coverage: 94, lastUpdate: '2024-06-29' },
        { name: 'Database Activity Monitoring', status: 'enabled', coverage: 98, lastUpdate: '2024-06-28' }
      ]
    },
    {
      category: 'Network Security',
      controls: [
        { name: 'Firewall Protection', status: 'enabled', coverage: 100, lastUpdate: '2024-06-30' },
        { name: 'Intrusion Detection System', status: 'enabled', coverage: 96, lastUpdate: '2024-06-29' },
        { name: 'Network Segmentation', status: 'enabled', coverage: 89, lastUpdate: '2024-06-25' },
        { name: 'VPN Access Control', status: 'enabled', coverage: 93, lastUpdate: '2024-06-27' }
      ]
    }
  ];

  const securityIncidents = [
    {
      id: 'SEC-2024-001',
      title: 'Suspicious Login Activity',
      severity: 'medium',
      status: 'investigating',
      detected: '2024-07-01 14:30',
      assignee: 'Security Team',
      affectedSystems: ['Authentication System'],
      description: 'Multiple failed login attempts from unusual geographic location'
    },
    {
      id: 'SEC-2024-002',
      title: 'Potential Data Exfiltration',
      severity: 'high',
      status: 'contained',
      detected: '2024-06-30 22:15',
      assignee: 'Sarah Johnson',
      affectedSystems: ['Database Server', 'File Storage'],
      description: 'Unusual data access patterns detected in customer database'
    },
    {
      id: 'SEC-2024-003',
      title: 'Malware Detection',
      severity: 'low',
      status: 'resolved',
      detected: '2024-06-29 09:45',
      resolved: '2024-06-29 11:20',
      assignee: 'Michael Chen',
      affectedSystems: ['Workstation-045'],
      description: 'Malware detected and quarantined on employee workstation'
    }
  ];

  const vulnerabilityAssessments = [
    {
      id: 'VA-2024-Q2',
      name: 'Quarterly Security Assessment',
      type: 'Comprehensive',
      status: 'completed',
      startDate: '2024-06-01',
      completedDate: '2024-06-15',
      vulnerabilities: {
        critical: 0,
        high: 2,
        medium: 6,
        low: 12
      },
      remediated: 18,
      pending: 2
    },
    {
      id: 'VA-2024-PEN',
      name: 'Penetration Testing',
      type: 'External',
      status: 'in-progress',
      startDate: '2024-06-25',
      vulnerabilities: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 8
      },
      remediated: 8,
      pending: 4
    }
  ];

  const accessManagement = [
    {
      role: 'System Administrator',
      users: 5,
      permissions: 'Full System Access',
      lastReview: '2024-06-15',
      riskLevel: 'high',
      mfaCompliance: 100
    },
    {
      role: 'Compliance Manager',
      users: 12,
      permissions: 'Compliance Data Access',
      lastReview: '2024-06-20',
      riskLevel: 'medium',
      mfaCompliance: 100
    },
    {
      role: 'Audit Analyst',
      users: 8,
      permissions: 'Read-only Audit Access',
      lastReview: '2024-06-18',
      riskLevel: 'low',
      mfaCompliance: 100
    },
    {
      role: 'Data Analyst',
      users: 23,
      permissions: 'Analytics Data Access',
      lastReview: '2024-06-22',
      riskLevel: 'medium',
      mfaCompliance: 96
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled':
        return 'bg-accent-100 text-accent-700';
      case 'investigating':
        return 'bg-warning-100 text-warning-700';
      case 'contained':
        return 'bg-secondary-100 text-secondary-700';
      case 'resolved':
        return 'bg-accent-100 text-accent-700';
      case 'completed':
        return 'bg-accent-100 text-accent-700';
      case 'in-progress':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-100 text-error-700 border-error-200';
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-error-100 text-error-700';
      case 'medium':
        return 'bg-warning-100 text-warning-700';
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
          <h1 className="text-2xl font-bold text-gray-900">Security Administration</h1>
          <p className="text-gray-500 mt-1">Enterprise security management and access control</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="access">Access Management</option>
            <option value="data">Data Protection</option>
            <option value="network">Network Security</option>
            <option value="incidents">Security Incidents</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Security Report
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{securityMetrics.securityScore}%</p>
              <p className="text-sm text-gray-600">Security Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{securityMetrics.activeThreats}</p>
              <p className="text-sm text-gray-600">Active Threats</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Lock className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{securityMetrics.encryptionCoverage}%</p>
              <p className="text-sm text-gray-600">Encryption Coverage</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Database className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{securityMetrics.blockedAttacks.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Blocked Attacks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Security Controls Framework</h3>
          <p className="text-sm text-gray-500 mt-1">Enterprise security controls implementation and monitoring</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {securityControls.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h4>
                <div className="space-y-3">
                  {category.controls.map((control, controlIndex) => (
                    <div key={controlIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h5 className="font-medium text-gray-900">{control.name}</h5>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(control.status)}`}>
                            {control.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Last updated: {control.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{control.coverage}%</div>
                        <div className="text-sm text-gray-500">Coverage</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Incidents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Security Incident Management</h3>
          <p className="text-sm text-gray-500 mt-1">Active and recent security incidents requiring attention</p>
        </div>

        <div className="p-6 space-y-4">
          {securityIncidents.map((incident) => (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{incident.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>ID: {incident.id}</span>
                    <span>Detected: {incident.detected}</span>
                    {incident.resolved && <span>Resolved: {incident.resolved}</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Assignee</p>
                  <p className="font-medium text-gray-900">{incident.assignee}</p>
                </div>
                <div>
                  <p className="text-gray-500">Affected Systems</p>
                  <div className="flex flex-wrap gap-1">
                    {incident.affectedSystems.map((system, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700">
                    <Settings className="h-4 w-4" />
                    <span>Manage</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerability Assessments & Access Management */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Vulnerability Assessments</h3>
            <p className="text-sm text-gray-500 mt-1">Security assessment results and remediation status</p>
          </div>

          <div className="p-6 space-y-4">
            {vulnerabilityAssessments.map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{assessment.name}</h4>
                    <p className="text-sm text-gray-600">{assessment.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                    {assessment.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-3 text-center text-sm">
                  <div className="p-2 bg-error-50 rounded">
                    <p className="font-bold text-error-600">{assessment.vulnerabilities.critical}</p>
                    <p className="text-xs text-gray-600">Critical</p>
                  </div>
                  <div className="p-2 bg-warning-50 rounded">
                    <p className="font-bold text-warning-600">{assessment.vulnerabilities.high}</p>
                    <p className="text-xs text-gray-600">High</p>
                  </div>
                  <div className="p-2 bg-secondary-50 rounded">
                    <p className="font-bold text-secondary-600">{assessment.vulnerabilities.medium}</p>
                    <p className="text-xs text-gray-600">Medium</p>
                  </div>
                  <div className="p-2 bg-accent-50 rounded">
                    <p className="font-bold text-accent-600">{assessment.vulnerabilities.low}</p>
                    <p className="text-xs text-gray-600">Low</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {assessment.completedDate ? `Completed: ${assessment.completedDate}` : `Started: ${assessment.startDate}`}
                  </span>
                  <span className="text-gray-500">
                    Remediated: {assessment.remediated} | Pending: {assessment.pending}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Access Management</h3>
            <p className="text-sm text-gray-500 mt-1">Role-based access control and user permissions</p>
          </div>

          <div className="p-6 space-y-4">
            {accessManagement.map((role, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{role.role}</h4>
                    <p className="text-sm text-gray-600">{role.permissions}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(role.riskLevel)}`}>
                      {role.riskLevel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Users</p>
                    <p className="font-medium text-gray-900">{role.users}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">MFA Compliance</p>
                    <p className="font-medium text-gray-900">{role.mfaCompliance}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Review</p>
                    <p className="font-medium text-gray-900">{role.lastReview}</p>
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