import React, { useState } from 'react';
import { Smartphone, Mail, Key, Plus, Trash2, CheckCircle } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface MFASetupProps {
  onClose: () => void;
}

export const MFASetup: React.FC<MFASetupProps> = ({ onClose }) => {
  const { securitySettings, enableMFA, disableMFA, isLoading } = useProfileStore();
  const [activeSetup, setActiveSetup] = useState<string | null>(null);
  const [setupData, setSetupData] = useState({ identifier: '', code: '' });

  const mfaMethods = [
    {
      id: 'sms',
      name: 'SMS Authentication',
      description: 'Receive codes via text message',
      icon: Smartphone,
      setup: 'Phone Number',
    },
    {
      id: 'email',
      name: 'Email Authentication',
      description: 'Receive codes via email',
      icon: Mail,
      setup: 'Email Address',
    },
    {
      id: 'authenticator',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar app',
      icon: Key,
      setup: 'App Setup',
    },
  ];

  const handleEnableMFA = async (method: string) => {
    try {
      await enableMFA(method, setupData.identifier);
      setActiveSetup(null);
      setSetupData({ identifier: '', code: '' });
    } catch (error) {
      console.error('Error enabling MFA:', error);
    }
  };

  const handleDisableMFA = async (methodId: number) => {
    if (window.confirm('Are you sure you want to disable this MFA method?')) {
      try {
        await disableMFA(methodId);
      } catch (error) {
        console.error('Error disabling MFA:', error);
      }
    }
  };

  const getMethodIcon = (type: string) => {
    const method = mfaMethods.find(m => m.id === type);
    return method ? method.icon : Key;
  };

  return (
    <div className="space-y-6">
      {/* MFA Status */}
      <div className={`p-4 rounded-lg border ${
        securitySettings.mfaEnabled 
          ? 'bg-green-50 border-green-200' 
          : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center space-x-2">
          {securitySettings.mfaEnabled ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Key className="h-5 w-5 text-yellow-600" />
          )}
          <div>
            <p className={`font-medium ${
              securitySettings.mfaEnabled ? 'text-green-800' : 'text-yellow-800'
            }`}>
              Two-Factor Authentication is {securitySettings.mfaEnabled ? 'Enabled' : 'Disabled'}
            </p>
            <p className={`text-sm ${
              securitySettings.mfaEnabled ? 'text-green-700' : 'text-yellow-700'
            }`}>
              {securitySettings.mfaEnabled 
                ? `You have ${securitySettings.mfaMethods.length} active MFA method(s)`
                : 'Enable MFA to add an extra layer of security to your account'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Active MFA Methods */}
      {securitySettings.mfaMethods.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Active MFA Methods</h3>
          <div className="space-y-3">
            {securitySettings.mfaMethods.map((method) => {
              const Icon = getMethodIcon(method.type);
              return (
                <Card key={method.id} padding="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-50 rounded">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {mfaMethods.find(m => m.id === method.type)?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {method.identifier}
                        </p>
                        {method.lastUsed && (
                          <p className="text-xs text-gray-500">
                            Last used: {new Date(method.lastUsed).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDisableMFA(method.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New MFA Method */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Add MFA Method</h3>
        
        {activeSetup ? (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">
                  Setup {mfaMethods.find(m => m.id === activeSetup)?.name}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSetup(null)}
                >
                  Cancel
                </Button>
              </div>

              {activeSetup === 'sms' && (
                <div className="space-y-4">
                  <Input
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={setupData.identifier}
                    onChange={(e) => setSetupData(prev => ({ ...prev, identifier: e.target.value }))}
                  />
                  <p className="text-sm text-gray-600">
                    We'll send a verification code to this number to confirm setup.
                  </p>
                </div>
              )}

              {activeSetup === 'email' && (
                <div className="space-y-4">
                  <Input
                    label="Email Address"
                    placeholder="your-email@example.com"
                    value={setupData.identifier}
                    onChange={(e) => setSetupData(prev => ({ ...prev, identifier: e.target.value }))}
                  />
                  <p className="text-sm text-gray-600">
                    We'll send verification codes to this email address.
                  </p>
                </div>
              )}

              {activeSetup === 'authenticator' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="w-32 h-32 bg-white border-2 border-dashed border-gray-300 rounded mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-500">QR Code</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan this QR code with your authenticator app
                    </p>
                  </div>
                  
                  <Input
                    label="Verification Code"
                    placeholder="Enter 6-digit code from your app"
                    value={setupData.code}
                    onChange={(e) => setSetupData(prev => ({ ...prev, code: e.target.value }))}
                  />
                  
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-2">Manual Setup Key:</p>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      JBSWY3DPEHPK3PXP
                    </code>
                  </div>
                </div>
              )}

              <Button
                onClick={() => handleEnableMFA(activeSetup)}
                loading={isLoading}
                disabled={!setupData.identifier || (activeSetup === 'authenticator' && !setupData.code)}
                className="w-full"
              >
                Enable {mfaMethods.find(m => m.id === activeSetup)?.name}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mfaMethods.map((method) => {
              const Icon = method.icon;
              const isEnabled = securitySettings.mfaMethods.some(m => m.type === method.id);
              
              return (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isEnabled 
                      ? 'bg-gray-50 border-gray-300' 
                      : 'hover:shadow-lg hover:border-blue-300'
                  }`}
                  onClick={() => !isEnabled && setActiveSetup(method.id)}
                >
                  <div className="text-center space-y-3">
                    <div className={`p-3 rounded-lg mx-auto w-fit ${
                      isEnabled ? 'bg-gray-200' : 'bg-blue-50'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isEnabled ? 'text-gray-500' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <div>
                      <h4 className={`font-medium ${
                        isEnabled ? 'text-gray-500' : 'text-gray-900'
                      }`}>
                        {method.name}
                      </h4>
                      <p className={`text-sm ${
                        isEnabled ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {method.description}
                      </p>
                    </div>
                    
                    {isEnabled ? (
                      <div className="text-xs text-green-600 font-medium">
                        ✓ Enabled
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Setup
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Backup Codes */}
      {securitySettings.mfaEnabled && (
        <Card className="bg-blue-50 border-blue-200">
          <div className="space-y-3">
            <h4 className="font-medium text-blue-900">Backup Codes</h4>
            <p className="text-sm text-blue-800">
              Generate backup codes that you can use to access your account if you lose access to your MFA device.
            </p>
            <Button variant="outline" size="sm">
              Generate Backup Codes
            </Button>
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