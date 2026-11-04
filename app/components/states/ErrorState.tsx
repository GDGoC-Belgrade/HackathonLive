'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
  showHome?: boolean;
}

export const ErrorState = ({
  title = 'Something went wrong',
  description = "We couldn't load this right now. Check your connection and try again.",
  onRetry,
  showHome = true,
}: Props) => (
  <div
    role="alert"
    className="flex flex-col items-center gap-2 rounded-2xl border border-brand-red/30 bg-brand-red/5 px-6 py-10 text-center"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/15">
      <AlertTriangle className="h-6 w-6 text-brand-red" aria-hidden="true" />
    </div>
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    <p className="max-w-xs text-sm text-gray-600">{description}</p>
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white active:scale-95"
        >
          Try again
        </button>
      )}
      {showHome && (
        <Link href="/" className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 active:scale-95">
          Go home
        </Link>
      )}
    </div>
  </div>
);
