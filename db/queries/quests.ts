import { asc, eq } from "drizzle-orm";

import { db } from "../index";
import { quests } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getQuestsByHackathonId(hackathonId: number) {
  return db
    .select()
    .from(quests)
    .where(eq(quests.hackathonId, hackathonId))
    .orderBy(asc(quests.id));
}

export async function getActiveHackathonQuests() {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return null;
  }

  return getQuestsByHackathonId(hackathon.id);
}