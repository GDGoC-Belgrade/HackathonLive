const Line = ({ height, className }: { height: string; className: string }) => (
  <div className={`flex items-center ${height}`}>
    <div className={`h-3 rounded bg-gray-200 ${className}`} />
  </div>
);

export const AnnouncementsListSkeleton = () => (
  <ul className="flex animate-pulse flex-col gap-3" role="status" aria-label="Loading announcements">
    {[0, 1, 2, 3].map((i) => (
      <li key={i} className="flex gap-3 rounded-2xl border-2 border-gray-100 p-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />
        <div className="min-w-0 flex-1">
          <Line height="h-6" className="w-2/3" />
          <div className="mt-0.5">
            <Line height="h-5" className="w-full" />
            <Line height="h-5" className="w-4/5" />
          </div>
          <div className="mt-1.5 flex h-[19px] items-center gap-2">
            <div className="h-full w-16 rounded-full bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
        </div>
      </li>
    ))}
  </ul>
);
