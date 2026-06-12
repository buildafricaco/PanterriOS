"use client";

import { useMemo, useState } from "react";
import { TableFilters } from "@/components/shared";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import type { MarketData } from "@/interface/marketData.entity";
import { marketDataColumns } from "./marketDataColumns";

interface MarketDataTableProps {
  city: string;
  rows: MarketData[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    onPageChange: (page: number) => void;
  };
}

export function MarketDataTable({ city, rows, pagination }: MarketDataTableProps) {

  return (
    <div className=" ">
      
      <div className="mt-10">
        <ReUseAbleTable
          data={rows}
          columns={marketDataColumns}
          entityName="market segments"
          pagination={pagination}
 
        />
       
      </div>
    </div>
  );
}
