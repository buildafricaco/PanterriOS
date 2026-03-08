interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 6, columns = 8 }: TableSkeletonProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#E2E2E2] bg-white shadow-sm animate-pulse">
      <div className="border-b border-[#E2E2E2] bg-white px-6 py-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={`table-head-skeleton-${index}`} className="h-3 w-20 rounded bg-gray-200" />
          ))}
        </div>
      </div>

      <div className="px-6 py-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`table-row-skeleton-${rowIndex}`}
            className="grid gap-4 border-b border-[#E2E2E2] py-4 last:border-b-0"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <div
                key={`table-cell-skeleton-${rowIndex}-${columnIndex}`}
                className="h-4 w-full rounded bg-gray-200"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
