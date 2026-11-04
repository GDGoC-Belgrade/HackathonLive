import Link from "next/link";
import { announcementStyles, formatAnnouncementDate, type AnnouncementType } from "@/app/components/announcementStyles";

export interface AnnouncementCardData {
  id: number;
  type: AnnouncementType;
  title: string;
  message: string;
  createdAt: Date;
}

export const AnnouncementCard = ({ announcement }: { announcement: AnnouncementCardData }) => {
  const style = announcementStyles[announcement.type];
  const Icon = style.icon;

  return (
    <div
      className={`relative flex gap-3 rounded-2xl border-2 p-3 text-gray-900 shadow-sm transition active:scale-[0.98] ${style.card}`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.iconBox}`}>
        <Icon className={`h-6 w-6 ${style.text}`} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <Link
          href={`/announcements/${announcement.id}`}
          className="block font-semibold after:absolute after:inset-0 after:rounded-2xl"
        >
          <h3 className="line-clamp-2 break-words">{announcement.title}</h3>
        </Link>
        <p className="mt-0.5 line-clamp-2 break-words text-sm text-gray-600">{announcement.message}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.badge}`}>
            {style.label}
          </span>
          <time dateTime={announcement.createdAt.toISOString()} className="text-xs text-gray-500">
            {formatAnnouncementDate(announcement.createdAt)}
          </time>
        </div>
      </div>
    </div>
  );
};
