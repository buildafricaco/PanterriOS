import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { settingsItemClassName } from './settings.shared';
import { SettingsSectionHeader } from './settingsSectionHeader';
import { ToggleItem } from './settings.types';

type NotificationPreferencesSectionProps = {
  items: ToggleItem[];
  notifications: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
};

export function NotificationPreferencesSection({
  items,
  notifications,
  onChange,
}: NotificationPreferencesSectionProps) {
  return (
    <section className="space-y-5">
      <SettingsSectionHeader
        title="Notification Preferences"
        description="Configure email and system notifications"
        icon={Bell}
      />

      <div className="max-w-3xl space-y-4">
        {items.map((item) => (
          <div key={item.key} className={settingsItemClassName}>
            <div>
              <p className="font-medium text-[#0F172A]">{item.title}</p>
              <p className="text-sm text-[#64748B]">{item.description}</p>
            </div>
            <Switch
              checked={notifications[item.key]}
              onCheckedChange={(checked) => onChange(item.key, checked)}
            />
          </div>
        ))}
      </div>

      <div className="flex max-w-3xl justify-end">
        <Button className="bg-[#111111] text-white hover:bg-[#111111]/90">
          Save Preferences
        </Button>
      </div>
    </section>
  );
}
