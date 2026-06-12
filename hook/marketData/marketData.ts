import {
  MarketDataParams,
  PriceTrendSeriesParams,
} from "@/interface/marketData.entity";
import {
  detailedMarketData,
  priceTrendSeries,
} from "@/services/marketData";
import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useDetailedMarketData = (params: MarketDataParams) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["detailedMarketData", params],
    queryFn: () => detailedMarketData(params),
  });

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["detailedMarketData"] });
    return refetch();
  }, [queryClient, refetch]);

  return { data, error, isLoading, isFetching, refetch, refresh };
};

export const usePriceTrendSeries = (params: PriceTrendSeriesParams) => {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["priceTrendSeries", params],
    queryFn: () => priceTrendSeries(params),
  });

  return { data, error, isLoading, isFetching, refetch };
};
