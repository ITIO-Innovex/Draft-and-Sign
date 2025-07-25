import React, { useState } from 'react';
import { 
  Search, 
  Grid3X3, 
  List, 
  Upload, 
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  Share2,
  Download,
  Trash2,
  Move,
  Star
} from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { BreadcrumbNavigation } from '../common/BreadcrumbNavigation';
import { UploadModal } from '../modals/UploadModal';
import { SearchModal } from '../modals/SearchModal';

export function DocumentHeader() {
  // Use fallback values instead of store
  const searchQuery = '';
  const setSearchQuery = (query: string) => console.log('Search:', query);
  const viewMode: 'grid' | 'list' = 'grid';
  const setViewMode = (mode: string) => console.log('View mode:', mode);
  const sortBy = 'name';
  const sortOrder = 'asc';
  const setSorting = (by: string, order: string) => console.log('Sort:', by, order);
  const selectedDocuments: string[] = [];
  const userPermissions = {
    upload: true,
    delete_any: false
  };
  const isLoading = false;

  const [showUpload, setShowUpload] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const hasSelection = selectedDocuments.length > 0;

  const handleSortToggle = () => {
    setSorting(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Breadcrumb */}
      <BreadcrumbNavigation />
      
      {/* Main Header */}
      <div className="flex items-center justify-between mt-4">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
              onFocus={() => setShowSearch(true)}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSearch(true)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Bulk Actions (when documents are selected) */}
          {hasSelection && (
            <div className="flex items-center space-x-2 mr-4 px-3 py-1 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700 font-medium">
                {selectedDocuments.length} selected
              </span>
              <div className="flex items-center space-x-1">
                <Button size="sm" variant="ghost" className="h-7 px-2">
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2">
                  <Download className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2">
                  <Move className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2">
                  <Star className="w-3 h-3" />
                </Button>
                {userPermissions.delete_any && (
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Sort */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortToggle}
            className="hidden sm:flex"
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4 mr-2" />
            ) : (
              <SortDesc className="w-4 h-4 mr-2" />
            )}
            Sort
          </Button>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none border-0"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-none border-0"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Upload */}
          {userPermissions.upload && (
            <Button
              onClick={() => setShowUpload(true)}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          )}

          {/* More Actions */}
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <UploadModal 
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
      />

      <SearchModal 
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />
    </div>
  );
}