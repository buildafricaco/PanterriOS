export function UserDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex gap-4 flex-col border p-2 rounded-md">
        <div className="w-full mx-auto flex justify-center">
          <div className="w-30 h-30 rounded-full bg-gray-200" />
        </div>
        <div className="flex flex-col space-y-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={`user-detail-row-skeleton-${index}`}
              className="flex justify-between items-center"
            >
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
          ))}
          <div className="flex justify-between items-center">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-6 w-11 rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-center">
        <div className="h-9 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}
