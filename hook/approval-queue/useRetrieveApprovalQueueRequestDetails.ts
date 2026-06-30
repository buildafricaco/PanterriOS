'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveApprovalQueueRequestDetails } from '@/services/approval-queue';

export function useRetrieveApprovalQueueRequestDetails(
  requestId?: number | string,
  enabled = true,
) {
  const hasValidRequestId =
    (typeof requestId === 'number' && Number.isFinite(requestId)) ||
    (typeof requestId === 'string' && requestId.trim().length > 0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['approval-queue', 'details', requestId],
    queryFn: () => retrieveApprovalQueueRequestDetails(requestId!),
    enabled: enabled && hasValidRequestId,
  });

  return { data, isLoading, isError, error, refetch };
}
