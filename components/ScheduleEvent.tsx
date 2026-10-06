import { ScheduleEvent } from '@/data/mockSchedule';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-900',
  yellow: 'bg-yellow-100 text-yellow-900',
  red: 'bg-red-100 text-red-900',
  green: 'bg-green-100 text-green-900',
  default: 'bg-gray-100 text-gray-900',
};

const iconMap: Record<string, string> = {
  blue: '📢',
  yellow: '🍴',
  red: '💻',
  green: '🏆',
  default: '📍',
};

interface Props {
  event: ScheduleEvent;
}

export const ScheduleEventCard = ({ event }: Props) => {
  const theme = event.type || 'default';
  const cardBg = colorMap[theme] || colorMap.default;
  const icon = iconMap[theme] || iconMap.default;

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-4 shadow-sm ${cardBg}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="whitespace-nowrap text-xs font-semibold opacity-70">
          {event.startTime}
        </p>
        <h3 className="font-semibold">{event.title}</h3>
        <p className="text-sm opacity-80">({event.location})</p>
      </div>
    </div>
  );
};