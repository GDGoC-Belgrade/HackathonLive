import { Utensils } from 'lucide-react';
import { LunchBreak } from '@/lib/types/home';
import { timeUntil } from '@/lib/time';

interface Props {
  lunchBreak: LunchBreak | null;
}

export const LunchBreakCard = ({ lunchBreak }: Props) => (
  <section
    aria-label="Lunch break"
    className={`rounded-2xl border border-gray-200 p-4 ${lunchBreak ? 'bg-white shadow-md' : 'bg-gray-50'}`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
        <Utensils className="h-5 w-5 text-brand-blue" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        {lunchBreak ? (
          <>
            <h2 className="line-clamp-2 font-semibold text-gray-900 break-words">{lunchBreak.title}</h2>
            <p className="text-sm text-gray-600 break-words">
              {lunchBreak.location} • {timeUntil(lunchBreak.startTime)}
            </p>
          </>
        ) : (
          <>
            <h2 className="font-semibold text-gray-900">No lunch break scheduled</h2>
            <p className="text-sm text-gray-600">The next lunch break will show up here.</p>
          </>
        )}
      </div>
    </div>
  </section>
);
