'use client';

import { useMemo, useState } from 'react';
import { PageHead, ReUseAbleTable, TableSkeleton } from '@/components/shared';
import { Input } from '@/components/ui/input';
import { ReusableSelect } from '@/components/ui/ReusableSelect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRetrieveAssignedApprovalQueue } from '@/hook/approval-queue/useRetrieveAssignedApprovalQueue';
import { useRetrieveSubmittedApprovalQueue } from '@/hook/approval-queue/useRetrieveSubmittedApprovalQueue';
import { debounce } from '@/utils/helpers';
import { Search } from 'lucide-react';
import { approvalQueueColumns } from './approvalQueueColumns';

const moduleOptions = [
  { label: 'All Modules', value: 'all' },
  { label: 'Investment', value: 'Investment' },
  { label: 'Investors', value: 'Investors' },
  { label: 'Wallets & Finance', value: 'Wallets & Finance' },
  { label: 'Market Data', value: 'Market Data' },
  { label: 'Articles', value: 'Articles' },
];

const statusOptions = [
  { label: 'All Status', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Returned', value: 'returned' },
  { label: 'Rejected', value: 'rejected' },
];

export function ApprovalQueueModule() {
  const [activeTab, setActiveTab] = useState<'submitted' | 'assigned'>(
    'submitted',
  );
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const params = {
    page,
    limit: 10,
    module: moduleFilter === 'all' ? undefined : moduleFilter,
    status: statusFilter === 'all' ? undefined : statusFilter,
    search: debouncedSearch || undefined,
  };

  const submittedQuery = useRetrieveSubmittedApprovalQueue(
    params,
    activeTab === 'submitted',
  );
  const assignedQuery = useRetrieveAssignedApprovalQueue(
    params,
    activeTab === 'assigned',
  );

  const currentQuery =
    activeTab === 'submitted' ? submittedQuery : assignedQuery;
  const queueData = currentQuery.data?.data.data ?? [];
  const pagination = currentQuery.data?.data?.pagination;
  const isLoading = currentQuery.isLoading;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    debouncedSetSearch(value);
  };

  const tabs: Array<{
    label: string;
    value: 'submitted' | 'assigned';
    count: number;
  }> = [
    {
      label: 'Submitted by me',
      value: 'submitted',
      count: Number(submittedQuery.data?.data?.pagination?.totalItems ?? 0),
    },
    {
      label: 'Assigned to me',
      value: 'assigned',
      count: Number(assignedQuery.data?.data?.pagination?.totalItems ?? 0),
    },
  ];

  return (
    <div className="w-full space-y-6">
      <PageHead
        pageTitle="Requests"
        subTitle="Approval requests across all active workflows"
      />

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as 'submitted' | 'assigned');
            setPage(1);
          }}
          className="w-full"
        >
          <TabsList className="inline-flex h-auto w-fit justify-start gap-3 rounded-none bg-slate-100 p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-md px-4 py-3 text-sm font-medium text-gray-900 data-[state=active]:bg-black data-[state=active]:text-white"
              >
                <span>{tab.label}</span>
                {tab.count > 0 ? (
                  <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#2563EB] px-2 text-xs font-medium text-white data-[state=active]:bg-white data-[state=active]:text-black">
                    {tab.count}
                  </span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="pt-6">
              <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
                <div className="border-b border-[#E5E7EB] p-5">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="w-full lg:w-[200px]">
                      <ReusableSelect
                        items={moduleOptions}
                        placeholder="All Modules"
                        value={moduleFilter}
                        onChange={(value) => {
                          setModuleFilter(value);
                          setPage(1);
                        }}
                      />
                    </div>

                    <div className="w-full lg:w-[200px]">
                      <ReusableSelect
                        items={statusOptions}
                        placeholder="All Status"
                        value={statusFilter}
                        onChange={(value) => {
                          setStatusFilter(value);
                          setPage(1);
                        }}
                      />
                    </div>

                    <div className="relative w-full lg:max-w-xl">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B9BB4]" />
                      <Input
                        value={search}
                        onChange={(event) =>
                          handleSearchChange(event.target.value)
                        }
                        placeholder="Search approval queue"
                        className="h-12 rounded-md border-0 bg-[#F8FAFC] pl-12 text-base shadow-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  {isLoading ? (
                    <TableSkeleton
                      rows={8}
                      columns={tab.value === 'assigned' ? 7 : 6}
                    />
                  ) : (
                    <ReUseAbleTable
                      data={queueData}
                      columns={approvalQueueColumns(activeTab)}
                      entityName="Requests"
                      pagination={
                        pagination
                          ? {
                              currentPage: Number(pagination.currentPage ?? 1),
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
