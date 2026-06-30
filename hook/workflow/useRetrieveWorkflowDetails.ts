'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveWorkflowDetails } from '@/services/workflow';

export function useRetrieveWorkflowDetails(
  workflowId?: number | string,
  enabled = true,
) {
  const hasValidWorkflowId =
    (typeof workflowId === 'number' && Number.isFinite(workflowId)) ||
    (typeof workflowId === 'string' && workflowId.trim().length > 0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['workflow', 'details', workflowId],
    queryFn: () => retrieveWorkflowDetails(workflowId!),
    enabled: enabled && hasValidWorkflowId,
  });

  return { data, isLoading, isError, error, refetch };
}
