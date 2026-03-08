import { InvestorOverviewRes } from '@/interface';
import { StatusBadge } from '@/components/shared';

type AccountInformation =
  InvestorOverviewRes['data']['investorOverview']['accountInformation'];
type InvestmentSummary =
  InvestorOverviewRes['data']['investorOverview']['investmentSummary'];

interface AccountInfoAndSummaryProps {
  accountInformation: AccountInformation;
  investmentSummary: InvestmentSummary;
}

export function AccountInfoAndSummary({
  accountInformation,
  investmentSummary,
}: AccountInfoAndSummaryProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-2">
      <div className="p-2 space-y-3 border rounded-md">
        <h2 className="font-semibold text-lg">Account Information</h2>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Full Name </span>
          <span>{accountInformation.fullName}</span>
        </div>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Email </span>
          <span>{accountInformation.emailAddress}</span>
        </div>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Investor ID </span>
          <span>{accountInformation.investorId}</span>
        </div>
        <div className="flex text-sm justify-between">
          <span>Account Status </span>
          <StatusBadge status={accountInformation.accountStatus} />
        </div>
      </div>
      <div className="p-2 space-y-3 border rounded-md">
        <h2 className="font-semibold text-lg ">Investment Summary</h2>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Active Investments </span>
          <span>{investmentSummary.activeInvestments}</span>
        </div>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Tier Level </span>
          <span>{investmentSummary.tierLevel}</span>
        </div>
        <div className="flex text-sm justify-between border-b py-2">
          <span>Total Value </span>
          <span>{investmentSummary.totalValue.toLocaleString()}</span>
        </div>
        <div className="flex text-sm justify-between">
          <span>Member Since </span>
          <span className="capitalize">{investmentSummary.memberSince}</span>
        </div>
      </div>
    </div>
  );
}
