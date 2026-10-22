export default function Loading() {
  return (
    <div className="mx-auto max-w-md animate-pulse" role="status" aria-label="Loading announcements">
      <div className="-ml-2 mb-4 h-9 w-20 rounded-full bg-gray-200" />
      <div className="mb-4 h-8 w-48 rounded-lg bg-gray-200" />
      <div className="flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3 rounded-2xl border-2 border-gray-100 p-3">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-1/4 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
