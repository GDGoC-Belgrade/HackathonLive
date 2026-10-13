import { mockAnnouncements, mockHackathon, mockLunchBreak } from '@/data/mockHome';
import { mockEvents } from '@/data/mockSchedule';
import { TopBar } from '@/app/components/home/TopBar';
import { HackathonHeader } from '@/app/components/home/HackathonHeader';
import { CountdownCard } from '@/app/components/home/CountdownCard';
import { LunchBreakCard } from '@/app/components/home/LunchBreakCard';
import { UpcomingEventsSection } from '@/app/components/home/UpcomingEventsSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';

// Lunch Break već ima svoju karticu, pa ga ne prikazujemo i među eventovima
const upcomingEvents = mockEvents.filter((event) => event.title !== mockLunchBreak.title);

export default function Home() {
  return (
    <div className="flex flex-col gap-6 text-gray-900">
      <TopBar />
      <HackathonHeader hackathon={mockHackathon} />
      <CountdownCard endDate={mockHackathon.endDate} />
      <LunchBreakCard lunchBreak={mockLunchBreak} />
      <UpcomingEventsSection events={upcomingEvents} />
      <AnnouncementsSection announcements={mockAnnouncements} />
    </div>
  );
}