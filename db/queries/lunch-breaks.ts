import { asc, eq } from "drizzle-orm";

import { db } from "../index";
import { lunchBreaks } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getLunchBreaksForActiveHackathon() {
  const hackathon = await getActiveHackathon();

  if (!hackathon) {
    return [];
  }

  return db
    .select()
    .from(lunchBreaks)
    .where(eq(lunchBreaks.hackathonId, hackathon.id))
    .orderBy(asc(lunchBreaks.startTime));
}