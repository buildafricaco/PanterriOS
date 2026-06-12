export type MetricCard = {
  title: string;
  subtitle: string;
  currentLabel: string;
  targetLabel: string;
  currentValue: string;
  targetValue: string;
};

export type ToggleItem = {
  key: string;
  title: string;
  description: string;
};

export type ApiItem = {
  key: string;
  label: string;
  helper: string;
  value: string;
};

export const metrics: MetricCard[] = [
  {
    title: 'Total Investors',
    subtitle: 'Monthly growth target',
    currentLabel: 'Current Count',
    targetLabel: 'Monthly Target',
    currentValue: '3847',
    targetValue: '4500',
  },
  {
    title: 'Total Invested',
    subtitle: 'Capital deployment target',
    currentLabel: 'Current Amount (₦)',
    targetLabel: 'Monthly Target (₦)',
    currentValue: '145,800,000,000',
    targetValue: '175,000,000,000',
  },
  {
    title: 'Active Investments',
    subtitle: 'New listings target',
    currentLabel: 'Current Count',
    targetLabel: 'Monthly Target',
    currentValue: '45',
    targetValue: '55',
  },
];

export const notificationItems: ToggleItem[] = [
  {
    key: 'newInvestorRegistration',
    title: 'New Investor Registration',
    description: 'Notify when a new investor signs up',
  },
  {
    key: 'withdrawalRequests',
    title: 'Withdrawal Requests',
    description: 'Alert on pending withdrawal approvals',
  },
  {
    key: 'investmentFunding',
    title: 'Investment Funding',
    description: 'Updates on investment funding progress',
  },
  {
    key: 'aiContentDiscoveries',
    title: 'AI Content Discoveries',
    description: 'New articles and events found by AI',
  },
  {
    key: 'payoutApprovals',
    title: 'Payout Approvals',
    description: 'Pending payout requests requiring action',
  },
];

export const apiItems: ApiItem[] = [
  {
    key: 'payments',
    label: 'example Secret Key',
    helper: 'Used for payment processing',
    value: 'sample_live_xxxxxxxxxxxxxx',
  },
  {
    key: 'support',
    label: 'example Secret Key',
    helper: 'For support',
    value: 'sample_live_xxxxxxxxxxxxxx',
  },
  {
    key: 'notifications',
    label: 'example Secret Key',
    helper: 'used for notifications and 2FA',
    value: 'sample_live_xxxxxxxxxxxxxx',
  },
];
