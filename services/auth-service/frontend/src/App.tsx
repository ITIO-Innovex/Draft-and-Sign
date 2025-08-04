import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from './components/ui/Toast';
import { AuthLayout } from './components/auth/AuthLayout';
import { AdvancedLoginForm } from './components/auth/AdvancedLoginForm';
import { EnhancedRegisterForm } from './components/auth/EnhancedRegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import { MainShell } from './components/layout/MainShell';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Service Components
import { PDFService } from './components/services/PDFService';
import { DocumentsService } from './components/services/DocumentsService';
import { SignaturesService } from './components/services/SignaturesService';
import { TemplatesService } from './components/services/TemplatesService';

// Pages
import { RoleBasedDashboard } from './components/dashboard/RoleBasedDashboard';
import { ProfilePage } from './pages/ProfilePage';
import { TeamDirectory } from './components/team/TeamDirectory';
import { OrganizationSettings } from './components/organization/OrganizationSettings';
import { PlatformAnalytics } from './components/admin/PlatformAnalytics';
import { AuditLogs } from './components/admin/AuditLogs';
import { ExecutiveDashboard } from './components/admin/ExecutiveDashboard';
import { BillingManagement } from './components/admin/BillingManagement';
import { SecurityMonitoring } from './components/admin/SecurityMonitoring';
import { NotificationManagement } from './components/admin/NotificationManagement';
import { ReportBuilder } from './components/admin/ReportBuilder';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Phase 1E - Advanced Security Components
import { AuthenticationMethodSelector } from './components/auth/AuthenticationMethodSelector';
import { ThreatDetectionCenter } from './components/security/ThreatDetectionCenter';
import { AdvancedSessionManager } from './components/security/AdvancedSessionManager';
import { ComplianceCenter } from './components/security/ComplianceCenter';
import { VideoVerificationPortal } from './components/auth/VideoVerificationPortal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <AuthLayout title="Sign In" subtitle="Welcome back! Please sign in to your account.">
              <AdvancedLoginForm />
            </AuthLayout>
          } />
          
          <Route path="/register" element={
            <AuthLayout title="Create Account" subtitle="Join thousands of users who trust DraftnSign for their document needs.">
              <EnhancedRegisterForm />
            </AuthLayout>
          } />
          
          <Route path="/forgot-password" element={
            <AuthLayout title="Reset Password">
              <ForgotPasswordForm />
            </AuthLayout>
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainShell />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<RoleBasedDashboard />} />
            </Route>
            
            {/* Main Application Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/team" element={<TeamDirectory />} />
            <Route path="/organization" element={<OrganizationSettings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/platform-analytics" element={<PlatformAnalytics />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/executive-dashboard" element={<ExecutiveDashboard />} />
            <Route path="/billing-management" element={<BillingManagement />} />
            <Route path="/security-monitoring" element={<SecurityMonitoring />} />
            <Route path="/notification-management" element={<NotificationManagement />} />
            <Route path="/report-builder" element={<ReportBuilder />} />
            
            {/* Phase 1E - Advanced Security Routes */}
            <Route path="/advanced-auth" element={
              <div className="max-w-6xl mx-auto">
                <AuthenticationMethodSelector 
                  onMethodSelect={(method) => console.log('Selected method:', method)}
                  onClose={() => {}}
                />
              </div>
            } />
            <Route path="/threat-detection" element={<ThreatDetectionCenter />} />
            <Route path="/session-management" element={<AdvancedSessionManager />} />
            <Route path="/compliance-center" element={<ComplianceCenter />} />
            <Route path="/video-verification" element={
              <div className="max-w-4xl mx-auto">
                <VideoVerificationPortal
                  onSuccess={(data) => console.log('Verification success:', data)}
                  onError={(error) => console.error('Verification error:', error)}
                  onCancel={() => console.log('Verification cancelled')}
                />
              </div>
            } />
            
            {/* Placeholder routes for navigation */}
            <Route path="/analytics" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Team Analytics</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
            <Route path="/api-keys" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">API Keys</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
            <Route path="/platform-admin" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">Platform Admin</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />
            <Route path="/all-organizations" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900">All Organizations</h2><p className="text-gray-600 mt-2">Coming soon...</p></div>} />

            {/* Service Routes */}
            <Route path="/pdf-tools" element={<PDFService />} />
            <Route path="/documents" element={<DocumentsService />} />
            <Route path="/signatures" element={<SignaturesService />} />
            <Route path="/templates" element={<TemplatesService />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;