import { ScheduleEvent } from "../types/schedule";

export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
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