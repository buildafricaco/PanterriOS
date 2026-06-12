'use client';

import { useQuery } from '@tanstack/react-query';

import { getTarget } from '@/services/settings';

export function useGetTarget() {
  return useQuery({
    queryKey: ['settings', 'target'],
    queryFn: getTarget,
  });
}
