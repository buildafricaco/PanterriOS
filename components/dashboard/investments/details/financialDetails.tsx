import { StatCard } from '@/components/shared';

export function FinancialDetails() {
  const overview = [
    {
      label: 'Duration (Months)',
      value: 15,
    },
    {
      label: 'Expected Returns (%)',
      value: 42,
    },
    {
      label: 'Risk Rating',
      value: 'Low',
    },
    {
      label: 'Minimum Investment (₦)',
      value: '10,000',
    },
    {
      label: 'Target Amount (₦)',
      value: '500,000,000',
    },
    {
      label: 'Amount Raised (₦)',
      value: '500,000,000',
    },
    {
      label: 'Property Value (₦)',
      value: '500,000,000',
    },
    {
      label: 'Return Distribution schedule',
      value: 'Quarterly',
    },
  ];

  return (
    <div className=" grid grid-cols-2 gap-4 my-4">
      {overview.map((overView, i) => (
        <StatCard label={overView.label} value={overView.value} key={i} />
      ))}
    </div>
  );
}
