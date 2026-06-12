export function WorkflowDetailSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-8">
      <div className="max-w-4xl rounded-2xl border border-[#E5E7EB] bg-white p-8">
        <div className="space-y-3">
          <div className="h-6 w-56 rounded bg-gray-200" />
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4">
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`workflow-general-card-skeleton-${index}`}
                className="rounded-md border border-[#E5E7EB] p-5 space-y-5"
              >
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-6 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-md border border-[#E5E7EB] p-5 space-y-5">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="space-y-3">
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-11/12 rounded bg-gray-200" />
              <div className="h-5 w-10/12 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="mt-10 space-y-10">
            {Array.from({ length: 3 }).map((_, stepIndex) => (
              <div
                key={`workflow-step-skeleton-${stepIndex}`}
                className="space-y-5"
              >
                <div className="h-5 w-24 rounded bg-gray-200" />
                <div className="grid gap-4 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((__, itemIndex) => (
                    <div
                      key={`workflow-step-item-skeleton-${stepIndex}-${itemIndex}`}
                      className="h-12 rounded-md border border-[#E5E7EB] bg-gray-200"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="h-12 rounded-md bg-gray-200" />
          <div className="h-12 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
