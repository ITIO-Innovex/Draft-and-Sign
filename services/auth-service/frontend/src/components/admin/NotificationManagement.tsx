import React, { useState } from 'react';
import { Bell, Send, Users, Mail, Smartphone, MessageSquare, Calendar, Settings } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { FeatureGate } from '../ui/FeatureGate';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  subject: string;
  content: string;
  recipients: string;
  status: 'active' | 'draft' | 'scheduled';
  lastSent?: string;
  openRate?: number;
  clickRate?: number;
}

const mockTemplates: NotificationTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    type: 'email',
    subject: 'Welcome to DraftnSign!',
    content: 'Thank you for joining DraftnSign. Get started with your first document...',
    recipients: 'New Users',
    status: 'active',
    lastSent: '2024-07-01T10:00:00Z',
    openRate: 85.2,
    clickRate: 23.4,
  },
  {
    id: '2',
    name: 'Document Signed',
    type: 'push',
    subject: 'Document Completed',
    content: 'Your document has been signed by all parties.',
    recipients: 'Document Owners',
    status: 'active',
    lastSent: '2024-07-01T09:30:00Z',
    openRate: 92.1,
    clickRate: 45.6,
  },
  {
    id: '3',
    name: 'Security Alert',
    type: 'sms',
    subject: 'Security Alert',
    content: 'Unusual login activity detected on your account.',
    recipients: 'All Users',
    status: 'active',
    lastSent: '2024-06-30T18:45:00Z',
    openRate: 98.7,
    clickRate: 67.8,
  },
];

export const NotificationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);

  const notificationStats = [
    {
      name: 'Total Sent',
      value: '2.3M',
      change: '+12.5%',
      icon: Send,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Delivery Rate',
      value: '98.7%',
      change: '+0.3%',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Open Rate',
      value: '87.2%',
      change: '+2.1%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Active Templates',
      value: '24',
      change: '+3',
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return Smartphone;
      case 'push': return Bell;
      case 'in_app': return MessageSquare;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'sms': return 'bg-green-100 text-green-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      case 'in_app': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'templates', name: 'Templates', icon: Bell },
    { id: 'campaigns', name: 'Campaigns', icon: Send },
    { id: 'analytics', name: 'Analytics', icon: MessageSquare },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <FeatureGate permission="platform_management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
            <p className="mt-1 text-gray-600">
              Manage system-wide notifications, templates, and communication campaigns.
            </p>
          </div>
          
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notificationStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
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

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Notification Templates</h3>
                <Button variant="outline">
                  Create Template
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
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
                    {mockTemplates.map((template) => {
                      const TypeIcon = getTypeIcon(template.type);
                      return (
                        <tr key={template.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{template.name}</div>
                              <div className="text-sm text-gray-500">{template.subject}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <TypeIcon className="h-4 w-4 text-gray-400" />
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(template.type)}`}>
                                {template.type.toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {template.recipients}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {template.openRate && (
                              <div className="text-sm">
                                <div>Open: {template.openRate}%</div>
                                <div className="text-gray-500">Click: {template.clickRate}%</div>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(template.status)}`}>
                              {template.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm">
                                Send
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Campaign</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Campaign Name"
                    placeholder="Enter campaign name"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Type
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                      <option value="push">Push Notification</option>
                      <option value="in_app">In-App</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Users</option>
                    <option value="new">New Users</option>
                    <option value="active">Active Users</option>
                    <option value="inactive">Inactive Users</option>
                    <option value="enterprise">Enterprise Customers</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your message content..."
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button>
                    Send Now
                  </Button>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button variant="ghost">
                    Save Draft
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="text-center space-y-2">
                  <Send className="h-8 w-8 text-blue-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">2.3M</div>
                  <div className="text-sm text-gray-600">Total Notifications Sent</div>
                  <div className="text-xs text-green-600">+12.5% this month</div>
                </div>
              </Card>
              
              <Card>
                <div className="text-center space-y-2">
                  <MessageSquare className="h-8 w-8 text-green-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">87.2%</div>
                  <div className="text-sm text-gray-600">Average Open Rate</div>
                  <div className="text-xs text-green-600">+2.1% improvement</div>
                </div>
              </Card>
              
              <Card>
                <div className="text-center space-y-2">
                  <Users className="h-8 w-8 text-purple-600 mx-auto" />
                  <div className="text-2xl font-bold text-gray-900">34.5%</div>
                  <div className="text-sm text-gray-600">Click-Through Rate</div>
                  <div className="text-xs text-purple-600">+1.8% improvement</div>
                </div>
              </Card>
            </div>

            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Performance by Channel</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Email</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">1.8M sent</div>
                        <div className="text-xs text-gray-500">85.2% open rate</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Push</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">350K sent</div>
                        <div className="text-xs text-gray-500">92.1% open rate</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">SMS</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">150K sent</div>
                        <div className="text-xs text-gray-500">98.7% open rate</div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Global Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Rate Limiting</h4>
                      <p className="text-sm text-gray-600">Limit notifications per user per hour</p>
                    </div>
                    <Input
                      type="number"
                      placeholder="10"
                      className="w-20"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Quiet Hours</h4>
                      <p className="text-sm text-gray-600">Disable notifications during specific hours</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Delivery Optimization</h4>
                      <p className="text-sm text-gray-600">Optimize delivery times based on user timezone</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </FeatureGate>
  );
};