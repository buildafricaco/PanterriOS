'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApprovalQueueDecisionReq } from '@/interface';
import { terminateApprovalQueueRequest } from '@/services/approval-queue';
import { toast } from 'sonner';

interface TerminateApprovalQueueRequestPayload {
  id: number | string;
  payload: ApprovalQueueDecisionReq;
}

export function useTerminateApprovalQueueRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: TerminateApprovalQueueRequestPayload) =>
      terminateApprovalQueueRequest(id, payload),
    onSuccess: (data, variables) => {
      toast.success(
        data.data.message || 'Approval request terminated successfully',
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
