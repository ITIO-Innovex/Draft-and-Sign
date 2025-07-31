import React, { useState } from 'react';
import { Shield, AlertTriangle, Eye, Lock, Users, Globe, Activity, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'login_failure' | 'suspicious_activity' | 'data_access' | 'policy_violation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  userName?: string;
  ipAddress: string;
  location: string;
  status: 'open' | 'investigating' | 'resolved';
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: '1',
    timestamp: '2024-07-01T10:30:00Z',
    type: 'login_failure',
    severity: 'medium',
    description: 'Multiple failed login attempts from suspicious IP',
    userId: 'user_123',
    userName: 'John Doe',
    ipAddress: '203.0.113.1',
    location: 'Unknown Location',
    status: 'investigating',
  },
  {
    id: '2',
    timestamp: '2024-07-01T09:15:00Z',
    type: 'suspicious_activity',
    severity: 'high',
    description: 'Unusual data access pattern detected',
    userId: 'user_456',
    userName: 'Jane Smith',
    ipAddress: '198.51.100.1',
    location: 'New York, NY',
    status: 'open',
  },
  {
    id: '3',
    timestamp: '2024-07-01T08:45:00Z',
    type: 'policy_violation',
    severity: 'low',
    description: 'Password policy violation attempt',
    userId: 'user_789',
    userName: 'Bob Wilson',
    ipAddress: '192.168.1.100',
    location: 'San Francisco, CA',
    status: 'resolved',
  },
];

export const SecurityMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);

  const securityMetrics = [
    {
      name: 'Security Score',
      value: '94%',
      change: '+2%',
      changeType: 'increase',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Active Threats',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      name: 'Failed Logins',
      value: '47',
      change: '+12',
      changeType: 'increase',
      icon: Lock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Monitored Users',
      value: '23.5K',
      change: '+156',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login_failure': return Lock;
      case 'suspicious_activity': return Eye;
      case 'data_access': return Activity;
      case 'policy_violation': return AlertTriangle;
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

  const threatLevels = [
    { level: 'Critical', count: 0, color: 'text-red-600' },
    { level: 'High', count: 1, color: 'text-orange-600' },
    { level: 'Medium', count: 1, color: 'text-yellow-600' },
    { level: 'Low', count: 1, color: 'text-blue-600' },
  ];

  return (
    <FeatureGate permission="audit_logs">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Monitoring</h1>
            <p className="mt-1 text-gray-600">
              Real-time security monitoring and threat detection across the platform.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            
            <Button variant="outline">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.name} className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <span className={`
                        text-sm font-medium
                        ${metric.changeType === 'increase' && metric.name === 'Security Score' ? 'text-green-600' :
                          metric.changeType === 'decrease' && metric.name === 'Active Threats' ? 'text-green-600' :
                          metric.changeType === 'increase' ? 'text-red-600' : 'text-green-600'}
                      `}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Threat Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Threat Levels</h3>
              
              <div className="space-y-3">
                {threatLevels.map((threat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${threat.color}`}>{threat.level}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${threat.color.replace('text-', 'bg-')}`}
                          style={{ width: `${(threat.count / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{threat.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Security Health</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">MFA Adoption</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">78%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password Strength</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">85%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Session Security</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Events */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Security Events</h3>
              <Button variant="ghost" size="sm">View All Events</Button>
            </div>
            
            <div className="space-y-3">
              {mockSecurityEvents.map((event) => {
                const TypeIcon = getTypeIcon(event.type);
                return (
                  <div 
                    key={event.id} 
                    className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getSeverityColor(event.severity)}`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <TypeIcon className="h-5 w-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{event.description}</h4>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                          <div className="text-sm mt-1 space-y-1">
                            {event.userName && (
                              <p>User: {event.userName} ({event.userId})</p>
                            )}
                            <p>IP: {event.ipAddress} • Location: {event.location}</p>
                            <p>Time: {formatTimestamp(event.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityColor(event.severity)}`}>
                          {event.severity.toUpperCase()}
                        </span>
                        <Button variant="ghost" size="sm">
                          Investigate
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Global Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Countries Monitored</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <Activity className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">99.8%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">2.3M</div>
              <div className="text-sm text-gray-600">Events Processed</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <Shield className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Data Breaches</div>
            </div>
          </Card>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedEvent(null)}
              ></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Security Event Details</h3>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                        ×
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Event Type</label>
                        <p className="text-sm text-gray-900">{selectedEvent.type.replace('_', ' ')}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Severity</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(selectedEvent.severity)}`}>
                          {selectedEvent.severity.toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="text-sm text-gray-900">{selectedEvent.description}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Timestamp</label>
                        <p className="text-sm text-gray-900">{new Date(selectedEvent.timestamp).toLocaleString()}</p>
                      </div>
                      
                      {selectedEvent.userName && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">User</label>
                          <p className="text-sm text-gray-900">{selectedEvent.userName} ({selectedEvent.userId})</p>
                        </div>
                      )}
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">IP Address</label>
                        <p className="text-sm text-gray-900">{selectedEvent.ipAddress}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-sm text-gray-900">{selectedEvent.location}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedEvent.status)}`}>
                          {selectedEvent.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse space-x-2">
                  <Button>
                    Take Action
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
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