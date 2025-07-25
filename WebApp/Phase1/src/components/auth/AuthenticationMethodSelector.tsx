import React, { useState } from 'react';
import { Key, Fingerprint, Shield, Video, CreditCard, Smartphone, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { AdvancedMFASetup } from './AdvancedMFASetup';
import { BiometricAuthInterface } from './BiometricAuthInterface';
import { VideoVerificationPortal } from './VideoVerificationPortal';
import { SSOConfiguration } from './SSOConfiguration';

interface AuthMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  securityLevel: 'basic' | 'standard' | 'high' | 'maximum';
  available: boolean;
  setupRequired: boolean;
  features: string[];
}

interface AuthenticationMethodSelectorProps {
  onMethodSelect: (method: string) => void;
  onClose: () => void;
}

export const AuthenticationMethodSelector: React.FC<AuthenticationMethodSelectorProps> = ({
  onMethodSelect,
  onClose,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  const authMethods: AuthMethod[] = [
    {
      id: 'password',
      name: 'Password Authentication',
      description: 'Traditional username and password login',
      icon: Key,
      securityLevel: 'basic',
      available: true,
      setupRequired: false,
      features: ['Quick access', 'Universal support', 'Password recovery'],
    },
    {
      id: 'mfa',
      name: 'Multi-Factor Authentication',
      description: 'Enhanced security with multiple verification methods',
      icon: Shield,
      securityLevel: 'high',
      available: true,
      setupRequired: true,
      features: ['TOTP support', 'SMS verification', 'Hardware keys', 'Backup codes'],
    },
    {
      id: 'biometric',
      name: 'Biometric Authentication',
      description: 'Fingerprint, face, or voice recognition',
      icon: Fingerprint,
      securityLevel: 'maximum',
      available: true,
      setupRequired: true,
      features: ['Fingerprint scan', 'Face recognition', 'Voice verification', 'Anti-spoofing'],
    },
    {
      id: 'sso',
      name: 'Single Sign-On',
      description: 'Enterprise identity provider integration',
      icon: CreditCard,
      securityLevel: 'high',
      available: true,
      setupRequired: true,
      features: ['SAML 2.0', 'OAuth 2.0', 'LDAP', 'Azure AD', 'Google Workspace'],
    },
    {
      id: 'video',
      name: 'Video Verification',
      description: 'Live video identity verification with agent',
      icon: Video,
      securityLevel: 'maximum',
      available: true,
      setupRequired: false,
      features: ['Live agent verification', 'ID document check', 'Real-time validation', 'Audit trail'],
    },
    {
      id: 'certificate',
      name: 'Digital Certificates',
      description: 'PKI certificates and smart card authentication',
      icon: CreditCard,
      securityLevel: 'maximum',
      available: false,
      setupRequired: true,
      features: ['PKI certificates', 'Smart cards', 'Hardware tokens', 'Certificate validation'],
    },
    {
      id: 'kba',
      name: 'Knowledge-Based Authentication',
      description: 'Security questions and personal verification',
      icon: Eye,
      securityLevel: 'standard',
      available: false,
      setupRequired: true,
      features: ['Dynamic questions', 'Personal history', 'Credit bureau data', 'Custom questions'],
    },
    {
      id: 'adaptive',
      name: 'Adaptive Authentication',
      description: 'Risk-based authentication with behavioral analysis',
      icon: Smartphone,
      securityLevel: 'high',
      available: false,
      setupRequired: true,
      features: ['Risk scoring', 'Behavioral analysis', 'Device fingerprinting', 'Location tracking'],
    },
  ];

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'text-gray-600 bg-gray-100';
      case 'standard': return 'text-blue-600 bg-blue-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'maximum': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleMethodSelect = (methodId: string) => {
    const method = authMethods.find(m => m.id === methodId);
    if (!method?.available) return;

    if (method.setupRequired) {
      setSelectedMethod(methodId);
      setShowSetup(true);
    } else {
      onMethodSelect(methodId);
    }
  };

  const handleSetupComplete = (data: any) => {
    setShowSetup(false);
    setSelectedMethod(null);
    onMethodSelect(selectedMethod || '');
  };

  const handleSetupError = (error: string) => {
    console.error('Setup error:', error);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Authentication Method</h2>
        <p className="text-gray-600">
          Select the authentication method that best fits your security requirements
        </p>
      </div>

      {/* Security Level Legend */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="space-y-3">
          <h3 className="font-medium text-blue-900">Security Levels</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                Basic
              </span>
              <span className="text-blue-800">Standard protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                Standard
              </span>
              <span className="text-blue-800">Enhanced security</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-600">
                High
              </span>
              <span className="text-blue-800">Advanced protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-600">
                Maximum
              </span>
              <span className="text-blue-800">Military-grade security</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Authentication Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authMethods.map((method) => {
          const Icon = method.icon;
          return (
            <Card
              key={method.id}
              className={`cursor-pointer transition-all duration-200 ${
                method.available
                  ? 'hover:shadow-lg hover:border-blue-300'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => method.available && handleMethodSelect(method.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg ${method.available ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      <Icon className={`h-6 w-6 ${method.available ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSecurityLevelColor(method.securityLevel)}`}>
                    {method.securityLevel}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {method.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {method.features.length > 3 && (
                      <li className="text-xs text-gray-500">
                        +{method.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  {method.available ? (
                    <Button variant="outline" size="sm" className="w-full">
                      {method.setupRequired ? 'Setup & Use' : 'Use Method'}
                    </Button>
                  ) : (
                    <div className="w-full text-center">
                      <span className="text-sm text-gray-500">Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Security Recommendation */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900">Security Recommendation</h4>
            <p className="text-sm text-yellow-800 mt-1">
              For maximum security, we recommend using Multi-Factor Authentication (MFA) combined with 
              biometric authentication. This provides multiple layers of protection against unauthorized access.
            </p>
          </div>
        </div>
      </Card>

      {/* Setup Modals */}
      <Modal
        isOpen={showSetup && selectedMethod === 'mfa'}
        onClose={() => setShowSetup(false)}
        title="Multi-Factor Authentication Setup"
        size="lg"
      >
        <AdvancedMFASetup onClose={() => setShowSetup(false)} />
      </Modal>

      <Modal
        isOpen={showSetup && selectedMethod === 'biometric'}
        onClose={() => setShowSetup(false)}
        title="Biometric Authentication"
        size="lg"
      >
        <BiometricAuthInterface
          onSuccess={handleSetupComplete}
          onError={handleSetupError}
          onCancel={() => setShowSetup(false)}
        />
      </Modal>

      <Modal
        isOpen={showSetup && selectedMethod === 'video'}
        onClose={() => setShowSetup(false)}
        title="Video Verification"
        size="lg"
      >
        <VideoVerificationPortal
          onSuccess={handleSetupComplete}
          onError={handleSetupError}
          onCancel={() => setShowSetup(false)}
        />
      </Modal>

      <Modal
        isOpen={showSetup && selectedMethod === 'sso'}
        onClose={() => setShowSetup(false)}
        title="Single Sign-On Configuration"
        size="xl"
      >
        <SSOConfiguration onClose={() => setShowSetup(false)} />
      </Modal>

      {/* Close Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
};