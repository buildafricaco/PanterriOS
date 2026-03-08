import { CircleCheckBig, CircleX } from 'lucide-react';
import { InvestorOverviewRes } from '@/interface';

type KycData = InvestorOverviewRes['data']['kycDetails']['data'];

interface KycDetailProps {
  kycData: KycData;
}

export function KycDetail({ kycData }: KycDetailProps) {
  const verificationBadge = (isVerified: boolean) =>
    isVerified ? (
      <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit capitalize flex items-center gap-1">
        <CircleCheckBig className="w-3 h-3" />
        <span>Verified</span>
      </span>
    ) : (
      <span className="text-xs text-red-600 bg-red-50 px-2 border border-red-500 py-0.5 h-fit capitalize flex items-center gap-1">
        <CircleX className="w-3 h-3" />
        <span>Not Verified</span>
      </span>
    );

  return (
    <div className="border p-2 rounded-md space-y-2">
      <div className="flex justify-between">
        <div>KYC Verification Status</div>
        <span className="text-xs text-green-600 bg-green-50 px-2 border border-green-500 py-0.5 h-fit uppercase">
          {kycData.kycStatus}
        </span>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between bg-gray-50 border rounded-md p-2">
          <div>
            <p>Identity Verification</p>
            <small>NIN</small>
          </div>
          {verificationBadge(kycData.isNinVerified)}
        </div>
        <div className="flex justify-between bg-gray-50 border rounded-md p-2">
          <div>
            <p>BVN Verification</p>
            <small>BVN</small>
          </div>
          {verificationBadge(kycData.isBvnVerified)}
        </div>
      </div>
    </div>
  );
}
