import type { ScheduleEvent } from '@/lib/types/schedule';
import type { HomeData, Hackathon, LunchBreak } from '@/lib/types/home';
import type { Announcement } from '@/lib/types/announcements';

// Oblik JSON-a koji vraća /api/home: datumi stižu kao tekst
interface HomeResponse {
  hackathon: Omit<Hackathon, 'startDate' | 'endDate'> & { startDate: string; endDate: string };
  upcomingEvent: ScheduleEvent | null;
  lunchBreaks: (Omit<LunchBreak, 'startTime' | 'endTime'> & { startTime: string; endTime: string })[];
  announcements: (Omit<Announcement, 'createdAt' | 'expiresAt'> & {
    createdAt: string;
    expiresAt: string | null;
  })[];
}

export async function getHomeData(): Promise<HomeData | null> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/home`, { cache: 'no-store' });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    console.error(`GET /api/home bad result: ${res.status}`);
    throw new Error(`Failed to load home data (${res.status})`);
  }
  const data: HomeResponse = await res.json();

  const now = Date.now();
  const lunchBreaks = (data.lunchBreaks ?? []).map((lunch) => ({
    ...lunch,
    startTime: new Date(lunch.startTime),
    endTime: new Date(lunch.endTime),
  }));

  return {
    hackathon: {
      ...data.hackathon,
      startDate: new Date(data.hackathon.startDate),
      endDate: new Date(data.hackathon.endDate),
    },
    upcomingEvent: data.upcomingEvent ?? null,
    // Prva pauza za ručak koja još nije završena
    lunchBreak: lunchBreaks.find((lunch) => lunch.endTime.getTime() > now) ?? null,
    announcements: (data.announcements ?? []).map((announcement) => ({
      ...announcement,
      createdAt: new Date(announcement.createdAt),
      expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt) : null,
    })),
  };
}
