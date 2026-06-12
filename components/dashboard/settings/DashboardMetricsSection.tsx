import { Save, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SettingsSectionHeader } from './settingsSectionHeader';
import { useEffect, useState } from 'react';
import { useGetTarget, useResetTarget, useSetTarget } from '@/hook/settings';
import { useRetrieveDashboardOverview } from '@/hook/dashboard';
import { DashboardMetricsSectionSkeleton } from '@/components/shared';

export function DashboardMetricsSection() {
  const { data: target, isLoading } = useGetTarget();
  const [date] = useState<Date>(new Date());
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const { mutateAsync: setTarget, isPending: isSetting } = useSetTarget();
  const { mutateAsync: resetTarget, isPending: isResetting } = useResetTarget();
  const { data: overviewCardData, isLoading: isFetching } =
    useRetrieveDashboardOverview({
      month,
      year,
    });
  const [investor, setInvestor] = useState('');
  const [invested, setInvested] = useState('');
  const [investment, setInvestment] = useState('');

  useEffect(() => {
    if (!target?.data.data) return;

    const t = setTimeout(() => {
      setInvestor(String(target.data.data.investorTarget ?? ''));
      setInvested(String(target.data.data.investedTarget ?? ''));
      setInvestment(String(target.data.data.investmentTarget ?? ''));
    }, 0);

    return () => clearTimeout(t);
  }, [target]);

  const currentValue = overviewCardData?.data.cards;
  const metrics = [
    {
      title: 'Total Investors',
      subtitle: 'Monthly growth target',
      currentLabel: 'Current Count',
      targetLabel: 'Monthly Target',
      currentValue: currentValue?.totalInvestors.value,
      targetValue: investor,
      onTargetChange: setInvestor,
    },
    {
      title: 'Total Invested',
      subtitle: 'Capital deployment target',
      currentLabel: 'Current Amount (₦)',
      targetLabel: 'Monthly Target (₦)',
      currentValue: currentValue?.totalInvested.value,
      targetValue: invested,
      onTargetChange: setInvested,
    },
    {
      title: 'Active Investments',
      subtitle: 'New listings target',
      currentLabel: 'Current Count',
      targetLabel: 'Monthly Target',
      currentValue: currentValue?.totalInvestments.value,
      targetValue: investment,
      onTargetChange: setInvestment,
    },
  ];
  const handleSetTarget = async () => {
    const payload = {
      investorTarget: Number(investor),
      investedTarget: Number(invested),
      investmentTarget: Number(investment),
    };
    await setTarget(payload);
  };
  const handleResetTarget = async () => {
    await resetTarget();
  };

  if (isLoading || isFetching) {
    return <DashboardMetricsSectionSkeleton />;
  }

  return (
    <section className="space-y-5">
      <SettingsSectionHeader
        title="Dashboard Metrics & Monthly Targets"
        description="Set monthly targets for key performance indicators displayed on the dashboard"
        icon={Target}
      />

      <div className="grid gap-5 xl:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.title}
            className="rounded-xl border border-[#D9E2F0] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-[#0F172A]">
                {metric.title}
              </h3>
              <p className="text-sm text-[#64748B]">{metric.subtitle}</p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">
                  {metric.currentLabel}
                </label>
                <Input
                  value={String(metric.currentValue ?? '')}
                  readOnly
                  className="h-11 border-[#D9E2F0] bg-[#F8FAFC]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">
                  {metric.targetLabel}
                </label>
                <Input
                  value={metric.targetValue}
                  onChange={(event) =>
                    metric.onTargetChange(event.target.value)
                  }
                  className="h-11 border-[#D9E2F0] bg-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          variant="outline"
          className="border-[#D9E2F0] bg-white text-[#0F172A]"
          onClick={handleResetTarget}
          disabled={isSetting || isResetting}
        >
          Reset to Default
        </Button>
        <Button
          className="bg-[#111111] text-white hover:bg-[#111111]/90"
          onClick={handleSetTarget}
          disabled={isSetting || isResetting}
        >
          <Save className="h-4 w-4" />
          Save Targets
        </Button>
      </div>
    </section>
  );
}
