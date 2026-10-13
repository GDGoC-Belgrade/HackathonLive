import { asc, eq } from "drizzle-orm";

import { db } from "../index";
import { lunchBreaks } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getLunchBreaksByHackathonId(hackathonId: number) { // pomocna f-ja za dodatno filtriranje, asc za hronoloski redosled
  return db
    .select()
    .from(lunchBreaks)
    .where(eq(lunchBreaks.hackathonId, hackathonId))
    .orderBy(asc(lunchBreaks.startTime));
}

export async function getLunchBreaksForActiveHackathon() {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return [];
  }

  return getLunchBreaksByHackathonId(hackathon.id);
}