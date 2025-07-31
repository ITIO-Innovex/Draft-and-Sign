import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ToolsGrid } from './components/ToolsGrid';
import { PDFViewer } from './components/PDFViewer';
import { PDFEditor } from './components/PDFEditor';
import { BatchProcessor } from './components/BatchProcessor';
import { Analytics } from './components/Analytics';
import { WorkflowDesigner } from './components/WorkflowDesigner';
import { QualityAnalyzer } from './components/QualityAnalyzer';
import { CloudConnector } from './components/CloudConnector';
import { HelpSystem } from './components/HelpSystem';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToolUsageMonitor } from './components/admin/ToolUsageMonitor';
import { FileProcessingManager } from './components/admin/FileProcessingManager';
import { mockPDFTools, mockProcessingStats } from './data/mockData';
import { PDFTool, ProcessingStats } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<PDFTool | null>(null);
  const [currentView, setCurrentView] = useState<'tools' | 'viewer' | 'editor' | 'batch' | 'analytics' | 'workflows' | 'quality' | 'cloud' | 'help' | 'admin'>('tools');
  const [adminView, setAdminView] = useState<'dashboard' | 'tools' | 'processing'>('dashboard');
  const [processingStats, setProcessingStats] = useState<ProcessingStats>(mockProcessingStats);
  const [favoriteTools, setFavoriteTools] = useState<Set<string>>(new Set());
  const [recentTools, setRecentTools] = useState<PDFTool[]>([]);

  const categories = [
    { id: 'all', name: 'All Tools', count: Object.values(mockPDFTools).reduce((sum, cat) => sum + cat.tools.length, 0) },
    { id: 'conversion', name: 'Conversion', count: mockPDFTools.conversion.tools.length },
    { id: 'editing', name: 'Editing', count: mockPDFTools.editing.tools.length },
    { id: 'pages', name: 'Page Management', count: mockPDFTools.pages.tools.length },
    { id: 'security', name: 'Security', count: mockPDFTools.security.tools.length },
    { id: 'optimization', name: 'Optimization', count: mockPDFTools.optimization.tools.length },
    { id: 'ocr', name: 'OCR & Text', count: mockPDFTools.ocr.tools.length },
    { id: 'forms', name: 'Forms', count: mockPDFTools.forms.tools.length },
    { id: 'utilities', name: 'Utilities', count: mockPDFTools.utilities.tools.length }
  ];

  const getFilteredTools = () => {
    let allTools: PDFTool[] = [];
    
    if (selectedCategory === 'all') {
      allTools = Object.values(mockPDFTools).flatMap(category => category.tools);
    } else {
      allTools = mockPDFTools[selectedCategory as keyof typeof mockPDFTools]?.tools || [];
    }

    if (searchQuery.trim()) {
      return allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return allTools;
  };

  const handleToolSelect = (tool: PDFTool) => {
    setSelectedTool(tool);
    setCurrentView('viewer');
    
    // Add to recent tools
    setRecentTools(prev => {
      const filtered = prev.filter(t => t.id !== tool.id);
      return [tool, ...filtered].slice(0, 5);
    });
  };

  const toggleFavorite = (toolId: string) => {
    setFavoriteTools(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(toolId)) {
        newFavorites.delete(toolId);
      } else {
        newFavorites.add(toolId);
      }
      return newFavorites;
    });
  };

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setProcessingStats(prev => ({
        ...prev,
        dailyUsage: {
          ...prev.dailyUsage,
          totalOperations: prev.dailyUsage.totalOperations + Math.floor(Math.random() * 5)
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'viewer':
        return <PDFViewer selectedTool={selectedTool} onBack={() => setCurrentView('tools')} />;
      case 'editor':
        return <PDFEditor onBack={() => setCurrentView('tools')} />;
      case 'batch':
        return <BatchProcessor onBack={() => setCurrentView('tools')} />;
      case 'analytics':
        return <Analytics stats={processingStats} onBack={() => setCurrentView('tools')} />;
      case 'workflows':
        return <WorkflowDesigner onBack={() => setCurrentView('tools')} />;
      case 'quality':
        return <QualityAnalyzer onBack={() => setCurrentView('tools')} />;
      case 'cloud':
        return <CloudConnector onBack={() => setCurrentView('tools')} />;
      case 'help':
        return <HelpSystem onBack={() => setCurrentView('tools')} />;
      case 'admin':
        return renderAdminView();
      default:
        return (
          <ToolsGrid
            tools={getFilteredTools()}
            onToolSelect={handleToolSelect}
            favoriteTools={favoriteTools}
            onToggleFavorite={toggleFavorite}
            recentTools={recentTools}
            searchQuery={searchQuery}
          />
        );
    }
  };

  const renderAdminView = () => {
    switch (adminView) {
      case 'tools':
        return <ToolUsageMonitor onBack={() => setAdminView('dashboard')} />;
      case 'processing':
        return <FileProcessingManager onBack={() => setAdminView('dashboard')} />;
      default:
        return (
          <div className="space-y-6">
            <AdminDashboard onBack={() => setCurrentView('tools')} />
            
            {/* Admin Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => setAdminView('tools')}
                className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Tool Usage Monitor</h3>
                </div>
                <p className="text-gray-600">Track and analyze PDF tool performance and usage patterns</p>
              </button>

              <button
                onClick={() => setAdminView('processing')}
                className="bg-white rounded-xl border border-gray-200 p-6 text-left hover:shadow-lg hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">File Processing Manager</h3>
                </div>
                <p className="text-gray-600">Monitor and manage PDF processing queue and operations</p>
              </button>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Security & Compliance</h3>
                </div>
                <p className="text-gray-600">PDF security monitoring and compliance management</p>
                <div className="mt-3">
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentView={currentView}
        onViewChange={setCurrentView}
        stats={processingStats}
      />
      
      <div className="flex">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          recentTools={recentTools}
          favoriteTools={favoriteTools}
          onToolSelect={handleToolSelect}
          currentView={currentView}
        />
        
        <main className="flex-1 p-6">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;