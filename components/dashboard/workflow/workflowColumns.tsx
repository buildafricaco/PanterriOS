'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { type ColumnDef } from '@tanstack/react-table';

import { WorkflowDefinitionListItem } from '@/interface';
import { ConfirmationDialog } from '@/components/shared';
import { useDeleteWorkflow } from '@/hook/workflow';

function WorkflowActionsCell({
  workflow,
}: {
  workflow: WorkflowDefinitionListItem;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutateAsync: deleteWorkflowFn, isPending: isDeletingWorkflow } =
    useDeleteWorkflow();

  const handleDeleteWorkflow = async () => {
    if (!workflow.publicId) return;
    await deleteWorkflowFn(workflow.publicId);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-end gap-4">
        <Link href={`/workflow/create-workflow/${workflow.publicId}`}>
          <Pencil className="h-5 w-5 " />
        </Link>
        <button
          type="button"
          aria-label={`Delete ${workflow.name}`}
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={isDeletingWorkflow}
        >
          <Trash2 className="h-5 w-5 text-[#FF1F1F]" />
        </button>
      </div>

      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        variant="delete"
        title="Delete workflow"
        description={`This will permanently delete "${workflow.name}" and cannot be undone.`}
        onConfirm={handleDeleteWorkflow}
        isLoading={isDeletingWorkflow}
      />
    </>
  );
}

export const workflowColumns: ColumnDef<WorkflowDefinitionListItem>[] = [
  {
    accessorKey: 'name',
    header: 'Workflow Name',
    cell: ({ row }) => (
      <Link href={`/workflow/${row.original.publicId}`} className="  ">
        {row.original.name}
      </Link>
    ),
  },
  {
    accessorKey: 'module',
    header: 'Module',
    cell: ({ row }) => (
      <Link href={`/workflow/${row.original.publicId}`} className="  ">
        {row.original.module}
      </Link>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <Link href={`/workflow/${row.original.publicId}`} className="  ">
        {row.original.action}
      </Link>
    ),
  },
  {
    id: 'steps',
    header: 'Steps',
    cell: ({ row }) => (
      <Link
        href={`/workflow/${row.original.publicId}`}
        className=" text-[#526581] "
      >
        {row.original.stepsCount} steps
      </Link>
    ),
  },
  {
    accessorKey: 'triggersCount',
    header: 'Triggers',
    cell: ({ row }) => (
      <Link
        href={`/workflow/${row.original.publicId}`}
        className=" text-[#526581] "
      >
        {row.original.triggersCount}
      </Link>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Link href={`/workflow/${row.original.publicId}`}>
        <span
          className={`inline-flex rounded-md border px-3 py-1 text-sm capitalize ${
            row.original.status === 'active'
              ? 'border-[#BBF7D0] bg-[#F0FFF4] text-[#16A34A]'
              : 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]'
          }`}
        >
          {row.original.status}
        </span>
      </Link>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => (
      <Link href={`/workflow/${row.original.publicId}`}>
        <span className=" whitespace-nowrap text-[#526581]">
          {row.original.updatedAt}
        </span>{' '}
      </Link>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <WorkflowActionsCell workflow={row.original} />,
  },
];
