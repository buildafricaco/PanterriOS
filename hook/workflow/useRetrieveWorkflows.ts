'use client';

import { useQuery } from '@tanstack/react-query';
import type { RetrieveWorkflowsQuery } from '@/interface';
import { retrieveWorkflows } from '@/services/workflow';

export function useRetrieveWorkflows(params: RetrieveWorkflowsQuery) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['workflow', 'list', params],
    queryFn: () => retrieveWorkflows(params),
  });

  return { data, isLoading, isError, error, refetch };
}
