'use client';

import { deleteInvestment } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInvestment(id),
    onSuccess: (data, investmentId) => {
      toast.success(data.message || 'Investment deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
    },
  });
}
