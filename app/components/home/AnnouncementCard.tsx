import Link from 'next/link';
import { Announcement } from '@/lib/types/announcements';
import { announcementStyles } from '@/app/components/announcementStyles';
import { timeAgo } from '@/lib/time';

interface Props {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: Props) => {
  const { icon: Icon, text, iconBox } = announcementStyles[announcement.type];

  return (
    <article className="relative flex gap-3 rounded-2xl bg-gray-50 p-4 transition active:scale-[0.98]">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBox}`}>
        <Icon className={`h-4 w-4 ${text}`} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <h3 className={`min-w-0 text-xs font-semibold uppercase ${text}`}>
            <Link
              href={`/announcements/${announcement.id}`}
              className="line-clamp-2 break-words after:absolute after:inset-0 after:rounded-2xl"
            >
              {announcement.title}
            </Link>
          </h3>
          <span className="shrink-0 text-xs text-gray-500">{timeAgo(announcement.createdAt)}</span>
        </div>
        <p className="mt-1 line-clamp-3 text-sm text-gray-900 break-words">{announcement.message}</p>
      </div>
    </article>
  );
};
