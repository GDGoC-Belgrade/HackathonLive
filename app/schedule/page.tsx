import { mockEvents } from '@/data/mockSchedule';
import { ScheduleEventCard } from '@/components/ScheduleEvent';

export default function SchedulePage() {
  return (
    <main className="mx-auto min-h-screen max-w-md bg-white p-5 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">Upcoming Events</h1>
      <div className="flex flex-col gap-5">
        {mockEvents.map((event) => (
          <ScheduleEventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
}
