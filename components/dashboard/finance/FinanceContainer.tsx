"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllTransactions } from "./tabs/all-transactions/AllTransactions";
import { WithdrawalRequests } from "./tabs/withdrawal-requests/WithdrawalRequests";
import { Reconciliation } from "./tabs/reconciliation/Reconciliation";
import { YieldEvents } from "./tabs/yield-events/YieldEvents";
import { PageHead, StatCard } from "@/components/shared";
import { DUMMY_TRANSACTIONS, FINANCE_STATS } from "./data";
import { Wallet, Users2, TrendingUp, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DUMMY_WITHDRAWAL_REQUESTS } from "./tabs/withdrawal-requests/withdrawalData";
import { DUMMY_RECONCILIATION_DATA } from "./tabs/reconciliation/data";

const iconMap = {
  Wallet,
  Users: Users2,
  TrendingUp,
  Clock,
};

export function FinanceContainer() {
  const [activeTab, setActiveTab] = useState("all-transactions");

  // Badge color mapping for each tab
  const badgeColors: Record<string, string> = {
    "all-transactions": "text-blue-600 bg-blue-100",
    "withdrawal-requests": "text-orange-600 bg-orange-100",
    reconciliation: "text-purple-600 bg-purple-100",
    "yield-events": "text-green-600 bg-green-100",
  };

  // Create tabs with dynamic counts
  const tabs = [
    {
      title: "All Transactions",
      value: "all-transactions",
      count: DUMMY_TRANSACTIONS?.length,
      content: <AllTransactions data={DUMMY_TRANSACTIONS} />,
    },
    {
      title: "Withdrawal Requests",
      value: "withdrawal-requests",
      count: DUMMY_WITHDRAWAL_REQUESTS.length,
      content: <WithdrawalRequests />,
    },
    {
      title: "Reconciliation",
      value: "reconciliation",
      count: DUMMY_RECONCILIATION_DATA.length,
      content: <Reconciliation />,
    },
    {
      title: "Yield Events",
      value: "yield-events",
      count: 1,
      content: <YieldEvents />,
    },
  ];

  return (
    <div className="w-full space-y-6 px-0">
      {/* Stats Section */}
      <PageHead
        pageTitle="Wallet and Finance"
        subTitle="Manage platform finances and transactions"
      >
        <Button
          variant={"outline"}
          className="border-black border-2 gap-2 rounded-sm"
        >
          <Download /> Export CSV
        </Button>
      </PageHead>
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {FINANCE_STATS.map((stat, i) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
          return (
            <StatCard
              key={i}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              Icon={IconComponent}
              iconColor={stat.iconColor}
              bgColor={stat.bgColor}
              color={stat.color}
            />
          );
        })}
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
        <TabsList className="inline-flex bg-gray-100 border mt-3 mb-5 rounded-md group-data-[orientation=horizontal]/tabs:h-11 border-border  h-auto gap-2 px-4 w-fit">
          {tabs.map((tab, i) => (
            <TabsTrigger
              value={tab.value}
              key={i}
              onClick={() => setActiveTab(tab.value)}
              className="relative py-2 flex items-center h-8 px-4 text-sm gap-3 font-medium text-gray-700 rounded-md bg-transparent border-0 transition-all data-[state=active]:bg-white data-[state=active]:text-black  whitespace-nowrap"
            >
              {tab.title}
              <Badge
                className={`rounded-sm px-2 py-1 ${badgeColors[tab.value]}`}
              >
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        {tabs.map((tab, i) => (
          <TabsContent key={i} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
