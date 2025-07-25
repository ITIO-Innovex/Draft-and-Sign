import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, Clock, Users, CheckCircle, Play, FileText } from 'lucide-react';

export const Training: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const trainingModules = [
    {
      id: 1,
      title: 'GDPR Fundamentals',
      category: 'Data Privacy',
      regulation: 'GDPR',
      duration: '45 min',
      difficulty: 'Beginner',
      completionRate: 87,
      enrolled: 156,
      completed: 135,
      description: 'Learn the fundamentals of GDPR compliance including data rights, lawful basis, and privacy by design.',
      modules: 6,
      certification: true,
      mandatory: true,
      dueDate: '2024-02-15'
    },
    {
      id: 2,
      title: 'HIPAA Privacy and Security',
      category: 'Healthcare',
      regulation: 'HIPAA',
      duration: '60 min',
      difficulty: 'Intermediate',
      completionRate: 73,
      enrolled: 89,
      completed: 65,
      description: 'Comprehensive training on HIPAA privacy rules, security requirements, and PHI protection.',
      modules: 8,
      certification: true,
      mandatory: true,
      dueDate: '2024-02-20'
    },
    {
      id: 3,
      title: 'PCI DSS Security Standards',
      category: 'Payment Security',
      regulation: 'PCI DSS',
      duration: '90 min',
      difficulty: 'Advanced',
      completionRate: 91,
      enrolled: 42,
      completed: 38,
      description: 'Advanced training on PCI DSS requirements, secure payment processing, and compliance maintenance.',
      modules: 12,
      certification: true,
      mandatory: false,
      dueDate: '2024-03-01'
    },
    {
      id: 4,
      title: 'SOX Controls and Documentation',
      category: 'Financial',
      regulation: 'SOX',
      duration: '120 min',
      difficulty: 'Advanced',
      completionRate: 95,
      enrolled: 28,
      completed: 27,
      description: 'In-depth training on Sarbanes-Oxley internal controls, documentation, and audit requirements.',
      modules: 10,
      certification: true,
      mandatory: true,
      dueDate: '2024-02-28'
    },
    {
      id: 5,
      title: 'CCPA Consumer Rights',
      category: 'Data Privacy',
      regulation: 'CCPA',
      duration: '30 min',
      difficulty: 'Beginner',
      completionRate: 82,
      enrolled: 234,
      completed: 192,
      description: 'Understanding CCPA consumer rights, data disclosures, and privacy policy requirements.',
      modules: 4,
      certification: false,
      mandatory: false,
      dueDate: '2024-03-15'
    },
    {
      id: 6,
      title: 'ISO 27001 Information Security',
      category: 'Security',
      regulation: 'ISO 27001',
      duration: '75 min',
      difficulty: 'Intermediate',
      completionRate: 68,
      enrolled: 67,
      completed: 46,
      description: 'Comprehensive overview of ISO 27001 information security management systems and controls.',
      modules: 9,
      certification: true,
      mandatory: false,
      dueDate: '2024-04-01'
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'GDPR Compliance Specialist',
      issueDate: '2024-01-10',
      expiryDate: '2025-01-10',
      status: 'active',
      holder: 'Sarah Johnson'
    },
    {
      id: 2,
      name: 'HIPAA Privacy Officer',
      issueDate: '2023-12-15',
      expiryDate: '2024-12-15',
      status: 'expiring-soon',
      holder: 'Michael Chen'
    },
    {
      id: 3,
      name: 'PCI DSS Security Expert',
      issueDate: '2024-01-05',
      expiryDate: '2025-01-05',
      status: 'active',
      holder: 'David Rodriguez'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-accent-100 text-accent-700';
      case 'Intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'Advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCertificationStatus = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent-100 text-accent-700';
      case 'expiring-soon':
        return 'bg-warning-100 text-warning-700';
      case 'expired':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredModules = trainingModules.filter(module => 
    selectedCategory === 'all' || module.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Training</h1>
          <p className="text-gray-500 mt-1">Manage compliance training programs and certifications</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Data Privacy">Data Privacy</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Payment Security">Payment Security</option>
            <option value="Financial">Financial</option>
            <option value="Security">Security</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
            <BookOpen className="h-4 w-4" />
            <span>Create Training</span>
          </button>
        </div>
      </div>

      {/* Training Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89.2%</p>
              <p className="text-sm text-gray-600">Avg Completion Rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary-100 rounded-lg">
              <Users className="h-6 w-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">616</p>
              <p className="text-sm text-gray-600">Total Enrollments</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent-100 rounded-lg">
              <Award className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Active Certifications</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-gray-600">Due This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Training Modules</h3>
          <p className="text-sm text-gray-500 mt-1">Available compliance training courses and modules</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{module.title}</h4>
                      {module.mandatory && (
                        <span className="px-2 py-1 bg-error-100 text-error-700 rounded-full text-xs font-medium">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{module.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-primary-600 font-medium">{module.regulation}</span>
                      <span className="text-gray-500">{module.modules} modules</span>
                      <span className="text-gray-500">{module.duration}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="text-sm font-medium text-gray-900">{module.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${module.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Enrolled</p>
                    <p className="font-medium text-gray-900">{module.enrolled} users</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Completed</p>
                    <p className="font-medium text-gray-900">{module.completed} users</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {module.certification && (
                      <div className="flex items-center space-x-1 text-accent-600">
                        <Award className="h-4 w-4" />
                        <span className="text-xs">Certification</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">Due: {module.dueDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                      <FileText className="h-4 w-4" />
                      <span>Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors duration-200">
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Certifications</h3>
          <p className="text-sm text-gray-500 mt-1">Current compliance certifications and their status</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-accent-100 rounded-lg">
                    <Award className="h-6 w-6 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                    <p className="text-sm text-gray-600">Issued to: {cert.holder}</p>
                    <p className="text-xs text-gray-500">Valid: {cert.issueDate} - {cert.expiryDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCertificationStatus(cert.status)}`}>
                    {cert.status.replace('-', ' ')}
                  </span>
                  <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200">
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};