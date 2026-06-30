'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveUserProfile } from '@/services/user-management';

export function useRetrieveUserProfile(userId: number | string) {
  return useQuery({
    queryKey: ['users', 'details', userId],
    queryFn: () => retrieveUserProfile(userId),
  });
}
