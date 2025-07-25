// Fallback store for when useDocumentStore fails due to React context issues
export const createFallbackStore = () => {
  const mockDocuments = [
    {
      id: 'mock-doc-1',
      name: 'Sample Document.pdf',
      type: 'pdf',
      size: 1024000,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      uploadedBy: 'user@example.com',
      folderId: null,
      tags: [],
      shared: false,
      views: 0,
      downloads: 0,
      sharedWith: [],
      isArchived: false,
      isFavorite: false
    }
  ];

  const mockFolders = [
    {
      id: 'mock-folder-1',
      name: 'Documents',
      parentId: null,
      color: '#3b82f6',
      icon: 'Folder',
      documentCount: 1,
      createdAt: new Date().toISOString(),
      ownerId: 'user_john',
      isShared: false,
      permissions: []
    }
  ];

  const mockUser = {
    id: 'user_john',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'regularUser' as const,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  };

  return {
    // User & Auth
    currentUser: mockUser,
    userPermissions: {
      upload: true,
      delete_any: false,
      share_any: false,
      create_folders: true,
      analytics: false,
      admin_access: false,
      manage_team_docs: false,
      uploadLimit: 26214400,
      storageLimit: 1073741824
    },
    
    // Documents & Folders
    documents: mockDocuments,
    folders: mockFolders,
    selectedDocuments: [],
    currentFolderId: null,
    
    // Upload
    uploadProgress: [],
    
    // Search & Filters
    searchQuery: '',
    searchFilters: {},
    
    // View Settings
    viewMode: 'grid' as const,
    sortBy: 'name' as const,
    sortOrder: 'asc' as const,
    
    // Loading States
    isLoading: false,
    isUploading: false,
    
    // Actions
    setCurrentUser: (role: string) => console.log('Set current user:', role),
    uploadFiles: async (files: File[], folderId?: string) => console.log('Upload files:', files, 'to folder:', folderId),
    createFolder: async (name: string, parentId?: string) => console.log('Create folder:', name, 'in folder:', parentId),
    deleteDocuments: async (documentIds: string[]) => console.log('Delete documents:', documentIds),
    moveDocuments: async (documentIds: string[], folderId: string) => console.log('Move documents:', documentIds, 'to folder:', folderId),
    shareDocument: async (documentId: string, email: string, permission: string) => console.log('Share document:', documentId, 'with:', email),
    toggleFavorite: (documentId: string) => console.log('Toggle favorite:', documentId),
    setSelectedDocuments: (documentIds: string[]) => console.log('Set selected documents:', documentIds),
    setCurrentFolder: (folderId: string | null) => console.log('Set current folder:', folderId),
    setSearchQuery: (query: string) => console.log('Set search query:', query),
    setSearchFilters: (filters: any) => console.log('Set search filters:', filters),
    setViewMode: (mode: string) => console.log('Set view mode:', mode),
    setSorting: (sortBy: string, sortOrder: string) => console.log('Set sorting:', sortBy, sortOrder),
    getFilteredDocuments: () => mockDocuments,
    getFolderDocuments: (folderId: string | null) => mockDocuments.filter(doc => doc.folderId === folderId),
    getBreadcrumbs: () => mockFolders,
    getStorageStats: () => ({ used: 1024000, total: 1073741824, percentage: 0 })
  };
};

// Safe hook that falls back to mock data if the real store fails
export const useSafeDocumentStore = () => {
  try {
    // Try to use the real store
    const { useDocumentStore } = require('./documentStore');
    return useDocumentStore();
  } catch (error) {
    console.warn('useDocumentStore failed, using fallback store:', error);
    return createFallbackStore();
  }
}; 