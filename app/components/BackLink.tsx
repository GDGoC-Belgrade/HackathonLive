'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { MouseEvent } from 'react';

interface Props {
  fallbackHref: string;
  label: string;
}

export const BackLink = ({ fallbackHref, label }: Props) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (window.history.length > 1) {
      event.preventDefault();
      router.back();
    }
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleClick}
      className="-ml-2 mb-4 flex w-fit items-center gap-1 rounded-full px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
    >
      <ArrowLeft className="h-5 w-5" aria-hidden="true" />
      {label}
    </Link>
  );
};
