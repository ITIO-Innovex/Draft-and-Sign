import React, { useState } from 'react';
import { 
  Folder, 
  FolderOpen, 
  Star, 
  Share2, 
  Clock, 
  Trash2, 
  Archive,
  Plus,
  BarChart3,
  Users,
  Settings,
  Brain,
  Bell,
  Shield
} from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { CreateFolderModal } from '../modals/CreateFolderModal';
import { MentionNotifier } from '../collaboration/MentionNotifier';
import { DiscoveryEngine } from '../search/DiscoveryEngine';

const quickAccess = [
  { id: 'recent', name: 'Recent', icon: Clock, count: 0 },
  { id: 'favorites', name: 'Favorites', icon: Star, count: 0 },
  { id: 'shared', name: 'Shared with me', icon: Share2, count: 0 },
  { id: 'archived', name: 'Archived', icon: Archive, count: 0 },
  { id: 'trash', name: 'Trash', icon: Trash2, count: 0 }
];

export function DocumentSidebar() {
  // Use fallback values instead of store
  const folders: any[] = [];
  const currentFolderId = null;
  const setCurrentFolder = (id: string | null) => console.log('Set folder:', id);
  const currentUser = {
    id: 'default',
    name: 'User',
    email: 'user@example.com',
    role: 'regularUser'
  };
  const userPermissions = {
    create_folders: true,
    analytics: false,
    admin_access: false,
    manage_team_docs: false
  };
  const documents: any[] = [];
  
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [showDiscovery, setShowDiscovery] = useState(false);

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const getFolderTree = (parentId: string | null = null, level: number = 0): any[] => {
    return folders
      .filter(folder => folder.parentId === parentId)
      .map(folder => ({
        ...folder,
        level,
        children: getFolderTree(folder.id, level + 1)
      }));
  };

  const renderFolder = (folder: any) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isActive = currentFolderId === folder.id;
    const hasChildren = folder.children.length > 0;
    const FolderIcon = hasChildren && isExpanded ? FolderOpen : Folder;

    return (
      <div key={folder.id}>
        <div
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer group transition-colors",
            "hover:bg-gray-100",
            isActive && "bg-blue-50 text-blue-700",
            folder.level > 0 && "ml-4"
          )}
          onClick={() => setCurrentFolder(folder.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="p-0.5 hover:bg-gray-200 rounded"
            >
              <div className={cn(
                "w-4 h-4 transition-transform",
                isExpanded ? "rotate-90" : ""
              )}>
                ▶
              </div>
            </button>
          )}
          
          <FolderIcon 
            className="w-4 h-4 flex-shrink-0" 
            style={{ color: folder.color }}
          />
          
          <span className="flex-1 truncate text-sm font-medium">
            {folder.name}
          </span>
          
          <span className="text-xs text-gray-500 group-hover:text-gray-700">
            {folder.documentCount}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {folder.children.map(renderFolder)}
          </div>
        )}
      </div>
    );
  };

  // Count documents for quick access
  const favoriteCount = documents.filter(doc => doc.isFavorite).length;
  const sharedCount = documents.filter(doc => doc.shared).length;
  const archivedCount = documents.filter(doc => doc.isArchived).length;

  const quickAccessWithCounts = quickAccess.map(item => ({
    ...item,
    count: item.id === 'favorites' ? favoriteCount :
           item.id === 'shared' ? sharedCount :
           item.id === 'archived' ? archivedCount : 0
  }));

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Notifications */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
          <MentionNotifier
            notifications={[]}
            onMarkAsRead={() => {}}
            onMarkAllAsRead={() => {}}
            onNavigateToMention={() => {}}
          />
        </div>
      </div>

      {/* Quick Access */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Quick Access</h3>
        </div>
        
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
              "hover:bg-gray-100",
              currentFolderId === null && "bg-blue-50 text-blue-700"
            )}
            onClick={() => setCurrentFolder(null)}
          >
            <Folder className="w-4 h-4" />
            <span className="text-sm font-medium">All Documents</span>
          </div>
          
          {quickAccessWithCounts.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
              >
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="flex-1 text-sm text-gray-700">{item.name}</span>
                {item.count > 0 && (
                  <span className="text-xs text-gray-500">{item.count}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Folders */}
      <div className="flex-1 px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Folders</h3>
          {userPermissions.create_folders && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowCreateFolder(true)}
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {getFolderTree().map(renderFolder)}
        </div>
      </div>

      {/* Discovery Engine */}
      <div className="px-4 pb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDiscovery(!showDiscovery)}
          className="w-full justify-start"
        >
          <Brain className="w-4 h-4 mr-2" />
          Smart Discovery
        </Button>
        
        {showDiscovery && (
          <div className="mt-3">
            <DiscoveryEngine
              userInterests={['finance', 'legal', 'contracts']}
              onDocumentSelect={(docId) => console.log('Navigate to:', docId)}
              onExpertContact={(expertId) => console.log('Contact expert:', expertId)}
            />
          </div>
        )}
      </div>

      {/* Admin Tools */}
      {(userPermissions.analytics || userPermissions.admin_access) && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Admin Tools</h3>
          <div className="space-y-1">
            {userPermissions.analytics && (
              <a 
                href="/analytics"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
              >
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Analytics</span>
              </a>
            )}
            {userPermissions.admin_access && (
              <a 
                href="/admin"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
              >
                <Shield className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Admin Panel</span>
              </a>
            )}
            {userPermissions.manage_team_docs && (
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Team Management</span>
              </div>
            )}
            {userPermissions.admin_access && (
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100">
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">System Settings</span>
              </div>
            )}
          </div>
        </div>
      )}

      <CreateFolderModal 
        isOpen={showCreateFolder}
        onClose={() => setShowCreateFolder(false)}
      />
    </div>
  );
}