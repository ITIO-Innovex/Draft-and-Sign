import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentLayout } from './components/layout/DocumentLayout';
import { EnhancedDocumentGrid } from './components/documents/EnhancedDocumentGrid';
import { DocumentList } from './components/documents/DocumentList';
import { EnhancedDocumentAnalytics } from './components/analytics/EnhancedDocumentAnalytics';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UploadProgress } from './components/upload/UploadProgress';
import { useDocumentStore } from './store/documentStore';

function DocumentView() {
  const { viewMode } = useDocumentStore();
  
  return viewMode === 'grid' ? <EnhancedDocumentGrid /> : <DocumentList />;
}

function App() {
  const { uploadProgress } = useDocumentStore();

  return (
    <Router>
      <DocumentLayout>
        <Routes>
          <Route path="/" element={<DocumentView />} />
          <Route path="/analytics" element={<EnhancedDocumentAnalytics />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Upload Progress Overlay */}
        <UploadProgress uploads={uploadProgress} />
      </DocumentLayout>
    </Router>
  );
}

export default App;