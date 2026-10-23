import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Always goes to the list, so it also works when a details page is opened from a shared link
export const MentorBackLink = () => (
  <Link
    href="/mentors"
    className="-ml-2 mb-4 flex w-fit items-center gap-1 rounded-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
  >
    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
    All mentors
  </Link>
);
