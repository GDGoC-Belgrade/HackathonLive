import { MentorBackLink } from '@/app/components/MentorBackLink';

// Skeleton that mirrors the mentor details layout, with a working Back link
export default function MentorDetailsLoading() {
  return (
    <div className="mx-auto max-w-md text-gray-900" aria-busy="true">
      <span className="sr-only" role="status">
        Loading mentor…
      </span>
      <MentorBackLink />

      <div className="flex animate-pulse flex-col items-center" aria-hidden="true">
        <div className="mb-4 h-28 w-28 rounded-full bg-gray-200" />
        <div className="mb-2 h-7 w-2/3 rounded bg-gray-200" />
        <div className="mb-1.5 h-4 w-1/2 rounded bg-gray-100" />
        <div className="h-4 w-1/3 rounded bg-gray-100" />
      </div>

      <div className="mt-6 animate-pulse" aria-hidden="true">
        <div className="mb-3 h-4 w-16 rounded bg-gray-200" />
        <div className="mb-2 h-4 w-full rounded bg-gray-100" />
        <div className="mb-2 h-4 w-full rounded bg-gray-100" />
        <div className="h-4 w-3/4 rounded bg-gray-100" />
      </div>

      <div className="mt-6 flex animate-pulse flex-col gap-3" aria-hidden="true">
        <div className="mb-1 h-4 w-20 rounded bg-gray-200" />
        <div className="h-14 rounded-2xl bg-gray-100" />
        <div className="h-14 rounded-2xl bg-gray-100" />
      </div>
    </div>
  );
}
