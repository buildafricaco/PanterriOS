"use client";
import { ReUseAbleTable } from "@/components/shared/reusableTable";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { InvestmentDetailsView } from "./details/investmentDetailsView";
import { StatusBadge } from "@/components/shared";
import { InvestmentListItem } from "@/interface";

interface AllInvestmentsProps {
  data: InvestmentListItem[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
  };
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function AllInvestments({
  data,
  pagination,
  currentPage,
  onPageChange,
}: AllInvestmentsProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value);

  const columns: ColumnDef<InvestmentListItem>[] = [
    {
      accessorKey: "propertyName",
      header: "property",
      cell: ({ row }) => (
        <div className="">
          <p>{row.original.propertyName} </p>
          <small className="text-gray-500 flex items-center gap-1">
            {" "}
            {/* <MapPin className="w-3 h-3" /> <span> {row.original.location}</span> */}
          </small>
        </div>
      ),
    },
    {
      accessorKey: "propertyType",
      header: "type",
      cell: ({ row }) => <div>{row.original.propertyType}</div>,
    },

    {
      accessorKey: "investmentStatus",
      header: " status",
      cell: ({ row }) => {
        const status = row.original.investmentStatus;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "funding",
      header: "funding",
      cell: ({ row }) => {
        const value = row.original.funding;
        return (
          <div className=" flex items-center gap-2">
            <Progress
              value={value}
              className={cn(
                "rounded-sm bg-gray-200",
                value > 85 && "[&>div]:bg-green-500",
                value <= 85 && value > 75 && "[&>div]:bg-blue-500",
                value <= 75 && "[&>div]:bg-red-500",
                "[&>div]:transition-colors duration-300",
              )}
            />
            {value}%
          </div>
        );
      },
    },
    {
      accessorKey: "targetAmount",
      header: "target",
      cell: ({ row }) => <div>{formatCurrency(row.original.targetAmount)}</div>,
    },
    {
      accessorKey: "amountRaised",
      header: "raised",
      cell: ({ row }) => <div>{formatCurrency(row.original.amountRaised)}</div>,
    },

    {
      accessorKey: "returns",
      header: "returns",
      cell: ({ row }) => (
        <div className=" text-blue-600">{row.original.returns}%</div>
      ),
    },
    {
      accessorKey: "totalNumberOfInvestors",
      header: "investors",
      cell: ({ row }) => <div>{row.original.totalNumberOfInvestors}</div>,
    },
    {
      accessorKey: "action",
      header: "action",
      cell: ({ row }) => {
        return (
          <>
            <InvestmentDetailsView id={row.original.id}>
              <Button variant={"outline"}>
                <Eye className="w-5 h-5" />
              </Button>
            </InvestmentDetailsView>
            {/* <Link href={"/investments/" + id} className="flex lg:hidden">
              <Button variant={"outline"}>
                <Eye className="w-5 h-5" />
              </Button>
            </Link> */}
          </>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <ReUseAbleTable
        data={data}
        columns={columns}
        entityName="All Investments"
        pagination={{
          currentPage,
          totalPages: pagination?.totalPages || 1,
          totalItems: pagination?.totalItems || data.length,
          limit: pagination?.limit || 20,
          onPageChange,
        }}
      />
    </div>
  );
}
