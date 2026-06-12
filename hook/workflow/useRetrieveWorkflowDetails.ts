'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveWorkflowDetails } from '@/services/workflow';

export function useRetrieveWorkflowDetails(workflowId?: number, enabled = true) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['workflow', 'details', workflowId],
    queryFn: () => retrieveWorkflowDetails(workflowId!),
    enabled: enabled && Number.isFinite(workflowId),
  });

  return { data, isLoading, isError, error, refetch };
}
