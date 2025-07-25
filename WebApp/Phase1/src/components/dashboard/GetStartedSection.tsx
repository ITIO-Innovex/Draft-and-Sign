import React from 'react';
import { Upload, FileSignature, BookTemplate as Template, Scissors, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const GetStartedSection: React.FC = () => {
  const actions = [
    {
      title: 'Upload Your First Document',
      description: 'Get started by uploading a PDF or creating a new document from scratch.',
      icon: Upload,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      comingSoon: true,
    },
    {
      title: 'Create a Template',
      description: 'Save time by creating reusable templates for your most common documents.',
      icon: Template,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      comingSoon: true,
    },
    {
      title: 'Send for Signature',
      description: 'Send documents to clients or colleagues for electronic signatures.',
      icon: FileSignature,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      comingSoon: true,
    },
    {
      title: 'Explore PDF Tools',
      description: 'Access 50+ PDF tools for editing, converting, and optimizing documents.',
      icon: Scissors,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Get Started</h2>
        <span className="text-sm text-gray-500">Choose an action to begin</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Card 
              key={action.title} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group relative"
            >
              {action.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                    Coming Soon
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-105 transition-transform duration-200`}>
                  <Icon className={`h-6 w-6 ${action.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {action.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={action.comingSoon}
                    className="group-hover:bg-gray-50"
                  >
                    {action.comingSoon ? 'Coming Soon' : 'Get Started'}
                    {!action.comingSoon && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};