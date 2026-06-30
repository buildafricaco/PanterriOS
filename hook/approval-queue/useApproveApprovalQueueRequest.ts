'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApprovalQueueDecisionReq } from '@/interface';
import { approveApprovalQueueRequest } from '@/services/approval-queue';
import { toast } from 'sonner';

interface ApproveApprovalQueueRequestPayload {
  id: number | string;
  payload: ApprovalQueueDecisionReq;
}

export function useApproveApprovalQueueRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: ApproveApprovalQueueRequestPayload) =>
      approveApprovalQueueRequest(id, payload),
    onSuccess: (data, variables) => {
      toast.success(
        data.data.message || 'Approval request approved successfully',
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
