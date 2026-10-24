import Link from 'next/link';
import { CalendarClock, ChevronRight } from 'lucide-react';
import { ScheduleEvent } from '@/lib/types/schedule';
import { ScheduleEventCard } from '@/app/components/ScheduleEvent';
import { EmptyState } from '@/app/components/states/EmptyState';

interface Props {
  events: ScheduleEvent[];
}

export const UpcomingEventsSection = ({ events }: Props) => (
  <section>
    <h2 className="mb-3 text-xl font-semibold text-gray-900">Upcoming Events</h2>

    {events.length === 0 ? (
      <EmptyState
        compact
        icon={CalendarClock}
        title="No upcoming events"
        description="Nothing else is scheduled for now."
      >
        <Link href="/schedule" className="mt-1 text-sm font-medium text-brand-blue">
          View full schedule
        </Link>
      </EmptyState>
    ) : (
      <div className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
        {events.map((event) => (
          <div key={event.id} className="flex w-4/5 shrink-0 snap-start [&>*]:min-w-0 [&>*]:flex-1">
            <ScheduleEventCard event={event} />
          </div>
        ))}

        <Link
          href="/schedule"
          className="flex w-2/5 shrink-0 snap-start flex-col items-center justify-center gap-1 rounded-2xl bg-gray-50 p-4 text-center text-sm font-medium text-brand-blue"
        >
          View all events
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    )}
  </section>
);
