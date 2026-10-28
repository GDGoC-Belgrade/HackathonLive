// Kostur koji prati izgled kartica dok se podaci učitavaju
export default function ScheduleLoading() {
  return (
    <div className="flex flex-col gap-6 pt-2" aria-busy="true">
      <span className="sr-only" role="status">
        Loading schedule…
      </span>
      <h1 className="text-xl font-bold text-gray-900">Upcoming Events</h1>
      <div className="flex flex-col gap-3" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-20 animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    </div>
  );
}