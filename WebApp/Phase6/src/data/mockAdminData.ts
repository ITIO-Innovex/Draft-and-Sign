export const mockAPIAdminData = {
  overview: {
    totalDevelopers: 3421,
    activeDevelopers: 2456,
    dailyAPICalls: 145670,
    totalAPIKeys: 5678,
    systemUptime: 99.8,
    averageResponseTime: "145ms",
    successRate: 99.2,
    errorRate: 0.8
  },
  recentActivity: [
    {
      developer: "dev@startup.com",
      action: "api_key_created",
      project: "HR Integration",
      timestamp: "2024-07-01T14:30:00Z"
    },
    {
      developer: "engineer@company.com",
      action: "webhook_configured",
      endpoint: "/api/envelopes/completed",
      timestamp: "2024-07-01T14:25:00Z"
    },
    {
      developer: "tech@enterprise.com",
      action: "plan_upgraded",
      fromPlan: "Professional",
      toPlan: "Enterprise",
      timestamp: "2024-07-01T14:20:00Z"
    },
    {
      developer: "api@company.com",
      action: "api_key_created",
      project: "Document Workflow",
      timestamp: "2024-07-01T14:15:00Z"
    },
    {
      developer: "dev@agency.com",
      action: "webhook_configured",
      endpoint: "/api/documents/uploaded",
      timestamp: "2024-07-01T14:10:00Z"
    }
  ],
  alerts: [
    {
      type: "rate_limit",
      message: "Developer approaching API rate limit",
      severity: "medium",
      details: "dev@startup.com at 89% of daily quota"
    },
    {
      type: "webhook",
      message: "High webhook failure rate detected",
      severity: "high",
      details: "15% failure rate for envelope completion events"
    },
    {
      type: "performance",
      message: "API response time degraded",
      severity: "medium",
      details: "Average response time increased by 25% in last hour"
    }
  ]
}

export const mockDeveloperAnalytics = {
  developerMetrics: {
    totalRegistrations: 3421,
    activeThisMonth: 2456,
    newRegistrationsToday: 23,
    conversionRate: 67.3,
    averageOnboardingTime: "2.3 days",
    supportTicketVolume: 45,
    communityEngagement: 78.9,
    retentionRate: 84.2
  },
  apiUsage: {
    topEndpoints: [
      {endpoint: "/api/envelopes", calls: 45673, avgLatency: "123ms"},
      {endpoint: "/api/documents", calls: 34521, avgLatency: "89ms"},
      {endpoint: "/api/templates", calls: 23456, avgLatency: "156ms"},
      {endpoint: "/api/users", calls: 18765, avgLatency: "67ms"},
      {endpoint: "/api/webhooks", calls: 12345, avgLatency: "234ms"}
    ],
    planDistribution: {
      free: 2341,
      starter: 687,
      professional: 324,
      enterprise: 69
    },
    topIntegrations: [
      {name: "Salesforce CRM", developers: 456, usage: "high"},
      {name: "Microsoft Teams", developers: 234, usage: "medium"},
      {name: "Slack Workflow", developers: 189, usage: "high"},
      {name: "Google Drive", developers: 167, usage: "medium"},
      {name: "HubSpot", developers: 145, usage: "high"}
    ],
    dailyTrends: [
      { date: "2024-06-24", calls: 12340 },
      { date: "2024-06-25", calls: 14560 },
      { date: "2024-06-26", calls: 16780 },
      { date: "2024-06-27", calls: 13450 },
      { date: "2024-06-28", calls: 15670 },
      { date: "2024-06-29", calls: 17890 },
      { date: "2024-06-30", calls: 18900 },
      { date: "2024-07-01", calls: 19230 }
    ]
  },
  growth: [
    { month: "Jan", totalDevelopers: 2100, activeDevelopers: 1680 },
    { month: "Feb", totalDevelopers: 2340, activeDevelopers: 1872 },
    { month: "Mar", totalDevelopers: 2580, activeDevelopers: 2064 },
    { month: "Apr", totalDevelopers: 2820, activeDevelopers: 2256 },
    { month: "May", totalDevelopers: 3060, activeDevelopers: 2448 },
    { month: "Jun", totalDevelopers: 3300, activeDevelopers: 2640 },
    { month: "Jul", totalDevelopers: 3421, activeDevelopers: 2737 }
  ]
}

export const mockDevelopers = [
  {
    id: "dev_001",
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    company: "TechCorp Solutions",
    status: "active",
    plan: "professional",
    createdAt: "2024-05-15T10:00:00Z",
    lastActive: "2024-07-01T14:30:00Z",
    apiUsage: {
      thisMonth: 8750,
      quota: 10000,
      lastMonth: 7234
    },
    projects: [
      { name: "HR Integration", apiKeys: 3, requests: 5670 },
      { name: "Document Workflow", apiKeys: 2, requests: 3080 }
    ]
  },
  {
    id: "dev_002",
    name: "Michael Chen",
    email: "mike@startup.io",
    company: "Startup Innovations",
    status: "active",
    plan: "starter",
    createdAt: "2024-06-01T10:00:00Z",
    lastActive: "2024-07-01T12:15:00Z",
    apiUsage: {
      thisMonth: 2340,
      quota: 5000,
      lastMonth: 1890
    },
    projects: [
      { name: "MVP Integration", apiKeys: 1, requests: 2340 }
    ]
  },
  {
    id: "dev_003",
    name: "Emily Rodriguez",
    email: "emily@enterprise.com",
    company: "Enterprise Corp",
    status: "active",
    plan: "enterprise",
    createdAt: "2024-04-10T10:00:00Z",
    lastActive: "2024-07-01T16:45:00Z",
    apiUsage: {
      thisMonth: 45670,
      quota: 100000,
      lastMonth: 52340
    },
    projects: [
      { name: "Global Deployment", apiKeys: 8, requests: 32450 },
      { name: "Partner Integration", apiKeys: 5, requests: 13220 }
    ]
  },
  {
    id: "dev_004",
    name: "David Kim",
    email: "david@agency.com",
    company: "Digital Agency",
    status: "suspended",
    plan: "professional",
    createdAt: "2024-03-20T10:00:00Z",
    lastActive: "2024-06-28T09:30:00Z",
    apiUsage: {
      thisMonth: 0,
      quota: 10000,
      lastMonth: 8950
    },
    projects: [
      { name: "Client Portal", apiKeys: 0, requests: 0 }
    ]
  },
  {
    id: "dev_005",
    name: "Lisa Wang",
    email: "lisa@freelance.com",
    company: "Freelance Developer",
    status: "pending",
    plan: "free",
    createdAt: "2024-06-30T10:00:00Z",
    lastActive: "2024-07-01T08:00:00Z",
    apiUsage: {
      thisMonth: 150,
      quota: 1000,
      lastMonth: 0
    },
    projects: [
      { name: "Personal Project", apiKeys: 1, requests: 150 }
    ]
  }
]

export const mockAPIMonitoring = {
  performance: {
    avgResponseTime: 145,
    requestsPerSecond: 234,
    errorRate: 0.8,
    uptime: 99.97
  },
  systemHealth: [
    {
      name: "API Gateway",
      status: "healthy",
      responseTime: "12ms",
      uptime: 99.98
    },
    {
      name: "Database",
      status: "healthy",
      responseTime: "8ms",
      uptime: 99.99
    },
    {
      name: "Cache",
      status: "degraded",
      responseTime: "45ms",
      uptime: 99.85
    },
    {
      name: "Load Balancer",
      status: "healthy",
      responseTime: "5ms",
      uptime: 99.97
    }
  ],
  responseTimeTrends: [
    { timestamp: "2024-07-01T10:00:00Z", p50: 120, p95: 450, p99: 890 },
    { timestamp: "2024-07-01T11:00:00Z", p50: 115, p95: 420, p99: 850 },
    { timestamp: "2024-07-01T12:00:00Z", p50: 125, p95: 480, p99: 920 },
    { timestamp: "2024-07-01T13:00:00Z", p50: 110, p95: 400, p99: 800 },
    { timestamp: "2024-07-01T14:00:00Z", p50: 130, p95: 460, p99: 880 },
    { timestamp: "2024-07-01T15:00:00Z", p50: 118, p95: 440, p99: 860 }
  ],
  requestVolume: [
    { timestamp: "2024-07-01T10:00:00Z", requests: 2340, errors: 12 },
    { timestamp: "2024-07-01T11:00:00Z", requests: 2890, errors: 8 },
    { timestamp: "2024-07-01T12:00:00Z", requests: 3450, errors: 15 },
    { timestamp: "2024-07-01T13:00:00Z", requests: 3120, errors: 6 },
    { timestamp: "2024-07-01T14:00:00Z", requests: 3670, errors: 11 },
    { timestamp: "2024-07-01T15:00:00Z", requests: 3890, errors: 9 }
  ],
  topEndpoints: [
    { endpoint: "/api/v1/envelopes", requests: 15678, avgLatency: "245ms", errorRate: 0.8 },
    { endpoint: "/api/v1/documents", requests: 12345, avgLatency: "123ms", errorRate: 0.3 },
    { endpoint: "/api/v1/users", requests: 8901, avgLatency: "89ms", errorRate: 0.1 },
    { endpoint: "/api/v1/templates", requests: 5432, avgLatency: "167ms", errorRate: 0.2 },
    { endpoint: "/api/v1/webhooks", requests: 3210, avgLatency: "201ms", errorRate: 0.5 },
    { endpoint: "/api/v1/auth", requests: 2890, avgLatency: "78ms", errorRate: 0.4 },
    { endpoint: "/api/v1/projects", requests: 2340, avgLatency: "134ms", errorRate: 0.2 },
    { endpoint: "/api/v1/integrations", requests: 1890, avgLatency: "189ms", errorRate: 0.3 }
  ],
  recentErrors: [
    {
      endpoint: "/api/v1/envelopes",
      error: "Invalid recipient email format",
      timestamp: "2024-07-01T15:30:00Z",
      statusCode: 400,
      count: 5
    },
    {
      endpoint: "/api/v1/documents",
      error: "File size exceeds limit",
      timestamp: "2024-07-01T15:25:00Z",
      statusCode: 413,
      count: 3
    },
    {
      endpoint: "/api/v1/users",
      error: "Unauthorized access",
      timestamp: "2024-07-01T15:20:00Z",
      statusCode: 401,
      count: 8
    },
    {
      endpoint: "/api/v1/webhooks",
      error: "Webhook endpoint unreachable",
      timestamp: "2024-07-01T15:15:00Z",
      statusCode: 502,
      count: 2
    }
  ],
  alerts: [
    {
      type: "performance",
      message: "High response time detected",
      severity: "warning",
      details: "95th percentile response time above 500ms for /api/v1/envelopes"
    },
    {
      type: "error_rate",
      message: "Increased error rate",
      severity: "critical",
      details: "Error rate for /api/v1/webhooks increased to 2.5%"
    },
    {
      type: "throughput",
      message: "Traffic spike detected",
      severity: "info",
      details: "Request volume 40% above normal for current time"
    }
  ]
}

export const mockWebhookAdmin = {
  overview: {
    totalWebhooks: 1247,
    activeWebhooks: 1156,
    dailyDeliveries: 45670,
    successRate: 97.8,
    avgDeliveryTime: "234ms",
    failedDeliveries: 1003
  },
  webhookStats: [
    {
      developerId: "dev_001",
      developerName: "Sarah Johnson",
      webhookCount: 5,
      deliveryRate: 98.5,
      avgLatency: "189ms",
      lastDelivery: "2024-07-01T15:30:00Z"
    },
    {
      developerId: "dev_002",
      developerName: "Michael Chen",
      webhookCount: 2,
      deliveryRate: 95.2,
      avgLatency: "267ms",
      lastDelivery: "2024-07-01T15:25:00Z"
    },
    {
      developerId: "dev_003",
      developerName: "Emily Rodriguez",
      webhookCount: 12,
      deliveryRate: 99.1,
      avgLatency: "145ms",
      lastDelivery: "2024-07-01T15:35:00Z"
    }
  ],
  eventTypes: [
    { event: "envelope.completed", deliveries: 15670, successRate: 98.2 },
    { event: "document.signed", deliveries: 12340, successRate: 97.8 },
    { event: "envelope.sent", deliveries: 8901, successRate: 99.1 },
    { event: "user.created", deliveries: 5432, successRate: 96.5 },
    { event: "document.uploaded", deliveries: 3210, successRate: 98.7 }
  ],
  failedDeliveries: [
    {
      webhookId: "webhook_001",
      endpoint: "https://api.company.com/webhooks",
      event: "envelope.completed",
      error: "Connection timeout",
      attempts: 3,
      lastAttempt: "2024-07-01T15:30:00Z",
      nextRetry: "2024-07-01T16:30:00Z"
    },
    {
      webhookId: "webhook_002",
      endpoint: "https://app.startup.io/hooks",
      event: "document.signed",
      error: "HTTP 500 Internal Server Error",
      attempts: 2,
      lastAttempt: "2024-07-01T15:25:00Z",
      nextRetry: "2024-07-01T15:55:00Z"
    }
  ]
}

export const mockSDKAdmin = {
  overview: {
    totalDownloads: 156789,
    activeSDKs: 7,
    monthlyDownloads: 23456,
    topLanguage: "JavaScript",
    avgRating: 4.7,
    issuesReported: 23
  },
  sdkStats: [
    {
      language: "JavaScript",
      version: "2.1.0",
      downloads: 45670,
      monthlyDownloads: 8901,
      rating: 4.9,
      issues: 5,
      lastUpdated: "2024-06-25T10:00:00Z"
    },
    {
      language: "Python",
      version: "2.1.0",
      downloads: 34521,
      monthlyDownloads: 6789,
      rating: 4.8,
      issues: 3,
      lastUpdated: "2024-06-25T10:00:00Z"
    },
    {
      language: "Java",
      version: "2.0.5",
      downloads: 23456,
      monthlyDownloads: 4567,
      rating: 4.7,
      issues: 7,
      lastUpdated: "2024-06-20T10:00:00Z"
    },
    {
      language: "C#",
      version: "2.0.3",
      downloads: 18901,
      monthlyDownloads: 3456,
      rating: 4.6,
      issues: 4,
      lastUpdated: "2024-06-18T10:00:00Z"
    }
  ],
  downloadTrends: [
    { date: "2024-06-24", javascript: 234, python: 189, java: 156, csharp: 123 },
    { date: "2024-06-25", javascript: 267, python: 201, java: 178, csharp: 134 },
    { date: "2024-06-26", javascript: 289, python: 223, java: 167, csharp: 145 },
    { date: "2024-06-27", javascript: 245, python: 198, java: 189, csharp: 156 },
    { date: "2024-06-28", javascript: 301, python: 234, java: 201, csharp: 167 },
    { date: "2024-06-29", javascript: 278, python: 212, java: 178, csharp: 134 },
    { date: "2024-06-30", javascript: 312, python: 245, java: 198, csharp: 178 }
  ],
  recentIssues: [
    {
      sdkLanguage: "JavaScript",
      title: "Authentication error with OAuth 2.0",
      severity: "high",
      reportedBy: "dev@company.com",
      status: "open",
      createdAt: "2024-07-01T14:30:00Z"
    },
    {
      sdkLanguage: "Python",
      title: "Memory leak in bulk operations",
      severity: "medium",
      reportedBy: "engineer@startup.io",
      status: "in_progress",
      createdAt: "2024-06-30T16:45:00Z"
    },
    {
      sdkLanguage: "Java",
      title: "Compatibility issue with Java 17",
      severity: "low",
      reportedBy: "dev@enterprise.com",
      status: "resolved",
      createdAt: "2024-06-29T11:20:00Z"
    }
  ]
}