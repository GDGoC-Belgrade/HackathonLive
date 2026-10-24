import { ScheduleEventCard } from '@/app/components/ScheduleEvent';
import { getScheduleEvents } from '@/lib/services/schedule';
import { groupEventsByDay } from '@/lib/schedule-groups';

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
  const events = await getScheduleEvents();
  const groups = groupEventsByDay(events);

  return (
    <div className="mx-auto max-w-md p-5 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">Upcoming Events</h1>

      {groups.length === 0 ? (
        <p className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          Nema događaja u rasporedu.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <section key={group.dateKey}>
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-600">
                {group.dayName}
              </h2>
              <div className="flex flex-col gap-3">
                {group.events.map((event) => (
                  <ScheduleEventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}