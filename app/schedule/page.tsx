import { mockEvents } from '@/data/mockSchedule';
import { ScheduleEventCard } from '@/components/ScheduleEvent';

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-md p-5 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">Upcoming Events</h1>
      <div className="flex flex-col gap-3">
        {mockEvents.map((event) => (
          <ScheduleEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}