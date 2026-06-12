import { Database, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { settingsItemClassName } from './settings.shared';
import { SettingsSectionHeader } from './settingsSectionHeader';

type BackupSettings = {
  frequency: string;
  autoBackup: boolean;
  encryptBackups: boolean;
};

type DataManagementBackupSectionProps = {
  backupSettings: BackupSettings;
  onChange: (value: BackupSettings) => void;
};

export function DataManagementBackupSection({
  backupSettings,
  onChange,
}: DataManagementBackupSectionProps) {
  return (
    <section className="space-y-5">
      <SettingsSectionHeader
        title="Data Management & Backup"
        description="Manage platform data and automated backups"
        icon={Database}
      />

      <div className="max-w-3xl space-y-5">
        <div className="rounded-xl border border-[#2563EB] bg-[#EEF2FF] px-4 py-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-[#2563EB]" />
            <div className="space-y-1">
              <p className="font-medium text-[#0F172A]">Last Backup</p>
              <p className="text-sm text-[#475569]">
                March 12, 2026 at 3:00 AM WAT
              </p>
              <p className="text-sm text-[#64748B]">
                Size: 2.4 GB • Status: Successful
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#334155]">
            Backup Frequency
          </label>
          <Select
            value={backupSettings.frequency}
            onValueChange={(value) =>
              onChange({
                ...backupSettings,
                frequency: value,
              })
            }
          >
            <SelectTrigger className="h-11 border-[#D9E2F0] bg-white">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7 Days">7 Days</SelectItem>
              <SelectItem value="14 Days">14 Days</SelectItem>
              <SelectItem value="30 Days">30 Days</SelectItem>
              <SelectItem value="90 Days">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={settingsItemClassName}>
          <div>
            <p className="font-medium text-[#0F172A]">Auto Backup</p>
            <p className="text-sm text-[#64748B]">
              Automatic scheduled backups
            </p>
          </div>
          <Switch
            checked={backupSettings.autoBackup}
            onCheckedChange={(checked) =>
              onChange({
                ...backupSettings,
                autoBackup: checked,
              })
            }
          />
        </div>

        <div className={settingsItemClassName}>
          <div>
            <p className="font-medium text-[#0F172A]">Encrypt Backups</p>
            <p className="text-sm text-[#64748B]">AES-256 encryption</p>
          </div>
          <Switch
            checked={backupSettings.encryptBackups}
            onCheckedChange={(checked) =>
              onChange({
                ...backupSettings,
                encryptBackups: checked,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[#334155]">Export Data</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              className="h-11 border-[#D9E2F0] bg-white text-[#0F172A]"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button
              variant="outline"
              className="h-11 border-[#D9E2F0] bg-white text-[#0F172A]"
            >
              <Download className="h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="bg-[#111111] text-white hover:bg-[#111111]/90">
            Create Backup Now
          </Button>
        </div>
      </div>
    </section>
  );
}
