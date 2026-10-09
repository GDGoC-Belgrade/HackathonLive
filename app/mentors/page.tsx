import { mockMentors } from '@/data/mockMentors';
import { MentorList } from '@/app/components/MentorList';

export default function MentorsPage() {
  return (
    <div className="mx-auto max-w-md text-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
      <MentorList mentors={mockMentors} />
    </div>
  );
}
