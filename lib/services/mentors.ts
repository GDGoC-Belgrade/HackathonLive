import type { Mentor } from "../types/mentors";

// Unlike a missing mentor, a failed request throws so the page's error.tsx can show a retry state.
export async function getMentors(): Promise<Mentor[]> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/mentors`, { cache: 'no-store' });

  // 404 means there is no active hackathon, so there are simply no mentors to show
  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    throw new Error(`GET /api/mentors bad result: ${res.status}`);
  }
  return res.json();
}

export async function getMentor(id: string): Promise<Mentor | null> {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/mentors/${encodeURIComponent(id)}`, { cache: 'no-store' });

  if (res.status === 400 || res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`GET /api/mentors/${id} bad result: ${res.status}`);
  }
  return res.json();
}
