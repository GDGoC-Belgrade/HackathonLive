import type { ScheduleEvent } from '@/lib/types/schedule';

const DAY_NAMES = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export interface ScheduleDayGroup {
  dateKey: string; //  datum
  dayName: string;
  dateLabel: string; 
  events: ScheduleEvent[];
}

const dateKeyFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Belgrade',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

function getDayName(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  // UTC podne da zona ne pomeri dan
  return DAY_NAMES[new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay()];
}

export function groupEventsByDay(events: ScheduleEvent[]): ScheduleDayGroup[] {
  const sorted = events
  .map((event) => ({event, time: new Date(event.startTime).getTime()}))
  .filter(({time}) => Number.isFinite(time))
  .sort(
    (a, b) => a.time - b.time || a.event.title.localeCompare(b.event.title,'sr')
  );

  const groups: ScheduleDayGroup[] = [];

  for (const {event, time} of sorted) {
    const dateKey = dateKeyFormatter.format(new Date(time));
    const last = groups[groups.length - 1];

    if (last && last.dateKey === dateKey) {
      last.events.push(event);
    } else {
      const [, month, day] = dateKey.split('-');
      groups.push({ dateKey, dayName: getDayName(dateKey), dateLabel: `${day}.${month}.`, events: [event] });
    }
  }

  return groups;
}