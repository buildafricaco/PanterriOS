'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApprovalQueueDecisionReq } from '@/interface';
import { rejectApprovalQueueRequest } from '@/services/approval-queue';
import { toast } from 'sonner';

interface RejectApprovalQueueRequestPayload {
  id: number;
  payload: ApprovalQueueDecisionReq;
}

export function useRejectApprovalQueueRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: RejectApprovalQueueRequestPayload) =>
      rejectApprovalQueueRequest(id, payload),
    onSuccess: (data, variables) => {
      toast.success(
        data.data.message || 'Approval request rejected successfully',
      );
      queryClient.invalidateQueries({
        queryKey: ['approval-queue', 'submitted-by-me'],
      });
      queryClient.invalidateQueries({
        queryKey: ['approval-queue', 'assigned-to-me'],
      });
      queryClient.invalidateQueries({
        queryKey: ['approval-queue', 'details', variables.id],
      });
    },
  });
}
