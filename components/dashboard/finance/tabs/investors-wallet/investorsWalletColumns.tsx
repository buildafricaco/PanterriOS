import { ColumnDef } from "@tanstack/react-table";
import { type InvestorWalletItem } from "@/interface";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { SlideInPanelDrawer } from "@/components/shared/SlideInPanel";
import { Eye } from "lucide-react";
import { InvestorAudit } from "./InvestorAudit";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

export const investorsWalletColumns: ColumnDef<InvestorWalletItem>[] = [
  {
    accessorKey: "investorName",
    header: "INVESTOR",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">{row.original.investorName}</p>
        <p className="text-sm text-gray-600">{row.original.investorEmail}</p>
        <p className="text-xs text-gray-400">ID: {row.original.investorCode}</p>
      </div>
    ),
  },
  {
    accessorKey: "balance",
    header: "BALANCE",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-gray-900">
          {formatCurrency(row.original.balance)}
        </p>
        <p className="text-xs text-gray-400">
          Available: {formatCurrency(row.original.availableBalance)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "lockedBalance",
    header: "LOCKED",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {formatCurrency(row.original.lockedBalance)}
      </span>
    ),
  },
  {
    accessorKey: "invested",
    header: "RETURNS",
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-gray-900">
          {formatCurrency(row.original.invested)}
        </p>
        <p className="text-xs text-gray-400">
          Returns: {formatCurrency(row.original.returns)}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "statusLabel",
    header: "STATUS",
    cell: ({ row }) => <StatusBadge status={row.original.statusLabel} />,
  },
  {
    accessorKey: "createdAt",
    header: "CREATED",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.createdAt}</span>
    ),
  },
  {
    accessorKey: "action",
    header: "action",
    cell: ({ row }) => {
      const wallet = row.original;

      return (
        <SlideInPanelDrawer
          trigger={
            <Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
          }
          title="Wallet Control Center"
          subtitle="Manage investor wallet settings "
          width="md"
          contentClassName={"mx-0"}
        >
          <InvestorAudit investorId={wallet.investorId} />
        </SlideInPanelDrawer>
      );
    },
  },
];
