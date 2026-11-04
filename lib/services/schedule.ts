import { ScheduleEvent } from "../types/schedule";

// Baca grešku ako API ne radi, pa stranica može da prikaže error state
// Prazan niz znači raspored je prazan
export async function getScheduleEvents(): Promise<ScheduleEvent[]> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/schedule`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`GET /api/schedule failed: ${res.status}`);
  }

  return res.json();
}