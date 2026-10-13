import Link from 'next/link';
import { Announcement } from '@/data/mockHome';
import { AnnouncementCard } from './AnnouncementCard';

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
    <div className="flex flex-col gap-3">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  </section>
);