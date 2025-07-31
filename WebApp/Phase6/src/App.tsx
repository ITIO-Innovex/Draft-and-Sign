import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AdminLayout } from './components/AdminLayout'
import { HomePage } from './pages/HomePage'
import { DocumentationPage } from './pages/DocumentationPage'
import { APIExplorerPage } from './pages/APIExplorerPage'
import { DashboardPage } from './pages/DashboardPage'
import { WebhooksPage } from './pages/WebhooksPage'
import { SDKsPage } from './pages/SDKsPage'
import { CommunityPage } from './pages/CommunityPage'
import { SupportPage } from './pages/SupportPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { APIKeysPage } from './pages/APIKeysPage'
import { TestingPage } from './pages/TestingPage'
import { MarketplacePage } from './pages/MarketplacePage'

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { DeveloperManagementPage } from './pages/admin/DeveloperManagementPage'
import { APIMonitoringPage } from './pages/admin/APIMonitoringPage'
import { WebhookAdminPage } from './pages/admin/WebhookAdminPage'
import { SDKAdminPage } from './pages/admin/SDKAdminPage'

import { AuthProvider } from './contexts/AuthContext'
import { APIProvider } from './contexts/APIContext'

function App() {
  return (
    <AuthProvider>
      <APIProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="developers" element={<DeveloperManagementPage />} />
            <Route path="api-monitoring" element={<APIMonitoringPage />} />
            <Route path="webhooks" element={<WebhookAdminPage />} />
            <Route path="sdks" element={<SDKAdminPage />} />
          </Route>

          {/* Main Layout Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="docs/*" element={<DocumentationPage />} />
            <Route path="explorer" element={<APIExplorerPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="webhooks" element={<WebhooksPage />} />
            <Route path="sdks" element={<SDKsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="api-keys" element={<APIKeysPage />} />
            <Route path="testing" element={<TestingPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
          </Route>
        </Routes>
      </APIProvider>
    </AuthProvider>
  )
}

export default App
