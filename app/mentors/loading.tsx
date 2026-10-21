// Skeleton that mirrors the mentors list layout while the data loads
export default function MentorsLoading() {
  return (
    <div className="mx-auto max-w-md text-gray-900" aria-busy="true">
      <span className="sr-only" role="status">
        Loading mentors…
      </span>
      <h1 className="mb-4 text-2xl font-bold">Connect with Mentors</h1>
      <div className="mb-5 h-12 animate-pulse rounded-full bg-gray-100" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-3" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex animate-pulse flex-col items-center rounded-2xl border-2 border-gray-100 p-3"
          >
            <div className="mb-2 h-[72px] w-[72px] rounded-full bg-gray-200" />
            <div className="mb-1.5 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-1 h-3 w-2/3 rounded bg-gray-100" />
            <div className="h-3 w-1/2 rounded bg-gray-100" />
            <div className="mt-4 h-4 w-1/3 self-start rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
