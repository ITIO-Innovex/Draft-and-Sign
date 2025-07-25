import React, { useState } from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export const AccountSettings: React.FC = () => {
  const { user } = useAuthStore();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteAccount = () => {
    // In a real app, this would delete the account
    console.log('Account deletion requested');
    // You would typically redirect to a deletion confirmation page
    // or show a success message and logout
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account preferences and data.
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Account Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Account ID:</span>
                <span className="text-gray-900">{user?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since:</span>
                <span className="text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="text-blue-600 font-medium">Free Forever</span>
              </div>
            </div>
          </div>

          {/* Data Export */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Data Export</h4>
            <p className="text-sm text-gray-600 mb-3">
              Download a copy of your account data and documents.
            </p>
            <Button variant="outline" size="sm">
              Request Data Export
            </Button>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h4 className="text-sm font-medium text-red-900">Danger Zone</h4>
            </div>
            <p className="text-sm text-red-700 mb-3">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText="Delete Account"
        variant="danger"
      />
    </Card>
  );
};