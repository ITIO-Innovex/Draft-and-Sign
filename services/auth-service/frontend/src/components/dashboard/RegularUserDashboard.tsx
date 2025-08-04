import React from 'react';
import { FileText, FileSignature, Upload, Plus, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const RegularUserDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      name: 'Documents Created',
      value: user?.stats.documents || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Signatures Used',
      value: user?.stats.signatures || 0,
      limit: 3,
      icon: FileSignature,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+5%',
      changeType: 'increase',
    },
    {
      name: 'Templates Saved',
      value: user?.stats.templates || 0,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2',
      changeType: 'increase',
    },
    {
      name: 'Storage Used',
      value: `${user?.stats.storageUsed || 0} MB`,
      limit: '1 GB',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+15 MB',
      changeType: 'increase',
    },
  ];

  const quickActions = [
    {
      title: 'Upload Document',
      description: 'Upload a new document to get started',
      icon: Upload,
      color: 'bg-blue-600',
      // comingSoon: true,
    },
    {
      title: 'Create Signature',
      description: 'Design your digital signature',
      icon: FileSignature,
      color: 'bg-green-600',
      // comingSoon: true,
    },
    {
      title: 'New Template',
      description: 'Create a reusable template',
      icon: Plus,
      color: 'bg-purple-600',
      // comingSoon: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            Your personal document management and e-signature workspace. Create, sign, and manage documents with ease.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">✨ Free Forever Plan</span>
            </div>
            <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">📄 10 Envelopes/Month</span>
            </div>
            <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🛠️ Full PDF Tools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                      {stat.limit && <span className="text-sm text-gray-500">/{stat.limit}</span>}
                    </p>
                    <span className={`
                      text-sm font-medium
                      ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
                    `}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <span className="text-sm text-gray-500">Get started with these common tasks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.title} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative"
              >
                {/* {action.comingSoon && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      Coming Soon
                    </span>
                  </div>
                )} */}
                
                <div className="text-center space-y-4">
                  <div className={`${action.color} p-4 rounded-lg mx-auto w-fit group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {action.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      // disabled={action.comingSoon}
                      className="group-hover:bg-gray-50"
                    >
                     Get Started
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h4>
            <p className="text-gray-600">
              Start by uploading a document or creating your first signature.
            </p>
          </div>
        </div>
      </Card>

      {/* Plan Information */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Free Forever Plan</h3>
            <p className="text-gray-600">Perfect for personal use and getting started</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• 3 signatures</li>
              <li>• 10 envelopes per month</li>
              <li>• 1GB storage</li>
              <li>• Full PDF tools</li>
            </ul>
          </div>
          <div className="text-right">
            <Button variant="outline">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};