import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { InvestorOverviewRes } from '@/interface';
import { formatPrice } from '@/utils/formatPrice';
import { ColumnDef } from '@tanstack/react-table';

type InvestmentItem = InvestorOverviewRes['data']['investmentDetails']['data'][number];

interface InvestmentsTableProps {
  investments: InvestmentItem[];
}

export function InvestmentsTable({ investments }: InvestmentsTableProps) {
  const columns: ColumnDef<InvestmentItem>[] = [
    {
      accessorKey: 'propertyName',
      header: 'Property',
      cell: ({ row }) => {
        const location = [
          row.original.location?.city,
          row.original.location?.state,
        ]
          .filter(Boolean)
          .join(', ');
        return (
          <div>
            <p>{row.original.propertyName}</p>
            <small className="text-gray-500">{location || 'N/A'}</small>
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => (
        <div className="text-gray-400">{formatPrice(row.original.amount)}</div>
      ),
    },
    {
      accessorKey: 'roi',
      header: 'ROI',
      cell: ({ row }) => <div className="font-medium">{row.original.roi}%</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        const isActive = status === 'active';
        return (
          <span
            className={`text-xs px-2 border py-0.5 h-fit capitalize ${isActive ? 'text-green-600 bg-green-50 border-green-500' : 'text-blue-600 bg-blue-50 border-blue-500'}`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  return <ReUseAbleTable columns={columns} data={investments} />;
}
