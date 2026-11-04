import type { Quest } from "../types/quests";

export async function getQuests(): Promise<Quest[]> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/quests`, { cache: "no-store" });

  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    throw new Error(`GET /api/quests bad result: ${res.status}`);
  }

  const quests: unknown = await res.json();
  // Neočekivan odgovor ide u error.tsx umesto da sruši render liste
  if (!Array.isArray(quests)) {
    throw new Error("GET /api/quests returned an unexpected response");
  }
  return quests;
}
