'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveUserProfile } from '@/services/user-management';

export function useRetrieveUserProfile(userId: number) {
  return useQuery({
    queryKey: ['users', 'details', userId],
    queryFn: () => retrieveUserProfile(userId),
    enabled: Number.isFinite(userId) && userId > 0,
  });
}
