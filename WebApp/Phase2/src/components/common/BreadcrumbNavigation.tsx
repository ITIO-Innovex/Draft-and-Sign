import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

import { cn } from '../../lib/utils';

export function BreadcrumbNavigation() {
  // Use fallback values instead of store
  const breadcrumbs: any[] = [];
  const setCurrentFolder = (id: string | null) => console.log('Set folder:', id);

  return (
    <nav className="flex items-center space-x-1 text-sm">
      <button
        onClick={() => setCurrentFolder(null)}
        className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Home className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 font-medium">All Documents</span>
      </button>

      {breadcrumbs.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setCurrentFolder(folder.id)}
            className={cn(
              "px-2 py-1 rounded-md hover:bg-gray-100 transition-colors",
              index === breadcrumbs.length - 1 
                ? "text-gray-900 font-medium" 
                : "text-gray-600"
            )}
          >
            {folder.name}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}