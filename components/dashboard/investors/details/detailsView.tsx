'use client';

import Image from 'next/image';
import ProfilePic from '@/assets/images/ahmed.png';
import { CircleCheckBig } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { AccountInfoAndSummary } from './account-info-and-summary';
import { InvestmentsTable } from './investmentsTable';
import { Button } from '@/components/ui/button';
import { TransactionTable } from './transactionTable';
import { KycDetail } from './kyc-detail';
import { StatCard } from '@/components/shared';

interface DetailsViewProp {
  id: string | number;
}
export function DetailsView({ id }: DetailsViewProp) {
  const [tab, setTab] = useState('overview');
  const profile = {
    name: 'Ahmed Faruq',
    email: 'john.doe@example.com',
    id: '00001',
    profileImg: ProfilePic,
    subPage: [
      {
        holder: 'Member Since',
        value: 'Jan 15, 2023',
      },
      {
        holder: 'Tier Level',
        value: 'Platinum',
      },
      {
        holder: 'Total Investments',
        value: '8 properties',
      },
    ],
    portfolio_overview: [
      {
        label: 'Total Invested',
        currency: 'NGN',
        value: 10000000,
        formatted: '₦10.0M',
        scope: 'Lifetime',
      },
      {
        label: 'Wallet Balance',
        currency: 'NGN',
        value: 3000000,
        formatted: '₦3.0M',
        scope: 'Available',
      },
      {
        label: 'Returns Earned',
        currency: 'NGN',
        value: 375000,
        formatted: '₦375,000',
        scope: 'All time',
        color: 'text-green-500 text-lg',
      },
      {
        label: 'Avg ROI',
        value: 15,
        unit: 'percent',
        formatted: '15%',
        scope: 'Portfolio avg',
        color: 'text-green-500',
      },
    ],
  };
  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: <AccountInfoAndSummary />,
    },
    {
      title: 'Investments',
      value: 'investments',
      content: <InvestmentsTable />,
    },
    {
      title: 'Transactions',
      value: 'transactions',
      content: <TransactionTable />,
    },
    {
      title: 'KYC Details',
      value: 'kyc-details',
      content: <KycDetail />,
    },
  ];
  return (
    <div className=" w-full space-y-4">
      <div className="flex gap-1 flex-col lg:flex-row border p-2 bg-gray-100 ">
        <div className="lg:w-1/4">
          <div className=" overflow-hidden w-30 h-30 rounded-full ">
            {profile.profileImg ? (
              <Image
                src={profile.profileImg}
                alt=""
                width={100}
                height={100}
                className="object-center w-full"
              />
            ) : (
              <div className="bg-black flex items-center justify-center uppercase text-4xl w-full h-full text-white">
                AF
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-3/4">
          <div className=" mb-2">
            <div className="flex justify-between w-full my-2">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <div className="flex gap-2">
                <small className="text-xs text-green-600 bg-green-50 px-2 flex items-center border border-green-500 gap-1 py-0.5 whitespace-nowrap h-fit">
                  <CircleCheckBig className="w-3 h-3" />
                  <span> KYC Verified </span>
                </small>
                <small className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit">
                  active
                </small>
              </div>
            </div>
            <div>
              <p>{profile.email}</p>
              <p>Investor ID: {profile.id}</p>
            </div>
          </div>
          <div className="flex flex-wrap lg:gap-2 border-t-2 py-2 w-full ">
            {profile.subPage.map((p, i) => (
              <div key={i} className="border-r px-4 last:border-r-0">
                <div className=" font-bold">{p.holder}</div>
                <div className="text-sm">{p.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-1.5">
        {profile.portfolio_overview.map((overView, i) => (
          <StatCard
            label={overView.label}
            value={overView.formatted}
            description={overView.scope}
            color={overView.color}
            key={i}
          />
        ))}
      </div>
      <Tabs defaultValue={tab} className="space-y-5">
        <TabsList className="flex flex-wrap">
          {tabs.map((tab, i) => (
            <TabsTrigger
              value={tab.value}
              key={i}
              onClick={() => setTab(tab.value)}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, i) => (
          <TabsContent value={tab.value} key={i}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      <Button>Suspend Account</Button>
    </div>
  );
}
