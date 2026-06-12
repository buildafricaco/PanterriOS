'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveWorkflowTriggers } from '@/services/workflow';

export function useRetrieveWorkflowTriggers() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['workflow', 'triggers'],
    queryFn: retrieveWorkflowTriggers,
  });

  return { data, isLoading, isError, error, refetch };
}
