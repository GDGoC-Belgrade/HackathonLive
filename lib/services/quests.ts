import { Quest } from '../types/quests'

export async function getQuests(): Promise<Quest[]> {
  const baseUrl = process.env.API_BASE_URL ?? "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/quests`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`GET /api/quests bad result: ${res.status}`);
      return [];
      // finalni loading/error dizajn je van scope-a
    }
    return res.json();
  } catch (err) {
    console.error("GET /api/quests error:", err);
    return [];
  }
}