'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { CloudOff } from 'lucide-react';
import { StateMessage } from '@/app/components/StateMessage';

export default function MentorsError({
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
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
      <StateMessage
        tone="error"
        icon={CloudOff}
        title="Couldn’t load mentors"
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
