import { ScheduleEvent, ScheduleEventCard } from '@/app/components/ScheduleEvent';

async function getScheduleEvents() {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/schedule`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`GET /api/schedule bad result: ${res.status}`);
      return [];
      //finalni loading/error design out of scope (loading i error.tsx)
    }
    return res.json();
  } catch (err) {
    console.error("GET /api/schedule error:", err);
    return [];
  }
}

export default async function SchedulePage() {
  const events = await getScheduleEvents();

  return (
    <div className="mx-auto max-w-md p-5 text-gray-900">
      <h1 className="mb-6 text-2xl font-bold">Upcoming Events</h1>
      <div className="flex flex-col gap-3">
        {events.map((event:ScheduleEvent) => (
          <ScheduleEventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}