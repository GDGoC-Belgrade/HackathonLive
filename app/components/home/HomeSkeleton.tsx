const Bar = ({ className }: { className: string }) => <div className={`rounded-lg bg-gray-200 ${className}`} />;

const CountdownUnit = () => (
  <div className="flex flex-col items-center gap-2">
    <Bar className="h-10 w-14" />
    <Bar className="h-3 w-12" />
  </div>
);

export const HomeSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-6" role="status" aria-label="Loading dashboard">
    <div className="flex flex-col gap-2">
      <Bar className="h-9 w-4/5" />
      <Bar className="h-9 w-2/5" />
      <Bar className="mt-1 h-4 w-3/5" />
    </div>

    <div className="overflow-hidden rounded-2xl bg-gray-100">
      <div className="h-1 bg-gray-200" />
      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <Bar className="h-4 w-32" />
          <Bar className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex items-start justify-between">
          <CountdownUnit />
          <CountdownUnit />
          <CountdownUnit />
          <CountdownUnit />
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3 rounded-2xl bg-gray-100 p-4">
      <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200" />
      <div className="flex flex-1 flex-col gap-2">
        <Bar className="h-4 w-2/3" />
        <Bar className="h-4 w-1/2" />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <Bar className="h-7 w-2/5" />
      <div className="flex gap-3 overflow-hidden">
        <div className="flex h-28 w-4/5 shrink-0 flex-col justify-center gap-2 rounded-2xl bg-gray-100 p-4">
          <Bar className="h-3 w-1/3" />
          <Bar className="h-5 w-3/4" />
          <Bar className="h-4 w-1/2" />
        </div>
        <div className="h-28 w-2/5 shrink-0 rounded-2xl bg-gray-100" />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <Bar className="h-7 w-2/5" />
      {[0, 1].map((i) => (
        <div key={i} className="flex gap-3 rounded-2xl bg-gray-100 p-4">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200" />
          <div className="flex flex-1 flex-col gap-2">
            <Bar className="h-3 w-1/3" />
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
