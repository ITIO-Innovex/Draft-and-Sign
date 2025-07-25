import React from 'react';
import { User, Mail, Phone, Building, Calendar, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ProfileOverview: React.FC = () => {
  const { user, signatures, corporateSeals, accountUsage } = useProfileStore();

  if (!user) return null;

  const stats = [
    {
      name: 'Signatures Created',
      value: signatures.length,
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Corporate Seals',
      value: corporateSeals.length,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Documents Signed',
      value: accountUsage.documentsSigned,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Storage Used',
      value: `${accountUsage.storageUsed} MB`,
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Overview</h1>
        <p className="mt-1 text-gray-600">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Profile Summary Card */}
      <Card>
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <span className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${user.role === 'superAdmin' ? 'bg-red-100 text-red-800' :
                  user.role === 'teamAdmin' ? 'bg-purple-100 text-purple-800' :
                  'bg-blue-100 text-blue-800'}
              `}>
                {user.role === 'superAdmin' ? 'Super Admin' :
                 user.role === 'teamAdmin' ? 'Team Admin' : 'Regular User'}
              </span>
              {user.isEmailVerified && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
            
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {user.phone}
                </div>
              )}
              {user.company && (
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  {user.company} {user.position && `• ${user.position}`}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Button variant="outline">
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Account Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Account Status</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Verification</span>
                <div className="flex items-center">
                  {user.isEmailVerified ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">Pending</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Two-Factor Authentication</span>
                <div className="flex items-center">
                  {user.isMFAEnabled ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Enabled</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">Disabled</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan Type</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {accountUsage.planType}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            
            <div className="space-y-3">
              <div className="text-sm">
                <p className="text-gray-600">Last Login</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.lastLogin).toLocaleString()}
                </p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Profile Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <div className="text-sm">
                <p className="text-gray-600">Signatures Created</p>
                <p className="font-medium text-gray-900">
                  {signatures.length} total
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            
            <Button variant="outline" className="justify-start">
              <Shield className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
            
            <Button variant="outline" className="justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Notification Preferences
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};