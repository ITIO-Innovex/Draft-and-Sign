import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Building, Shield, FileText, 
  DollarSign, Bell, AlertTriangle, BarChart3, Settings,
  TrendingUp, Zap, Globe, CheckCircle, Clock, Eye
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { FeatureGate } from '../ui/FeatureGate';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for the admin dashboard
  const systemOverview = {
    totalUsers: 1247,
    activeUsers: 891,
    newToday: 23,
    pendingApproval: 5,
    systemHealth: 98.2,
    storageUsed: "127 GB",
    alertsCount: 3,
    uptime: "99.98%",
    apiCalls: "2.3M/day",
    avgResponseTime: "145ms",
    securityScore: 94
  };

  const recentActivity = [
    {
      user: "john@example.com",
      name: "John Doe",
      action: "Profile updated",
      timestamp: "2024-07-01T14:30:00Z"
    },
    {
      user: "jane@company.com",
      name: "Jane Smith",
      action: "Signature created",
      timestamp: "2024-07-01T14:25:00Z"
    },
    {
      user: "mike@acme.org",
      name: "Mike Johnson",
      action: "Login from new location",
      timestamp: "2024-07-01T14:20:00Z"
    },
    {
      user: "sarah@tech.co",
      name: "Sarah Wilson",
      action: "MFA enabled",
      timestamp: "2024-07-01T14:15:00Z"
    },
    {
      user: "alex@global.net",
      name: "Alex Brown",
      action: "Password changed",
      timestamp: "2024-07-01T14:10:00Z"
    }
  ];

  const securityAlerts = [
    {
      type: "security",
      message: "Multiple failed login attempts detected",
      severity: "medium",
      count: 5,
      timestamp: "2024-07-01T13:45:00Z"
    },
    {
      type: "compliance",
      message: "3 users have not completed MFA setup",
      severity: "low",
      count: 3,
      timestamp: "2024-07-01T12:30:00Z"
    },
    {
      type: "system",
      message: "API rate limit reached for organization Acme Corp",
      severity: "high",
      count: 1,
      timestamp: "2024-07-01T11:15:00Z"
    }
  ];

  const adminModules = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: Users,
      color: "bg-blue-600",
      link: "/team"
    },
    {
      title: "Organization Settings",
      description: "Configure organization and branding",
      icon: Building,
      color: "bg-purple-600",
      link: "/organization"
    },
    {
      title: "Security Center",
      description: "Monitor security and compliance",
      icon: Shield,
      color: "bg-red-600",
      link: "/security-monitoring"
    },
    {
      title: "Billing Management",
      description: "Manage subscriptions and invoices",
      icon: DollarSign,
      color: "bg-green-600",
      link: "/billing-management"
    },
    {
      title: "Audit Logs",
      description: "Review system activity and changes",
      icon: AlertTriangle,
      color: "bg-yellow-600",
      link: "/audit-logs"
    },
    {
      title: "Analytics",
      description: "Platform usage and performance metrics",
      icon: BarChart3,
      color: "bg-indigo-600",
      link: "/platform-analytics"
    },
    {
      title: "Notifications",
      description: "Manage system notifications",
      icon: Bell,
      color: "bg-orange-600",
      link: "/notification-management"
    },
    {
      title: "Reports",
      description: "Generate custom reports",
      icon: FileText,
      color: "bg-teal-600",
      link: "/report-builder"
    }
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    return date.toLocaleDateString();
  };

  const getAlertSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <FeatureGate permission="platform_management">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-gray-600">
              Comprehensive overview of your platform's health, users, and security.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-green-600">{systemOverview.systemHealth}%</p>
                  <span className="text-sm text-green-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{systemOverview.totalUsers}</p>
                  <span className="text-sm text-green-600">+{systemOverview.newToday} today</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{systemOverview.activeUsers}</p>
                  <span className="text-sm text-gray-600">{Math.round((systemOverview.activeUsers / systemOverview.totalUsers) * 100)}% of total</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Security Score</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">{systemOverview.securityScore}</p>
                  <span className="text-sm text-green-600">+2 points</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Modules Grid */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Admin Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminModules.map((module) => {
              const Icon = module.icon;
              return (
                <Link 
                  key={module.title} 
                  to={module.link}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-lg ${module.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">{module.title}</h3>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{module.description}</p>
                      
                      <div className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full">
                          Access
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent User Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {activity.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                        <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-3">
                {securityAlerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${getAlertSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5" />
                        <div>
                          <p className="font-medium">{alert.message}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs">{formatTimestamp(alert.timestamp)}</span>
                            <span className="text-xs">•</span>
                            <span className="text-xs capitalize">{alert.type}</span>
                            {alert.count > 1 && (
                              <>
                                <span className="text-xs">•</span>
                                <span className="text-xs">{alert.count} occurrences</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Investigate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* System Performance Metrics */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">System Performance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{systemOverview.uptime}</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{systemOverview.apiCalls}</div>
                <div className="text-sm text-gray-600">API Calls</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{systemOverview.avgResponseTime}</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{systemOverview.storageUsed}</div>
                <div className="text-sm text-gray-600">Storage Used</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">24m</div>
                <div className="text-sm text-gray-600">Avg Session</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Actions */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Invite Users
              </Button>
              
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
              
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </FeatureGate>
  );
};