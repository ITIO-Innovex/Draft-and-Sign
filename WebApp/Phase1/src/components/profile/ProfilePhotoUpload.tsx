import React, { useState } from 'react';
import { Upload, User, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const ProfilePhotoUpload: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.profilePhoto || null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setPreviewUrl(url);
        // In a real app, you would upload to a server here
        updateProfile({ profilePhoto: url });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removePhoto = () => {
    setPreviewUrl(null);
    updateProfile({ profilePhoto: undefined });
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Photo</h3>
          <p className="mt-1 text-sm text-gray-600">
            Upload a profile photo to personalize your account.
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-gray-400" />
              )}
            </div>
          </div>

          <div className="flex-1">
            <div
              className={`
                border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
                ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
              `}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
            >
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drop an image here, or{' '}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium"
                >
                  browse
                </label>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {previewUrl && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={removePhoto} size="sm">
              <X className="mr-2 h-4 w-4" />
              Remove Photo
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};