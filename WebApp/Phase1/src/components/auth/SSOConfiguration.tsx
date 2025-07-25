import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Key, Link, CheckCircle, AlertTriangle, Settings, Users, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface SSOProvider {
  id: string;
  name: string;
  protocol: 'saml2' | 'oauth2' | 'oidc' | 'ldap';
  icon: string;
  description: string;
  status: 'active' | 'configured' | 'disabled';
  userCount: number;
  lastSync?: string;
}

interface SSOConfigurationProps {
  onClose: () => void;
}

export const SSOConfiguration: React.FC<SSOConfigurationProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('providers');
  const [selectedProvider, setSelectedProvider] = useState<SSOProvider | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const ssoProviders: SSOProvider[] = [
    {
      id: 'azure_ad',
      name: 'Azure Active Directory',
      protocol: 'saml2',
      icon: '🔷',
      description: 'Microsoft Azure AD integration with SAML 2.0',
      status: 'active',
      userCount: 247,
      lastSync: '2024-07-01T09:15:00Z',
    },
    {
      id: 'google_workspace',
      name: 'Google Workspace',
      protocol: 'oauth2',
      icon: '🔴',
      description: 'Google Workspace SSO with OAuth 2.0',
      status: 'configured',
      userCount: 0,
    },
    {
      id: 'okta',
      name: 'Okta',
      protocol: 'saml2',
      icon: '🔵',
      description: 'Okta identity provider integration',
      status: 'disabled',
      userCount: 0,
    },
    {
      id: 'active_directory',
      name: 'Active Directory',
      protocol: 'ldap',
      icon: '🏢',
      description: 'On-premises Active Directory via LDAP',
      status: 'disabled',
      userCount: 0,
    },
    {
      id: 'onelogin',
      name: 'OneLogin',
      protocol: 'saml2',
      icon: '🟡',
      description: 'OneLogin SAML integration',
      status: 'disabled',
      userCount: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'configured': return 'bg-blue-100 text-blue-800';
      case 'disabled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProtocolBadge = (protocol: string) => {
    const colors = {
      saml2: 'bg-purple-100 text-purple-800',
      oauth2: 'bg-blue-100 text-blue-800',
      oidc: 'bg-green-100 text-green-800',
      ldap: 'bg-orange-100 text-orange-800',
    };
    return colors[protocol as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const onSubmit = (data: any) => {
    console.log('SSO Configuration:', data);
    setIsConfiguring(false);
    setSelectedProvider(null);
  };

  const tabs = [
    { id: 'providers', name: 'Providers', icon: Shield },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'users', name: 'User Mapping', icon: Users },
    { id: 'testing', name: 'Testing', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Single Sign-On Configuration</h2>
        <p className="mt-1 text-gray-600">
          Configure enterprise identity providers for seamless user authentication.
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

      {/* Providers Tab */}
      {activeTab === 'providers' && (
        <div className="space-y-6">
          {/* SSO Overview */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-900">Enterprise SSO</h3>
                <p className="text-sm text-blue-800">
                  Enable single sign-on to allow users to authenticate using their corporate credentials.
                </p>
              </div>
            </div>
          </Card>

          {/* Provider List */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Available Identity Providers</h3>
            
            <div className="grid grid-cols-1 gap-4">
              {ssoProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    provider.status === 'active' ? 'border-green-300 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProvider(provider)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{provider.icon}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{provider.name}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getProtocolBadge(provider.protocol)}`}>
                            {provider.protocol.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                        {provider.status === 'active' && (
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>{provider.userCount} users</span>
                            {provider.lastSync && (
                              <span>Last sync: {new Date(provider.lastSync).toLocaleDateString()}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                      <Button variant="outline" size="sm">
                        {provider.status === 'active' ? 'Manage' : 'Configure'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Configuration Modal */}
          {selectedProvider && (
            <Card>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Configure {selectedProvider.name}
                  </h3>
                  <Button variant="ghost" onClick={() => setSelectedProvider(null)}>
                    ×
                  </Button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {selectedProvider.protocol === 'saml2' && (
                    <>
                      <Input
                        {...register('entityId', { required: 'Entity ID is required' })}
                        label="Entity ID"
                        placeholder="https://your-domain.com/saml/metadata"
                        error={errors.entityId?.message as string}
                      />
                      
                      <Input
                        {...register('ssoUrl', { required: 'SSO URL is required' })}
                        label="SSO URL"
                        placeholder="https://login.microsoftonline.com/..."
                        error={errors.ssoUrl?.message as string}
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          X.509 Certificate
                        </label>
                        <textarea
                          {...register('certificate', { required: 'Certificate is required' })}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                        />
                        {errors.certificate && (
                          <p className="text-sm text-red-600 mt-1">{errors.certificate.message as string}</p>
                        )}
                      </div>
                    </>
                  )}

                  {selectedProvider.protocol === 'oauth2' && (
                    <>
                      <Input
                        {...register('clientId', { required: 'Client ID is required' })}
                        label="Client ID"
                        placeholder="your-client-id"
                        error={errors.clientId?.message as string}
                      />
                      
                      <Input
                        {...register('clientSecret', { required: 'Client Secret is required' })}
                        type="password"
                        label="Client Secret"
                        placeholder="your-client-secret"
                        error={errors.clientSecret?.message as string}
                      />
                      
                      <Input
                        {...register('authUrl', { required: 'Authorization URL is required' })}
                        label="Authorization URL"
                        placeholder="https://accounts.google.com/o/oauth2/auth"
                        error={errors.authUrl?.message as string}
                      />
                      
                      <Input
                        {...register('tokenUrl', { required: 'Token URL is required' })}
                        label="Token URL"
                        placeholder="https://oauth2.googleapis.com/token"
                        error={errors.tokenUrl?.message as string}
                      />
                    </>
                  )}

                  {selectedProvider.protocol === 'ldap' && (
                    <>
                      <Input
                        {...register('serverUrl', { required: 'Server URL is required' })}
                        label="LDAP Server URL"
                        placeholder="ldap://your-domain.com:389"
                        error={errors.serverUrl?.message as string}
                      />
                      
                      <Input
                        {...register('baseDn', { required: 'Base DN is required' })}
                        label="Base DN"
                        placeholder="dc=company,dc=com"
                        error={errors.baseDn?.message as string}
                      />
                      
                      <Input
                        {...register('bindDn')}
                        label="Bind DN (Optional)"
                        placeholder="cn=admin,dc=company,dc=com"
                      />
                      
                      <Input
                        {...register('bindPassword')}
                        type="password"
                        label="Bind Password (Optional)"
                        placeholder="admin-password"
                      />
                    </>
                  )}

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button type="button" variant="outline" onClick={() => setSelectedProvider(null)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Configuration
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">SSO Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Enforce SSO</h4>
                    <p className="text-sm text-gray-600">Require all users to authenticate via SSO</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Just-in-Time Provisioning</h4>
                    <p className="text-sm text-gray-600">Automatically create user accounts on first login</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">SCIM Provisioning</h4>
                    <p className="text-sm text-gray-600">Enable automatic user provisioning via SCIM</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Default User Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Role
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="regularUser">Regular User</option>
                    <option value="teamAdmin">Team Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Department
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">No Default</option>
                    <option value="engineering">Engineering</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="hr">Human Resources</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* User Mapping Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Attribute Mapping</h3>
              <p className="text-sm text-gray-600">
                Map SSO attributes to user profile fields in DraftnSign.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Attribute
                    </label>
                    <Input placeholder="email" defaultValue="email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name Attribute
                    </label>
                    <Input placeholder="displayName" defaultValue="displayName" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department Attribute
                    </label>
                    <Input placeholder="department" defaultValue="department" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role Attribute
                    </label>
                    <Input placeholder="jobTitle" defaultValue="jobTitle" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Role Mapping Rules</h3>
              <p className="text-sm text-gray-600">
                Define rules to automatically assign roles based on SSO attributes.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      If department = "IT" → Team Admin
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                
                <div className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      If jobTitle contains "Manager" → Team Admin
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <Button variant="outline">
                Add New Rule
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Testing Tab */}
      {activeTab === 'testing' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">SSO Connection Testing</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Test SSO Configuration</h4>
                  <p className="text-sm text-blue-800 mb-4">
                    Test your SSO configuration to ensure it's working correctly before enabling for all users.
                  </p>
                  <Button>
                    <Globe className="mr-2 h-4 w-4" />
                    Test SSO Login
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Recent Test Results</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Azure AD SAML Test</p>
                          <p className="text-xs text-gray-500">July 1, 2024 at 9:15 AM</p>
                        </div>
                      </div>
                      <span className="text-sm text-green-600">Success</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Google OAuth Test</p>
                          <p className="text-xs text-gray-500">June 30, 2024 at 3:22 PM</p>
                        </div>
                      </div>
                      <span className="text-sm text-yellow-600">Warning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Metadata & Endpoints</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SAML Metadata URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://app.draftsign.com/saml/metadata" 
                      readOnly 
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ACS URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://app.draftsign.com/saml/acs" 
                      readOnly 
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OAuth Redirect URI
                  </label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://app.draftsign.com/oauth/callback" 
                      readOnly 
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
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