import { StatCard } from "@/components/shared";
import { Progress } from "@/components/ui/progress";
import { type InvestmentDetailsOverview } from "@/interface";
import { Calendar, TrendingUp, TriangleAlert, Users2 } from "lucide-react";

interface OverviewProps {
  overview: InvestmentDetailsOverview;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export default function Overview({ overview }: OverviewProps) {
  const cards = [
    {
      label: "Expected ROI %",
      value: overview.expectedRoi,
      icon: TrendingUp,
      bgColor: "text-green-500 bg-green-100 rounded-md p-2",
      scope: "Per annum",
    },
    {
      label: "Duration (Months)",
      value: overview.durationMonths,
      icon: Calendar,
      bgColor: "text-blue-500 bg-blue-100 rounded-md p-2",
      scope: "Investment period",
    },
    {
      label: "Active Investors",
      value: overview.activeInvestors,
      icon: Users2,
      bgColor: "text-gray-500 bg-gray-100 rounded-md p-2",
      scope: "Participants",
    },
    {
      label: "Risk Level",
      value: overview.riskLevel,
      icon: TriangleAlert,
      bgColor: "text-orange-500 bg-orange-100 rounded-md p-2",
      scope: "Assessment",
    },
  ];

  return (
    <div className="space-y-4 my-4">
      <div className="border rounded-md lg:p-4 p-2 space-y-2">
        <div className="flex justify-between font-bold items-center gap-2">
          <h2>Funding Progress</h2>
          <div className="text-blue-700 text-2xl">
            {overview.fundingProgress.progressPercentage}%
          </div>
        </div>

        <Progress
          value={overview.fundingProgress.progressPercentage}
          className="h-5 w-full"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <small>Target Amount</small>
            <p className="text-xl font-bold">
              {formatCurrency(overview.fundingProgress.targetAmount)}
            </p>
          </div>
          <div>
            <small>Amount Raised</small>
            <p className="text-xl font-bold text-green-500">
              {formatCurrency(overview.fundingProgress.amountRaised)}
            </p>
          </div>
          <div>
            <small>Remaining</small>
            <p className="text-xl font-bold text-yellow-500">
              {formatCurrency(overview.fundingProgress.remainingAmount)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <StatCard
            label={card.label}
            value={card.value}
            description={card.scope}
            bgColor={card.bgColor}
            Icon={card.icon}
            key={`${card.label}-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
