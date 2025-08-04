import React from 'react';
import { ProfilePhotoUpload } from '../components/profile/ProfilePhotoUpload';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { NotificationSettings } from '../components/profile/NotificationSettings';
import { AccountSettings } from '../components/profile/AccountSettings';

export const ProfilePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-8">
        <ProfilePhotoUpload />
        <ProfileSettings />
        <NotificationSettings />
        <AccountSettings />
      </div>
    </div>
  );
};