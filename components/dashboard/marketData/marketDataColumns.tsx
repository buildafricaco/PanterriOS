import { type ColumnDef } from "@tanstack/react-table";
import { PencilLine } from "lucide-react";
import type { MarketData } from "@/interface/marketData.entity";
import { formatCurrency } from "@/utils/helpers";

export const marketDataColumns: ColumnDef<MarketData>[] = [
  {
    accessorKey: "subMarket",
    header: "Sub Market",
    cell: ({ row }) => (
      <div className="font-medium text-[#111827]">
        {row.original.subMarket === "N/A" ? "-" : row.original.subMarket}
      </div>
    ),
  },

  {
    accessorKey: "sampleAssetType",
    header: "Sample Asset",
    cell: ({ row }) => (
      <div className="font-medium capitalize text-[#0F172A]">
        {row.original.sampleAssetType === "N/A"
          ? "-"
          : row.original.sampleAssetType}
      </div>
    ),
  },
  {
    accessorKey: "averageSalePrice",
    header: "avg sale price",
    cell: ({ row }) => (
      <div className="font-semibold text-[#0F172A]">
        {row.original.averageSalePrice === "N/A"
          ? "-"
          : formatCurrency(row.original.averageSalePrice)}
      </div>
    ),
  },
  {
    accessorKey: "medianRent",
    header: "median rent",
    cell: ({ row }) => (
      <div className="font-semibold text-[#0F172A]">
        {row.original.medianRent === "N/A"
          ? "-"
          : formatCurrency(row.original.medianRent)}
      </div>
    ),
  },
  {
    accessorKey: "rentMin",
    header: "rent range",
    cell: ({ row }) => {
      // const rentRange = `${formatCurrency(row.original.rentMin)} - ${formatCurrency(row.original.rentMax)}`;
      return (
        <div className="font-medium text-[#334155]">
          {row.original.rentMin.includes("N/A")
            ? "-"
            : `${formatCurrency(row.original.rentMin)} - ${formatCurrency(row.original.rentMax)}`}
        </div>
      );
    },
  },

  {
    accessorKey: "averageYearOverYearGrowth",
    header: "yoy growth",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">
        {row.original.averageYearOverYearGrowth === "N/A"
          ? "-"
          : row.original.averageYearOverYearGrowth}
        %
      </div>
    ),
  },
  {
    accessorKey: "yield",
    header: "yield",
    cell: ({ row }) => (
      <div className="inline-flex rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700">
        {row.original.yield === "N/A" ? "-" : row.original.yield}%
      </div>
    ),
  },
  {
    id: "actions",
    header: "actions",
    cell: () => (
      <button
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#111827] transition-colors hover:bg-[#F8FAFC]"
        aria-label="Edit market row"
      >
        <PencilLine className="h-4 w-4" />
      </button>
    ),
  },
];
