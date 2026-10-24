'use client';

import { catchError, type ErrorInfo } from 'next/error';
import { ErrorState } from '@/app/components/states/ErrorState';

function HomeErrorFallback(_props: object, { error, retry }: ErrorInfo) {
  console.error(error);
  return <ErrorState showHome={false} onRetry={() => retry()} />;
}

export const HomeErrorBoundary = catchError(HomeErrorFallback);
