import { QuestCard, type Quest } from "@/app/components/QuestCard";

export const dynamic = "force-dynamic";

async function getQuests(): Promise<Quest[]> {
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

export default async function QuestsPage() {
  const quests = await getQuests();

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-xl font-bold text-gray-900">Event Quests</h1>

      {quests.length === 0 ? (
        <p className="text-sm text-gray-600">No quests available yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {quests.map((quest, index) => (
            <QuestCard key={quest.id} quest={quest} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
