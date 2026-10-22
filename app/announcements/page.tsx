import { Megaphone } from "lucide-react";
import { getAnnouncements } from "@/lib/services/announcements";
import { AnnouncementCard } from "@/app/components/AnnouncementCard";
import { BackLink } from "@/app/components/BackLink";
import { EmptyState } from "@/app/components/states/EmptyState";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <BackLink fallbackHref="/" label="Back" />
      <h1 className="mb-4 text-2xl font-bold">Announcements</h1>
      {announcements.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="No announcements yet"
          description="New updates from the organizers will appear here."
        />
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
