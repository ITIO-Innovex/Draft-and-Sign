import React, { useState } from 'react';
import { Archive, FileText, Download, Upload, Search, Filter, Eye, Lock, Calendar, Tag } from 'lucide-react';

export const EvidenceManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const evidenceItems = [
    {
      id: 1,
      title: 'GDPR Data Processing Agreement',
      category: 'Legal Documents',
      regulation: 'GDPR',
      type: 'Contract',
      uploadDate: '2024-01-15',
      expiryDate: '2025-01-15',
      size: '2.4 MB',
      format: 'PDF',
      status: 'active',
      confidentiality: 'confidential',
      tags: ['data-processing', 'vendor-agreement', 'gdpr'],
      uploader: 'Sarah Johnson',
      description: 'Data processing agreement with third-party vendor for EU customer data',
      version: '2.1',
      retentionPeriod: '7 years'
    },
    {
      id: 2,
      title: 'HIPAA Risk Assessment Report',
      category: 'Assessment Reports',
      regulation: 'HIPAA',
      type: 'Report',
      uploadDate: '2024-01-12',
      expiryDate: '2024-07-12',
      size: '5.8 MB',
      format: 'PDF',
      status: 'active',
      confidentiality: 'restricted',
      tags: ['risk-assessment', 'hipaa', 'healthcare'],
      uploader: 'Michael Chen',
      description: 'Comprehensive HIPAA security risk assessment for healthcare systems',
      version: '1.0',
      retentionPeriod: '6 years'
    },
    {
      id: 3,
      title: 'PCI DSS Vulnerability Scan Results',
      category: 'Technical Evidence',
      regulation: 'PCI DSS',
      type: 'Scan Report',
      uploadDate: '2024-01-10',
      expiryDate: '2024-04-10',
      size: '1.2 MB',
      format: 'PDF',
      status: 'active',
      confidentiality: 'internal',
      tags: ['vulnerability-scan', 'pci-dss', 'security'],
      uploader: 'David Rodriguez',
      description: 'Quarterly vulnerability scan results for cardholder data environment',
      version: '1.0',
      retentionPeriod: '3 years'
    },
    {
      id: 4,
      title: 'SOX Internal Controls Documentation',
      category: 'Control Documentation',
      regulation: 'SOX',
      type: 'Documentation',
      uploadDate: '2024-01-08',
      expiryDate: '2024-12-31',
      size: '8.7 MB',
      format: 'DOCX',
      status: 'active',
      confidentiality: 'confidential',
      tags: ['internal-controls', 'sox', 'financial'],
      uploader: 'Emily Watson',
      description: 'Comprehensive documentation of financial reporting internal controls',
      version: '3.2',
      retentionPeriod: '7 years'
    },
    {
      id: 5,
      title: 'ISO 27001 Certification',
      category: 'Certifications',
      regulation: 'ISO 27001',
      type: 'Certificate',
      uploadDate: '2023-12-20',
      expiryDate: '2026-12-20',
      size: '0.8 MB',
      format: 'PDF',
      status: 'active',
      confidentiality: 'public',
      tags: ['certification', 'iso-27001', 'security'],
      uploader: 'James Liu',
      description: 'ISO 27001 information security management certification',
      version: '1.0',
      retentionPeriod: 'Permanent'
    },
    {
      id: 6,
      title: 'Employee Training Records',
      category: 'Training Records',
      regulation: 'Multiple',
      type: 'Records',
      uploadDate: '2024-01-05',
      expiryDate: '2025-01-05',
      size: '3.1 MB',
      format: 'XLSX',
      status: 'active',
      confidentiality: 'internal',
      tags: ['training', 'compliance', 'employees'],
      uploader: 'Lisa Park',
      description: 'Comprehensive compliance training completion records for all employees',
      version: '1.5',
      retentionPeriod: '5 years'
    }
  ];

  const evidenceCategories = [
    { name: 'Legal Documents', count: 45, icon: FileText },
    { name: 'Assessment Reports', count: 23, icon: Archive },
    { name: 'Technical Evidence', count: 67, icon: Lock },
    { name: 'Control Documentation', count: 34, icon: FileText },
    { name: 'Certifications', count: 12, icon: Archive },
    { name: 'Training Records', count: 89, icon: FileText }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent-100 text-accent-700';
      case 'expired':
        return 'bg-error-100 text-error-700';
      case 'expiring-soon':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getConfidentialityColor = (confidentiality: string) => {
    switch (confidentiality) {
      case 'public':
        return 'bg-accent-100 text-accent-700';
      case 'internal':
        return 'bg-secondary-100 text-secondary-700';
      case 'confidential':
        return 'bg-warning-100 text-warning-700';
      case 'restricted':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredEvidence = evidenceItems.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Evidence Management</h1>
          <p className="text-gray-500 mt-1">Centralized repository for compliance evidence and documentation</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search evidence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <Upload className="h-4 w-4" />
            <span>Upload Evidence</span>
          </button>
        </div>
      </div>

      {/* Evidence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Archive className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">270</p>
              <p className="text-sm text-gray-600">Total Evidence Items</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <FileText className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">245</p>
              <p className="text-sm text-gray-600">Active Documents</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Calendar className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Expiring Soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Lock className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">98.5%</p>
              <p className="text-sm text-gray-600">Compliance Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Evidence Categories</h3>
          <p className="text-sm text-gray-500 mt-1">Browse evidence by category type</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-lg border transition-colors duration-200 ${
                selectedCategory === 'all' 
                  ? 'border-primary-500 bg-primary-50 text-primary-700' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Archive className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm font-medium">All Categories</p>
              <p className="text-xs text-gray-500">{evidenceItems.length} items</p>
            </button>
            
            {evidenceCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-lg border transition-colors duration-200 ${
                  selectedCategory === category.name 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <category.icon className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">{category.name}</p>
                <p className="text-xs text-gray-500">{category.count} items</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Evidence List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Evidence Repository</h3>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">{filteredEvidence.length} items</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredEvidence.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidentialityColor(item.confidentiality)}`}>
                      {item.confidentiality}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        <Tag className="h-3 w-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right ml-6">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                    {item.regulation}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{item.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Type</p>
                  <p className="font-medium text-gray-900">{item.type}</p>
                </div>
                <div>
                  <p className="text-gray-500">Upload Date</p>
                  <p className="font-medium text-gray-900">{item.uploadDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Expiry Date</p>
                  <p className="font-medium text-gray-900">{item.expiryDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">Size</p>
                  <p className="font-medium text-gray-900">{item.size}</p>
                </div>
                <div>
                  <p className="text-gray-500">Format</p>
                  <p className="font-medium text-gray-900">{item.format}</p>
                </div>
                <div>
                  <p className="text-gray-500">Version</p>
                  <p className="font-medium text-gray-900">{item.version}</p>
                </div>
                <div>
                  <p className="text-gray-500">Retention</p>
                  <p className="font-medium text-gray-900">{item.retentionPeriod}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Uploaded by {item.uploader}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};