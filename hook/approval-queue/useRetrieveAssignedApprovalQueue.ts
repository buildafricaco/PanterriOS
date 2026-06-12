'use client';

import { useQuery } from '@tanstack/react-query';
import type { RetrieveApprovalQueueQuery } from '@/interface';
import { retrieveAssignedApprovalQueue } from '@/services/approval-queue';

export function useRetrieveAssignedApprovalQueue(
  params: RetrieveApprovalQueueQuery,
  enabled = true,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['approval-queue', 'assigned-to-me', params],
    queryFn: () => retrieveAssignedApprovalQueue(params),
    enabled,
  });

  return { data, isLoading, isError, error, refetch };
}
