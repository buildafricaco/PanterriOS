export function ProfilePageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-56 rounded bg-gray-200" />
          <div className="h-4 w-80 rounded bg-gray-200" />
        </div>
        <div className="h-5 w-40 rounded bg-gray-200" />
      </div>

      <div className="rounded-xl border bg-white p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 rounded-md bg-gray-200" />
            <div className="space-y-3">
              <div className="h-7 w-48 rounded bg-gray-200" />
              <div className="h-6 w-32 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-10 w-28 rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t pt-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`profile-meta-skeleton-${index}`} className="space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 space-y-8">
          <div className="rounded-xl border bg-white p-6 space-y-4">
            <div className="h-6 w-44 rounded bg-gray-200" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`profile-form-skeleton-${index}`} className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-10 w-full rounded bg-gray-200" />
              </div>
            ))}
            <div className="h-24 w-full rounded bg-gray-200" />
          </div>

          <div className="rounded-xl border bg-white p-6 space-y-4">
            <div className="h-6 w-36 rounded bg-gray-200" />
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`profile-session-skeleton-${index}`}
                className="h-20 w-full rounded bg-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="lg:w-1/4 space-y-8">
          <div className="rounded-xl border bg-white p-4 space-y-3">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-32 w-full rounded bg-gray-200" />
          </div>
          <div className="rounded-xl border bg-white p-4 space-y-3">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-24 w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
