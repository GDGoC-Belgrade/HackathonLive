import type { Mentor } from '@/db/schema';
import { MentorList } from '@/app/components/MentorList';

export const dynamic = 'force-dynamic';

async function getMentors(): Promise<Mentor[]> {
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

export default async function MentorsPage() {
  const mentors = await getMentors();

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
      {mentors.length > 0 ? (
        <MentorList mentors={mentors} />
      ) : (
        <p className="text-sm text-gray-600">No mentors available yet.</p>
      )}
    </div>
  );
}