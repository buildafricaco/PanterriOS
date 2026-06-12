import { Eye, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SettingsSectionHeader } from './settingsSectionHeader';
import { ApiItem } from './settings.types';

type ApiConfigurationSectionProps = {
  items: ApiItem[];
  visibleApiKeys: Record<string, boolean>;
  onToggleVisibility: (key: string) => void;
  maskValue: (value: string) => string;
};

export function ApiConfigurationSection({
  items,
  visibleApiKeys,
  onToggleVisibility,
  maskValue,
}: ApiConfigurationSectionProps) {
  return (
    <section className="space-y-5">
      <SettingsSectionHeader
        title="API Configuration"
        description="Configure external service API keys"
        icon={Gauge}
      />

      <div className="max-w-3xl space-y-5">
        {items.map((item) => {
          const isVisible = Boolean(visibleApiKeys[item.key]);

          return (
            <div
              key={item.key}
              className="flex items-center justify-between gap-4 rounded-xl"
            >
              <div className="space-y-1">
                <p className="font-medium text-[#0F172A]">{item.label}</p>
                <p className="text-sm text-[#64748B]">
                  {isVisible ? item.value : maskValue(item.value)}
                </p>
                <p className="text-xs text-[#94A3B8]">{item.helper}</p>
              </div>
              <Button
                variant="outline"
                className={cn(
                  'min-w-14 border-[#D9E2F0] bg-white text-[#0F172A]',
                )}
                onClick={() => onToggleVisibility(item.key)}
              >
                <Eye className="h-4 w-4" />
                {isVisible ? 'Hide' : 'Show'}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
