'use client';

import { deleteUser } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number | string) => deleteUser(userId),
    onSuccess: (data) => {
      toast.success(data.message || 'User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
    },
  });
}
