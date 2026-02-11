import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface CardProp {
  label: string;
  Icon?: LucideIcon | string;
  value: string | number;
  description?: string;
  color?: string;
  bgColor?: string;
}
export function StatCard({
  label,
  Icon,
  value,
  description,
  color,
  bgColor,
}: CardProp) {
  return (
    <div className=" border  rounded-md lg:p-6 p-2 space-y-5 w-full">
      <div className="flex items-center gap-8">
        <span>{label}</span>
        {typeof Icon === 'string' ? (
          <div className=" font-bold text-2xl text-gray-400">{Icon}</div>
        ) : Icon ? (
          <span className={cn('text-gray-400', bgColor)}>
            <Icon className={cn(' ', color)} />
          </span>
        ) : null}
      </div>
      <div className={cn('text-2xl font-bold', color)}>{value}</div>
      <p>{description}</p>
    </div>
  );
}
