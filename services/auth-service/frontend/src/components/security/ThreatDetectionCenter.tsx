import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Activity, TrendingUp, MapPin, Clock, Filter } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

interface ThreatEvent {
  id: string;
  type: 'brute_force' | 'suspicious_login' | 'anomalous_behavior' | 'data_exfiltration' | 'account_takeover';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  ipAddress: string;
  location: string;
  riskScore: number;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  indicators: string[];
  mitigationActions: string[];
}

const mockThreatEvents: ThreatEvent[] = [
  {
    id: 'threat_001',
    type: 'brute_force',
    severity: 'high',
    title: 'Brute Force Attack Detected',
    description: 'Multiple failed login attempts from single IP address',
    timestamp: '2024-07-01T14:23:00Z',
    userId: 'user_123',
    userName: 'john.doe@acme.com',
    ipAddress: '203.0.113.45',
    location: 'Unknown Location',
    riskScore: 85,
    status: 'active',
    indicators: ['15 failed attempts in 5 minutes', 'IP not in whitelist', 'Unusual user agent'],
    mitigationActions: ['IP temporarily blocked', 'User account locked', 'Security team notified'],
  },
  {
    id: 'threat_002',
    type: 'suspicious_login',
    severity: 'medium',
    title: 'Login from New Location',
    description: 'User logged in from unusual geographic location',
    timestamp: '2024-07-01T13:45:00Z',
    userId: 'user_456',
    userName: 'jane.smith@acme.com',
    ipAddress: '198.51.100.22',
    location: 'Beijing, China',
    riskScore: 65,
    status: 'investigating',
    indicators: ['Login from new country', 'Different time zone', 'No travel notification'],
    mitigationActions: ['MFA challenge sent', 'Session monitoring enabled', 'User notified'],
  },
  {
    id: 'threat_003',
    type: 'anomalous_behavior',
    severity: 'medium',
    title: 'Unusual Data Access Pattern',
    description: 'User accessing significantly more documents than usual',
    timestamp: '2024-07-01T12:30:00Z',
    userId: 'user_789',
    userName: 'bob.wilson@acme.com',
    ipAddress: '192.168.1.100',
    location: 'New York, NY',
    riskScore: 55,
    status: 'resolved',
    indicators: ['300% increase in document access', 'Accessing sensitive files', 'Outside normal hours'],
    mitigationActions: ['Manager notified', 'Access logged', 'Legitimate business need confirmed'],
  },
];

export const ThreatDetectionCenter: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatEvent | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredThreats = mockThreatEvents.filter(threat => {
    const matchesSeverity = filterSeverity === 'all' || threat.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || threat.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'false_positive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatTypeIcon = (type: string) => {
    switch (type) {
      case 'brute_force': return Shield;
      case 'suspicious_login': return Eye;
      case 'anomalous_behavior': return Activity;
      case 'data_exfiltration': return TrendingUp;
      case 'account_takeover': return AlertTriangle;
      default: return Shield;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const threatStats = {
    total: mockThreatEvents.length,
    active: mockThreatEvents.filter(t => t.status === 'active').length,
    investigating: mockThreatEvents.filter(t => t.status === 'investigating').length,
    resolved: mockThreatEvents.filter(t => t.status === 'resolved').length,
    avgRiskScore: Math.round(mockThreatEvents.reduce((sum, t) => sum + t.riskScore, 0) / mockThreatEvents.length),
  };

  return (
    <FeatureGate permission="audit_logs">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Threat Detection Center</h1>
            <p className="mt-1 text-gray-600">
              Real-time security threat monitoring and incident response.
            </p>
          </div>
          
          <Button variant="outline">
            Configure Rules
          </Button>
        </div>

        {/* Threat Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{threatStats.total}</div>
              <div className="text-sm text-gray-600">Total Threats</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{threatStats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{threatStats.investigating}</div>
              <div className="text-sm text-gray-600">Investigating</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{threatStats.resolved}</div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{threatStats.avgRiskScore}</div>
              <div className="text-sm text-gray-600">Avg Risk Score</div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="false_positive">False Positive</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredThreats.length} of {mockThreatEvents.length} threats
            </div>
          </div>
        </Card>

        {/* Threat Events */}
        <div className="space-y-4">
          {filteredThreats.map((threat) => {
            const ThreatIcon = getThreatTypeIcon(threat.type);
            
            return (
              <Card
                key={threat.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${getSeverityColor(threat.severity)}`}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-gray-50">
                      <ThreatIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{threat.title}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(threat.severity)}`}>
                          {threat.severity.toUpperCase()}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(threat.status)}`}>
                          {threat.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{threat.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTimestamp(threat.timestamp)}</span>
                        </div>
                        {threat.userName && (
                          <span>User: {threat.userName}</span>
                        )}
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{threat.location}</span>
                        </div>
                        <span>Risk Score: {threat.riskScore}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      threat.riskScore >= 80 ? 'bg-red-100' :
                      threat.riskScore >= 60 ? 'bg-orange-100' :
                      threat.riskScore >= 40 ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        threat.riskScore >= 80 ? 'text-red-600' :
                        threat.riskScore >= 60 ? 'text-orange-600' :
                        threat.riskScore >= 40 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {threat.riskScore}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredThreats.length === 0 && (
          <Card className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No threats found</h3>
            <p className="text-gray-600">
              No security threats match the current filter criteria.
            </p>
          </Card>
        )}

        {/* Threat Details Modal */}
        {selectedThreat && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedThreat(null)}
              ></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Threat Details</h3>
                      <button
                        onClick={() => setSelectedThreat(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Threat Type</label>
                          <p className="text-sm text-gray-900">{selectedThreat.type.replace('_', ' ')}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Severity</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(selectedThreat.severity)}`}>
                            {selectedThreat.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="text-sm text-gray-900">{selectedThreat.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">IP Address</label>
                          <p className="text-sm text-gray-900">{selectedThreat.ipAddress}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Location</label>
                          <p className="text-sm text-gray-900">{selectedThreat.location}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Risk Indicators</label>
                        <ul className="text-sm text-gray-900 mt-1 space-y-1">
                          {selectedThreat.indicators.map((indicator, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <AlertTriangle className="h-3 w-3 text-yellow-500" />
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Mitigation Actions</label>
                        <ul className="text-sm text-gray-900 mt-1 space-y-1">
                          {selectedThreat.mitigationActions.map((action, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Shield className="h-3 w-3 text-green-500" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse space-x-2">
                  <Button>
                    Take Action
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedThreat(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </FeatureGate>
  );
};