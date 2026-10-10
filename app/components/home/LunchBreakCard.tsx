import { Utensils } from 'lucide-react';
import { CurrentSession, LunchBreak } from '@/data/mockHome';
import { timeUntil } from '@/lib/time';

interface Props {
  lunchBreak: LunchBreak;
  currentSession: CurrentSession;
}

export const LunchBreakCard = ({ lunchBreak, currentSession }: Props) => (
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

    <div className="mt-4 flex justify-between gap-2 text-xs text-gray-600">
      <span className="truncate">Current Session: {currentSession.title}</span>
      <span>{currentSession.progress}%</span>
    </div>
    <div className="mt-1 h-2 rounded-full bg-gray-200">
      <div className="h-2 rounded-full bg-brand-yellow" style={{ width: `${currentSession.progress}%` }} />
    </div>
  </section>
);
