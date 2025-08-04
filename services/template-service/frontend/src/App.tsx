import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { TemplateDesigner } from './pages/TemplateDesigner';
import { AdvancedTemplateDesigner } from './pages/AdvancedTemplateDesigner';
import { AITemplateStudio } from './pages/AITemplateStudio';
import { TemplateLibrary } from './pages/TemplateLibrary';
import { FormBuilder } from './pages/FormBuilder';
import { TemplateMarketplace } from './pages/TemplateMarketplace';
import { Analytics } from './pages/Analytics';
import { APIManagement } from './pages/APIManagement';
import { WorkflowAutomation } from './pages/WorkflowAutomation';
import { TemplateAdminDashboard } from './pages/TemplateAdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/designer" element={<TemplateDesigner />} />
            <Route path="/advanced-designer" element={<AdvancedTemplateDesigner />} />
            <Route path="/ai-studio" element={<AITemplateStudio />} />
            <Route path="/library" element={<TemplateLibrary />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/marketplace" element={<TemplateMarketplace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/api" element={<APIManagement />} />
            <Route path="/automation" element={<WorkflowAutomation />} />
            <Route path="/admin" element={<TemplateAdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;