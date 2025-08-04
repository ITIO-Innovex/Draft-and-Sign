import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';

export const NotificationSettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleNotificationChange = (enabled: boolean) => {
    updateProfile({
      preferences: {
        ...user?.preferences,
        notifications: enabled,
      },
    });
  };

  const handleLanguageChange = (language: string) => {
    updateProfile({
      preferences: {
        ...user?.preferences,
        language,
      },
    });
  };

  const handleTimezoneChange = (timezone: string) => {
    updateProfile({
      preferences: {
        ...user?.preferences,
        timezone,
      },
    });
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage your notification preferences and account settings.
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive email notifications for important updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={user?.preferences.notifications || false}
                onChange={(e) => handleNotificationChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Language Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Language
            </label>
            <select
              value={user?.preferences.language || 'en'}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Timezone
            </label>
            <select
              value={user?.preferences.timezone || 'America/New_York'}
              onChange={(e) => handleTimezoneChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              <option value="Europe/Paris">Central European Time (CET)</option>
              <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
            </select>
          </div>
        </div>
      </div>
    </Card>
  );
};