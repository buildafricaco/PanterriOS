import { ServerCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { settingsItemClassName } from './settings.shared';
import { SettingsSectionHeader } from './settingsSectionHeader';

type PlatformSettingsSectionProps = {
  platformSettings: {
    maintenanceMode: boolean;
    aiContentDiscovery: boolean;
  };
  onChange: (value: {
    maintenanceMode: boolean;
    aiContentDiscovery: boolean;
  }) => void;
};

export function PlatformSettingsSection({
  platformSettings,
  onChange,
}: PlatformSettingsSectionProps) {
  return (
    <section className="space-y-5">
      <SettingsSectionHeader
        title="Platform Settings"
        description="General platform configuration and controls"
        icon={ServerCog}
      />

      <div className="max-w-3xl space-y-4">
        <div className={settingsItemClassName}>
          <div>
            <p className="font-medium text-[#0F172A]">Maintenance Mode</p>
            <p className="text-sm text-[#64748B]">
              Temporarily disable access
            </p>
          </div>
          <Switch
            checked={platformSettings.maintenanceMode}
            onCheckedChange={(checked) =>
              onChange({
                ...platformSettings,
                maintenanceMode: checked,
              })
            }
          />
        </div>

        <div className={settingsItemClassName}>
          <div>
            <p className="font-medium text-[#0F172A]">AI Content Discovery</p>
            <p className="text-sm text-[#64748B]">
              Auto article/event scraping
            </p>
          </div>
          <Switch
            checked={platformSettings.aiContentDiscovery}
            onCheckedChange={(checked) =>
              onChange({
                ...platformSettings,
                aiContentDiscovery: checked,
              })
            }
          />
        </div>
      </div>

      <div className="flex max-w-3xl justify-end gap-3">
        <Button
          variant="outline"
          className="border-[#D9E2F0] bg-white text-[#0F172A]"
        >
          Cancel
        </Button>
        <Button className="bg-[#111111] text-white hover:bg-[#111111]/90">
          Save Changes
        </Button>
      </div>
    </section>
  );
}
