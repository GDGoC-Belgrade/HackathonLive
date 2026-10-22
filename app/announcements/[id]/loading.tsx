export default function Loading() {
  return (
    <div className="mx-auto max-w-md animate-pulse" role="status" aria-label="Loading announcement">
      <div className="-ml-2 mb-4 h-9 w-40 rounded-full bg-gray-200" />
      <div className="h-6 w-20 rounded-full bg-gray-200" />
      <div className="mt-3 flex items-center gap-3">
        <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-200" />
        <div className="h-7 flex-1 rounded-lg bg-gray-200" />
      </div>
      <div className="mt-3 h-4 w-28 rounded bg-gray-200" />
      <div className="mt-4 flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}
