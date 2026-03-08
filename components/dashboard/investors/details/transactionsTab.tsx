import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { InvestorOverviewRes } from '@/interface';
import { formatPrice } from '@/utils/formatPrice';
import { ColumnDef } from '@tanstack/react-table';

type TransactionItem = InvestorOverviewRes['data']['transactionDetails']['data'][number];

interface TransactionTableProps {
  transactions: TransactionItem[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const columns: ColumnDef<TransactionItem>[] = [
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <p>{row.original.date}</p>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.original.type.toLowerCase();
        const isDebit = row.original.direction.toLowerCase() === 'debit';
        return (
          <span
            className={`text-xs px-2 border py-0.5 h-fit capitalize ${isDebit ? 'text-gray-600 bg-gray-50 border-gray-500' : 'text-green-600 bg-green-50 border-green-500'}`}
          >
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div className="font-medium">{row.original.description}</div>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const direction = row.original.direction.toLowerCase();
        const sign = direction === 'debit' ? '-' : '+';
        const formattedAmount = `${sign}${formatPrice(row.original.amount)}`;
        return (
          <div className={direction === 'debit' ? 'text-black' : 'text-green-500'}>
            {formattedAmount}
          </div>
        );
      },
    },
  ];

  return <ReUseAbleTable columns={columns} data={transactions} />;
}
