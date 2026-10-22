const Bar = ({ className }: { className: string }) => <div className={`rounded-lg bg-gray-200 ${className}`} />;

export const HomeSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-6" role="status" aria-label="Loading dashboard">
    <div className="flex flex-col gap-2">
      <Bar className="h-8 w-3/4" />
      <Bar className="h-8 w-1/3" />
      <Bar className="h-4 w-1/2" />
    </div>
    <div className="rounded-2xl bg-gray-50 p-5">
      <Bar className="mb-4 h-4 w-1/3" />
      <div className="flex items-center justify-between">
        <Bar className="h-10 w-16" />
        <Bar className="h-10 w-16" />
        <Bar className="h-10 w-16" />
      </div>
    </div>
    <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
      <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200" />
      <div className="flex flex-1 flex-col gap-2">
        <Bar className="h-4 w-2/3" />
        <Bar className="h-3 w-1/2" />
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <Bar className="h-6 w-2/5" />
      <Bar className="h-24 w-4/5" />
    </div>
    <div className="flex flex-col gap-3">
      <Bar className="h-6 w-2/5" />
      <Bar className="h-20 w-full" />
      <Bar className="h-20 w-full" />
    </div>
  </div>
);
