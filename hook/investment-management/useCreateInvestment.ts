'use client';

import { CreateInvestmentReq } from '@/interface';
import { createInvestment } from '@/services/investment-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateInvestmentReq) =>
      createInvestment(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Investment created successfully');
      queryClient.invalidateQueries({ queryKey: ['investments', 'list'] });
    },
    onError: (error: Error) => {
      console.error(error.message || 'Failed to create investment');
    },
  });
}
