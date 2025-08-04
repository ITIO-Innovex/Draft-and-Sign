import React from 'react';
import { Users, Building, TrendingUp, FileSignature, UserPlus, Settings, BarChart3, Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const TeamAdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const organizationStats = [
    {
      name: 'Team Members',
      value: 23,
      limit: 50,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+3 this month',
      changeType: 'increase',
    },
    {
      name: 'Documents Processed',
      value: 156,
      icon: FileSignature,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+24%',
      changeType: 'increase',
    },
    {
      name: 'Storage Used',
      value: '12.5 GB',
      limit: '50 GB',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+2.1 GB',
      changeType: 'increase',
    },
    {
      name: 'Active Workflows',
      value: 8,
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+2',
      changeType: 'increase',
    },
  ];

  const teamActions = [
    {
      title: 'Invite Team Members',
      description: 'Add new members to your organization',
      icon: UserPlus,
      color: 'bg-blue-600',
      href: '/team/invite',
    },
    {
      title: 'Organization Settings',
      description: 'Configure branding and security',
      icon: Settings,
      color: 'bg-green-600',
      href: '/organization',
    },
    {
      title: 'Team Analytics',
      description: 'View team performance metrics',
      icon: BarChart3,
      color: 'bg-purple-600',
      href: '/analytics',
    },
    {
      title: 'Security Center',
      description: 'Manage security policies',
      icon: Shield,
      color: 'bg-red-600',
      href: '/security',
    },
  ];

  const recentActivity = [
    {
      user: 'Sarah Wilson',
      action: 'signed',
      document: 'Q3 Contract Agreement',
      time: '2 hours ago',
      avatar: 'SW',
    },
    {
      user: 'Mike Johnson',
      action: 'uploaded',
      document: 'Employee Handbook v2.1',
      time: '4 hours ago',
      avatar: 'MJ',
    },
    {
      user: 'Lisa Chen',
      action: 'created template',
      document: 'NDA Template',
      time: '1 day ago',
      avatar: 'LC',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">
            Team Admin Dashboard 👨‍💼
          </h1>
          <p className="text-purple-100 text-lg mb-6">
            Manage your organization, team members, and document workflows from your central command center.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-purple-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🏢 Professional Plan</span>
            </div>
            <div className="bg-purple-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">👥 50 Team Members</span>
            </div>
            <div className="bg-purple-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">📊 Advanced Analytics</span>
            </div>
            <div className="bg-purple-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🔐 Enterprise Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationStats.map((stat) => {
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

      {/* Team Management Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <Button variant="outline">
            View All Features
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.title} 
                className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="text-center space-y-4">
                  <div className={`${action.color} p-4 rounded-lg mx-auto w-fit group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className="h-6 w-6 text-white" />
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
                      className="group-hover:bg-gray-50"
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Team Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Team Activity</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-white">{activity.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.document}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Organization Health</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security Score</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Team Adoption</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">92%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-orange-600">25%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Subscription Information */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Professional Plan</h3>
            <p className="text-gray-600">Advanced features for growing teams</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>• Unlimited signatures</li>
              <li>• 100 envelopes per month</li>
              <li>• 50GB storage</li>
              <li>• Team management</li>
              <li>• Advanced analytics</li>
            </ul>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">$29/month</div>
            <Button variant="outline" className="mt-2">
              Manage Billing
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};