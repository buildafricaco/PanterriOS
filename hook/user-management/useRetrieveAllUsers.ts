'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveAllUsers } from '@/services/user-management';

export function useRetrieveAllUsers() {
  return useQuery({
    queryKey: ['users', 'all'],
    queryFn: retrieveAllUsers,
  });
}
