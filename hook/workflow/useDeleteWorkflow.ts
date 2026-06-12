'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteWorkflow } from '@/services/workflow';
import { toast } from 'sonner';

export function useDeleteWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWorkflow(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Workflow deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['workflow', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['approval-queue'] });
    },
  });
}
