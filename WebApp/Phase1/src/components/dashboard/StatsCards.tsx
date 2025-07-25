import React from 'react';
import { FileText, FileSignature, BookTemplate as Template, HardDrive } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Card } from '../ui/Card';

export const StatsCards: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      name: 'Documents Created',
      value: user?.stats.documents || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Signatures Sent',
      value: user?.stats.signatures || 0,
      icon: FileSignature,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Templates Saved',
      value: user?.stats.templates || 0,
      icon: Template,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Storage Used',
      value: `${user?.stats.storageUsed || 0} MB`,
      icon: HardDrive,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};