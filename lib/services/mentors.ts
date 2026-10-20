import { Mentor } from "../types/mentors";

export async function getMentors(): Promise<Mentor[]> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/mentors`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`GET /api/mentors bad result: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error('GET /api/mentors error:', err);
    return [];
  }
}

export async function getMentor(id: string): Promise<Mentor | null> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/mentors/${encodeURIComponent(id)}`, { cache: 'no-store' });
    if (res.status === 400 || res.status === 404) {
      return null;
    }
    if (!res.ok) {
      console.error(`GET /api/mentors/${id} bad result: ${res.status}`);
      return null;
    }
    return res.json();
  } catch (err) {
    console.error(`GET /api/mentors/${id} error:`, err);
    return null;
  }
}