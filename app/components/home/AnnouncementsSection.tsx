import Link from 'next/link';
import { Megaphone } from 'lucide-react';
import { Announcement } from '@/lib/types/announcements';
import { AnnouncementCard } from './AnnouncementCard';
import { EmptyState } from '@/app/components/states/EmptyState';

interface Props {
  announcements: Announcement[];
}

export const AnnouncementsSection = ({ announcements }: Props) => (
  <section>
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">Announcements</h2>
      <Link
        href="/announcements"
        aria-label="View all announcements"
        className="text-sm font-medium text-brand-blue"
      >
        View All
      </Link>
    </div>
    {announcements.length === 0 ? (
      <EmptyState
        compact
        icon={Megaphone}
        title="No announcements yet"
        description="New updates from the organizers will appear here."
      />
    ) : (
      <div className="flex flex-col gap-3">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    )}
  </section>
);
