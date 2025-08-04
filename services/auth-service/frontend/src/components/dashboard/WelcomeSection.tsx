import React from 'react';
import { useAuthStore } from '../../store/authStore';

export const WelcomeSection: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white mb-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to DraftnSign, {user?.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Your all-in-one document management and e-signature platform. Create, edit, sign, and manage documents with ease.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
            <span className="text-sm">✨ Free Forever Plan Active</span>
          </div>
          <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
            <span className="text-sm">📄 10 Envelopes/Month</span>
          </div>
          <div className="bg-blue-500 bg-opacity-50 rounded-lg px-4 py-2">
            <span className="text-sm">🛠️ Full PDF Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};