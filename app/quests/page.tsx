import { QuestCard, type Quest } from "@/app/components/QuestCard";

import { getQuests } from "@/lib/services/quests"

export const dynamic = "force-dynamic";



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
