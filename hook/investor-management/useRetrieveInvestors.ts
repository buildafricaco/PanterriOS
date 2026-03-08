'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveInvestors } from '@/services/investor-management';

export function useRetrieveInvestors({
  search = '',
  page = 1,
  limit = 10,
  kycStatus,
  tierLevel,
}: {
  search?: string;
  page?: number;
  limit?: number;
  kycStatus?: string;
  tierLevel?: string;
}) {
  return useQuery({
    queryKey: [
      'investors',
      'list',
      {
        search,
        page,
        limit,
        kycStatus,
        tierLevel,
      },
    ],
    queryFn: () =>
      retrieveInvestors({
        search,
        page,
        limit,
        kycStatus,
        tierLevel,
      }),
  });
}
