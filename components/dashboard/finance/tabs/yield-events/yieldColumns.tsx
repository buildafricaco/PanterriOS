import type { ReusableTableColumnDef } from '@/components/shared/reusableTable';
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/shared";
import { SlideInPanelDrawer } from "@/components/shared/SlideInPanel";
import Link from "next/link";
import { YieldDisbursementItem } from "@/interface";
import { formatCurrency } from "@/utils/helpers";
import { YieldDisburseDetails } from "./YieldDisburseDetail/YieldDisburseDetails";

function renderStatusBreakdown(
  statusBreakdown: YieldDisbursementItem["statusBreakdown"],
) {
  const badges: ReactNode[] = [];

  if (statusBreakdown.disbursed > 0) {
    badges.push(
      <span
        key="disbursed"
        className="inline-flex items-center gap-2 rounded-sm border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
      >
        {statusBreakdown.disbursed} Disbursed
      </span>,
    );
  }

  if (statusBreakdown.flagged > 0) {
    badges.push(
      <span
        key="flagged"
        className="inline-flex items-center gap-2 rounded-sm border border-red-300 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
      >
        {statusBreakdown.flagged} Flagged
      </span>,
    );
  }

  if (statusBreakdown.pending > 0) {
    badges.push(
      <span
        key="pending"
        className="inline-flex items-center gap-2 rounded-sm border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
      >
        {statusBreakdown.pending} Pending
      </span>,
    );
  }

  return badges;
}

export const yieldColumns: ReusableTableColumnDef<YieldDisbursementItem>[] = [
  {
    accessorKey: "eventId",
    header: "Event ID",
    cell: ({ row }) => {
      const ref = row.original.eventId;
      const displayRef = ref.length > 25 ? ref.substring(0, 25) + "..." : ref;
      return (
        <span
          className="font-medium text-base text-gray-900 cursor-pointer"
          title={ref}
        >
          {displayRef}
        </span>
      );
    },
  },
  {
    accessorKey: "investmentName",
    header: "Property Name",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.investmentName}</span>
    ),
  },
  {
    accessorKey: "totalInvestors",
    header: "Investors",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.original.totalInvestors}</span>
    ),
  },
  {
    accessorKey: "yieldRate",
    header: "Yield Rate",
    cell: ({ row }) => (
      <span
        className={
          "inline-flex items-center gap-2 rounded-sm border px-3 py-1 text-xs font-medium border-[#BEDBFF] bg-[#EFF6FF]  text-[#1447E6]"
        }
      >
        {row.original.yieldRate}%
      </span>
    ),
  },

  {
    accessorKey: "totalPayout",
    header: "Total Payout",
    cell: ({ row }) => (
      <span className="font-semibold text-[#00A63E]">
        {formatCurrency(row.original.totalPayout)}
      </span>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date & Time",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.dateTime}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusBreakdown = row.original.statusBreakdown;
      const allDisbursed =
        statusBreakdown.flagged === 0 &&
        statusBreakdown.pending === 0 &&
        statusBreakdown.disbursed > 0;

      if (allDisbursed) {
        return (
          <span className="inline-flex items-center gap-2 rounded-sm border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            All Disbursed
          </span>
        );
      }

      const badges = renderStatusBreakdown(statusBreakdown);

      return (
        <div className="flex flex-wrap items-center gap-2">
          {badges.length > 0 ? (
            badges
          ) : (
            <StatusBadge status={row.original.status} showDot />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const status = row.original.status;
      const eventId = row.original.eventId;
      const investmentId = row.original.investmentId;

      if (status === "pending") {
        return (
          <SlideInPanelDrawer
            trigger={
              <button className="flex items-center rounded-md border px-2 py-2 text-[12px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                View Details
              </button>
            }
            title="Yield Distribution Ledger"
            subtitle="Review investors and disburse pending yield"
            width="lg"
            contentClassName="mx-0"
          >
            {(setOpen) => (
              <YieldDisburseDetails
                eventId={eventId}
                investmentId={investmentId}
                onSuccess={() => setOpen(false)}
              />
            )}
          </SlideInPanelDrawer>
        );
      }

      return (
        <Link
          href={`/finance/yield-events/${eventId}`}
          className="flex items-center rounded-md border px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          View Ledger
        </Link>
      );
    },
  },
];
