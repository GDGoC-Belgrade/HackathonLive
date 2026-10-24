'use client';

import { useEffect, useState } from 'react';

interface Props {
  endDate: Date;
}

const pad = (n: number) => String(n).padStart(2, '0');

function getTimeLeft(endDate: Date) {
  const totalSeconds = Math.max(0, Math.floor((endDate.getTime() - Date.now()) / 1000));
  return {
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

export const CountdownCard = ({ endDate }: Props) => {
  // null dok se komponenta ne ucita u browseru
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(endDate));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const isEnded = timeLeft !== null && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0;

  return (
    <section className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
      <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow" />
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-gray-600 uppercase">Time Remaining</h2>
          {isEnded ? (
            <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-600">ENDED</span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-0.5 text-xs font-semibold text-brand-green">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              LIVE
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-1 text-gray-900" role="timer" aria-label="Time remaining">
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
