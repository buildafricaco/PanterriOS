'use client';

import { useQuery } from '@tanstack/react-query';
import type { RetrieveApprovalQueueQuery } from '@/interface';
import { retrieveSubmittedApprovalQueue } from '@/services/approval-queue';

export function useRetrieveSubmittedApprovalQueue(
  params: RetrieveApprovalQueueQuery,
  enabled = true,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['approval-queue', 'submitted-by-me', params],
    queryFn: () => retrieveSubmittedApprovalQueue(params),
    enabled,
  });

  return { data, isLoading, isError, error, refetch };
}
