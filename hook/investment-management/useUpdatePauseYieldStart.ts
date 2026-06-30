'use client';

import {
  updatePauseYieldStart,
  UpdatePauseYieldStartReq,
} from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdatePauseYieldStart() {
  const queryClient = useQueryClient();

  const { mutateAsync: updatePauseYieldFn, isPending } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number | string;
      payload: UpdatePauseYieldStartReq;
    }) => updatePauseYieldStart(id, payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment yield status updated');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['investments', 'details'] });
    },
  });
  return { updatePauseYieldFn, isPending };
}
