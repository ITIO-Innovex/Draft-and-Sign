import React, { useState } from 'react';

import { useSafeDocumentStore } from '../../store/fallbackStore';
import { EnhancedDocumentCard } from './EnhancedDocumentCard';
import { CollaborationHub } from '../collaboration/CollaborationHub';
import { EmptyState } from '../common/EmptyState';
import { FileText } from 'lucide-react';

export function EnhancedDocumentGrid() {
  const {
    getFilteredDocuments,
    selectedDocuments,
    setSelectedDocuments,
    searchQuery,
    documents
  } = useSafeDocumentStore();
  
  const [collaborationDocument, setCollaborationDocument] = useState<string | null>(null);
  
  const filteredDocuments = getFilteredDocuments();

  const handleDocumentSelect = (documentId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDocuments([...selectedDocuments, documentId]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(id => id !== documentId));
    }
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedDocuments(filteredDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };

  const handleOpenCollaboration = (documentId: string) => {
    setCollaborationDocument(documentId);
  };

  const collaborationDoc = collaborationDocument 
    ? documents.find(doc => doc.id === collaborationDocument)
    : null;

  if (filteredDocuments.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title={searchQuery ? "No documents found" : "No documents yet"}
        description={
          searchQuery 
            ? "Try adjusting your search or filters"
            : "Upload your first document to get started"
        }
      />
    );
  }

  return (
    <>
      <div className="p-6">
        {/* Selection Header */}
        {filteredDocuments.length > 0 && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedDocuments.length === filteredDocuments.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">
                {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {selectedDocuments.length > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                {selectedDocuments.length} selected
              </span>
            )}
          </div>
        )}

        {/* Document Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredDocuments.map((document) => (
            <EnhancedDocumentCard
              key={document.id}
              document={document}
              isSelected={selectedDocuments.includes(document.id)}
              onSelect={(isSelected) => handleDocumentSelect(document.id, isSelected)}
              onOpenCollaboration={handleOpenCollaboration}
            />
          ))}
        </div>
      </div>

      {/* Collaboration Hub Modal */}
      {collaborationDoc && (
        <CollaborationHub
          document={collaborationDoc}
          onClose={() => setCollaborationDocument(null)}
        />
      )}
    </>
  );
}