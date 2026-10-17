import { getHomeData } from '@/lib/services/home';
import { TopBar } from '@/app/components/home/TopBar';
import { HackathonHeader } from '@/app/components/home/HackathonHeader';
import { CountdownCard } from '@/app/components/home/CountdownCard';
import { LunchBreakCard } from '@/app/components/home/LunchBreakCard';
import { UpcomingEventsSection } from '@/app/components/home/UpcomingEventsSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const home = await getHomeData();

  // Nema aktivnog hackathona ili API nije dostupan (finalni error dizajn je van scope-a)
  if (!home) {
    return (
      <div className="flex flex-col gap-6 text-gray-900">
        <TopBar />
        <p className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          No active hackathon data available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-gray-900">
      <TopBar />
      <HackathonHeader hackathon={home.hackathon} />
      <CountdownCard endDate={home.hackathon.endDate} />
      {home.lunchBreak && <LunchBreakCard lunchBreak={home.lunchBreak} />}
      <UpcomingEventsSection events={home.upcomingEvent ? [home.upcomingEvent] : []} />
      <AnnouncementsSection announcements={home.announcements} />
    </div>
  );
}