import type { Announcement } from '../types/announcements';

export async function getAnnouncements(): Promise<Announcement[]> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/announcements`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`GET /api/announcements bad result: ${res.status}`);
      return [];
    }
    const data = await res.json();

    return data.map((announcement: any) => ({
      ...announcement,
      createdAt: new Date(announcement.createdAt),
      expiresAt: announcement.expiresAt ? new Date(announcement.expiresAt) : null,
    }));
  } catch (err) {
    console.error('GET /api/announcements error:', err);
    return [];
  }
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/announcements/${encodeURIComponent(id)}`, { cache: 'no-store' });
    if (res.status === 400 || res.status === 404) {
      return null;
    }
    if (!res.ok) {
      console.error(`GET /api/announcements/${id} bad result: ${res.status}`);
      return null;
    }
    const data = await res.json();

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
    };
  } catch (err) {
    console.error(`GET /api/announcements/${id} error:`, err);
    return null;
  }
}