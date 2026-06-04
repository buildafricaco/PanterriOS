'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApprovalQueueDecisionReq } from '@/interface';
import { returnApprovalQueueRequestForRevision } from '@/services/approval-queue';
import { toast } from 'sonner';

interface ReturnApprovalQueueRequestForRevisionPayload {
  id: number;
  payload: ApprovalQueueDecisionReq;
}

export function useReturnApprovalQueueRequestForRevision() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: ReturnApprovalQueueRequestForRevisionPayload) =>
      returnApprovalQueueRequestForRevision(id, payload),
    onSuccess: (data, variables) => {
      toast.success(
        data.data.message ||
          'Approval request returned for revision successfully',
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
