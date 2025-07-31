import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DocumentLayout } from './components/layout/DocumentLayout';
import { EnhancedDocumentGrid } from './components/documents/EnhancedDocumentGrid';
import { EnhancedDocumentAnalytics } from './components/analytics/EnhancedDocumentAnalytics';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UploadProgress } from './components/upload/UploadProgress';
import { SharedAuthProvider } from './context/SharedAuthContext';
console.log('%c[Remote Phase2] Phase2 App loaded by host 🚀', 'color: green; font-weight: bold');

function DocumentView() {
  return <EnhancedDocumentGrid />;
}

function AppContent() {
  return (
    <DocumentLayout>
      <Routes>
        <Route path="/" element={<DocumentView />} />
        <Route path="/analytics" element={<EnhancedDocumentAnalytics />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>        
      <UploadProgress uploads={[]} />
    </DocumentLayout>
  );
}

function App() {
  return (    
    <SharedAuthProvider>
      <Router>      
        <AppContent />
      </Router>
    </SharedAuthProvider>
  );
}

export default App;