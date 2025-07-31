import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ComplianceOverview } from './components/ComplianceOverview';
import { AuditTrail } from './components/AuditTrail';
import { RiskManagement } from './components/RiskManagement';
import { Analytics } from './components/Analytics';
import { Reporting } from './components/Reporting';
import { Training } from './components/Training';
import { Settings } from './components/Settings';
import { DataPrivacy } from './components/DataPrivacy';
import { RegulatoryIntelligence } from './components/RegulatoryIntelligence';
import { ComplianceAssessment } from './components/ComplianceAssessment';
import { EvidenceManagement } from './components/EvidenceManagement';
import { GRCIntegrations } from './components/GRCIntegrations';
import { AdminApp } from './components/admin/AdminApp';

type ActiveView = 
  | 'dashboard' 
  | 'compliance' 
  | 'audit' 
  | 'risk' 
  | 'analytics' 
  | 'reporting' 
  | 'training' 
  | 'settings'
  | 'data-privacy'
  | 'regulatory-intelligence'
  | 'compliance-assessment'
  | 'evidence-management'
  | 'grc-integrations'
  | 'admin';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Admin mode check
  if (activeView === 'admin') {
    return <AdminApp />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'compliance':
        return <ComplianceOverview />;
      case 'audit':
        return <AuditTrail />;
      case 'risk':
        return <RiskManagement />;
      case 'analytics':
        return <Analytics />;
      case 'reporting':
        return <Reporting />;
      case 'training':
        return <Training />;
      case 'settings':
        return <Settings />;
      case 'data-privacy':
        return <DataPrivacy />;
      case 'regulatory-intelligence':
        return <RegulatoryIntelligence />;
      case 'compliance-assessment':
        return <ComplianceAssessment />;
      case 'evidence-management':
        return <EvidenceManagement />;
      case 'grc-integrations':
        return <GRCIntegrations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
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
}

export default App;