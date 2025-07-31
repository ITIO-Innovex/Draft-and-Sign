import { create } from 'zustand';
import { Document, Folder, UploadProgress, SearchFilters, ViewMode, SortBy, SortOrder, User, UserRole } from '../types';
import { MOCK_DOCUMENTS, MOCK_FOLDERS, MOCK_USERS, ROLE_PERMISSIONS } from '../lib/mockData';
import { generateId, sleep } from '../lib/utils';

interface DocumentState {
  // User & Auth
  currentUser: User;
  userPermissions: any;
  
  // Documents & Folders
  documents: Document[];
  folders: Folder[];
  selectedDocuments: string[];
  currentFolderId: string | null;
  
  // Upload
  uploadProgress: UploadProgress[];
  
  // Search & Filters
  searchQuery: string;
  searchFilters: SearchFilters;
  
  // View Settings
  viewMode: ViewMode;
  sortBy: SortBy;
  sortOrder: SortOrder;
  
  // Loading States
  isLoading: boolean;
  isUploading: boolean;
  
  // Actions
  setCurrentUser: (role: UserRole) => void;
  uploadFiles: (files: File[], folderId?: string) => Promise<void>;
  createFolder: (name: string, parentId?: string) => Promise<void>;
  deleteDocuments: (documentIds: string[]) => Promise<void>;
  moveDocuments: (documentIds: string[], folderId: string) => Promise<void>;
  shareDocument: (documentId: string, email: string, permission: string) => Promise<void>;
  toggleFavorite: (documentId: string) => void;
  setSelectedDocuments: (documentIds: string[]) => void;
  setCurrentFolder: (folderId: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setViewMode: (mode: ViewMode) => void;
  setSorting: (sortBy: SortBy, sortOrder: SortOrder) => void;
  getFilteredDocuments: () => Document[];
  getFolderDocuments: (folderId: string | null) => Document[];
  getBreadcrumbs: () => Folder[];
  getStorageStats: () => { used: number; total: number; percentage: number };
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  // Initial state
  currentUser: MOCK_USERS.regularUser,
  userPermissions: ROLE_PERMISSIONS.regularUser,
  documents: MOCK_DOCUMENTS,
  folders: MOCK_FOLDERS,
  selectedDocuments: [],
  currentFolderId: null,
  uploadProgress: [],
  searchQuery: '',
  searchFilters: {},
  viewMode: 'grid',
  sortBy: 'name',
  sortOrder: 'asc',
  isLoading: false,
  isUploading: false,

  // Actions
  setCurrentUser: (role: UserRole) => {
    const user = MOCK_USERS[role];
    const permissions = ROLE_PERMISSIONS[role];
    set({ currentUser: user, userPermissions: permissions });
  },

  uploadFiles: async (files: File[], folderId?: string) => {
    const { userPermissions } = get();
    set({ isUploading: true });

    // Create upload progress entries
    const progressEntries: UploadProgress[] = files.map(file => ({
      id: generateId(),
      file,
      progress: 0,
      status: 'pending'
    }));

    set(state => ({
      uploadProgress: [...state.uploadProgress, ...progressEntries]
    }));

    // Simulate file uploads
    for (const progress of progressEntries) {
      // Check file size limits
      if (userPermissions.uploadLimit !== -1 && progress.file.size > userPermissions.uploadLimit) {
        set(state => ({
          uploadProgress: state.uploadProgress.map(p =>
            p.id === progress.id
              ? { ...p, status: 'error', error: 'File size exceeds limit' }
              : p
          )
        }));
        continue;
      }

      // Update progress
      set(state => ({
        uploadProgress: state.uploadProgress.map(p =>
          p.id === progress.id
            ? { ...p, status: 'uploading' }
            : p
        )
      }));

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await sleep(200);
        set(state => ({
          uploadProgress: state.uploadProgress.map(p =>
            p.id === progress.id
              ? { ...p, progress: i }
              : p
          )
        }));
      }

      // Create document entry
      const newDocument: Document = {
        id: generateId(),
        name: progress.file.name,
        type: progress.file.name.split('.').pop() || '',
        size: progress.file.size,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        uploadedBy: get().currentUser.email,
        folderId: folderId || get().currentFolderId,
        tags: [],
        shared: false,
        views: 0,
        downloads: 0,
        sharedWith: [],
        isArchived: false,
        isFavorite: false
      };

      set(state => ({
        documents: [...state.documents, newDocument],
        uploadProgress: state.uploadProgress.map(p =>
          p.id === progress.id
            ? { ...p, status: 'success', progress: 100 }
            : p
        )
      }));
    }

    // Clear progress after delay
    setTimeout(() => {
      set(state => ({
        uploadProgress: state.uploadProgress.filter(p => p.status !== 'success'),
        isUploading: false
      }));
    }, 2000);
  },

  createFolder: async (name: string, parentId?: string) => {
    set({ isLoading: true });
    await sleep(500);

    const newFolder: Folder = {
      id: generateId(),
      name,
      parentId: parentId || get().currentFolderId,
      color: '#3b82f6',
      icon: 'Folder',
      documentCount: 0,
      createdAt: new Date().toISOString(),
      ownerId: get().currentUser.id,
      isShared: false,
      permissions: []
    };

    set(state => ({
      folders: [...state.folders, newFolder],
      isLoading: false
    }));
  },

  deleteDocuments: async (documentIds: string[]) => {
    set({ isLoading: true });
    await sleep(1000);

    set(state => ({
      documents: state.documents.filter(doc => !documentIds.includes(doc.id)),
      selectedDocuments: [],
      isLoading: false
    }));
  },

  moveDocuments: async (documentIds: string[], folderId: string) => {
    set({ isLoading: true });
    await sleep(500);

    set(state => ({
      documents: state.documents.map(doc =>
        documentIds.includes(doc.id)
          ? { ...doc, folderId, modifiedAt: new Date().toISOString() }
          : doc
      ),
      selectedDocuments: [],
      isLoading: false
    }));
  },

  shareDocument: async (documentId: string, email: string, permission: string) => {
    await sleep(500);

    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? {
              ...doc,
              shared: true,
              sharedWith: [
                ...doc.sharedWith,
                {
                  userId: generateId(),
                  email,
                  permission: permission as any,
                  createdAt: new Date().toISOString()
                }
              ]
            }
          : doc
      )
    }));
  },

  toggleFavorite: (documentId: string) => {
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, isFavorite: !doc.isFavorite }
          : doc
      )
    }));
  },

  setSelectedDocuments: (documentIds: string[]) => {
    set({ selectedDocuments: documentIds });
  },

  setCurrentFolder: (folderId: string | null) => {
    set({ currentFolderId: folderId, selectedDocuments: [] });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSearchFilters: (filters: SearchFilters) => {
    set({ searchFilters: filters });
  },

  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },

  setSorting: (sortBy: SortBy, sortOrder: SortOrder) => {
    set({ sortBy, sortOrder });
  },

  getFilteredDocuments: () => {
    const { documents, currentFolderId, searchQuery, searchFilters, sortBy, sortOrder } = get();
    
    let filtered = documents.filter(doc => {
      // Folder filter
      if (doc.folderId !== currentFolderId) return false;
      
      // Search query
      if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // File type filter
      if (searchFilters.type?.length && !searchFilters.type.includes(doc.type)) {
        return false;
      }
      
      // Tag filter
      if (searchFilters.tags?.length) {
        const hasTag = searchFilters.tags.some(tag => doc.tags.includes(tag));
        if (!hasTag) return false;
      }
      
      // Shared only filter
      if (searchFilters.sharedOnly && !doc.shared) return false;
      
      // Favorite only filter
      if (searchFilters.favoriteOnly && !doc.isFavorite) return false;
      
      return true;
    });
    
    // Sort documents
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.modifiedAt);
          bValue = new Date(b.modifiedAt);
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'type':
          aValue = a.type.toLowerCase();
          bValue = b.type.toLowerCase();
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return filtered;
  },

  getFolderDocuments: (folderId: string | null) => {
    const { documents } = get();
    return documents.filter(doc => doc.folderId === folderId);
  },

  getBreadcrumbs: () => {
    const { folders, currentFolderId } = get();
    const breadcrumbs: Folder[] = [];
    
    let currentId = currentFolderId;
    while (currentId) {
      const folder = folders.find(f => f.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    
    return breadcrumbs;
  },

  getStorageStats: () => {
    const { documents, userPermissions } = get();
    const used = documents.reduce((total, doc) => total + doc.size, 0);
    const total = userPermissions.storageLimit;
    const percentage = total === -1 ? 0 : Math.round((used / total) * 100);
    
    return { used, total, percentage };
  }
}));