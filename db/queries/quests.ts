import { asc, eq } from "drizzle-orm";

import { db } from "../index";
import { quests } from "../schema";
import { getActiveHackathon } from "./hackathons";

export type QuestDTO = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  googleFormUrl: string;
};

export async function getQuestsByHackathonId(
  hackathonId: number,
): Promise<QuestDTO[]> {
  return db
    .select({
      id: quests.id,
      title: quests.title,
      description: quests.description,
      category: quests.category,
      googleFormUrl: quests.googleFormUrl,
    })
    .from(quests)
    .where(eq(quests.hackathonId, hackathonId))
    .orderBy(asc(quests.id));
}

export async function getActiveHackathonQuests(): Promise<QuestDTO[]> {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return [];
  }

  return getQuestsByHackathonId(hackathon.id);
}