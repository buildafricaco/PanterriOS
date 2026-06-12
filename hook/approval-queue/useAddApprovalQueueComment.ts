'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateApprovalQueueCommentReq } from '@/interface';
import { addApprovalQueueComment } from '@/services/approval-queue';
import { toast } from 'sonner';

interface AddApprovalQueueCommentPayload {
  id: number;
  payload: CreateApprovalQueueCommentReq;
}

export function useAddApprovalQueueComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: AddApprovalQueueCommentPayload) =>
      addApprovalQueueComment(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.data.message || 'Approval comment added successfully');
      queryClient.invalidateQueries({
        queryKey: ['approval-queue', 'details', variables.id],
      });
    },
  });
}
