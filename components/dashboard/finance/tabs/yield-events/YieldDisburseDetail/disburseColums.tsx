import { YieldDisbursementLedgerInvestor } from "@/interface";
import { formatCurrency } from "@/utils/helpers";
import type { ReusableTableColumnDef } from '@/components/shared/reusableTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleAlert, Flag, MoreVertical } from "lucide-react";

interface DisburseColumnsOptions {
  eventId: string;
  isFlagging?: boolean;
  onFlagDisbursement: (params: {
    eventId: string;
    investmentFundId: number;
    investorName: string;
  }) => void | Promise<void>;
}

function PendingStatusChip({ status }: { status: string }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-2 rounded-sm border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        <CircleAlert className="h-3.5 w-3.5" />
        Pending
      </span>
    );
  }

  if (status === "disbursed") {
    return (
      <span className="inline-flex items-center gap-2 rounded-sm border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
        Disbursed
      </span>
    );
  }

  if (status === "flagged") {
    return (
      <span className="inline-flex items-center gap-2 rounded-sm border border-red-300 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
        Flagged
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-sm border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
      {status}
    </span>
  );
}

export const getDisburseColumns = ({
  eventId,
  isFlagging = false,
  onFlagDisbursement,
}: DisburseColumnsOptions): ReusableTableColumnDef<YieldDisbursementLedgerInvestor>[] => [
  {
    accessorKey: "investorName",
    header: "INVESTOR NAME",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-slate-800">
          {row.original.investorName}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {row.original.disbursementCode}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "amountInvested",
    header: "AMOUNT INVESTED",
    cell: ({ row }) => (
      <span className="font-semibold text-[#00A63E]">
        {formatCurrency(row.original.amountInvested)}
      </span>
    ),
  },
  {
    accessorKey: "payoutAmount",
    header: "YIELD AMOUNT",
    cell: ({ row }) => (
      <span className="font-semibold text-slate-500">
        on {formatCurrency(row.original.payoutAmount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <PendingStatusChip status={row.original.status} />,
  },
  {
    accessorKey: "action",
    header: "ACTION",
    cell: ({ row }) => {
      const canFlag = row.original.canFlag;

      const handleFlag = async () => {
        await onFlagDisbursement({
          eventId,
          investmentFundId: row.original.investmentFundId,
          investorName: row.original.investorName,
        });
      };

      const disableFlag = !canFlag;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open row actions"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[140px]">
            <DropdownMenuItem
              onClick={handleFlag}
              disabled={disableFlag}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <Flag className="mr-2 h-4 w-4 text-red-600" />
              {isFlagging ? "Flagging..." : "Flag"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
