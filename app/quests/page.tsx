"use client";

import { useEffect, useState } from "react";
import { QuestCard, type Quest } from "@/app/components/QuestCard";

const QuestsPage = () => {
  // null = još se učitava
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/quests")
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(setQuests)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-2">
      <h1 className="text-xl font-bold text-gray-900">Event Quests</h1>

      {error ? (
        <p className="text-sm text-gray-600">Couldn&apos;t load quests.</p>
      ) : quests === null ? (
        <p className="text-sm text-gray-600">Loading quests...</p>
      ) : quests.length === 0 ? (
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
};

export default QuestsPage;
