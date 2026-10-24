export default function ScheduleLoading() {
  return (
    <div className="mx-auto max-w-md p-5" aria-busy="true" aria-live="polite">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Upcoming Events</h1>
      <span className="sr-only">Učitavanje rasporeda...</span>
      <div className="flex flex-col gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}