import React, { useState } from 'react';
import { Search, Filter, Download, Eye, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FeatureGate } from '../ui/FeatureGate';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure' | 'warning';
  organizationId?: string;
  organizationName?: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-07-01T10:30:00Z',
    userId: 'user_123',
    userName: 'John Doe',
    action: 'user.login',
    resource: 'authentication',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'success',
    organizationId: 'org_acme',
    organizationName: 'Acme Corp',
  },
  {
    id: '2',
    timestamp: '2024-07-01T10:25:00Z',
    userId: 'user_456',
    userName: 'Jane Smith',
    action: 'document.create',
    resource: 'documents',
    details: 'Created new document: Contract_2024.pdf',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'success',
    organizationId: 'org_acme',
    organizationName: 'Acme Corp',
  },
  {
    id: '3',
    timestamp: '2024-07-01T10:20:00Z',
    userId: 'user_789',
    userName: 'Bob Wilson',
    action: 'user.login',
    resource: 'authentication',
    details: 'Failed login attempt - invalid password',
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
    status: 'failure',
    organizationId: 'org_tech',
    organizationName: 'TechStart Inc',
  },
  {
    id: '4',
    timestamp: '2024-07-01T10:15:00Z',
    userId: 'admin_001',
    userName: 'Alex Johnson',
    action: 'organization.settings.update',
    resource: 'organization',
    details: 'Updated security settings for organization',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'success',
    organizationId: 'org_draftsign',
    organizationName: 'DraftSign Inc',
  },
  {
    id: '5',
    timestamp: '2024-07-01T10:10:00Z',
    userId: 'user_321',
    userName: 'Sarah Davis',
    action: 'api.key.generate',
    resource: 'api',
    details: 'Generated new API key for integration',
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'warning',
    organizationId: 'org_global',
    organizationName: 'Global Solutions',
  },
];

export const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action.includes(filterAction);
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failure':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'failure':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  return (
    <FeatureGate permission="audit_logs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
            <p className="mt-1 text-gray-600">
              Monitor all system activities and user actions across the platform.
            </p>
          </div>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Actions</option>
              <option value="login">Login Events</option>
              <option value="document">Document Actions</option>
              <option value="organization">Organization Changes</option>
              <option value="api">API Activities</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="warning">Warning</option>
            </select>
            
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </Card>

        {/* Audit Logs Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const { date, time } = formatTimestamp(log.timestamp);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{date}</div>
                        <div className="text-sm text-gray-500">{time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                        <div className="text-sm text-gray-500">{log.organizationName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.action}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{log.resource}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <AlertTriangle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No audit logs found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </Card>

        {/* Log Details Modal */}
        {selectedLog && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                onClick={() => setSelectedLog(null)}
              ></div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Audit Log Details</h3>
                      <button
                        onClick={() => setSelectedLog(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircle className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Timestamp</label>
                        <p className="text-sm text-gray-900">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">User</label>
                        <p className="text-sm text-gray-900">{selectedLog.userName} ({selectedLog.userId})</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Organization</label>
                        <p className="text-sm text-gray-900">{selectedLog.organizationName}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Action</label>
                        <p className="text-sm text-gray-900">{selectedLog.action}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Resource</label>
                        <p className="text-sm text-gray-900">{selectedLog.resource}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Details</label>
                        <p className="text-sm text-gray-900">{selectedLog.details}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">IP Address</label>
                        <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">User Agent</label>
                        <p className="text-sm text-gray-900 break-all">{selectedLog.userAgent}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(selectedLog.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedLog.status)}`}>
                            {selectedLog.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button onClick={() => setSelectedLog(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{mockAuditLogs.length}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
          </Card>
          
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {mockAuditLogs.filter(log => log.status === 'success').length}
              </div>
              <div className="text-sm text-gray-600">Successful</div>
            </div>
          </Card>
          
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {mockAuditLogs.filter(log => log.status === 'failure').length}
              </div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </Card>
          
          <Card padding="sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {mockAuditLogs.filter(log => log.status === 'warning').length}
              </div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
          </Card>
        </div>
      </div>
    </FeatureGate>
  );
};