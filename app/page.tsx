import { mockAnnouncements, mockHackathon, mockLunchBreak } from '@/data/mockHome';
import { getScheduleEvents } from '@/lib/services/schedule';
import { TopBar } from '@/app/components/home/TopBar';
import { HackathonHeader } from '@/app/components/home/HackathonHeader';
import { CountdownCard } from '@/app/components/home/CountdownCard';
import { LunchBreakCard } from '@/app/components/home/LunchBreakCard';
import { UpcomingEventsSection } from '@/app/components/home/UpcomingEventsSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const events = await getScheduleEvents();

  // PRIVREMENO: sledeći event biramo ovde. Kad se završi getNextUpcomingEvent, zamenjuje se tim pozivom
  
  // Lunch ima svoju karticu, pa tip 'meal' izbacujemo.
  const now = Date.now();
  const upcomingEvents = events
    .filter((event) => event.type !== 'meal' && new Date(event.startTime).getTime() > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 1);

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