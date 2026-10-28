import { Inbox } from 'lucide-react';
import { ScheduleEventCard } from '@/app/components/ScheduleEvent';
import { StateMessage } from '@/app/components/StateMessage';
import { getScheduleEvents } from '@/lib/services/schedule';
import { groupEventsByDay } from '@/lib/schedule-groups';

export const dynamic = 'force-dynamic';

export default async function SchedulePage() {
  const events = await getScheduleEvents();
  const groups = groupEventsByDay(events);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-xl font-bold text-gray-900">Upcoming Events</h1>

      {groups.length === 0 ? (
        <StateMessage
          icon={Inbox}
          title="No events yet"
          description="The schedule will show up here once events are added."
        />
      ) : (
        groups.map((group) => (
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
        ))
      )}
    </div>
  );
}