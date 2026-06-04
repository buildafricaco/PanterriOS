'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateWorkflowReq } from '@/interface';
import { createWorkflow } from '@/services/workflow';
import { toast } from 'sonner';

export function useCreateWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateWorkflowReq) => createWorkflow(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Workflow created successfully');
      queryClient.invalidateQueries({ queryKey: ['workflow', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['workflow', 'triggers'] });
    },
  });
}
