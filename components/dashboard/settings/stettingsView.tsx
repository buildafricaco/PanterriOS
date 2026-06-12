'use client';

// import { useState } from 'react';
// import { ApiConfigurationSection } from './ApiConfigurationSection';
import { DashboardMetricsSection } from './DashboardMetricsSection';
// import { DataManagementBackupSection } from './DataManagementBackupSection';
// import { NotificationPreferencesSection } from './NotificationPreferencesSection';
// import { PlatformSettingsSection } from './PlatformSettingsSection';
// import { apiItems, metrics, notificationItems } from './settings.types';

export default function StettingsView() {
  // const [platformSettings, setPlatformSettings] = useState({
  //   maintenanceMode: false,
  //   aiContentDiscovery: true,
  // });
  // const [notifications, setNotifications] = useState<Record<string, boolean>>({
  //   newInvestorRegistration: true,
  //   withdrawalRequests: true,
  //   investmentFunding: true,
  //   aiContentDiscoveries: true,
  //   payoutApprovals: true,
  // });
  // const [backupSettings, setBackupSettings] = useState({
  //   frequency: '30 Days',
  //   autoBackup: true,
  //   encryptBackups: true,
  // });
  // const [visibleApiKeys, setVisibleApiKeys] = useState<Record<string, boolean>>(
  //   {},
  // );

  // const maskValue = (value: string) => `${value.slice(0, 12)}xxxxxxxxxx`;

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Settings
        </h1>
        <p className="text-sm text-[#475569]">
          Configure platform settings and preferences
        </p>
      </div>

      <DashboardMetricsSection />

      {/* <PlatformSettingsSection
        platformSettings={platformSettings}
        onChange={setPlatformSettings}
      />

      <NotificationPreferencesSection
        items={notificationItems}
        notifications={notifications}
        onChange={(key, value) =>
          setNotifications((prev) => ({ ...prev, [key]: value }))
        }
      />

      <DataManagementBackupSection
        backupSettings={backupSettings}
        onChange={setBackupSettings}
      />

      <ApiConfigurationSection
        items={apiItems}
        visibleApiKeys={visibleApiKeys}
        onToggleVisibility={(key) =>
          setVisibleApiKeys((prev) => ({
            ...prev,
            [key]: !prev[key],
          }))
        }
        maskValue={maskValue}
      /> */}
    </div>
  );
}
