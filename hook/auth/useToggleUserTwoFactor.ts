'use client';

import { toggleUserTwoFactor } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useToggleUserTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      isEnabled,
    }: {
      userId: number | string;
      isEnabled: boolean;
    }) => toggleUserTwoFactor(userId, { isEnabled }),
    onSuccess: (data, variables) => {
      toast.success(data.message || '2FA updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['users', 'details', variables.userId],
      });
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
    },
  });
}
