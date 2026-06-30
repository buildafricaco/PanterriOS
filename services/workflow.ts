import type {
  CommonRes,
  CreateWorkflowReq,
  CreateWorkflowRes,
  RetrieveWorkflowDetailsRes,
  RetrieveWorkflowsQuery,
  RetrieveWorkflowsRes,
  UpdateWorkflowReq,
  UpdateWorkflowRes,
  UpdateWorkflowStatusReq,
  UpdateWorkflowStatusRes,
  WorkflowTriggerCatalogRes,
} from '@/interface';
import { API } from '@/services/axios';

export const retrieveWorkflowTriggers =
  async (): Promise<WorkflowTriggerCatalogRes> => {
    const { data } = await API.get('/admin/workflows/triggers');
    return data;
  };

export const createWorkflow = async (
  payload: CreateWorkflowReq,
): Promise<CreateWorkflowRes> => {
  const { data } = await API.post('/admin/workflows/create', payload);
  return data;
};

export const retrieveWorkflows = async (
  params: RetrieveWorkflowsQuery,
): Promise<RetrieveWorkflowsRes> => {
  const { data } = await API.get('/admin/workflows/list', { params });
  return data;
};

export const retrieveWorkflowDetails = async (
  id: number | string,
): Promise<RetrieveWorkflowDetailsRes> => {
  const { data } = await API.get(`/admin/workflows/${id}`);
  return data;
};

export const updateWorkflow = async (
  id: number | string,
  payload: UpdateWorkflowReq,
): Promise<UpdateWorkflowRes> => {
  const { data } = await API.patch(`/admin/workflows/${id}`, payload);
  return data;
};

export const deleteWorkflow = async (
  id: number | string,
): Promise<CommonRes> => {
  const { data } = await API.delete(`/admin/workflows/${id}`);
  return data;
};

export const updateWorkflowStatus = async (
  id: number | string,
  payload: UpdateWorkflowStatusReq,
): Promise<UpdateWorkflowStatusRes> => {
  const { data } = await API.patch(`/admin/workflows/${id}/status`, payload);
  return data;
};
