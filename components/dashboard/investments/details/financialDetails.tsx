import { StatCard } from "@/components/shared";
import { type InvestmentFinancialDetails } from "@/interface";

interface FinancialDetailsProps {
  financialDetails: InvestmentFinancialDetails;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export function FinancialDetails({ financialDetails }: FinancialDetailsProps) {
  const cards = [
    {
      label: "Duration (Months)",
      value: financialDetails.durationMonths,
    },
    {
      label: "Expected Returns (%)",
      value: financialDetails.expectedReturnsPercentage,
    },
    {
      label: "Risk Rating",
      value: financialDetails.riskRating,
    },
    {
      label: "Minimum Investment (NGN)",
      value: formatCurrency(financialDetails.minimumInvestmentAmount),
    },
    {
      label: "Target Amount (NGN)",
      value: formatCurrency(financialDetails.targetAmount),
    },
    {
      label: "Amount Raised (NGN)",
      value: formatCurrency(financialDetails.amountRaised),
    },
    {
      label: "Property Value (NGN)",
      value: formatCurrency(financialDetails.propertyValue),
    },
    {
      label: "Return Distribution Schedule",
      value: financialDetails.returnDistributionSchedule,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
      {cards.map((card, index) => (
        <StatCard label={card.label} value={card.value} key={`${card.label}-${index}`} />
      ))}
    </div>
  );
}
