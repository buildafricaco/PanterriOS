'use client';

import { DetailsView } from '@/components/dashboard/investors';
import {
  PageHead,
  StatCard,
  StatCardSkeleton,
  StatusBadge,
  TableSkeleton,
} from '@/components/shared';
import { SlideInPanelDrawer } from '@/components/shared/SlideInPanel';
import { ReUseAbleTable } from '@/components/shared/reusableTable';
import { TableFilters } from '@/components/shared/TableFilters';
import { Button } from '@/components/ui/button';
import { useRetrieveInvestors } from '@/hook/investor-management';
import { formatPrice } from '@/utils/formatPrice';
import { type ColumnDef } from '@tanstack/react-table';
import {
  Banknote,
  Calendar,
  Eye,
  List,
  Share,
  TriangleAlert,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface InvestorsDataTableProp {
  id: number;
  code: string;
  name: string;
  email: string;
  kycStatus: string;
  tier: string;
  totalInvested: string;
  walletBalance: string;
  accountStatus: string;
}

export default function Investorspage() {
  const [searchValue, setSearchValue] = useState('');
  const [kycFilter, setKycFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data, isLoading, isError } = useRetrieveInvestors({
    search: searchValue || undefined,
    page: 1,
    limit: 50,
    kycStatus: kycFilter === 'all' ? undefined : kycFilter,
    tierLevel: tierFilter === 'all' ? undefined : tierFilter,
  });

  const investors = useMemo<InvestorsDataTableProp[]>(() => {
    return (data?.data ?? []).map((investor) => ({
      id: investor.investorId,
      code: investor.investorCode,
      name: investor.name,
      email: investor.email,
      kycStatus: investor.kycStatus,
      tier: investor.tierLevel,
      totalInvested: formatPrice(investor.totalInvested),
      walletBalance: formatPrice(investor.walletBalance),
      accountStatus: investor.status,
    }));
  }, [data]);

  const filteredData = useMemo(() => {
    return investors.filter((investor) => {
      if (statusFilter === 'all') return true;
      return investor.accountStatus.toLowerCase() === statusFilter.toLowerCase();
    });
  }, [investors, statusFilter]);

  const metrics = useMemo(() => {
    const summary = data?.summary;
    return [
      {
        label: 'Total Investors',
        value: summary?.totalInvestors ?? 0,
        description: 'All registered users',
        icon: Users,
      },
      {
        label: 'Pending KYC',
        value: summary?.pendingKyc ?? 0,
        description: 'Requires review',
        icon: TriangleAlert,
        color: 'text-orange-500',
      },
      {
        label: 'Total Invested',
        value: formatPrice(summary?.totalInvested ?? 0),
        description: 'Across all investors',
        icon: Banknote,
      },
      {
        label: 'Avg Portfolio',
        value: formatPrice(summary?.averagePortfolio ?? 0),
        description: 'Per investor',
        icon: Wallet,
        iconColor: 'text-[#00A63E]',
      },
    ];
  }, [data]);

  const columns: ColumnDef<InvestorsDataTableProp>[] = [
    {
      accessorKey: 'name',
      header: 'name',
      cell: ({ row }) => (
        <div className="font-semibold text-[#111827]">
          <p>{row.original.name}</p>
          <small className="text-gray-500">{row.original.code}</small>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-400 font-normal">{row.original.email}</div>
      ),
    },
    {
      accessorKey: 'kycStatus',
      header: 'kyc status',
      cell: ({ row }) => <StatusBadge status={row.original.kycStatus} />,
    },
    {
      accessorKey: 'tier',
      header: 'tier',
      cell: ({ row }) => (
        <div className="font-medium text-[#314158]">{row.original.tier}</div>
      ),
    },
    {
      accessorKey: 'totalInvested',
      header: 'total invested',
      cell: ({ row }) => (
        <div className="text-[#0F172B] text-base font-semibold">
          {row.original.totalInvested}
        </div>
      ),
    },
    {
      accessorKey: 'walletBalance',
      header: 'Wallet Balance',
      cell: ({ row }) => (
        <div className="text-[#0F172B] text-base font-semibold">
          {row.original.walletBalance}
        </div>
      ),
    },
    {
      accessorKey: 'accountStatus',
      header: 'account status',
      cell: ({ row }) => <StatusBadge status={row.original.accountStatus} />,
    },
    {
      accessorKey: 'action',
      header: 'action',
      cell: ({ row }) => {
        const id = row.original.id;
        const investorName = row.original.name;

        return (
          <>
            <div className="lg:flex hidden">
              <SlideInPanelDrawer
                trigger={<Eye className="w-5 h-5 text-gray-400" />}
                title="Investor Profile"
                subtitle={`Complete details and activity for ${investorName}`}
                width="lg"
              >
                <DetailsView id={id} />
              </SlideInPanelDrawer>
            </div>
            <Link href={`/investors/${id}`} className="flex lg:hidden">
              <Button variant="outline">
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHead
        pageTitle="Investor Management"
        subTitle="View and manage all investor accounts"
      >
        <Button variant="outline" className="flex items-center gap-2 rounded-sm">
          <Share /> <span className="hidden lg:block">Export CSV</span>
        </Button>
      </PageHead>

      <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap lg:gap-6 gap-3">
        {isLoading ? (
          <StatCardSkeleton count={4} />
        ) : (
          metrics.map((stat) => (
            <StatCard
              label={stat.label}
              description={stat.description}
              value={stat.value}
              Icon={stat.icon}
              color={stat.color}
              key={stat.label}
              iconColor={stat.iconColor}
            />
          ))
        )}
      </div>

      <TableFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search by investor name, email, or code..."
        filters={[
          {
            id: 'kyc',
            label: 'All KYC',
            value: kycFilter,
            onChange: setKycFilter,
            icon: <Calendar className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: 'All KYC', value: 'all' },
              { label: 'Approved', value: 'approved' },
              { label: 'Pending', value: 'pending' },
              { label: 'Rejected', value: 'rejected' },
            ],
          },
          {
            id: 'tier',
            label: 'All Tiers',
            value: tierFilter,
            onChange: setTierFilter,
            icon: <List className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: 'All Tiers', value: 'all' },
              { label: 'Tier 1', value: 'TIER_1' },
              { label: 'Tier 2', value: 'TIER_2' },
              { label: 'Tier 3', value: 'TIER_3' },
              { label: 'Tier 4', value: 'TIER_4' },
              { label: 'Tier 5', value: 'TIER_5' },
            ],
          },
          {
            id: 'status',
            label: 'All Status',
            value: statusFilter,
            onChange: setStatusFilter,
            icon: <User className="h-4 w-4 text-[#6B7280]" />,
            options: [
              { label: 'All Status', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Suspended', value: 'suspended' },
            ],
          },
        ]}
      />

      {isError && (
        <div className="text-sm text-red-600">Failed to load investors data.</div>
      )}

      {isLoading ? (
        <TableSkeleton rows={6} columns={8} />
      ) : (
        <ReUseAbleTable data={filteredData} columns={columns} entityName="Investors" />
      )}
    </div>
  );
}
