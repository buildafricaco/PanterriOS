'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TargetReq } from '@/interface';
import { setTarget } from '@/services/settings';

export function useSetTarget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TargetReq) => setTarget(payload),
    onSuccess: (data) => {
      toast.success(data.data.message || 'Target updated successfully');
      queryClient.invalidateQueries({ queryKey: ['settings', 'target'] });
    },
  });
}
