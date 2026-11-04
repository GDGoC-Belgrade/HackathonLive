import { Suspense } from "react";
import { Megaphone } from "lucide-react";
import { getAnnouncements } from "@/lib/services/announcements";
import { AnnouncementCard } from "@/app/components/AnnouncementCard";
import { AnnouncementsListSkeleton } from "@/app/components/AnnouncementsListSkeleton";
import { BackLink } from "@/app/components/BackLink";
import { EmptyState } from "@/app/components/states/EmptyState";

export const dynamic = "force-dynamic";

async function AnnouncementsList() {
  const announcements = await getAnnouncements();

  if (announcements.length === 0) {
    return (
      <EmptyState
        icon={Megaphone}
        title="No announcements yet"
        description="New updates from the organizers will appear here."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {announcements.map((announcement) => (
        <li key={announcement.id}>
          <AnnouncementCard announcement={announcement} />
        </li>
      ))}
    </ul>
  );
}

export default function AnnouncementsPage() {
  return (
    <div className="mx-auto max-w-md text-gray-900">
      <BackLink fallbackHref="/" label="Back" />
      <h1 className="mb-4 text-2xl font-bold">Announcements</h1>
      <Suspense fallback={<AnnouncementsListSkeleton />}>
        <AnnouncementsList />
      </Suspense>
    </div>
  );
}
