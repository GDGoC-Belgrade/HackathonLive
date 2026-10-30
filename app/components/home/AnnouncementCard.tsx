import Link from 'next/link';
import { Announcement } from '@/lib/types/announcements';
import { announcementStyles } from '@/app/components/announcementStyles';
import { timeAgo } from '@/lib/time';

interface Props {
  announcement: Announcement;
}

export const AnnouncementCard = ({ announcement }: Props) => {
  const { icon: Icon, text, iconBox, card, badge, label } = announcementStyles[announcement.type];

  return (
    <article className={`relative flex gap-3 rounded-2xl border-2 p-4 transition active:scale-[0.98] ${card}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBox}`}>
        <Icon className={`h-5 w-5 ${text}`} aria-hidden="true" />
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
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge}`}
        >
          {label}
        </span>
      </div>
    </article>
  );
};
