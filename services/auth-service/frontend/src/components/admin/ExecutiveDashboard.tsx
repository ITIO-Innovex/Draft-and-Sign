import React from 'react';
import { TrendingUp, Users, Building, DollarSign, Globe, Zap, Shield, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

export const ExecutiveDashboard: React.FC = () => {
  const executiveMetrics = [
    {
      name: 'Monthly Recurring Revenue',
      value: '$89.2K',
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      target: '$100K',
    },
    {
      name: 'Customer Growth',
      value: '1,247',
      change: '+12.1%',
      changeType: 'increase',
      icon: Building,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      target: '1,500',
    },
    {
      name: 'User Engagement',
      value: '94.2%',
      change: '+2.3%',
      changeType: 'increase',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      target: '95%',
    },
    {
      name: 'Platform Uptime',
      value: '99.98%',
      change: '+0.01%',
      changeType: 'increase',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      target: '99.99%',
    },
  ];

  const kpiTrends = [
    { metric: 'Customer Acquisition Cost', value: '$45', trend: '-12%', status: 'good' },
    { metric: 'Customer Lifetime Value', value: '$2,340', trend: '+18%', status: 'excellent' },
    { metric: 'Churn Rate', value: '2.1%', trend: '-0.5%', status: 'good' },
    { metric: 'Net Promoter Score', value: '72', trend: '+5', status: 'excellent' },
  ];

  const alerts = [
    {
      type: 'revenue',
      message: 'Q3 revenue target 85% achieved',
      severity: 'info',
      action: 'View Details',
    },
    {
      type: 'security',
      message: '3 failed login attempts detected',
      severity: 'warning',
      action: 'Investigate',
    },
    {
      type: 'performance',
      message: 'API response time increased by 15ms',
      severity: 'medium',
      action: 'Monitor',
    },
  ];

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'medium': return 'border-orange-200 bg-orange-50 text-orange-800';
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <FeatureGate permission="platform_analytics">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
            <p className="mt-1 text-gray-600">
              High-level overview of business performance and key metrics.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              Export Report
            </Button>
            <Button>
              Schedule Review
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {executiveMetrics.map((metric) => {
            const Icon = metric.icon;
            const progress = parseFloat(metric.value.replace(/[^0-9.]/g, '')) / parseFloat(metric.target.replace(/[^0-9.]/g, '')) * 100;
            
            return (
              <Card key={metric.name} className="hover:shadow-lg transition-shadow duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <span className={`
                      text-sm font-medium
                      ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}
                    `}>
                      {metric.change}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-500">Target: {metric.target}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Business Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Key Business Metrics</h3>
              
              <div className="space-y-4">
                {kpiTrends.map((kpi, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{kpi.metric}</p>
                      <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
                    </div>
                    <div className="text-right">
                      <span className={`
                        text-sm font-medium
                        ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}
                      `}>
                        {kpi.trend}
                      </span>
                      <div className={`
                        text-xs px-2 py-1 rounded-full mt-1
                        ${kpi.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          kpi.status === 'good' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}
                      `}>
                        {kpi.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Strategic Alerts</h3>
              
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.severity)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">{alert.message}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Analytics */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Revenue Analytics</h3>
              <Button variant="ghost" size="sm">View Detailed Report</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$89.2K</div>
                <div className="text-sm text-gray-600">Monthly Recurring Revenue</div>
                <div className="text-xs text-green-600 mt-1">+15.3% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">$1.07M</div>
                <div className="text-sm text-gray-600">Annual Run Rate</div>
                <div className="text-xs text-blue-600 mt-1">+18.7% YoY growth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">$2,340</div>
                <div className="text-sm text-gray-600">Average Customer LTV</div>
                <div className="text-xs text-purple-600 mt-1">+12.1% improvement</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Global Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center space-y-2">
              <Globe className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">47</div>
              <div className="text-sm text-gray-600">Countries Served</div>
              <div className="text-xs text-blue-600">+3 new markets</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <Zap className="h-8 w-8 text-yellow-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">2.3M</div>
              <div className="text-sm text-gray-600">API Calls/Day</div>
              <div className="text-xs text-yellow-600">+24% growth</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">94%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
              <div className="text-xs text-green-600">+2% improvement</div>
            </div>
          </Card>
        </div>
      </div>
    </FeatureGate>
  );
};