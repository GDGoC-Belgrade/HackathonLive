import { QuestCard } from "@/app/components/QuestCard";
import { mockQuests } from "@/lib/mock/quests";

const page = () => {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-xl font-bold text-gray-900">Event Quests</h1>
      <div className="flex flex-col gap-4">
        {mockQuests.map((quest, index) => (
          <QuestCard key={quest.id} quest={quest} index={index} />
        ))}
      </div>
    </div>
  );
};

export default page;
