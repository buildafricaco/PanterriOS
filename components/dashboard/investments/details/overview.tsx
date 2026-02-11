import { StatCard } from '@/components/shared';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, TriangleAlert, Users2 } from 'lucide-react';

const overview = [
  {
    label: 'Expected ROI %',
    value: 15,
    icon: TrendingUp,
    bgColor: 'text-green-500 bg-green-100 rounded-md p-2',
    scope: 'Per annum',
  },
  {
    label: 'Duration  months',
    value: 42,
    icon: Calendar,
    bgColor: 'text-blue-500 bg-blue-100 rounded-md p-2',
    scope: 'Investment period',
  },
  {
    label: 'Active Investors',
    value: 45,
    icon: Users2,
    bgColor: 'text-gray-500 bg-gray-100 rounded-md p-2',
    scope: 'Participants',
  },
  {
    label: 'Risk Level',
    value: 'Low',
    icon: TriangleAlert,
    bgColor: 'text-orange-500 bg-orange-100 rounded-md p-2',
    scope: 'Assessment',
  },
];
export default function Overview() {
  return (
    <div className="space-y-4 my-4">
      <div className="border rounded-md lg:p-4 p-2  space-y-2">
        <div className="flex justify-between font-bold">
          <h2>Funding Progress</h2>
          <div className="text-blue-700 text-2xl">100%</div>
        </div>
        <Progress value={100} className="h-5 w-full" />
        <div className="flex justify-between">
          <div>
            <small>Target Amount</small>
            <p className="text-xl font-bold">₦50.0M</p>
          </div>
          <div>
            <small>Amount Raised</small>
            <p className="text-xl font-bold text-green-500">₦50.0M</p>
          </div>
          <div>
            <small>Remaining</small>
            <p className="text-xl font-bold text-yellow-500">₦0.0M</p>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-4">
        {overview.map((overView, i) => (
          <StatCard
            label={overView.label}
            value={overView.value}
            description={overView.scope}
            bgColor={overView.bgColor}
            Icon={overView.icon}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
