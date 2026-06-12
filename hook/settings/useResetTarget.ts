'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { resetTarget } from '@/services/settings';

export function useResetTarget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetTarget(),
    onSuccess: (data) => {
      toast.success(data.data.message || 'Target reset successfully');
      queryClient.invalidateQueries({ queryKey: ['settings', 'target'] });
    },
  });
}
