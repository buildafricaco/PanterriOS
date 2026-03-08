'use client';

import { CircleCheckBig } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMemo, useState } from 'react';
import { AccountInfoAndSummary } from './overviewTab';
import { InvestmentsTable } from './investmentsTab';
import { Button } from '@/components/ui/button';
import { TransactionTable } from './transactionsTab';
import { KycDetail } from './kyc-detailTab';
import { InvestorDetailsSkeleton, StatCard } from '@/components/shared';
import { useRetrieveInvestorOverview } from '@/hook/investor-management';
import { formatPrice } from '@/utils/formatPrice';

interface DetailsViewProp {
  id?: string | number;
}

function getInvestorId(id?: string | number): number | undefined {
  if (typeof id === 'number' && Number.isFinite(id)) return id;
  if (typeof id === 'string' && id.trim()) {
    const parsed = Number(id);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

export function DetailsView({ id }: DetailsViewProp) {
  const [tab, setTab] = useState('overview');
  const investorId = useMemo(() => getInvestorId(id), [id]);
  const { data, isLoading, isError } = useRetrieveInvestorOverview(investorId);

  if (!investorId) {
    return (
      <div className="border rounded-lg p-4 text-sm text-red-600">
        Invalid investor ID.
      </div>
    );
  }

  if (isLoading) {
    return <InvestorDetailsSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <div className="border rounded-lg p-4 text-sm text-red-600">
        Failed to load investor details.
      </div>
    );
  }

  const overviewData = data.data;
  const header = overviewData.header;
  const cards = overviewData.investorOverview.cards;

  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: (
        <AccountInfoAndSummary
          accountInformation={overviewData.investorOverview.accountInformation}
          investmentSummary={overviewData.investorOverview.investmentSummary}
        />
      ),
    },
    {
      title: 'Investments',
      value: 'investments',
      content: <InvestmentsTable investments={overviewData.investmentDetails.data} />,
    },
    {
      title: 'Transactions',
      value: 'transactions',
      content: <TransactionTable transactions={overviewData.transactionDetails.data} />,
    },
    {
      title: 'KYC Details',
      value: 'kyc-details',
      content: <KycDetail kycData={overviewData.kycDetails.data} />,
    },
  ];

  return (
    <div className="w-full space-y-4 px-0">
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
          <div className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-full bg-black flex items-center justify-center uppercase text-xl sm:text-2xl text-white">
              {header.initials || header.fullName.slice(0, 2)}
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col gap-2 min-[430px]:flex-row min-[430px]:items-start min-[430px]:justify-between">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight truncate">
                  {header.fullName}
                </h2>
                <div className="text-sm space-y-0.5 mt-1">
                  <p className="text-gray-600 truncate">{header.email}</p>
                  <p className="text-gray-600">
                    Investor ID:{' '}
                    <span className="font-medium text-gray-900">
                      {header.investorCode}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 min-[430px]:justify-end">
                {header.kycApproved && (
                  <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 border border-green-300 rounded-md flex items-center gap-1 whitespace-nowrap h-fit">
                    <CircleCheckBig className="w-3 h-3" />
                    KYC Verified
                  </div>
                )}
                <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 border border-green-300 rounded-md whitespace-nowrap h-fit">
                  {header.accountStatus}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 min-[430px]:grid-cols-3 gap-2 min-[430px]:gap-0">
                <div className="flex flex-col min-[430px]:px-4 first:min-[430px]:pl-0 min-[430px]:border-r border-gray-300">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Member Since
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
                    {header.memberSince}
                  </span>
                </div>
                <div className="flex flex-col min-[430px]:px-4 min-[430px]:border-r border-gray-300">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Tier Level
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
                    {header.tierLevel}
                  </span>
                </div>
                <div className="flex flex-col min-[430px]:px-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Total Investments
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
                    {header.totalInvestments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <StatCard
          label="Total Invested"
          value={formatPrice(cards.totalInvested)}
          description="Lifetime"
        />
        <StatCard
          label="Wallet Balance"
          value={formatPrice(cards.walletBalance)}
          description="Available"
        />
        <StatCard
          label="Returns Earned"
          value={formatPrice(cards.returnsEarned)}
          description="All time"
          color="text-green-500 text-lg"
        />
        <StatCard
          label="Avg ROI"
          value={`${cards.avgRoi}%`}
          description="Portfolio avg"
          color="text-green-500"
        />
      </div>

      <Tabs defaultValue={tab} className="w-full space-y-4">
        <div className="w-full">
          <TabsList className="grid w-full grid-cols-2 min-[430px]:grid-cols-4 bg-gray-100 p-1 rounded-lg h-auto gap-1">
            {tabs.map((item) => (
              <TabsTrigger
                value={item.value}
                key={item.value}
                onClick={() => setTab(item.value)}
                className="text-xs sm:text-sm whitespace-nowrap px-2 py-1.5"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((item) => (
          <TabsContent
            value={item.value}
            key={item.value}
            className="focus-visible:outline-none"
          >
            {item.content}
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-end pt-2 pb-1">
        <Button variant="destructive" className="w-full min-[430px]:w-auto">
          Suspend Account
        </Button>
      </div>
    </div>
  );
}
