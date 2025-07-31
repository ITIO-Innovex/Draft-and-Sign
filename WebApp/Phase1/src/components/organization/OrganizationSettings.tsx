import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Building, Palette, Shield, Settings, Upload, Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FeatureGate } from '../ui/FeatureGate';

export const OrganizationSettings: React.FC = () => {
  const { organization } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');

  const generalForm = useForm({
    defaultValues: {
      name: organization?.name || '',
      domain: organization?.domain || '',
      description: '',
    },
  });

  const brandingForm = useForm({
    defaultValues: {
      primaryColor: organization?.settings.branding.primaryColor || '#2563eb',
      secondaryColor: organization?.settings.branding.secondaryColor || '#64748b',
      customDomain: organization?.settings.branding.customDomain || '',
    },
  });

  const securityForm = useForm({
    defaultValues: {
      passwordPolicy: organization?.settings.security.passwordPolicy || 'strong',
      mfaRequired: organization?.settings.security.mfaRequired || false,
      ssoEnabled: organization?.settings.security.ssoEnabled || false,
      domainRestriction: organization?.settings.security.domainRestriction || false,
      sessionTimeout: organization?.settings.security.sessionTimeout || 30,
    },
  });

  const tabs = [
    { id: 'general', name: 'General', icon: Building },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'features', name: 'Features', icon: Settings },
  ];

  const onGeneralSubmit = (data: any) => {
    console.log('General settings updated:', data);
    // Handle general settings update
  };

  const onBrandingSubmit = (data: any) => {
    console.log('Branding settings updated:', data);
    // Handle branding settings update
  };

  const onSecuritySubmit = (data: any) => {
    console.log('Security settings updated:', data);
    // Handle security settings update
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
        <p className="mt-1 text-gray-600">
          Manage your organization's configuration, branding, and security settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Organization Information</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Basic information about your organization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  {...generalForm.register('name')}
                  label="Organization Name"
                  placeholder="Enter organization name"
                />

                <Input
                  {...generalForm.register('domain')}
                  label="Domain"
                  placeholder="example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...generalForm.register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your organization..."
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}

      {/* Branding Settings */}
      {activeTab === 'branding' && (
        <form onSubmit={brandingForm.handleSubmit(onBrandingSubmit)} className="space-y-6">
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Brand Colors</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Customize your organization's brand colors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...brandingForm.register('primaryColor')}
                      type="color"
                      className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      {...brandingForm.register('primaryColor')}
                      placeholder="#2563eb"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...brandingForm.register('secondaryColor')}
                      type="color"
                      className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                    />
                    <Input
                      {...brandingForm.register('secondaryColor')}
                      placeholder="#64748b"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Logo & Assets</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Upload your organization's logo and other brand assets.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Logo
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button variant="outline">
                          Upload Logo
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <Input
                  {...brandingForm.register('customDomain')}
                  label="Custom Domain (Optional)"
                  placeholder="app.yourcompany.com"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
          <Card>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Security Policies</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Configure security requirements for your organization.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Policy
                  </label>
                  <select
                    {...securityForm.register('passwordPolicy')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="basic">Basic (8+ characters)</option>
                    <option value="strong">Strong (8+ chars, mixed case, numbers)</option>
                    <option value="enterprise">Enterprise (12+ chars, special characters)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Require Multi-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Force all users to enable MFA</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        {...securityForm.register('mfaRequired')}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Single Sign-On (SSO)</h4>
                      <p className="text-sm text-gray-600">Enable SSO authentication</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        {...securityForm.register('ssoEnabled')}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Domain Restriction</h4>
                      <p className="text-sm text-gray-600">Only allow users from your domain</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        {...securityForm.register('domainRestriction')}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <Input
                    {...securityForm.register('sessionTimeout', { valueAsNumber: true })}
                    type="number"
                    min="5"
                    max="480"
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </form>
      )}

      {/* Features Settings */}
      {activeTab === 'features' && (
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Feature Access</h3>
              <p className="mt-1 text-sm text-gray-600">
                Control which features are available to your organization.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">API Access</h4>
                  <p className="text-sm text-gray-600">Allow API integration and automation</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Advanced Authentication</h4>
                  <p className="text-sm text-gray-600">Biometric and advanced auth methods</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Bulk Operations</h4>
                  <p className="text-sm text-gray-600">Bulk document processing and management</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Custom Branding</h4>
                  <p className="text-sm text-gray-600">White-label and custom branding options</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Enabled
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};