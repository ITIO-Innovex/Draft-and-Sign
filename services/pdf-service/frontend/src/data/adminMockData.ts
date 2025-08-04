export const mockPDFToolsAdminData = {
  overview: {
    dailyOperations: 15670,
    totalProcessed: 2456789,
    averageProcessingTime: "24 seconds",
    successRate: 98.7,
    activeUsers: 3421,
    systemHealth: 99.2,
    storageUsed: "156 GB",
    errorRate: 1.3
  },
  popularTools: [
    {
      tool: "PDF to Word",
      usage: 2341,
      percentage: 14.9,
      avgTime: "18 seconds",
      successRate: 97.2
    },
    {
      tool: "Compress PDF",
      usage: 1987,
      percentage: 12.7,
      avgTime: "12 seconds",
      successRate: 99.1
    },
    {
      tool: "Merge PDFs",
      usage: 1654,
      percentage: 10.6,
      avgTime: "8 seconds",
      successRate: 98.9
    },
    {
      tool: "PDF to Excel",
      usage: 1432,
      percentage: 9.1,
      avgTime: "22 seconds",
      successRate: 96.8
    },
    {
      tool: "OCR Processing",
      usage: 1287,
      percentage: 8.2,
      avgTime: "45 seconds",
      successRate: 95.4
    }
  ],
  recentActivity: [
    {
      user: "john@example.com",
      tool: "PDF to Excel",
      file: "financial_report.pdf",
      status: "completed",
      processingTime: "15 seconds",
      timestamp: "2024-07-01T14:30:00Z"
    },
    {
      user: "jane@company.com",
      tool: "OCR Processing",
      file: "scanned_contract.pdf",
      status: "processing",
      timestamp: "2024-07-01T14:28:00Z"
    },
    {
      user: "mike@startup.io",
      tool: "Compress PDF",
      file: "presentation.pdf",
      status: "completed",
      processingTime: "8 seconds",
      timestamp: "2024-07-01T14:25:00Z"
    },
    {
      user: "sarah@agency.com",
      tool: "PDF to Word",
      file: "proposal.pdf",
      status: "failed",
      timestamp: "2024-07-01T14:22:00Z"
    },
    {
      user: "alex@corp.com",
      tool: "Merge PDFs",
      file: "documents.pdf",
      status: "completed",
      processingTime: "12 seconds",
      timestamp: "2024-07-01T14:20:00Z"
    }
  ],
  alerts: [
    {
      type: "performance",
      message: "OCR processing queue experiencing delays",
      severity: "medium",
      details: "Average wait time: 45 seconds"
    },
    {
      type: "storage",
      message: "Temporary file cleanup needed",
      severity: "low",
      details: "156 GB of temporary files pending cleanup"
    },
    {
      type: "security",
      message: "Unusual activity detected",
      severity: "high",
      details: "Multiple failed login attempts from IP 192.168.1.100"
    }
  ]
};

export const mockToolPerformance = {
  processingMetrics: {
    conversionTools: {
      avgProcessingTime: "22 seconds",
      successRate: 97.8,
      dailyUsage: 8945,
      errorRate: 2.2
    },
    editingTools: {
      avgProcessingTime: "15 seconds",
      successRate: 98.9,
      dailyUsage: 3456,
      errorRate: 1.1
    },
    compressionTools: {
      avgProcessingTime: "18 seconds",
      successRate: 99.2,
      dailyUsage: 2187,
      errorRate: 0.8
    },
    securityTools: {
      avgProcessingTime: "12 seconds",
      successRate: 99.5,
      dailyUsage: 1876,
      errorRate: 0.5
    },
    ocrTools: {
      avgProcessingTime: "45 seconds",
      successRate: 95.4,
      dailyUsage: 1234,
      errorRate: 4.6
    }
  },
  resourceUtilization: {
    cpuUsage: 67.3,
    memoryUsage: 78.9,
    storageUsage: 45.2,
    networkBandwidth: 34.6
  },
  qualityMetrics: {
    conversionAccuracy: 96.8,
    layoutPreservation: 94.2,
    textRecognitionAccuracy: 97.4,
    compressionEfficiency: 87.3
  }
};

export const mockToolUsageData = {
  summary: {
    totalOperations: 15670,
    activeTools: 52,
    avgSuccessRate: 97.8,
    avgProcessingTime: "24 seconds"
  },
  tools: [
    {
      id: "pdf_to_word",
      name: "PDF to Word",
      description: "Convert PDF to editable Word documents",
      category: "conversion",
      usage: 2341,
      uniqueUsers: 1456,
      successRate: 97.2,
      avgProcessingTime: 18,
      errorCount: 67,
      errorRate: 2.8
    },
    {
      id: "compress_pdf",
      name: "Compress PDF",
      description: "Reduce PDF file size while maintaining quality",
      category: "optimization",
      usage: 1987,
      uniqueUsers: 1234,
      successRate: 99.1,
      avgProcessingTime: 12,
      errorCount: 18,
      errorRate: 0.9
    },
    {
      id: "merge_pdfs",
      name: "Merge PDFs",
      description: "Combine multiple PDFs into one document",
      category: "pages",
      usage: 1654,
      uniqueUsers: 987,
      successRate: 98.9,
      avgProcessingTime: 8,
      errorCount: 18,
      errorRate: 1.1
    },
    {
      id: "pdf_to_excel",
      name: "PDF to Excel",
      description: "Convert PDF tables to Excel spreadsheets",
      category: "conversion",
      usage: 1432,
      uniqueUsers: 876,
      successRate: 96.8,
      avgProcessingTime: 22,
      errorCount: 46,
      errorRate: 3.2
    },
    {
      id: "ocr_processing",
      name: "OCR Processing",
      description: "Extract text from scanned documents",
      category: "ocr",
      usage: 1287,
      uniqueUsers: 654,
      successRate: 95.4,
      avgProcessingTime: 45,
      errorCount: 59,
      errorRate: 4.6
    },
    {
      id: "add_password",
      name: "Add Password",
      description: "Protect PDFs with password encryption",
      category: "security",
      usage: 1156,
      uniqueUsers: 723,
      successRate: 99.5,
      avgProcessingTime: 5,
      errorCount: 6,
      errorRate: 0.5
    },
    {
      id: "edit_text",
      name: "Edit PDF Text",
      description: "Edit text directly in PDF documents",
      category: "editing",
      usage: 1089,
      uniqueUsers: 567,
      successRate: 98.2,
      avgProcessingTime: 15,
      errorCount: 20,
      errorRate: 1.8
    },
    {
      id: "split_pdf",
      name: "Split PDF",
      description: "Split PDF into multiple documents",
      category: "pages",
      usage: 987,
      uniqueUsers: 456,
      successRate: 99.0,
      avgProcessingTime: 6,
      errorCount: 10,
      errorRate: 1.0
    }
  ]
};

export const mockProcessingQueueData = {
  summary: {
    totalJobs: 1247,
    processing: 23,
    pending: 156,
    completed: 1045,
    failed: 23,
    storageUsed: "156 GB"
  },
  jobs: [
    {
      id: "job_001",
      fileName: "financial_report_2024.pdf",
      fileSize: "2.4 MB",
      user: "john@example.com",
      tool: "PDF to Excel",
      status: "processing",
      priority: "high",
      progress: 67,
      startedAt: "2024-07-01T14:30:00Z",
      estimatedCompletion: "2024-07-01T14:32:00Z"
    },
    {
      id: "job_002",
      fileName: "contract_draft.pdf",
      fileSize: "1.8 MB",
      user: "jane@company.com",
      tool: "OCR Processing",
      status: "pending",
      priority: "medium",
      progress: 0,
      startedAt: "2024-07-01T14:28:00Z",
      estimatedCompletion: "2024-07-01T14:35:00Z"
    },
    {
      id: "job_003",
      fileName: "presentation.pdf",
      fileSize: "15.6 MB",
      user: "mike@startup.io",
      tool: "Compress PDF",
      status: "completed",
      priority: "low",
      progress: 100,
      startedAt: "2024-07-01T14:25:00Z",
      completedAt: "2024-07-01T14:26:00Z"
    },
    {
      id: "job_004",
      fileName: "proposal.pdf",
      fileSize: "3.2 MB",
      user: "sarah@agency.com",
      tool: "PDF to Word",
      status: "failed",
      priority: "medium",
      progress: 45,
      startedAt: "2024-07-01T14:22:00Z",
      error: "Conversion failed: Unsupported font encoding"
    },
    {
      id: "job_005",
      fileName: "documents_merged.pdf",
      fileSize: "8.9 MB",
      user: "alex@corp.com",
      tool: "Merge PDFs",
      status: "completed",
      priority: "high",
      progress: 100,
      startedAt: "2024-07-01T14:20:00Z",
      completedAt: "2024-07-01T14:21:00Z"
    },
    {
      id: "job_006",
      fileName: "scanned_invoice.pdf",
      fileSize: "4.1 MB",
      user: "lisa@business.com",
      tool: "OCR Processing",
      status: "processing",
      priority: "medium",
      progress: 23,
      startedAt: "2024-07-01T14:18:00Z",
      estimatedCompletion: "2024-07-01T14:25:00Z"
    },
    {
      id: "job_007",
      fileName: "secure_document.pdf",
      fileSize: "1.2 MB",
      user: "tom@legal.com",
      tool: "Add Password",
      status: "pending",
      priority: "high",
      progress: 0,
      startedAt: "2024-07-01T14:15:00Z",
      estimatedCompletion: "2024-07-01T14:16:00Z"
    },
    {
      id: "job_008",
      fileName: "annual_report.pdf",
      fileSize: "25.3 MB",
      user: "emma@enterprise.com",
      tool: "Compress PDF",
      status: "paused",
      priority: "low",
      progress: 12,
      startedAt: "2024-07-01T14:10:00Z",
      pausedAt: "2024-07-01T14:12:00Z"
    }
  ]
};