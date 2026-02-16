'use client';
import { PageHead, StatCard } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { AllInvestments } from '@/components/dashboard/investments';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function InvestmentPage() {
  const [tab, setTab] = useState('all');

  const tabs = [
    {
      title: `All investments`,
      value: 'all',
      count: 3,
      content: <AllInvestments />,
    },
    {
      title: `Draft `,
      value: 'draft',
      count: 3,

      content: '',
    },
  ];
  const metrics = [
    {
      label: 'Total Investments',
      value: 12,
      scope: '8 active, 4 completed',
    },
    {
      label: 'Total Raised',
      currency: 'NGN',

      value: '₦670M',
      scope: 'Across all properties',
    },
    {
      label: 'Avg Returns',

      unit: 'percent',
      value: '62.5%',
      scope: 'Across all properties',
    },
    {
      label: 'Total Investors',
      value: 123,

      scope: 'Unique participants',
    },
  ];
  const filterSelection = [
    {
      value: 'types',
      label: 'All Types',
      options: [
        { value: 'commercial', label: 'commercial' },
        { value: 'residential', label: 'Residential' },
      ],
    },
    {
      value: 'status',
      label: 'All Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'funded', label: 'AFundeda' },
      ],
    },
    {
      value: 'location',
      label: 'Location',
      options: [
        { value: 'lagos', label: 'Lagos' },
        { value: 'abuja', label: 'Abuja' },
        { value: 'portHarcourt', label: 'Port Harcourt' },
      ],
    },
  ];

  return (
    <div>
      <PageHead
        pageTitle="Investment Management"
        subTitle="Create and manage investment opportunities"
        // className=" [&_h2]:text-green-700"
      >
        <Link href={'/investments/create-investment'}>
          <Button className="flex items-center gap-2 rounded-sm">
            <Plus /> <span className="hidden lg:block"> Create Investment</span>
          </Button>
        </Link>
      </PageHead>
      <div className="grid lg:grid-cols-4 grid-cols-2 flex-wrap lg:gap-6 gap-3 my-8 ">
        {metrics.map((stat, i) => (
          <StatCard
            label={stat.label}
            description={stat.scope}
            value={stat.value}
            color={'text-green-700'}
            key={i}
          />
        ))}
      </div>
      <Tabs defaultValue={tab} className="space-y-5">
        <div className="flex justify-between">
          <TabsList className="flex flex-wrap">
            {tabs.map((tab, i) => (
              <TabsTrigger
                value={tab.value}
                key={i}
                onClick={() => setTab(tab.value)}
                className="flex items-center"
              >
                {tab.title}{' '}
                <Badge
                  className={`rounded-sm ${tab.value === 'all' ? 'text-blue-500 bg-blue-100' : 'text-orange-500 bg-orange-100'}`}
                >
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex items-center gap-4">
            <div className="border bg-gray-100 flex gap-1 items-center rounded-sm">
              <Button
                variant={'outline'}
                className="border-0 bg-transparent rounded-none"
              >
                <Search />
              </Button>
              <Input className=" text-black " placeholder="search..." />
            </div>
            <div className="flex lg:flex-row flex-col gap-2">
              {filterSelection.map((filter, i) => {
                return (
                  <Select key={i}>
                    <SelectTrigger className="">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent align="start" position="popper">
                      {filter.options.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              })}
            </div>
          </div>
        </div>
        {tabs.map((tab, i) => (
          <TabsContent value={tab.value} key={i}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
