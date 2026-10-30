'use client'; // error.tsx mora biti klijent komponenta

import { useEffect } from 'react';
import { CloudOff } from 'lucide-react';
import { StateMessage } from '@/app/components/StateMessage';

export default function ScheduleError({
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
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-xl font-bold text-gray-900">Upcoming Events</h1>
      <StateMessage
        tone="error"
        icon={CloudOff}
        title="Couldn’t load the schedule"
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