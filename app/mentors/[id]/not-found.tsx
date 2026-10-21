import Link from 'next/link';
import { UserX } from 'lucide-react';
import { MentorBackLink } from '@/app/components/MentorBackLink';
import { StateMessage } from '@/app/components/StateMessage';

export default function MentorNotFound() {
  return (
    <div className="mx-auto max-w-md text-gray-900">
      <MentorBackLink />
      <StateMessage
        icon={UserX}
        title="Mentor not found"
        description="This mentor doesn’t exist or isn’t part of the current hackathon."
        action={
          <Link
            href="/mentors"
            className="inline-block rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green/90 active:scale-[0.98]"
          >
            Browse mentors
          </Link>
        }
      />
    </div>
  );
}
