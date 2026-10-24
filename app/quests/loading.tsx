// Kostur koji prati izgled Quest kartica dok se podaci učitavaju
export default function QuestsLoading() {
  return (
    <div className="flex flex-col gap-6 pt-2" aria-busy="true">
      <span className="sr-only" role="status">
        Loading quests…
      </span>
      <h1 className="text-xl font-bold text-gray-900">Event Quests</h1>
      <div className="flex flex-col gap-4" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-start gap-4 rounded-2xl border-l-4 border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="mb-2 flex justify-between gap-2">
                <div className="h-4 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-14 rounded-md bg-gray-100" />
              </div>
              <div className="mb-1 h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-4/5 rounded bg-gray-100" />
              <div className="mt-3 h-10 w-full rounded-xl bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
