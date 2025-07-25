import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, AlertCircle, Download, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';

interface SubscriptionData {
  organizationId: string;
  organizationName: string;
  plan: string;
  seats: number;
  usedSeats: number;
  monthlyFee: number;
  billingCycle: string;
  nextBilling: string;
  status: 'active' | 'past_due' | 'cancelled';
}

const mockSubscriptions: SubscriptionData[] = [
  {
    organizationId: 'org_acme',
    organizationName: 'Acme Corporation',
    plan: 'Enterprise',
    seats: 250,
    usedSeats: 247,
    monthlyFee: 2499,
    billingCycle: 'annual',
    nextBilling: '2024-08-01',
    status: 'active',
  },
  {
    organizationId: 'org_tech',
    organizationName: 'TechStart Inc',
    plan: 'Professional',
    seats: 50,
    usedSeats: 45,
    monthlyFee: 890,
    billingCycle: 'monthly',
    nextBilling: '2024-07-15',
    status: 'active',
  },
  {
    organizationId: 'org_global',
    organizationName: 'Global Solutions',
    plan: 'Enterprise',
    seats: 500,
    usedSeats: 234,
    monthlyFee: 4999,
    billingCycle: 'annual',
    nextBilling: '2024-09-01',
    status: 'past_due',
  },
];

export const BillingManagement: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const billingMetrics = [
    {
      name: 'Monthly Recurring Revenue',
      value: '$89.2K',
      change: '+15.3%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Annual Run Rate',
      value: '$1.07M',
      change: '+18.7%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Active Subscriptions',
      value: '1,247',
      change: '+12.1%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Past Due Amount',
      value: '$12.3K',
      change: '-5.2%',
      changeType: 'decrease',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'past_due': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalMRR = mockSubscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.monthlyFee, 0);

  const pastDueAmount = mockSubscriptions
    .filter(sub => sub.status === 'past_due')
    .reduce((sum, sub) => sum + sub.monthlyFee, 0);

  return (
    <FeatureGate permission="billing_management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing Management</h1>
            <p className="mt-1 text-gray-600">
              Monitor subscriptions, revenue, and billing across all organizations.
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
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Billing Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {billingMetrics.map((metric) => {
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
                        ${metric.changeType === 'increase' ? 'text-green-600' : 
                          metric.changeType === 'decrease' && metric.name.includes('Past Due') ? 'text-green-600' : 'text-red-600'}
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

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Revenue Breakdown</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Enterprise Plans</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(65400)}</div>
                    <div className="text-xs text-gray-500">73% of total</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Professional Plans</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(18900)}</div>
                    <div className="text-xs text-gray-500">21% of total</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Starter Plans</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(4900)}</div>
                    <div className="text-xs text-gray-500">6% of total</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Billing Health</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Collection Rate</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">96%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Churn Rate</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '2.1%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-yellow-600">2.1%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Upgrade Rate</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Subscription Management */}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Active Subscriptions</h3>
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
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Seats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Fee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Billing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockSubscriptions.map((subscription) => (
                    <tr key={subscription.organizationId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {subscription.organizationName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {subscription.organizationId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          subscription.plan === 'Enterprise' 
                            ? 'bg-purple-100 text-purple-800' 
                            : subscription.plan === 'Professional'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {subscription.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscription.usedSeats}/{subscription.seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(subscription.monthlyFee)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(subscription.nextBilling).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                          {subscription.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm">
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center space-y-2">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalMRR)}</div>
              <div className="text-sm text-gray-600">Total MRR</div>
              <div className="text-xs text-green-600">+15.3% this month</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(pastDueAmount)}</div>
              <div className="text-sm text-gray-600">Past Due</div>
              <div className="text-xs text-red-600">Requires attention</div>
            </div>
          </Card>
          
          <Card>
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalMRR * 12)}</div>
              <div className="text-sm text-gray-600">Annual Run Rate</div>
              <div className="text-xs text-blue-600">Projected revenue</div>
            </div>
          </Card>
        </div>
      </div>
    </FeatureGate>
  );
};