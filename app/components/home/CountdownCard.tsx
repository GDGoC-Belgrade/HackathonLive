'use client';

import { useEffect, useState } from 'react';

interface Props {
  startDate: Date;
  endDate: Date;
}

type Phase = 'upcoming' | 'live' | 'ended';

const pad = (n: number) => String(n).padStart(2, '0');

function getTimeLeft(startDate: Date, endDate: Date) {
  const now = Date.now();
  const phase: Phase = now < startDate.getTime() ? 'upcoming' : now < endDate.getTime() ? 'live' : 'ended';
  const target = phase === 'upcoming' ? startDate : endDate;
  const totalSeconds = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return {
    phase,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    mins: Math.floor((totalSeconds % 3600) / 60),
    secs: totalSeconds % 60,
  };
}

const TimeUnit = ({ value, label }: { value: number | null; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl font-bold tabular-nums min-[360px]:text-4xl">{value === null ? '--' : pad(value)}</span>
    <span className="text-xs text-gray-500">{label}</span>
  </div>
);

const Separator = () => <span className="pb-5 text-2xl text-gray-300">:</span>;

const Badge = ({ phase }: { phase: Phase }) => {
  if (phase === 'ended') {
    return <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">ENDED</span>;
  }
  if (phase === 'upcoming') {
    return (
      <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-xs font-semibold text-brand-blue">UPCOMING</span>
    );
  }
  return (
    <span className="flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-semibold text-brand-green">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
      LIVE
    </span>
  );
};

export const CountdownCard = ({ startDate, endDate }: Props) => {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(startDate, endDate));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const phase = timeLeft?.phase ?? 'live';
  const heading = phase === 'upcoming' ? 'Starts In' : 'Time Remaining';

  return (
    <section className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow" />
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-gray-600 uppercase">{heading}</h2>
          {timeLeft && <Badge phase={phase} />}
        </div>
        <div className="flex items-center justify-between gap-1 text-gray-900" role="timer" aria-label={heading}>
          <TimeUnit value={timeLeft?.days ?? null} label="DAYS" />
          <Separator />
          <TimeUnit value={timeLeft?.hours ?? null} label="HOURS" />
          <Separator />
          <TimeUnit value={timeLeft?.mins ?? null} label="MINS" />
          <Separator />
          <TimeUnit value={timeLeft?.secs ?? null} label="SECS" />
        </div>
      </div>
    </section>
  );
};
