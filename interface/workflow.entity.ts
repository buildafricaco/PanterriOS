import type { Pagination } from './index';

export interface WorkflowTrigger {
  module: string;
  subModule: string;
  action: string;
  triggerKey: string;
  sourceService: string;
  executionSupported: boolean;
}

export interface WorkflowTriggerCatalogRes {
  message: string;
  data: WorkflowTrigger[];
}

export interface WorkflowStepPayload {
  stepNumber: number;
  approvalType: 'role' | 'user';
  role?: string;
  userId?: number;
  commentRequired: boolean;
}

export interface CreateWorkflowReq {
  name: string;
  description: string;
  module: string;
  subModule: string;
  action: string;
  isActive: boolean;
  steps: WorkflowStepPayload[];
}

export interface UpdateWorkflowReq {
  name?: string;
  description?: string;
  module?: string;
  subModule?: string;
  action?: string;
  isActive?: boolean;
  steps?: WorkflowStepPayload[];
}

export interface UpdateWorkflowStatusReq {
  isActive: boolean;
}

export interface RetrieveWorkflowsQuery {
  page?: number;
  limit?: number;
  module?: string;
  subModule?: string;
  action?: string;
  status?: string;
  search?: string;
}

export interface WorkflowDefinitionListItem {
  id?: number;
  publicId?: string;
  reference: string;
  name: string;
  module: string;
  subModule: string;
  action: string;
  status: string;
  stepsCount: number;
  triggersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowDefinitionStep {
  id?: number;
  publicId?: string;
  stepNumber: number;
  approvalType: 'role' | 'user';
  role: string | null;
  userId: number | null;
  userNameSnapshot: string | null;
  commentRequired: boolean;
}

export interface WorkflowDefinitionDetails {
  id?: number;
  publicId?: string;
  reference: string;
  name: string;
  description: string;
  module: string;
  subModule: string;
  action: string;
  triggerKey: string;
  status: string;
  triggersCount: number;
  createdByUserId: number;
  createdByName: string;
  updatedByUserId: number;
  updatedByName: string;
  createdAt: string;
  updatedAt: string;
  steps: WorkflowDefinitionStep[];
}

export interface RetrieveWorkflowsRes {
  statusCode: number;
  data: {
    message: string;
    data: WorkflowDefinitionListItem[];
    pagination: Pagination;
  };
}

export interface RetrieveWorkflowDetailsRes {
  statusCode: number;
  data: { message: string; data: WorkflowDefinitionDetails };
}

export interface CreateWorkflowRes {
  message: string;
  data: WorkflowDefinitionDetails;
}

export interface UpdateWorkflowRes {
  message: string;
  data: WorkflowDefinitionDetails;
}

export interface UpdateWorkflowStatusRes {
  message: string;
  data: {
    id?: number;
    publicId?: string;
    status: string;
  };
}
