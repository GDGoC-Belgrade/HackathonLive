import { Users } from 'lucide-react';
import { getMentors } from '@/lib/services/mentors';
import { MentorList } from '@/app/components/MentorList';
import { StateMessage } from '@/app/components/StateMessage';

export const dynamic = 'force-dynamic';

export default async function MentorsPage() {
  // Loading and failed requests are handled by loading.tsx and error.tsx
  const mentors = await getMentors();

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
      {mentors.length > 0 ? (
        <MentorList mentors={mentors} />
      ) : (
        <StateMessage
          icon={Users}
          title="No mentors yet"
          description="Mentors for this hackathon will show up here once they are announced."
        />
      )}
    </div>
  );
}
