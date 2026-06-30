'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateWorkflowStatusReq } from '@/interface';
import { updateWorkflowStatus } from '@/services/workflow';
import { toast } from 'sonner';

interface UpdateWorkflowStatusMutationPayload {
  id: number | string;
  payload: UpdateWorkflowStatusReq;
}

export function useUpdateWorkflowStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateWorkflowStatusMutationPayload) =>
      updateWorkflowStatus(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Workflow status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['workflow', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['workflow', 'details', variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ['approval-queue'] });
    },
  });
}
