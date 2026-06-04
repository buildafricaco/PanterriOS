'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveApprovalQueueRequestDetails } from '@/services/approval-queue';

export function useRetrieveApprovalQueueRequestDetails(
  requestId?: number,
  enabled = true,
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['approval-queue', 'details', requestId],
    queryFn: () => retrieveApprovalQueueRequestDetails(requestId!),
    enabled: enabled && Number.isFinite(requestId),
  });

  return { data, isLoading, isError, error, refetch };
}
