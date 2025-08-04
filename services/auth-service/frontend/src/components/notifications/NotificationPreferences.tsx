import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Smartphone, MessageSquare, Clock, Volume2 } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';

interface NotificationPreferencesProps {
  onClose: () => void;
}

export const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({ onClose }) => {
  const { notificationPreferences, updateNotificationPreferences, isLoading } = useProfileStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: notificationPreferences,
  });

  const watchedValues = watch();

  const onSubmit = async (data: any) => {
    try {
      await updateNotificationPreferences(data);
      onClose();
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    }
  };

  const notificationTypes = [
    {
      key: 'documentRequests',
      label: 'Document Requests',
      description: 'When someone requests your signature on a document',
    },
    {
      key: 'documentCompleted',
      label: 'Document Completed',
      description: 'When all parties have signed a document',
    },
    {
      key: 'systemUpdates',
      label: 'System Updates',
      description: 'Important platform updates and maintenance notices',
    },
    {
      key: 'securityAlerts',
      label: 'Security Alerts',
      description: 'Login attempts and security-related notifications',
    },
    {
      key: 'teamActivity',
      label: 'Team Activity',
      description: 'Updates about your team and organization',
    },
    {
      key: 'marketing',
      label: 'Marketing Communications',
      description: 'Product updates, newsletters, and promotional content',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Email Notifications */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-600">
                Choose which email notifications you'd like to receive
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{type.label}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`email.${type.key}`)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Frequency</h4>
                <p className="text-sm text-gray-600">How often should we send email notifications?</p>
              </div>
              
              <select
                {...register('email.frequency')}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Push Notifications */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600">
                Browser and mobile app notifications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable Push Notifications</h4>
                <p className="text-sm text-gray-600">Receive notifications in your browser</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('push.enabled')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {watchedValues.push?.enabled && (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Document Requests</h4>
                    <p className="text-sm text-gray-600">Notify me of new signature requests</p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('push.documentRequests')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Urgent Only</h4>
                    <p className="text-sm text-gray-600">Only show high-priority notifications</p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('push.urgentOnly')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Quiet Hours */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Quiet Hours</h4>
                      <p className="text-sm text-gray-600">Disable notifications during specific hours</p>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register('push.quietHours.enabled')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {watchedValues.push?.quietHours?.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        {...register('push.quietHours.start')}
                        type="time"
                        label="Start Time"
                      />
                      <Input
                        {...register('push.quietHours.end')}
                        type="time"
                        label="End Time"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* SMS Notifications */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
              <p className="text-sm text-gray-600">
                Text message notifications for critical alerts
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Enable SMS Notifications</h4>
                <p className="text-sm text-gray-600">Receive text messages for important updates</p>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('sms.enabled')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {watchedValues.sms?.enabled && (
              <>
                <Input
                  {...register('sms.phoneNumber')}
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 123-4567"
                />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Security Alerts</h4>
                    <p className="text-sm text-gray-600">Login attempts and security notifications</p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('sms.securityAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Urgent Documents</h4>
                    <p className="text-sm text-gray-600">High-priority signature requests</p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('sms.urgentDocuments')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" loading={isLoading}>
          Save Preferences
        </Button>
      </div>
    </form>
  );
};