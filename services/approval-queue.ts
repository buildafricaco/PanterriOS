import type {
  ApprovalQueueDecisionReq,
  ApprovalQueueDecisionRes,
  CreateApprovalQueueCommentReq,
  CreateApprovalQueueCommentRes,
  RetrieveApprovalQueueQuery,
  RetrieveApprovalQueueRequestDetailsRes,
  RetrieveApprovalQueueRes,
} from '@/interface';
import { API } from '@/services/axios';

export const retrieveSubmittedApprovalQueue = async (
  params: RetrieveApprovalQueueQuery,
): Promise<RetrieveApprovalQueueRes> => {
  const { data } = await API.get('/admin/approval-queue/submitted-by-me', {
    params,
  });

  return data;
};

export const retrieveAssignedApprovalQueue = async (
  params: RetrieveApprovalQueueQuery,
): Promise<RetrieveApprovalQueueRes> => {
  const { data } = await API.get('/admin/approval-queue/assigned-to-me', {
    params,
  });

  return data;
};

export const retrieveApprovalQueueRequestDetails = async (
  id: number,
): Promise<RetrieveApprovalQueueRequestDetailsRes> => {
  const { data } = await API.get(`/admin/approval-queue/${id}`);

  return data;
};

export const approveApprovalQueueRequest = async (
  id: number,
  payload: ApprovalQueueDecisionReq,
): Promise<ApprovalQueueDecisionRes> => {
  const { data } = await API.post(`/admin/approval-queue/${id}/approve`, payload);

  return data;
};

export const rejectApprovalQueueRequest = async (
  id: number,
  payload: ApprovalQueueDecisionReq,
): Promise<ApprovalQueueDecisionRes> => {
  const { data } = await API.post(`/admin/approval-queue/${id}/reject`, payload);

  return data;
};

export const returnApprovalQueueRequestForRevision = async (
  id: number,
  payload: ApprovalQueueDecisionReq,
): Promise<ApprovalQueueDecisionRes> => {
  const { data } = await API.post(
    `/admin/approval-queue/${id}/return-for-revision`,
    payload,
  );

  return data;
};

export const terminateApprovalQueueRequest = async (
  id: number,
  payload: ApprovalQueueDecisionReq,
): Promise<ApprovalQueueDecisionRes> => {
  const { data } = await API.post(`/admin/approval-queue/${id}/terminate`, payload);

  return data;
};

export const addApprovalQueueComment = async (
  id: number,
  payload: CreateApprovalQueueCommentReq,
): Promise<CreateApprovalQueueCommentRes> => {
  const { data } = await API.post(`/admin/approval-queue/${id}/comments`, payload);

  return data;
};
