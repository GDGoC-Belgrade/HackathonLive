'use client';

export default function ScheduleError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md p-5 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">Upcoming Events</h1>
      <div role="alert" className="rounded-2xl bg-brand-red/10 p-4">
        <p className="text-sm text-gray-900">Raspored trenutno nije dostupan.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 text-sm font-medium text-brand-blue"
        >
          Pokušaj ponovo
        </button>
      </div>
    </div>
  );
}