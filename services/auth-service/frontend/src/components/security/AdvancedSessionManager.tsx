import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, MapPin, Clock, Shield, AlertTriangle, Trash2, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  deviceName: string;
  browser: string;
  ipAddress: string;
  location: string;
  startTime: string;
  lastActivity: string;
  isCurrentSession: boolean;
  riskScore: number;
  activities: SessionActivity[];
}

interface SessionActivity {
  id: string;
  action: string;
  timestamp: string;
  details: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockSessions: ActiveSession[] = [
  {
    id: 'session_001',
    userId: 'user_123',
    userName: 'John Doe',
    deviceType: 'desktop',
    deviceName: 'MacBook Pro',
    browser: 'Chrome 126.0',
    ipAddress: '192.168.1.100',
    location: 'New York, NY',
    startTime: '2024-07-01T09:00:00Z',
    lastActivity: '2024-07-01T14:30:00Z',
    isCurrentSession: true,
    riskScore: 15,
    activities: [
      {
        id: 'activity_001',
        action: 'Document Access',
        timestamp: '2024-07-01T14:30:00Z',
        details: 'Accessed Contract_2024.pdf',
        riskLevel: 'low',
      },
      {
        id: 'activity_002',
        action: 'Profile Update',
        timestamp: '2024-07-01T14:15:00Z',
        details: 'Updated contact information',
        riskLevel: 'low',
      },
    ],
  },
  {
    id: 'session_002',
    userId: 'user_456',
    userName: 'Jane Smith',
    deviceType: 'mobile',
    deviceName: 'iPhone 15',
    browser: 'Safari Mobile',
    ipAddress: '203.0.113.45',
    location: 'Los Angeles, CA',
    startTime: '2024-07-01T08:30:00Z',
    lastActivity: '2024-07-01T14:25:00Z',
    isCurrentSession: false,
    riskScore: 75,
    activities: [
      {
        id: 'activity_003',
        action: 'Bulk Download',
        timestamp: '2024-07-01T14:25:00Z',
        details: 'Downloaded 15 documents',
        riskLevel: 'high',
      },
      {
        id: 'activity_004',
        action: 'Login from New Location',
        timestamp: '2024-07-01T08:30:00Z',
        details: 'First login from Los Angeles',
        riskLevel: 'medium',
      },
    ],
  },
  {
    id: 'session_003',
    userId: 'user_789',
    userName: 'Bob Wilson',
    deviceType: 'tablet',
    deviceName: 'iPad Pro',
    browser: 'Safari',
    ipAddress: '198.51.100.22',
    location: 'Chicago, IL',
    startTime: '2024-07-01T10:15:00Z',
    lastActivity: '2024-07-01T14:20:00Z',
    isCurrentSession: false,
    riskScore: 25,
    activities: [
      {
        id: 'activity_005',
        action: 'Document Signature',
        timestamp: '2024-07-01T14:20:00Z',
        details: 'Signed NDA_Template.pdf',
        riskLevel: 'low',
      },
    ],
  },
];

export const AdvancedSessionManager: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<ActiveSession | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 70) return 'text-red-600 bg-red-100';
    if (riskScore >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getActivityRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInHours = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(((end.getTime() - start.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffInHours > 0) {
      return `${diffInHours}h ${diffInMinutes}m`;
    }
    return `${diffInMinutes}m`;
  };

  const formatLastActivity = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredSessions = mockSessions.filter(session => {
    if (filterRisk === 'all') return true;
    if (filterRisk === 'high') return session.riskScore >= 70;
    if (filterRisk === 'medium') return session.riskScore >= 40 && session.riskScore < 70;
    if (filterRisk === 'low') return session.riskScore < 40;
    return true;
  });

  const sessionStats = {
    total: mockSessions.length,
    active: mockSessions.filter(s => new Date(s.lastActivity).getTime() > Date.now() - 30 * 60 * 1000).length,
    highRisk: mockSessions.filter(s => s.riskScore >= 70).length,
    avgDuration: '2h 15m',
  };

  const terminateSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to terminate this session?')) {
      console.log('Terminating session:', sessionId);
      // Handle session termination
    }
  };

  return (
    <FeatureGate permission="team_management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Session Management</h1>
            <p className="mt-1 text-gray-600">
              Monitor and manage active user sessions across the platform.
            </p>
          </div>
          
          <Button variant="outline">
            Session Settings
          </Button>
        </div>

        {/* Session Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{sessionStats.total}</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{sessionStats.active}</div>
              <div className="text-sm text-gray-600">Active Now</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{sessionStats.highRisk}</div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{sessionStats.avgDuration}</div>
              <div className="text-sm text-gray-600">Avg Duration</div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filter by risk:</span>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Sessions</option>
                <option value="high">High Risk (70+)</option>
                <option value="medium">Medium Risk (40-69)</option>
                <option value="low">Low Risk (less than 40)</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-500">
              Showing {filteredSessions.length} of {mockSessions.length} sessions
            </div>
          </div>
        </Card>

        {/* Active Sessions */}
        <div className="space-y-4">
          {filteredSessions.map((session) => {
            const DeviceIcon = getDeviceIcon(session.deviceType);
            
            return (
              <Card
                key={session.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  session.isCurrentSession ? 'border-blue-300 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <DeviceIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{session.userName}</h3>
                        {session.isCurrentSession && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Current Session
                          </span>
                        )}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(session.riskScore)}`}>
                          Risk: {session.riskScore}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-4">
                          <span>{session.deviceName} • {session.browser}</span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{session.location}</span>
                          </div>
                          <span>{session.ipAddress}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>Duration: {formatDuration(session.startTime, session.lastActivity)}</span>
                          </div>
                          <span>Last activity: {formatLastActivity(session.lastActivity)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!session.isCurrentSession && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          terminateSession(session.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredSessions.length === 0 && (
          <Card className="text-center py-12">
            <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-600">
              No active sessions match the current filter criteria.
            </p>
          </Card>
        )}

        {/* Session Details Modal */}
        {selectedSession && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedSession(null)}
              ></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-6 pt-6 pb-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Session Details</h3>
                      <button
                        onClick={() => setSelectedSession(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">User</label>
                          <p className="text-sm text-gray-900">{selectedSession.userName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Device</label>
                          <p className="text-sm text-gray-900">{selectedSession.deviceName}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Browser</label>
                          <p className="text-sm text-gray-900">{selectedSession.browser}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">IP Address</label>
                          <p className="text-sm text-gray-900">{selectedSession.ipAddress}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Location</label>
                        <p className="text-sm text-gray-900">{selectedSession.location}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Session Start</label>
                          <p className="text-sm text-gray-900">{new Date(selectedSession.startTime).toLocaleString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Last Activity</label>
                          <p className="text-sm text-gray-900">{new Date(selectedSession.lastActivity).toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Risk Score</label>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(selectedSession.riskScore)}`}>
                            {selectedSession.riskScore}
                          </span>
                          <span className="text-sm text-gray-600">
                            {selectedSession.riskScore >= 70 ? 'High Risk' :
                             selectedSession.riskScore >= 40 ? 'Medium Risk' : 'Low Risk'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Recent Activities</label>
                        <div className="mt-2 space-y-2">
                          {selectedSession.activities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p className="text-xs text-gray-500">{activity.details}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActivityRiskColor(activity.riskLevel)}`}>
                                  {activity.riskLevel}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {formatLastActivity(activity.timestamp)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-3 sm:flex sm:flex-row-reverse space-x-2">
                  {!selectedSession.isCurrentSession && (
                    <Button
                      variant="danger"
                      onClick={() => {
                        terminateSession(selectedSession.id);
                        setSelectedSession(null);
                      }}
                    >
                      Terminate Session
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => setSelectedSession(null)}>
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