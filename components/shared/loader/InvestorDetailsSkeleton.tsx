import { StatCardSkeleton } from './StatCardSkeleton';
import { TableSkeleton } from './TableSkeleton';

export function InvestorDetailsSkeleton() {
  return (
    <div className="w-full space-y-4 px-0 animate-pulse">
      <div className="border rounded-lg bg-gray-50 overflow-hidden p-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-10 rounded bg-gray-200" />
              <div className="h-10 rounded bg-gray-200" />
              <div className="h-10 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <StatCardSkeleton count={4} />
      </div>

      <div className="space-y-3">
        <div className="h-10 rounded-lg bg-gray-200" />
        <TableSkeleton rows={5} columns={4} />
      </div>
    </div>
  );
}
