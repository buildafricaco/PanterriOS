"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveInvestorWalletDetails } from "@/services/wallet-finance";

export function useRetrieveInvestorWalletDetails(
  investorId?: number | string,
  enabled = true,
) {
  const hasValidInvestorId =
    (typeof investorId === "number" && Number.isFinite(investorId)) ||
    (typeof investorId === "string" && investorId.trim().length > 0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["wallet-finance", "investor-wallets", "details", investorId],
    queryFn: () => retrieveInvestorWalletDetails(investorId as number | string),
    enabled: enabled && hasValidInvestorId,
  });

  return { data, isLoading, isError, error, refetch };
}
