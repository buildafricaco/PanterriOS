import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { StatusBadge } from "@/components/shared";
import { Input } from "@/components/ui/input";
import {
  type InvestmentInvestorItem,
  type InvestmentInvestors,
} from "@/interface";
import { ColumnDef } from "@tanstack/react-table";

interface PropertyInvestorsProps {
  investors: InvestmentInvestors;
}

interface InvestorTableRow {
  id: number;
  name: string;
  amount: number;
  date: string;
  stakePercentage: number;
  paymentStatus: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

const mapInvestorRow = (investor: InvestmentInvestorItem, index: number): InvestorTableRow => ({
  id: investor.id ?? investor.investorId ?? index + 1,
  name: investor.investorName ?? "Unknown Investor",
  amount: investor.amountInvested ?? 0,
  date: investor.investmentDate ?? "-",
  stakePercentage: investor.stakePercentage ?? 0,
  paymentStatus: investor.paymentStatus ?? "pending",
});

export default function PropertyInvestors({ investors }: PropertyInvestorsProps) {
  const tableData = investors.data.map(mapInvestorRow);

  const columns: ColumnDef<InvestorTableRow>[] = [
    {
      accessorKey: "name",
      header: "Investor",
      cell: ({ row }) => {
        const name = row.original.name;
        const date = row.original.date;

        return (
          <div>
            <p>{name}</p>
            <small className="text-gray-500 flex items-center gap-1">{date}</small>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="text-right">
          <p>{formatCurrency(row.original.amount)}</p>
          <small className="text-gray-500">{row.original.stakePercentage}% stake</small>
        </div>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Status",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <StatusBadge status={row.original.paymentStatus} className="capitalize" />
        </div>
      ),
    },
  ];

  return (
    <div className="border p-3 space-y-4 my-4 rounded-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h2 className="text-lg font-semibold">Active Investors</h2>
          <small>
            {investors.summary.totalInvestors} investors - {formatCurrency(investors.summary.totalAmountRaised)} total
          </small>
        </div>
        <Input placeholder="Search investors..." className="bg-gray-100 sm:w-64" disabled />
      </div>

      <ReUseAbleTable data={tableData} columns={columns} />
    </div>
  );
}
