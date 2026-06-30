'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveInvestmentDetails } from '@/services/investment-management';

export function useRetrieveInvestmentDetails(
  investmentId: number | string,
  enabled = true,
) {
  const hasValidInvestmentId =
    (typeof investmentId === 'number' && Number.isFinite(investmentId)) ||
    (typeof investmentId === 'string' && investmentId.trim().length > 0);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['investments', 'details', investmentId],
    queryFn: () => retrieveInvestmentDetails(investmentId),
    enabled: enabled && hasValidInvestmentId,
  });
  return { data: data?.data?.data, isLoading, error, refetch };
}
