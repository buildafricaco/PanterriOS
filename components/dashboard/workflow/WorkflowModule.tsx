'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/ReusableSelect';
import {
  PageHead,
  ReUseAbleTable,
  StatCard,
  StatCardSkeleton,
  TableSkeleton,
} from '@/components/shared';
import { modulePermission, workflowStatusOptions } from './data';
import { Boxes, Plus, Search } from 'lucide-react';
import { workflowColumns } from './workflowColumns';
import { useRetrieveWorkflows } from '@/hook/workflow/useRetrieveWorkflows';

export function WorkflowModule() {
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: workflow, isLoading } = useRetrieveWorkflows({
    module: moduleFilter === 'all' ? undefined : moduleFilter,
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: search.trim() ? search.trim() : undefined,
  });

  const pagination = workflow?.data?.pagination;
  const totalWorkflows = pagination?.totalItems ?? 0;
  const pendingWorkflows = 0;

  const moduleOptions = modulePermission.map((p) => ({
    label: p.module,
    value: p.module,
  }));
  const workflowStats = [
    {
      label: 'Total Workflows',
      value: totalWorkflows,
      icon: Boxes,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Pending Workflows',
      value: pendingWorkflows,
      icon: Boxes,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-100',
    },
  ];
  const filterOption = [
    { label: 'All Modules', value: 'all' },
    ...moduleOptions,
  ];

  return (
    <div className="w-full space-y-6">
      <PageHead
        pageTitle="Workflows"
        subTitle="Manage approval and operational workflows across the platforms"
      >
        <Link href="/workflow/create-workflow">
          <Button className="h-11 rounded-md bg-[#111111] px-5 text-base hover:bg-[#111111]/90">
            <Plus className="h-5 w-5" />
            Create Workflow
          </Button>
        </Link>
      </PageHead>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {!workflowStats ? (
          <StatCardSkeleton />
        ) : (
          workflowStats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                Icon={IconComponent}
                iconColor={stat.iconColor}
                bgColor={stat.bgColor}
              />
            );
          })
        )}
      </div>

      <div className="overflow-hidden rounded-2xl  bg-white">
        <div className=" p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="w-full lg:w-50">
              <ReusableSelect
                items={filterOption}
                placeholder="All Modules"
                value={moduleFilter}
                onChange={setModuleFilter}
              />
            </div>

            <div className="w-full lg:w-50">
              <ReusableSelect
                items={workflowStatusOptions}
                placeholder="All Status"
                value={statusFilter}
                onChange={setStatusFilter}
              />
            </div>

            <div className="relative w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B9BB4]" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search Workflows"
                className="h-12 rounded-md border-0 bg-[#F8FAFC] pl-12 text-base shadow-none"
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          {isLoading ? (
            <TableSkeleton rows={8} columns={6} />
          ) : (
            <ReUseAbleTable
              data={workflow?.data.data || []}
              columns={workflowColumns}
              entityName="Workflows"
              pagination={
                pagination
                  ? {
                      currentPage: Number(pagination.currentPage ?? page),
                      totalPages: Number(pagination.totalPages ?? 1),
                      totalItems: Number(pagination.totalItems ?? 0),
                      limit: Number(pagination.limit ?? 10),
                      onPageChange: setPage,
                    }
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
