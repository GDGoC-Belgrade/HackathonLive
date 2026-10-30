'use client';

import { ErrorState } from '@/app/components/states/ErrorState';

export default function Error({ retry }: { error: Error; retry: () => void }) {
  return <ErrorState onRetry={() => retry()} />;
}