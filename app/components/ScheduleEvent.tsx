import { formatDayTime, formatTime } from '@/lib/time';
import { ScheduleEvent } from '@/lib/types/schedule';
import { Megaphone, Utensils, Code, Trophy, MapPin, type LucideIcon } from 'lucide-react';


type EventType = ScheduleEvent['type'];
const cardColorMap: Record<EventType, string> = {
  ceremony: 'bg-brand-blue/10',
  meal: 'bg-brand-yellow/10',
  workshop: 'bg-brand-red/10',
  deadline: 'bg-brand-green/10',
  other: 'bg-gray-100',
};

const iconColorMap: Record<EventType, string> = {
  ceremony: 'text-brand-blue',
  meal: 'text-brand-yellow',
  workshop: 'text-brand-red',
  deadline: 'text-brand-green',
  other: 'text-gray-500',
};

const iconMap: Record<EventType, LucideIcon> = {
  ceremony: Megaphone,
  meal: Utensils,
  workshop: Code,
  deadline: Trophy,
  other: MapPin,
};

interface Props {
  event: ScheduleEvent;
  showDay?: boolean;
}




export const ScheduleEventCard = ({ event, showDay = false }: Props) => {
  const theme: EventType = event.type;
  const cardBg = cardColorMap[theme];
  const iconColor = iconColorMap[theme];
  const Icon = iconMap[theme];


  return (
    <div className={`flex items-center gap-3 rounded-2xl p-4 shadow-sm text-gray-900 ${cardBg}`}>
      <Icon className={`h-6 w-6 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className="whitespace-nowrap text-xs font-semibold text-gray-600">
          {showDay ? formatDayTime(event.startTime) : formatTime(event.startTime)}
        </p>
        <h3 className="font-semibold break-words">{event.title}</h3>
        <p className="text-sm text-gray-600 break-words">({event.location})</p>
      </div>
    </div>
  );
};
