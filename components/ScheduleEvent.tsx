import { Megaphone, Utensils, Code, Trophy, MapPin, type LucideIcon } from 'lucide-react';
import { ScheduleEvent } from '@/data/mockSchedule';

type EventType = NonNullable<ScheduleEvent['type']> |  'default';
const cardColorMap: Record<string, string> = {
  blue: 'bg-brand-blue/10',
  yellow: 'bg-brand-yellow/10',
  red: 'bg-brand-red/10',
  green: 'bg-brand-green/10',
  default: 'bg-gray-100',
};

const iconColorMap: Record<string, string> = {
  blue: 'text-brand-blue',
  yellow: 'text-brand-yellow',
  red: 'text-brand-red',
  green: 'text-brand-green',
  default: 'text-gray-500',
};

const iconMap: Record<string, LucideIcon> = {
  blue: Megaphone,
  yellow: Utensils,
  red: Code,
  green: Trophy,
  default: MapPin,
};

interface Props {
  event: ScheduleEvent;
}

export const ScheduleEventCard = ({ event }: Props) => {
  const theme = event.type || 'default';
  const cardBg = cardColorMap[theme] || cardColorMap.default;
  const iconColor = iconColorMap[theme] || iconColorMap.default;
  const Icon = iconMap[theme] || iconMap.default;

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-4 shadow-sm text-gray-900 ${cardBg}`}>
      <Icon className={`h-6 w-6 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div>
        <p className="whitespace-nowrap text-xs font-semibold text-gray-600">
          {event.startTime}
        </p>
        <h3 className="font-semibold">{event.title}</h3>
        <p className="text-sm text-gray-600">({event.location})</p>
      </div>
    </div>
  );
};