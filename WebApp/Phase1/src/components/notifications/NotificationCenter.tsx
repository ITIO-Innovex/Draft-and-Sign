import React, { useState } from 'react';
import { Bell, Settings, Trash2, Check, Filter, Mail, Smartphone, MessageSquare } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { NotificationPreferences } from './NotificationPreferences';

export const NotificationCenter: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useProfileStore();
  const [showPreferences, setShowPreferences] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    if (filter !== 'all') return notification.type === filter;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'signature_request':
        return '📝';
      case 'document_completed':
        return '✅';
      case 'system_update':
        return '🔧';
      case 'security_alert':
        return '🔒';
      case 'team_activity':
        return '👥';
      default:
        return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'signature_request', label: 'Signature Requests' },
    { value: 'document_completed', label: 'Completed Documents' },
    { value: 'system_update', label: 'System Updates' },
    { value: 'security_alert', label: 'Security Alerts' },
    { value: 'team_activity', label: 'Team Activity' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-1 text-gray-600">
            Stay updated with your document activity and system alerts.
            {unreadCount > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowPreferences(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          
          {notifications.length > 0 && (
            <Button
              variant="outline"
              onClick={clearAllNotifications}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-50 rounded">
              <Mail className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Unread</p>
              <p className="text-xl font-bold text-gray-900">{unreadCount}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded">
              <MessageSquare className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-xl font-bold text-gray-900">
                {notifications.filter(n => n.priority === 'high').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Read</p>
              <p className="text-xl font-bold text-gray-900">
                {notifications.filter(n => n.read).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {notificationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredNotifications.length} of {notifications.length} notifications
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`
                border-l-4 transition-all duration-200 cursor-pointer
                ${getPriorityColor(notification.priority)}
                ${notification.read ? 'opacity-75' : 'shadow-md'}
              `}
              onClick={() => !notification.read && markNotificationAsRead(notification.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className={`font-medium ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      <span className={`
                        text-xs px-2 py-1 rounded-full font-medium
                        ${notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'}
                      `}>
                        {notification.priority}
                      </span>
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      notification.read ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{formatTimestamp(notification.timestamp)}</span>
                      <span>•</span>
                      <span className="capitalize">
                        {notification.type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {notification.actionUrl && (
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  )}
                  
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationAsRead(notification.id);
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="space-y-4">
            <div className="text-6xl">🔔</div>
            <h3 className="text-lg font-medium text-gray-900">
              {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You'll see notifications here when there's activity on your account."
                : `No notifications match the selected filter.`
              }
            </p>
          </div>
        </Card>
      )}

      {/* Notification Preferences Modal */}
      <Modal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
        title="Notification Preferences"
        size="lg"
      >
        <NotificationPreferences onClose={() => setShowPreferences(false)} />
      </Modal>
    </div>
  );
};