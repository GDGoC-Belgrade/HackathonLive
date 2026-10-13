import { Utensils } from 'lucide-react';
import { LunchBreak } from '@/data/mockHome';
import { timeUntil } from '@/lib/time';

interface Props {
  lunchBreak: LunchBreak;
}

export const LunchBreakCard = ({ lunchBreak }: Props) => (
  <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10">
        <Utensils className="h-5 w-5 text-brand-blue" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-semibold text-gray-900">{lunchBreak.title}</h2>
        <p className="truncate text-sm text-gray-600">
          {lunchBreak.location} • {timeUntil(lunchBreak.startTime)}
        </p>
      </div>
    </div>
  </section>
);