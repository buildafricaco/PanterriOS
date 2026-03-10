export function InvestmentDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-5 my-2">
      <div className="h-9 w-full rounded-md bg-gray-200" />

      <div className="border rounded-md p-4 space-y-3">
        <div className="flex justify-between items-center gap-2">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-5 w-16 rounded bg-gray-200" />
        </div>
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="h-14 rounded bg-gray-200" />
          <div className="h-14 rounded bg-gray-200" />
          <div className="h-14 rounded bg-gray-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`investment-detail-skeleton-card-${index}`} className="rounded-lg border bg-white p-5 space-y-3">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-8 w-28 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="border rounded-md p-4 space-y-3">
        <div className="h-5 w-40 rounded bg-gray-200" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`investment-detail-skeleton-row-${index}`} className="h-12 w-full rounded bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
