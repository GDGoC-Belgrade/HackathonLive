'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { CloudOff } from 'lucide-react';
import { MentorBackLink } from '@/app/components/MentorBackLink';
import { StateMessage } from '@/app/components/StateMessage';

export default function MentorDetailsError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md text-gray-900">
      <MentorBackLink />
      <StateMessage
        tone="error"
        icon={CloudOff}
        title="Couldn’t load this mentor"
        description="Something went wrong on our side. Check your connection and try again."
        action={
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-blue/90 active:scale-[0.98]"
          >
            Try again
          </button>
        }
      />
    </div>
  );
}
