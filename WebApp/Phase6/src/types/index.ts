export interface User {
  id: string
  name: string
  email: string
  company?: string
  avatar?: string
  role: 'developer' | 'admin' | 'enterprise'
  createdAt: string
  lastActive: string
}

export interface Project {
  id: string
  name: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  apiKeys: APIKey[]
  webhooks: Webhook[]
  usage: ProjectUsage
}

export interface APIKey {
  id: string
  name: string
  key: string
  projectId: string
  permissions: string[]
  rateLimit: RateLimit
  createdAt: string
  lastUsed?: string
  isActive: boolean
  usage: APIKeyUsage
}

export interface RateLimit {
  requests: number
  window: string
  burst?: number
}

export interface APIKeyUsage {
  thisMonth: number
  lastMonth: number
  quota: number
  dailyUsage: DailyUsage[]
}

export interface DailyUsage {
  date: string
  requests: number
  errors: number
}

export interface ProjectUsage {
  totalRequests: number
  totalErrors: number
  avgLatency: number
  topEndpoints: EndpointUsage[]
  dailyUsage: DailyUsage[]
}

export interface EndpointUsage {
  endpoint: string
  requests: number
  avgLatency: string
  errorRate: number
}

export interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  isActive: boolean
  secret?: string
  projectId: string
  createdAt: string
  lastTriggered?: string
  deliveryStats: WebhookDeliveryStats
}

export interface WebhookDeliveryStats {
  totalDeliveries: number
  successfulDeliveries: number
  failedDeliveries: number
  avgLatency: number
  lastDelivery?: WebhookDelivery
}

export interface WebhookDelivery {
  id: string
  webhookId: string
  event: string
  status: 'success' | 'failed' | 'pending'
  attempts: number
  lastAttempt: string
  responseCode?: number
  responseTime?: number
  payload: any
}

export interface APIEndpoint {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  description: string
  parameters: APIParameter[]
  requestBody?: APISchema
  responses: APIResponse[]
  authentication: string[]
  rateLimit: RateLimit
  examples: APIExample[]
}

export interface APIParameter {
  name: string
  in: 'path' | 'query' | 'header'
  required: boolean
  type: string
  description: string
  example?: any
}

export interface APISchema {
  type: string
  properties: Record<string, any>
  required?: string[]
  example?: any
}

export interface APIResponse {
  status: number
  description: string
  schema?: APISchema
  examples?: Record<string, any>
}

export interface APIExample {
  name: string
  description: string
  request: any
  response: any
}

export interface SDK {
  language: string
  version: string
  packageName: string
  installCommand: string
  documentation: string
  examples: string
  lastUpdated: string
  downloads: number
  rating: number
}

export interface Integration {
  id: string
  name: string
  description: string
  category: string
  provider: string
  logo: string
  rating: number
  downloads: number
  featured: boolean
  tags: string[]
  documentation: string
  repository?: string
  createdAt: string
}

export interface ForumPost {
  id: string
  title: string
  content: string
  author: User
  category: string
  tags: string[]
  replies: number
  views: number
  likes: number
  createdAt: string
  updatedAt: string
  isSticky?: boolean
  isSolved?: boolean
}

export interface SupportTicket {
  id: string
  title: string
  description: string
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  userId: string
  assignedTo?: string
  createdAt: string
  updatedAt: string
  messages: TicketMessage[]
}

export interface TicketMessage {
  id: string
  content: string
  author: User
  isStaff: boolean
  createdAt: string
  attachments?: string[]
}

export interface AnalyticsData {
  overview: {
    totalRequests: number
    totalErrors: number
    avgLatency: number
    uptime: number
  }
  usage: {
    daily: DailyUsage[]
    endpoints: EndpointUsage[]
    statusCodes: StatusCodeUsage[]
  }
  performance: {
    latency: LatencyData[]
    throughput: ThroughputData[]
  }
  errors: {
    types: ErrorTypeData[]
    recent: RecentError[]
  }
}

export interface StatusCodeUsage {
  code: number
  count: number
  percentage: number
}

export interface LatencyData {
  timestamp: string
  p50: number
  p95: number
  p99: number
}

export interface ThroughputData {
  timestamp: string
  requests: number
}

export interface ErrorTypeData {
  type: string
  count: number
  percentage: number
}

export interface RecentError {
  id: string
  endpoint: string
  error: string
  timestamp: string
  userId?: string
}

export interface TestCase {
  id: string
  name: string
  description: string
  endpoint: string
  method: string
  headers: Record<string, string>
  body?: any
  expectedStatus: number
  expectedResponse?: any
  assertions: TestAssertion[]
  createdAt: string
  lastRun?: string
  status?: 'passed' | 'failed' | 'pending'
}

export interface TestAssertion {
  type: 'status' | 'header' | 'body' | 'response_time'
  field?: string
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than'
  value: any
}

export interface TestResult {
  id: string
  testCaseId: string
  status: 'passed' | 'failed'
  duration: number
  response: {
    status: number
    headers: Record<string, string>
    body: any
  }
  assertions: AssertionResult[]
  runAt: string
}

export interface AssertionResult {
  assertion: TestAssertion
  passed: boolean
  actual?: any
  message?: string
}