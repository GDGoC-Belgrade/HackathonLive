import { notFound } from "next/navigation";
import { getAnnouncement } from "@/lib/services/announcements";
import { BackLink } from "@/app/components/BackLink";
import { announcementStyles, formatAnnouncementDate } from "@/app/components/announcementStyles";

export const dynamic = "force-dynamic";

const MAX_POSTGRES_INT = 2147483647;

export default async function AnnouncementDetailsPage({ params }: PageProps<"/announcements/[id]">) {
  const { id } = await params;
  const announcementId = Number(id);

  if (!/^[1-9]\d*$/.test(id) || announcementId > MAX_POSTGRES_INT) {
    notFound();
  }

  const announcement = await getAnnouncement(id);

  if (!announcement) {
    notFound();
  }

  const style = announcementStyles[announcement.type];
  const Icon = style.icon;

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <BackLink fallbackHref="/announcements" label="Back" />

      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${style.badge}`}>
        {style.label}
      </span>

      <div className="mt-3 flex items-center gap-3">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${style.iconBox}`}>
          <Icon className={`h-7 w-7 ${style.text}`} aria-hidden="true" />
        </div>
        <h1 className="min-w-0 break-words text-2xl font-bold">{announcement.title}</h1>
      </div>

      <time dateTime={announcement.createdAt.toISOString()} className="mt-3 block text-sm text-gray-500">
        {formatAnnouncementDate(announcement.createdAt)}
      </time>

      <p className="mt-4 whitespace-pre-line break-words leading-relaxed text-gray-700">{announcement.message}</p>
    </div>
  );
}