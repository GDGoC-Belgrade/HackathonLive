import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ScheduleEvent } from '@/lib/types/schedule';
import { ScheduleEventCard } from '@/app/components/ScheduleEvent';

interface Props {
  events: ScheduleEvent[];
}

// Horizontalni red kartica koji se swipe-uje
export const UpcomingEventsSection = ({ events }: Props) => (
  <section>
    <h2 className="mb-3 text-xl font-semibold text-gray-900">Upcoming Events</h2>

    <div className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
      {events.map((event) => (
        <div key={event.id} className="flex w-4/5 shrink-0 snap-start [&>*]:flex-1">
          <ScheduleEventCard event={event} />
        </div>
      ))}

      <Link
        href="/schedule"
        className="flex w-2/5 shrink-0 snap-start flex-col items-center justify-center gap-1 rounded-2xl bg-gray-50 p-4 text-sm font-medium text-brand-blue"
      >
        View all events
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  </section>
);
