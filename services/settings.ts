import { TargetReq, TargetResponse } from '@/interface';
import { API } from '@/services/axios';

export const getTarget = async (): Promise<TargetResponse> => {
  const { data } = await API.get('/admin/dashboard/targets');
  return data;
};
export const setTarget = async (
  payload: TargetReq,
): Promise<TargetResponse> => {
  const { data } = await API.post('/admin/dashboard/targets', payload);
  return data;
};

export const resetTarget = async (): Promise<TargetResponse> => {
  const { data } = await API.post('/admin/dashboard/targets/reset');
  return data;
};
