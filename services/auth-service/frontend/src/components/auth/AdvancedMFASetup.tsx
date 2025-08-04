import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Smartphone, Mail, Key, Shield, Fingerprint, Video, CreditCard, QrCode } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';

interface MFAMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  securityLevel: 'standard' | 'high' | 'maximum';
  setupRequired: boolean;
  available: boolean;
}

interface AdvancedMFASetupProps {
  onClose: () => void;
}

export const AdvancedMFASetup: React.FC<AdvancedMFASetupProps> = ({ onClose }) => {
  const { securitySettings, enableMFA, isLoading } = useProfileStore();
  const [activeSetup, setActiveSetup] = useState<string | null>(null);
  const [setupData, setSetupData] = useState({ identifier: '', code: '', backupCodes: [] });
  const [showQRCode, setShowQRCode] = useState(false);

  const mfaMethods: MFAMethod[] = [
    {
      id: 'totp',
      name: 'Authenticator App (TOTP)',
      description: 'Google Authenticator, Authy, Microsoft Authenticator',
      icon: Smartphone,
      securityLevel: 'high',
      setupRequired: true,
      available: true,
    },
    {
      id: 'sms',
      name: 'SMS Verification',
      description: 'Receive codes via text message',
      icon: Mail,
      securityLevel: 'standard',
      setupRequired: true,
      available: true,
    },
    {
      id: 'email',
      name: 'Email OTP',
      description: 'One-time passwords via email',
      icon: Mail,
      securityLevel: 'standard',
      setupRequired: false,
      available: true,
    },
    {
      id: 'hardware',
      name: 'Hardware Security Key',
      description: 'YubiKey, FIDO2/WebAuthn devices',
      icon: Key,
      securityLevel: 'maximum',
      setupRequired: true,
      available: true,
    },
    {
      id: 'biometric',
      name: 'Biometric Authentication',
      description: 'Fingerprint, face recognition, voice',
      icon: Fingerprint,
      securityLevel: 'maximum',
      setupRequired: true,
      available: false,
    },
    {
      id: 'push',
      name: 'Push Notifications',
      description: 'Mobile app push notifications',
      icon: Shield,
      securityLevel: 'high',
      setupRequired: true,
      available: false,
    },
    {
      id: 'video',
      name: 'Video Verification',
      description: 'Live video identity verification',
      icon: Video,
      securityLevel: 'maximum',
      setupRequired: true,
      available: false,
    },
    {
      id: 'certificate',
      name: 'Digital Certificate',
      description: 'PKI certificates and smart cards',
      icon: CreditCard,
      securityLevel: 'maximum',
      setupRequired: true,
      available: false,
    },
  ];

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'standard': return 'text-blue-600 bg-blue-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'maximum': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSetupMethod = async (methodId: string) => {
    try {
      await enableMFA(methodId, setupData.identifier);
      setActiveSetup(null);
      setSetupData({ identifier: '', code: '', backupCodes: [] });
    } catch (error) {
      console.error('Error setting up MFA:', error);
    }
  };

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );
    setSetupData(prev => ({ ...prev, backupCodes: codes }));
  };

  return (
    <div className="space-y-6">
      {/* MFA Overview */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="font-medium text-blue-900">Multi-Factor Authentication</h3>
            <p className="text-sm text-blue-800">
              Add multiple layers of security to protect your account. We recommend enabling at least 2 methods.
            </p>
          </div>
        </div>
      </div>

      {/* Current MFA Status */}
      {securitySettings.mfaMethods.length > 0 && (
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Active MFA Methods</h3>
            <div className="space-y-3">
              {securitySettings.mfaMethods.map((method) => {
                const methodConfig = mfaMethods.find(m => m.id === method.type);
                const Icon = methodConfig?.icon || Key;
                return (
                  <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-50 rounded">
                        <Icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{methodConfig?.name}</p>
                        <p className="text-sm text-gray-600">{method.identifier}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSecurityLevelColor(methodConfig?.securityLevel || 'standard')}`}>
                        {methodConfig?.securityLevel}
                      </span>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Available MFA Methods */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Available Authentication Methods</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mfaMethods.map((method) => {
            const Icon = method.icon;
            const isEnabled = securitySettings.mfaMethods.some(m => m.type === method.id);
            
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all duration-200 ${
                  method.available && !isEnabled
                    ? 'hover:shadow-lg hover:border-blue-300'
                    : 'opacity-60'
                }`}
                onClick={() => method.available && !isEnabled && setActiveSetup(method.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${isEnabled ? 'bg-green-50' : 'bg-gray-50'}`}>
                        <Icon className={`h-6 w-6 ${isEnabled ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSecurityLevelColor(method.securityLevel)}`}>
                      {method.securityLevel}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {isEnabled ? (
                      <span className="text-sm text-green-600 font-medium">✓ Enabled</span>
                    ) : method.available ? (
                      <Button variant="outline" size="sm" className="w-full">
                        Setup {method.name}
                      </Button>
                    ) : (
                      <span className="text-sm text-gray-500">Coming Soon</span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Setup Modal */}
      <Modal
        isOpen={activeSetup !== null}
        onClose={() => setActiveSetup(null)}
        title={`Setup ${mfaMethods.find(m => m.id === activeSetup)?.name}`}
        size="md"
      >
        {activeSetup && (
          <div className="space-y-6">
            {/* TOTP Setup */}
            {activeSetup === 'totp' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Manual Setup Key:</p>
                  <code className="bg-white px-3 py-2 rounded text-sm border">
                    JBSWY3DPEHPK3PXP JBSWY3DPEHPK3PXP
                  </code>
                </div>
                
                <Input
                  label="Verification Code"
                  placeholder="Enter 6-digit code from your app"
                  value={setupData.code}
                  onChange={(e) => setSetupData(prev => ({ ...prev, code: e.target.value }))}
                />
              </div>
            )}

            {/* SMS Setup */}
            {activeSetup === 'sms' && (
              <div className="space-y-4">
                <Input
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                  value={setupData.identifier}
                  onChange={(e) => setSetupData(prev => ({ ...prev, identifier: e.target.value }))}
                />
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    We'll send a verification code to this number to confirm setup.
                  </p>
                </div>
              </div>
            )}

            {/* Hardware Key Setup */}
            {activeSetup === 'hardware' && (
              <div className="space-y-4">
                <div className="text-center">
                  <Key className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hardware Security Key</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Insert your security key and follow the prompts to register it.
                  </p>
                  <Button>
                    Register Security Key
                  </Button>
                </div>
              </div>
            )}

            {/* Backup Codes */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Backup Codes</h4>
                <Button variant="outline" size="sm" onClick={generateBackupCodes}>
                  Generate Codes
                </Button>
              </div>
              
              {setupData.backupCodes.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 mb-3">
                    Save these backup codes in a secure location. Each code can only be used once.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                    {setupData.backupCodes.map((code, index) => (
                      <div key={index} className="bg-white px-2 py-1 rounded border">
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Setup Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setActiveSetup(null)}>
                Cancel
              </Button>
              <Button 
                onClick={() => handleSetupMethod(activeSetup)}
                loading={isLoading}
                disabled={!setupData.identifier && !setupData.code}
              >
                Enable Method
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Security Recommendations */}
      <Card className="bg-green-50 border-green-200">
        <div className="space-y-3">
          <h4 className="font-medium text-green-900">Security Recommendations</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Enable at least 2 different MFA methods for redundancy</li>
            <li>• Use hardware security keys for maximum security</li>
            <li>• Keep backup codes in a secure, offline location</li>
            <li>• Regularly review and update your MFA methods</li>
            <li>• Never share your authentication codes with anyone</li>
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