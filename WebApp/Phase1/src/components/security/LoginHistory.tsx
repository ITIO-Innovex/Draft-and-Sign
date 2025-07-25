import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, XCircle, Monitor, Smartphone, Tablet, Filter } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LoginHistoryProps {
  onClose: () => void;
}

export const LoginHistory: React.FC<LoginHistoryProps> = ({ onClose }) => {
  const { securitySettings } = useProfileStore();
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');

  const filteredHistory = securitySettings.loginHistory.filter(attempt => {
    if (filter === 'success') return attempt.success;
    if (filter === 'failed') return !attempt.success;
    return true;
  });

  const getDeviceIcon = (deviceString: string) => {
    if (deviceString.toLowerCase().includes('mobile') || deviceString.toLowerCase().includes('iphone') || deviceString.toLowerCase().includes('android')) {
      return Smartphone;
    }
    if (deviceString.toLowerCase().includes('tablet') || deviceString.toLowerCase().includes('ipad')) {
      return Tablet;
    }
    return Monitor;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };
  };

  const getLocationFlag = (location: string) => {
    // Simple mapping for demo purposes
    const locationFlags: { [key: string]: string } = {
      'New York, NY': '🇺🇸',
      'Los Angeles, CA': '🇺🇸',
      'London, UK': '🇬🇧',
      'Toronto, CA': '🇨🇦',
      'Sydney, AU': '🇦🇺',
    };
    return locationFlags[location] || '🌍';
  };

  const successfulLogins = securitySettings.loginHistory.filter(a => a.success).length;
  const failedLogins = securitySettings.loginHistory.filter(a => !a.success).length;

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {securitySettings.loginHistory.length}
            </div>
            <div className="text-sm text-gray-600">Total Attempts</div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {successfulLogins}
            </div>
            <div className="text-sm text-gray-600">Successful</div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {failedLogins}
            </div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Login Activity</h3>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Attempts</option>
            <option value="success">Successful Only</option>
            <option value="failed">Failed Only</option>
          </select>
        </div>
      </div>

      {/* Login History List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((attempt) => {
            const { date, time } = formatTimestamp(attempt.timestamp);
            const DeviceIcon = getDeviceIcon(attempt.device);
            
            return (
              <Card key={attempt.id} padding="sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      attempt.success ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {attempt.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-medium ${
                          attempt.success ? 'text-gray-900' : 'text-red-900'
                        }`}>
                          {attempt.success ? 'Successful Login' : 'Failed Login Attempt'}
                        </h4>
                        <span className="text-sm text-gray-500">
                          via {attempt.method}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <DeviceIcon className="h-3 w-3" />
                            <span>{attempt.device}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>{getLocationFlag(attempt.location)}</span>
                            <MapPin className="h-3 w-3" />
                            <span>{attempt.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{date} at {time}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{attempt.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!attempt.success && (
                    <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                      Blocked
                    </div>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Login History</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'No login attempts recorded yet.'
                : `No ${filter} login attempts found.`
              }
            </p>
          </Card>
        )}
      </div>

      {/* Security Alert */}
      {failedLogins > 0 && (
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <h4 className="font-medium text-red-900">Security Alert</h4>
              <p className="text-sm text-red-800">
                {failedLogins} failed login attempt{failedLogins > 1 ? 's' : ''} detected. 
                If you don't recognize these attempts, consider changing your password.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Close Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};