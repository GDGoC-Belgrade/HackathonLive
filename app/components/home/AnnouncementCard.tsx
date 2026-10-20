import { CalendarDays, Megaphone, Wifi, type LucideIcon } from 'lucide-react';
import { AnnouncementType, Announcement } from '@/lib/types/announcements'
import { timeAgo } from '@/lib/time';

const themeMap: Record<AnnouncementType, { icon: LucideIcon; text: string; bg: string }> = {
  important: { icon: Megaphone, text: 'text-brand-red', bg: 'bg-brand-red/10' },
  warning: { icon: Wifi, text: 'text-brand-green', bg: 'bg-brand-green/10' },
  info: { icon: CalendarDays, text: 'text-brand-blue', bg: 'bg-brand-blue/10' },
};

interface Props {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: Props) => {
  const { icon: Icon, text, bg } = themeMap[announcement.type];

  return (
    <article className="flex gap-3 rounded-2xl bg-gray-50 p-4">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${bg}`}>
        <Icon className={`h-4 w-4 ${text}`} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <h3 className={`truncate text-xs font-semibold uppercase ${text}`}>{announcement.title}</h3>
          <span className="shrink-0 text-xs text-gray-500">{timeAgo(announcement.createdAt)}</span>
        </div>
        <p className="mt-1 text-sm text-gray-900 break-words">{announcement.message}</p>
      </div>
    </article>
  );
};
