import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { ComplianceAdminDashboard } from './ComplianceAdminDashboard';
import { RegulationManager } from './RegulationManager';
import { AuditAdministrator } from './AuditAdministrator';
import { RiskAdministrator } from './RiskAdministrator';
import { BusinessIntelligenceManager } from './BusinessIntelligenceManager';
import { PrivacyAdministrator } from './PrivacyAdministrator';
import { SecurityAdministrator } from './SecurityAdministrator';
import { ReportingAdministrator } from './ReportingAdministrator';

type AdminView = 
  | 'admin-dashboard'
  | 'regulation-manager'
  | 'audit-administrator'
  | 'risk-administrator'
  | 'bi-manager'
  | 'privacy-administrator'
  | 'security-administrator'
  | 'reporting-administrator'
  | 'user-management'
  | 'system-settings';

export const AdminApp: React.FC = () => {
  const [activeView, setActiveView] = useState<AdminView>('admin-dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeView) {
      case 'admin-dashboard':
        return <ComplianceAdminDashboard />;
      case 'regulation-manager':
        return <RegulationManager />;
      case 'audit-administrator':
        return <AuditAdministrator />;
      case 'risk-administrator':
        return <RiskAdministrator />;
      case 'bi-manager':
        return <BusinessIntelligenceManager />;
      case 'privacy-administrator':
        return <PrivacyAdministrator />;
      case 'security-administrator':
        return <SecurityAdministrator />;
      case 'reporting-administrator':
        return <ReportingAdministrator />;
      case 'user-management':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">User Management - Admin interface for user oversight</p>
          </div>
        );
      case 'system-settings':
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">System Settings - Admin configuration interface</p>
          </div>
        );
      default:
        return <ComplianceAdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};