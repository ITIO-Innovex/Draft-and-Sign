import React, { useState } from 'react';
import { Shield, Key, Smartphone, Monitor, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { PasswordManager } from './PasswordManager';
import { MFASetup } from './MFASetup';
import { DeviceManager } from './DeviceManager';
import { LoginHistory } from './LoginHistory';

export const SecurityDashboard: React.FC = () => {
  const { user, securitySettings } = useProfileStore();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const securityScore = React.useMemo(() => {
    let score = 0;
    if (user?.isEmailVerified) score += 20;
    if (securitySettings.mfaEnabled) score += 30;
    if (securitySettings.passwordLastChanged) {
      const daysSinceChange = Math.floor(
        (Date.now() - new Date(securitySettings.passwordLastChanged).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceChange < 90) score += 25;
      else if (daysSinceChange < 180) score += 15;
      else score += 5;
    }
    if (securitySettings.trustedDevices.length <= 3) score += 15;
    if (securitySettings.sessionTimeout <= 30) score += 10;
    return Math.min(score, 100);
  }, [user, securitySettings]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const securityItems = [
    {
      title: 'Password Security',
      description: 'Manage your account password and requirements',
      icon: Key,
      status: securitySettings.passwordLastChanged ? 'good' : 'warning',
      action: 'Change Password',
      modal: 'password',
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: Smartphone,
      status: securitySettings.mfaEnabled ? 'good' : 'warning',
      action: securitySettings.mfaEnabled ? 'Manage MFA' : 'Enable MFA',
      modal: 'mfa',
    },
    {
      title: 'Trusted Devices',
      description: 'Manage devices that can access your account',
      icon: Monitor,
      status: securitySettings.trustedDevices.length > 0 ? 'good' : 'info',
      action: 'Manage Devices',
      modal: 'devices',
    },
    {
      title: 'Login History',
      description: 'Review recent login activity and sessions',
      icon: Clock,
      status: 'info',
      action: 'View History',
      modal: 'history',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
        <p className="mt-1 text-gray-600">
          Manage your account security and privacy settings.
        </p>
      </div>

      {/* Security Score */}
      <Card className={`${getScoreBgColor(securityScore)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-lg">
              <Shield className={`h-8 w-8 ${getScoreColor(securityScore)}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Security Score</h3>
              <p className="text-sm text-gray-600">
                Your account security rating based on enabled features
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}%
            </div>
            <div className="text-sm text-gray-600">
              {securityScore >= 80 ? 'Excellent' : 
               securityScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>

        {securityScore < 80 && (
          <div className="mt-4 p-3 bg-white rounded border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {!user?.isEmailVerified && <li>• Verify your email address</li>}
              {!securitySettings.mfaEnabled && <li>• Enable two-factor authentication</li>}
              {securitySettings.passwordLastChanged && 
               Math.floor((Date.now() - new Date(securitySettings.passwordLastChanged).getTime()) / (1000 * 60 * 60 * 24)) > 90 && 
               <li>• Update your password (last changed over 90 days ago)</li>}
              {securitySettings.trustedDevices.length > 3 && <li>• Review and remove unused trusted devices</li>}
            </ul>
          </div>
        )}
      </Card>

      {/* Security Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      {getStatusIcon(item.status)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveModal(item.modal)}
                  className="w-full"
                >
                  {item.action}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {securitySettings.mfaMethods.length}
            </div>
            <div className="text-sm text-gray-600">MFA Methods</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {securitySettings.trustedDevices.filter(d => d.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Devices</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {securitySettings.loginHistory.filter(l => l.success).length}
            </div>
            <div className="text-sm text-gray-600">Successful Logins</div>
          </div>
        </Card>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'password'}
        onClose={() => setActiveModal(null)}
        title="Password Management"
        size="md"
      >
        <PasswordManager onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === 'mfa'}
        onClose={() => setActiveModal(null)}
        title="Two-Factor Authentication"
        size="lg"
      >
        <MFASetup onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === 'devices'}
        onClose={() => setActiveModal(null)}
        title="Trusted Devices"
        size="lg"
      >
        <DeviceManager onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
        title="Login History"
        size="lg"
      >
        <LoginHistory onClose={() => setActiveModal(null)} />
      </Modal>
    </div>
  );
};