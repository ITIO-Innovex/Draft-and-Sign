import React from 'react';
import { Monitor, Smartphone, Tablet, MapPin, Clock, Trash2, Shield } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DeviceManagerProps {
  onClose: () => void;
}

export const DeviceManager: React.FC<DeviceManagerProps> = ({ onClose }) => {
  const { securitySettings, removeTrustedDevice, isLoading } = useProfileStore();

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const handleRemoveDevice = async (deviceId: number) => {
    if (window.confirm('Are you sure you want to remove this trusted device?')) {
      try {
        await removeTrustedDevice(deviceId);
      } catch (error) {
        console.error('Error removing device:', error);
      }
    }
  };

  const formatLastUsed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Trusted Devices</h3>
            <p className="text-sm text-blue-800">
              These devices can access your account without additional verification. 
              Remove any devices you don't recognize or no longer use.
            </p>
          </div>
        </div>
      </div>

      {/* Current Device */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Current Device</h3>
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Monitor className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-900">This Device</h4>
                <div className="text-sm text-green-800 space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Current Location</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Active now</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-green-600 font-medium text-sm">
              ✓ Current Session
            </div>
          </div>
        </Card>
      </div>

      {/* Trusted Devices */}
      {securitySettings.trustedDevices.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Trusted Devices</h3>
            <span className="text-sm text-gray-500">
              {securitySettings.trustedDevices.filter(d => d.isActive).length} active
            </span>
          </div>
          
          <div className="space-y-3">
            {securitySettings.trustedDevices.map((device) => {
              const Icon = getDeviceIcon(device.type);
              
              return (
                <Card key={device.id} padding="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        device.isActive ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          device.isActive ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{device.name}</h4>
                          {!device.isActive && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{device.browser}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{device.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Last used {formatLastUsed(device.lastUsed)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveDevice(device.id)}
                      className="text-red-600 hover:text-red-700"
                      loading={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="text-center py-8">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Trusted Devices</h3>
          <p className="text-gray-600">
            When you log in from a new device, you can choose to trust it for future logins.
          </p>
        </Card>
      )}

      {/* Security Tips */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="space-y-3">
          <h4 className="font-medium text-yellow-900">Security Tips</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Regularly review and remove devices you no longer use</li>
            <li>• Don't trust devices on public or shared computers</li>
            <li>• If you see an unfamiliar device, remove it immediately</li>
            <li>• Consider changing your password if you notice suspicious activity</li>
          </ul>
        </div>
      </Card>

      {/* Close Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
};