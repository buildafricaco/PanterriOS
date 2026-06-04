import type { Pagination } from './index';

export interface ApprovalQueueCurrentStep {
  stepNumber: number;
  approvalType: 'role' | 'user';
  role: string | null;
  userId: number | null;
  userNameSnapshot: string | null;
  commentRequired: boolean;
  status: string;
}

export interface ApprovalQueueSubmittedBy {
  userId: number;
  name: string;
  email: string;
}

export interface ApprovalQueueInitiatedBy {
  userId: number;
  name: string;
  email: string;
  roles: string[];
}

export interface ApprovalQueueStepDetail {
  id: number;
  stepNumber: number;
  approvalType: 'role' | 'user';
  role: string | null;
  userId: number | null;
  userNameSnapshot: string | null;
  commentRequired: boolean;
  status: string;
  actedByUserId: number | null;
  actedByName: string | null;
  actedAt: string | null;
  comment: string | null;
}

export interface ApprovalQueueComment {
  id: number;
  comment: string;
  commentType: string;
  authorUserId: number;
  authorName: string;
  authorEmail: string;
  createdAt: string;
}

export interface ApprovalQueueDecisionResData {
  id: number;
  reference: string;
  requestStatus: string;
  currentStepNumber: number;
}

export interface ApprovalQueueCcUser {
  id: number;
  email: string;
  name: string;
}

export interface ApprovalQueueItem {
  id: number;
  reference: string;
  workflowName: string;
  module: string;
  subModule: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  requestStatus: string;
  currentStepNumber: number;
  currentStep: ApprovalQueueCurrentStep;
  submittedBy: ApprovalQueueSubmittedBy;
  createdAt: string;
  updatedAt: string;
  canCurrentUserAct: boolean;
}

export interface RetrieveApprovalQueueQuery {
  page?: number;
  limit?: number;
  module?: string;
  subModule?: string;
  action?: string;
  status?: string;
  search?: string;
}

export interface RetrieveApprovalQueueRes {
  statusCode: number;
  data: { message: string; data: ApprovalQueueItem[]; pagination: Pagination };
}

export interface ApprovalQueueRequestDetails {
  id: number;
  reference: string;
  workflowName: string;
  module: string;
  subModule: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  requestStatus: string;
  currentStepNumber: number;
  initiatedByUserId: number;
  initiatedByName: string;
  createdAt: string;
  updatedAt: string;
  currentStep: CurrentStep;
  canCurrentUserAct: boolean;
  sourceService: string;
  sourceAction: string;
  beforeSnapshot: any;
  afterSnapshot: any;
  payloadSnapshot: any;
  executionPayload: any;
  executionMetadata: any;
  metadata: any;
  steps: Step[];
  comments: any[];
}

export interface AfterSnapshot {
  email: string;
  roles: string[];
  lastName: string;
  appAccess: string;
  firstName: string;
  department: string;
}

export interface CurrentStep {
  stepNumber: number;
  approvalType: string;
  role: string;
  userId: null;
  userNameSnapshot: null;
  commentRequired: boolean;
}

export interface ExecutionPayload {
  actor: Actor;
  createUserDto: PayloadSnapshot;
}

export interface Actor {
  id: number;
  email: string;
  roles: string[];
  lastName: string;
  firstName: string;
  profileImage: string;
}

export interface PayloadSnapshot {
  email: string;
  roles: string[];
  gender: string;
  lastName: string;
  appAccess: string;
  firstName: string;
  department: string;
  userStatus: string;
  dateOfBirth: Date;
  phoneNumber: string;
}

export interface Step {
  id: number;
  stepNumber: number;
  approvalType: string;
  role: string;
  userId: null;
  userNameSnapshot: null;
  commentRequired: boolean;
  status: string;
  actedByUserId: null;
  actedByName: null;
  actedByEmail: null;
  comment: null;
  actedAt: null;
}

export interface RetrieveApprovalQueueRequestDetailsRes {
  statusCode: number;
  data: { message: string; data: ApprovalQueueRequestDetails };
}

export interface ApprovalQueueDecisionReq {
  comment: string;
}

export interface ApprovalQueueDecisionRes {
  statusCode: number;
  data: { message: string; data: ApprovalQueueDecisionResData };
}

export interface CreateApprovalQueueCommentReq {
  comment: string;
  ccUsers?: ApprovalQueueCcUser[];
}

export interface CreateApprovalQueueCommentRes {
  statusCode: number;
  data: { message: string; data: ApprovalQueueComment };
}
