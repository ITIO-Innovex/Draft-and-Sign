import React, { useState } from 'react';
import { 
  MoreVertical, 
  Star, 
  Share2, 
  Download, 
  Trash2, 
  Edit3, 
  Copy,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Eye,
  Users,
  MessageCircle,
  GitBranch,
  Activity
} from 'lucide-react';

import { Document } from '../../types';
import { formatFileSize, formatDate, cn } from '../../lib/utils';

import { Button } from '../ui/button';

const getFileTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return FileText;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
    case 'svg':
      return FileImage;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'wmv':
      return FileVideo;
    case 'mp3':
    case 'wav':
    case 'flac':
      return FileAudio;
    default:
      return FileText;
  }
};

const getFileTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return 'text-red-500';
    case 'doc':
    case 'docx':
      return 'text-blue-500';
    case 'xls':
    case 'xlsx':
      return 'text-green-500';
    case 'ppt':
    case 'pptx':
      return 'text-orange-500';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'text-purple-500';
    default:
      return 'text-gray-500';
  }
};

interface EnhancedDocumentCardProps {
  document: Document;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onOpenCollaboration: (documentId: string) => void;
}

export function EnhancedDocumentCard({ 
  document, 
  isSelected, 
  onSelect, 
  onOpenCollaboration 
}: EnhancedDocumentCardProps) {
  // Use static fallback data instead of store
  const toggleFavorite = (id: string) => console.log('Toggle favorite:', id);
  const userPermissions = { delete_any: false, delete_own: false };
  
  // Use fallback collaboration data
  const comments: any[] = [];
  const versions: any[] = [];
  const workflows: any[] = [];
  const activeUsers: any[] = [];
  const analysis: any = {};
  
  const unresolvedComments = comments.filter((c: any) => !c.resolved).length;
  const activeWorkflows = workflows.filter((w: any) => w.status === 'active').length;

  const [showActions, setShowActions] = useState(false);
  
  const FileIcon = getFileTypeIcon(document.type);
  const fileTypeColor = getFileTypeColor(document.type);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(document.id);
  };

  const handleCardClick = () => {
    onOpenCollaboration(document.id);
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer",
        isSelected && "ring-2 ring-blue-500 border-blue-500"
      )}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(e.target.checked);
          }}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>

      {/* Collaboration Indicators */}
      {activeUsers.length > 0 && (
        <div className="absolute top-2 right-2 z-10">
          <div className="flex -space-x-1">
            {activeUsers.slice(0, 3).map((user: any, index: number) => (
              <div
                key={user.id}
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: user.color }}
                title={user.name}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center text-xs text-white font-medium">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {activeUsers.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium text-gray-600">
                +{activeUsers.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions Menu */}
      <div className="absolute top-8 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 bg-white shadow-sm border"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
          >
            <MoreVertical className="w-3 h-3" />
          </Button>
          
          {showActions && (
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('View document:', document.id);
                }}
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Edit document:', document.id);
                }}
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Download document:', document.id);
                }}
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Share document:', document.id);
                }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Copy document:', document.id);
                }}
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              
              {(userPermissions.delete_any || userPermissions.delete_own) && (
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center space-x-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Delete document:', document.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* File Icon and Type */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={cn("p-2 rounded-lg", fileTypeColor, "bg-gray-50")}>
              <FileIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">
                {document.type}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleFavoriteToggle}
            className={cn(
              "p-1 rounded transition-colors",
              document.isFavorite 
                ? "text-yellow-500 hover:text-yellow-600" 
                : "text-gray-400 hover:text-yellow-500"
            )}
          >
            <Star className={cn("w-4 h-4", document.isFavorite && "fill-current")} />
          </button>
        </div>

        {/* Document Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {document.name}
        </h3>

        {/* Document Info */}
        <div className="space-y-1 mb-3">
          <p className="text-xs text-gray-500">
            {formatFileSize(document.size)}
          </p>
          <p className="text-xs text-gray-500">
            Modified {formatDate(document.modifiedAt)}
          </p>
        </div>

        {/* Collaboration Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            {unresolvedComments > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{unresolvedComments}</span>
              </div>
            )}
            
            {activeWorkflows > 0 && (
              <div className="flex items-center space-x-1">
                <GitBranch className="w-3 h-3" />
                <span>{activeWorkflows}</span>
              </div>
            )}
            
            {activeUsers.length > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{activeUsers.length}</span>
              </div>
            )}
          </div>
          
          {document.shared && (
            <div className="flex items-center space-x-1 text-blue-600">
              <Share2 className="w-3 h-3" />
              <span>Shared</span>
            </div>
          )}
        </div>

        {/* Activity Indicator */}
        {analysis.lastActivity && (
          <div className="mt-2 flex items-center space-x-1 text-xs text-gray-500">
            <Activity className="w-3 h-3" />
            <span>Active {formatDate(analysis.lastActivity)}</span>
          </div>
        )}
      </div>
    </div>
  );
}