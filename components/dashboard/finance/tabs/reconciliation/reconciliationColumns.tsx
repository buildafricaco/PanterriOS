import { ColumnDef } from "@tanstack/react-table";
import { ReconciliationRecord } from "./types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";

export const reconciliationColumns: ColumnDef<ReconciliationRecord>[] = [
  {
    accessorKey: "auditId",
    header: "Audit ID/Created",
    cell: ({ row }) => (
      <span className="font-medium text-gray-900">
        {row.getValue("auditId")}
      </span>
    ),
  },
  {
    accessorKey: "formattedLedgerBalance",
    header: "Ledger Balance",
    cell: ({ row }) => (
      <span className="font-semibold text-gray-900">
        {row.getValue("formattedLedgerBalance")}
      </span>
    ),
  },
  {
    accessorKey: "formattedPreviousBalance",
    header: "Previous Balance",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-gray-900">
          {row.getValue("formattedPreviousBalance")}
        </span>
        <span className="text-red-600 text-sm">
          {row.original.formattedDebitFinance}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "auditStatus",
    header: "Debit Finance",
    cell: ({ row }) => {
      const status = row.getValue("auditStatus") as string;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "status",
    header: "Audit Status",
    cell: ({ row }) => {
      const status = row.original.auditStatus as string;
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "verifiedBy",
    header: "Verified By",
    cell: ({ row }) => (
      <span className="text-gray-700 capitalize">{row.getValue("verifiedBy")}</span>
    ),
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: () => (
      <Button
        variant="outline"
        size="sm"
        className="text-gray-black border border-black hover:text-gray-900"
      >
        Review
      </Button>
    ),
  },
];
