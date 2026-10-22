import type { ScheduleEvent } from '@/lib/types/schedule';

const DAY_NAMES = ['NEDELJA', 'PONEDELJAK', 'UTORAK', 'SREDA', 'ČETVRTAK', 'PETAK', 'SUBOTA'];

export interface ScheduleDayGroup {
  dateKey: string; //  datum
  dayName: string; 
  events: ScheduleEvent[];
}

// Datum u zoni Europe/Belgrade
function getBelgradeDateKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Belgrade',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function getDayName(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  // UTC podne da zona ne pomeri dan
  return DAY_NAMES[new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay()];
}

export function groupEventsByDay(events: ScheduleEvent[]): ScheduleDayGroup[] {
  const sorted = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  const groups: ScheduleDayGroup[] = [];

  for (const event of sorted) {
    const dateKey = getBelgradeDateKey(new Date(event.startTime));
    const last = groups[groups.length - 1];

    if (last && last.dateKey === dateKey) {
      last.events.push(event);
    } else {
      groups.push({ dateKey, dayName: getDayName(dateKey), events: [event] });
    }
  }

  return groups;
}