'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveInvestorOverview } from '@/services/investor-management';

export function useRetrieveInvestorOverview(
  investorId?: number | string,
  {
    investmentPage = 1,
    investmentLimit = 10,
    transactionPage = 1,
    transactionLimit = 10,
  }: {
    investmentPage?: number;
    investmentLimit?: number;
    transactionPage?: number;
    transactionLimit?: number;
  } = {},
) {
  const hasValidInvestorId =
    (typeof investorId === 'number' && Number.isFinite(investorId)) ||
    (typeof investorId === 'string' && investorId.trim().length > 0);

  return useQuery({
    queryKey: [
      'investors',
      'details',
      investorId,
      {
        investmentPage,
        investmentLimit,
        transactionPage,
        transactionLimit,
      },
    ],
    queryFn: () =>
      retrieveInvestorOverview(investorId as number | string, {
        investmentPage,
        investmentLimit,
        transactionPage,
        transactionLimit,
      }),
    enabled: hasValidInvestorId,
  });
}
