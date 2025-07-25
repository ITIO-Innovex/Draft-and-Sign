// import React from 'react';
import { SimpleLayout } from './components/SimpleLayout';
// import { AdminLayout } from './components/AdminLayout';
// import { HomePage } from './pages/HomePage';
// import { DocumentationPage } from './pages/DocumentationPage';
// import { APIExplorerPage } from './pages/APIExplorerPage';
// import { DashboardPage } from './pages/DashboardPage';
// import { WebhooksPage } from './pages/WebhooksPage';
// import { SDKsPage } from './pages/SDKsPage';
// import { CommunityPage } from './pages/CommunityPage';
// import { SupportPage } from './pages/SupportPage';
// import { AnalyticsPage } from './pages/AnalyticsPage';
// import { ProjectsPage } from './pages/ProjectsPage';
import { APIKeysPage } from './pages/APIKeysPage';
// import { TestingPage } from './pages/TestingPage';
// import { MarketplacePage } from './pages/MarketplacePage';

// Admin Pages
// import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
// import { DeveloperManagementPage } from './pages/admin/DeveloperManagementPage';
// import { APIMonitoringPage } from './pages/admin/APIMonitoringPage';
// import { WebhookAdminPage } from './pages/admin/WebhookAdminPage';
// import { SDKAdminPage } from './pages/admin/SDKAdminPage';

import { AuthProvider } from './contexts/AuthContext';
import { APIProvider } from './contexts/APIContext';

// This component will be used when Phase6 is loaded as a remote module
export function Phase6App() {
  return (
    <AuthProvider>
      <APIProvider>
        <SimpleLayout>
          <APIKeysPage />
        </SimpleLayout>
      </APIProvider>
    </AuthProvider>
  );
}

// Export the default for backward compatibility
export default Phase6App; 