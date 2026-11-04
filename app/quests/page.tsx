import { Flag } from "lucide-react";
import { QuestCard } from "@/app/components/QuestCard";
import { StateMessage } from "@/app/components/StateMessage";
import { getQuests } from "@/lib/services/quests";

export const dynamic = "force-dynamic";

export default async function QuestsPage() {
  // Učitavanje i greške prikazuju loading.tsx i error.tsx
  const quests = await getQuests();

  return (
    <div className="text-gray-900">
      <h1 className="mb-4 text-2xl font-bold">Event Quests</h1>

      {quests.length === 0 ? (
        <StateMessage
          icon={Flag}
          title="No quests yet"
          description="Quests for this hackathon will show up here once they are announced."
        />
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
