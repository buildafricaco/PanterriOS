interface StatCardSkeletonProps {
  count?: number;
}

export function StatCardSkeleton({ count = 4 }: StatCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`stat-card-skeleton-${index}`}
          className="rounded-lg border border-[#E5E7EB] bg-white p-6 w-full animate-pulse"
        >
          <div className="flex items-start justify-between mb-8">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-10 w-10 rounded-lg bg-gray-200" />
          </div>

          <div className="h-9 w-32 rounded bg-gray-200 mb-2" />
          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>
      ))}
    </>
  );
}
