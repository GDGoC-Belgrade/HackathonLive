import { getMentors } from '@/lib/services/mentors'
import { MentorList } from '@/app/components/MentorList';

export const dynamic = 'force-dynamic';



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