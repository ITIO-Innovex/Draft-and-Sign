export interface PDFTool {
  id: string;
  name: string;
  description: string;
  category: string;
  inputFormats?: string[];
  outputFormats?: string[];
  features: string[];
  complexity: 'easy' | 'medium' | 'advanced';
  popularity: number;
  avgProcessingTime?: string;
  icon: string;
  badge?: string;
  premium?: boolean;
}

export interface ToolCategory {
  category: string;
  description: string;
  tools: PDFTool[];
}

export interface ProcessingStats {
  dailyUsage: {
    totalOperations: number;
    uniqueUsers: number;
    popularTools: Array<{
      name: string;
      usage: number;
      percentage: number;
    }>;
  };
  performanceMetrics: {
    averageProcessingTime: string;
    successRate: number;
    userSatisfaction: number;
    errorRate: number;
  };
  qualityMetrics: {
    conversionAccuracy: number;
    layoutPreservation: number;
    textRecognitionAccuracy: number;
    compressionEfficiency: number;
  };
}

export interface UserWorkflow {
  id: string;
  name: string;
  steps: Array<{
    tool: string;
    order: number;
  }>;
  usage: number;
  avgCompletionTime: string;
}

export interface BatchJob {
  id: string;
  name: string;
  tool: string;
  files: File[];
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  startTime?: Date;
  endTime?: Date;
  results?: Array<{
    filename: string;
    status: 'success' | 'error';
    message?: string;
  }>;
}

export interface AdminToolUsage {
  id: string;
  name: string;
  description: string;
  category: string;
  usage: number;
  uniqueUsers: number;
  successRate: number;
  avgProcessingTime: number;
  errorCount: number;
  errorRate: number;
}

export interface ProcessingJob {
  id: string;
  fileName: string;
  fileSize: string;
  user: string;
  tool: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  startedAt: string;
  completedAt?: string;
  pausedAt?: string;
  estimatedCompletion?: string;
  error?: string;
}