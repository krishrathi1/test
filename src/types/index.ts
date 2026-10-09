export interface FlowTask {
  id: string;
  title: string;
  stage: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  agent: string;
  updatedAt: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
