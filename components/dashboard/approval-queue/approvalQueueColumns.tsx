'use client';

import Link from 'next/link';
import { type ColumnDef } from '@tanstack/react-table';
import { type ApprovalQueueItem } from '@/interface';
import { StatusBadge } from '@/components/shared/StatusBadge';

export const approvalQueueColumns = (
  activeTab: 'submitted' | 'assigned',
): ColumnDef<ApprovalQueueItem>[] => {
  const submittedByColumn: ColumnDef<ApprovalQueueItem>[] =
    activeTab === 'assigned'
      ? [
          {
            id: 'submittedBy',
            header: 'Submitted By',
            cell: ({ row }) => (
              <Link href={`/approval-queue/${row.original.id}`}>
                <span className="text-base text-[#526581]">
                  {row.original.submittedBy?.name ?? '-'}
                </span>
              </Link>
            ),
          },
        ]
      : [];

  return [
    {
      accessorKey: 'reference',
      header: 'ID',
      cell: ({ row }) => (
        <Link href={`/approval-queue/${row.original.id}`}>
          <span className="text-base font-semibold text-[#0F172A]">
            {row.original.reference}
          </span>
        </Link>
      ),
    },
    {
      accessorKey: 'workflowName',
      header: 'Workflow Name',
      cell: ({ row }) => (
        <Link
          href={`/approval-queue/${row.original.id}`}
          className="text-base text-[#111827] hover:text-[#2563EB]"
        >
          {row.original.workflowName}
        </Link>
      ),
    },
    {
      accessorKey: 'module',
      header: 'Module',
      cell: ({ row }) => (
        <Link href={`/approval-queue/${row.original.id}`}>
          <span className="text-base text-[#111827]">
            {row.original.module}
          </span>
        </Link>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <Link href={`/approval-queue/${row.original.id}`}>
          <span className="text-base text-[#111827]">
            {row.original.action}
          </span>
        </Link>
      ),
    },
    ...submittedByColumn,
    {
      accessorKey: 'requestStatus',
      header: 'Status',
      cell: ({ row }) => (
        <Link href={`/approval-queue/${row.original.id}`}>
          {' '}
          <StatusBadge status={row.original.requestStatus} />
        </Link>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date Submitted',
      cell: ({ row }) => (
        <Link href={`/approval-queue/${row.original.id}`}>
          <span className="text-base whitespace-nowrap text-[#526581]">
            {row.original.createdAt}
          </span>
        </Link>
      ),
    },
  ];
};
