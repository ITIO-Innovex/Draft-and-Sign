import React from 'react';
import { 
  Layers, 
  Star, 
  Clock, 
  FileText,
  RefreshCw,
  Edit3,
  Move,
  Lock,
  Archive,
  ScanLine,
  FileInput,
  Settings
} from 'lucide-react';
import { PDFTool } from '../types';
import { clsx } from '../utils';

interface SidebarProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  recentTools: PDFTool[];
  favoriteTools: Set<string>;
  onToolSelect: (tool: PDFTool) => void;
  currentView: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  all: Layers,
  conversion: RefreshCw,
  editing: Edit3,
  pages: Move,
  security: Lock,
  optimization: Archive,
  ocr: ScanLine,
  forms: FileInput,
  utilities: Settings
};

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  recentTools,
  favoriteTools,
  onToolSelect,
  currentView
}) => {
  if (currentView !== 'tools') {
    return null;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id] || FileText;
              return (
                <button
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-3" />
                    {category.name}
                  </div>
                  <span className={clsx(
                    'px-2 py-0.5 text-xs rounded-full',
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Recent Tools */}
        {recentTools.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </h3>
            <div className="space-y-1">
              {recentTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onToolSelect(tool)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-xs text-gray-500 truncate">
                    {tool.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Favorites */}
        {favoriteTools.size > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Favorites
            </h3>
            <div className="text-sm text-gray-500">
              {favoriteTools.size} favorite tool{favoriteTools.size !== 1 ? 's' : ''}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Today's Activity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tools used</span>
              <span className="font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Files processed</span>
              <span className="font-medium text-gray-900">34</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Time saved</span>
              <span className="font-medium text-green-600">2.4h</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};