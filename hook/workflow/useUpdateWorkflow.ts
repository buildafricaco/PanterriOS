'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateWorkflowReq } from '@/interface';
import { updateWorkflow } from '@/services/workflow';
import { toast } from 'sonner';

interface UpdateWorkflowMutationPayload {
  id: number;
  payload: UpdateWorkflowReq;
}

export function useUpdateWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateWorkflowMutationPayload) =>
      updateWorkflow(id, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'Workflow updated successfully');
      queryClient.invalidateQueries({ queryKey: ['workflow', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['workflow', 'details', variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ['approval-queue'] });
    },
  });
}
