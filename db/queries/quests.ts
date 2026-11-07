import { asc, eq } from "drizzle-orm";

import { isValidGoogleFormUrl } from "../../lib/google-form-url";
import type { Quest } from "../../lib/types/quests";
import { db } from "../index";
import { quests } from "../schema";
import { getActiveHackathon } from "./hackathons";

export type QuestDTO = Quest;

export function toValidQuest(row: QuestDTO): QuestDTO | null {
  const title = row.title.trim();
  const category = row.category.trim();
  const googleFormUrl = row.googleFormUrl.trim();
  const description = row.description?.trim() || null;

  if (!title || !category ) {
    console.warn(`Skipping invalid quest with id ${row.id}`);
    return null;
  }

  return { id: row.id, title, description, category, googleFormUrl };
}

export async function getQuestsByHackathonId(
  hackathonId: number,
): Promise<QuestDTO[]> {
  const rows = await db
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

  return rows
    .map(toValidQuest)
    .filter((quest): quest is QuestDTO => quest !== null);
}

export async function getActiveHackathonQuests(): Promise<QuestDTO[] | null> {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return null;
  }

  return getQuestsByHackathonId(hackathon.id);
}
