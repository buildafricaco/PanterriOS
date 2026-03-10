'use client';

import { UpdateInvestmentReq } from '@/interface';
import { updateInvestmentDetails } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateInvestmentReq }) =>
      updateInvestmentDetails(id, payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment updated successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
    },
  });
}
