import React, { useState } from 'react';
import { TrendingUp, Users, Building, FileText, DollarSign, Globe, Zap, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

export const PlatformAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const platformMetrics = [
    {
      name: 'Total Revenue',
      value: '$89.2K',
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Active Organizations',
      value: '1,247',
      change: '+12.1%',
      changeType: 'increase',
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Total Users',
      value: '23.5K',
      change: '+18.7%',
      changeType: 'increase',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Documents Processed',
      value: '156K',
      change: '+24.2%',
      changeType: 'increase',
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const usageStats = [
    { name: 'API Calls/Day', value: '2.3M', trend: '+5.2%' },
    { name: 'Storage Used', value: '1.2TB', trend: '+12.1%' },
    { name: 'Avg Session Duration', value: '24m', trend: '+3.4%' },
    { name: 'Success Rate', value: '99.8%', trend: '+0.1%' },
  ];

  const topOrganizations = [
    { name: 'Acme Corporation', users: 156, plan: 'Enterprise', revenue: '$2,400' },
    { name: 'TechStart Inc', users: 89, plan: 'Professional', revenue: '$890' },
    { name: 'Global Solutions', users: 234, plan: 'Enterprise', revenue: '$3,600' },
    { name: 'Digital Agency', users: 45, plan: 'Professional', revenue: '$450' },
    { name: 'Consulting Group', users: 78, plan: 'Professional', revenue: '$780' },
  ];

  const geographicData = [
    { country: 'United States', users: '12.3K', percentage: 52 },
    { country: 'United Kingdom', users: '3.2K', percentage: 14 },
    { country: 'Canada', users: '2.1K', percentage: 9 },
    { country: 'Australia', users: '1.8K', percentage: 8 },
    { country: 'Germany', users: '1.5K', percentage: 6 },
    { country: 'Others', users: '2.6K', percentage: 11 },
  ];

  return (
    <FeatureGate permission="platform_analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="mt-1 text-gray-600">
              Comprehensive insights into platform performance and usage.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <Button variant="outline">
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.name} className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <span className={`
                        text-sm font-medium
                        ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
                      `}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Usage Statistics</h3>
              
              <div className="space-y-4">
                {usageStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{stat.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                      <span className="text-xs text-green-600">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">System Health</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Uptime</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">99.98%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium text-gray-900">145ms</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <span className="text-sm font-medium text-gray-900">0.02%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Security Incidents</span>
                  <span className="text-sm font-medium text-green-600">0</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Organizations */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Top Organizations</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Users
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topOrganizations.map((org, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{org.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{org.users}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          org.plan === 'Enterprise' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {org.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{org.revenue}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Geographic Distribution</h3>
            
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{country.country}</span>
                    <span className="text-sm text-gray-600">{country.users} users</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <Zap className="h-8 w-8 text-yellow-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">2.3M</div>
              <div className="text-sm text-gray-600">API Calls/Day</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <Shield className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">99.98%</div>
              <div className="text-sm text-gray-600">Security Score</div>
            </div>
          </Card>
        </div>
      </div>
    </FeatureGate>
  );
};