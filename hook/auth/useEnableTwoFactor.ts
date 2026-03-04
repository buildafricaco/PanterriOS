'use client';

import { EnableTwoFactorReq } from '@/interface';
import { enableTwoFactor } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useEnableTwoFactor() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: EnableTwoFactorReq) => enableTwoFactor(payload),
    onSuccess: (data) => {
      toast.success(data.message || '2FA enabled successfully');
      router.push('/dashboard');
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
  });
}
