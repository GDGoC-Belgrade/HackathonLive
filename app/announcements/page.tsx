import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getActiveAnnouncements } from "@/db/queries/announcements";
import { AnnouncementCard } from "@/app/components/AnnouncementCard";

// Reads the DB per request: announcements change during the event
export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  // null means there is no active hackathon
  const announcements = (await getActiveAnnouncements()) ?? [];

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <Link
        href="/"
        className="-ml-2 mb-4 flex w-fit items-center gap-1 rounded-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        Back
      </Link>
      <h1 className="mb-4 text-2xl font-bold">Announcements</h1>
      {announcements.length === 0 ? (
        <p className="text-gray-600">No announcements yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <AnnouncementCard announcement={announcement} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
