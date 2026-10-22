import type { Announcement } from '../types/announcements';

interface AnnouncementResponse extends Omit<Announcement, 'createdAt' | 'expiresAt'> {
  createdAt: string;
  expiresAt: string | null;
}

const parseAnnouncement = (announcement: AnnouncementResponse): Announcement => ({
  ...announcement,
  createdAt: new Date(announcement.createdAt),
  expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt) : null,
});

export async function getAnnouncements(): Promise<Announcement[]> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/announcements`, { cache: 'no-store' });
  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    console.error(`GET /api/announcements bad result: ${res.status}`);
    throw new Error(`Failed to load announcements (${res.status})`);
  }
  const data: AnnouncementResponse[] = await res.json();
  return data.map(parseAnnouncement);
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/announcements/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 400 || res.status === 404) {
    return null;
  }
  if (!res.ok) {
    console.error(`GET /api/announcements/${id} bad result: ${res.status}`);
    throw new Error(`Failed to load announcement (${res.status})`);
  }
  return parseAnnouncement(await res.json());
}
