'use client';

import { UpdateUserReq } from '@/interface';
import { updateUserDetails } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      payload,
    }: {
      userId: number | string;
      payload: UpdateUserReq;
    }) => updateUserDetails(userId, payload),
    onSuccess: (data, variables) => {
      toast.success(data.message || 'User details updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
      queryClient.invalidateQueries({
        queryKey: ['users', 'details', variables.userId],
      });
    },
  });
}
