"use client";

import { useQuery } from "@tanstack/react-query";
import { retrieveWalletFinanceTransactionDetails } from "@/services/wallet-finance";

export function useRetrieveTransactionDetails(
  transactionId?: number | string,
  enabled = true,
) {
  const hasValidTransactionId =
    (typeof transactionId === "number" && Number.isFinite(transactionId)) ||
    (typeof transactionId === "string" && transactionId.trim().length > 0);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["wallet-finance", "transactions", "details", transactionId],
    queryFn: () =>
      retrieveWalletFinanceTransactionDetails(transactionId as number | string),
    enabled: enabled && hasValidTransactionId,
  });
  return { data: data?.data, isLoading, error, refetch };
}
