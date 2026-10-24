import { Suspense } from 'react';
import { CalendarOff } from 'lucide-react';
import { getHomeData } from '@/lib/services/home';
import { TopBar } from '@/app/components/home/TopBar';
import { HackathonHeader } from '@/app/components/home/HackathonHeader';
import { CountdownCard } from '@/app/components/home/CountdownCard';
import { LunchBreakCard } from '@/app/components/home/LunchBreakCard';
import { UpcomingEventsSection } from '@/app/components/home/UpcomingEventsSection';
import { AnnouncementsSection } from '@/app/components/home/AnnouncementsSection';
import { HomeErrorBoundary } from '@/app/components/home/HomeErrorBoundary';
import { HomeSkeleton } from '@/app/components/home/HomeSkeleton';
import { EmptyState } from '@/app/components/states/EmptyState';

export const dynamic = 'force-dynamic';

async function HomeContent() {
  const home = await getHomeData();

  if (!home) {
    return (
      <EmptyState
        icon={CalendarOff}
        title="No active hackathon"
        description="There is no hackathon running right now. Check back soon!"
      />
    );
  }

  return (
    <>
      <HackathonHeader hackathon={home.hackathon} />
      <CountdownCard endDate={home.hackathon.endDate} />
      <LunchBreakCard lunchBreak={home.lunchBreak} />
      <UpcomingEventsSection events={home.upcomingEvent ? [home.upcomingEvent] : []} />
      <AnnouncementsSection announcements={home.announcements} />
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-6 text-gray-900">
      <TopBar />
      <HomeErrorBoundary>
        <Suspense fallback={<HomeSkeleton />}>
          <HomeContent />
        </Suspense>
      </HomeErrorBoundary>
    </div>
  );
}
