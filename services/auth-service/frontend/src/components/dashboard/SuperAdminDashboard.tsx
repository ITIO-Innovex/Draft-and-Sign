import React from 'react';
import { Crown, Building, Users, BarChart3, Shield, TrendingUp, Globe, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const platformStats = [
    {
      name: 'Total Organizations',
      value: 1247,
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12% this month',
      changeType: 'increase',
    },
    {
      name: 'Active Users',
      value: '23.5K',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+18% this month',
      changeType: 'increase',
    },
    {
      name: 'Documents Processed',
      value: '156K',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+24% this month',
      changeType: 'increase',
    },
    {
      name: 'Revenue (MRR)',
      value: '$89.2K',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+15% this month',
      changeType: 'increase',
    },
  ];

  const adminActions = [
    {
      title: 'Platform Management',
      description: 'System settings and configuration',
      icon: Crown,
      color: 'bg-red-600',
      href: '/platform-admin',
    },
    {
      title: 'Organization Overview',
      description: 'Monitor all organizations',
      icon: Building,
      color: 'bg-blue-600',
      href: '/all-organizations',
    },
    {
      title: 'Platform Analytics',
      description: 'Comprehensive platform metrics',
      icon: BarChart3,
      color: 'bg-green-600',
      href: '/platform-analytics',
    },
    {
      title: 'Security Center',
      description: 'Platform security monitoring',
      icon: Shield,
      color: 'bg-purple-600',
      href: '/security-center',
    },
  ];

  const systemHealth = [
    { name: 'API Response Time', value: '145ms', status: 'good', color: 'text-green-600' },
    { name: 'System Uptime', value: '99.98%', status: 'excellent', color: 'text-green-600' },
    { name: 'Error Rate', value: '0.02%', status: 'good', color: 'text-green-600' },
    { name: 'Active Sessions', value: '12.3K', status: 'normal', color: 'text-blue-600' },
  ];

  const recentAlerts = [
    {
      type: 'security',
      message: 'Unusual login pattern detected for Organization #1247',
      time: '15 minutes ago',
      severity: 'medium',
    },
    {
      type: 'system',
      message: 'Database backup completed successfully',
      time: '2 hours ago',
      severity: 'info',
    },
    {
      type: 'billing',
      message: 'Payment failed for Organization #892',
      time: '4 hours ago',
      severity: 'high',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">
            Platform Administration 👑
          </h1>
          <p className="text-red-100 text-lg mb-6">
            Monitor and manage the entire DraftnSign platform. System health, user analytics, and organizational oversight at your fingertips.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-red-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🌐 Global Platform Access</span>
            </div>
            <div className="bg-red-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🔧 System Administration</span>
            </div>
            <div className="bg-red-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">📊 Advanced Analytics</span>
            </div>
            <div className="bg-red-500 bg-opacity-50 rounded-lg px-4 py-2">
              <span className="text-sm">🛡️ Security Oversight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className={`
                    text-sm font-medium
                    ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {stat.change}
                  </span>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Admin Actions */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Platform Administration</h2>
          <Button variant="outline">
            System Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action) => {
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
                      Access
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* System Health and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">System Health</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {systemHealth.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{metric.name}</span>
                  <span className={`text-sm font-medium ${metric.color}`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Metrics
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Platform Performance (Last 30 Days)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">99.98%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">145ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">156K</div>
              <div className="text-sm text-gray-600">Documents Processed</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="flex items-center space-x-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">2.3M</div>
              <div className="text-sm text-gray-600">API Calls/Day</div>
            </div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Security Incidents</div>
            </div>
          </div>
        </Card>
        
        <Card padding="sm">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};