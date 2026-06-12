import { LucideIcon } from 'lucide-react';

type SettingsSectionHeaderProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function SettingsSectionHeader({
  title,
  description,
  icon: Icon,
}: SettingsSectionHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[#0F172A]">
        <Icon className="h-5 w-5 text-[#2563EB]" />
        <h2 className="text-[1.75rem] font-semibold leading-none">{title}</h2>
      </div>
      <p className="text-sm text-[#475569]">{description}</p>
    </div>
  );
}
