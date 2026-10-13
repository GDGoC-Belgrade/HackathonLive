import { eq } from "drizzle-orm";

import { db } from "../index";
import { scheduleEvents } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getScheduleEventsForActiveHackathon() {
  const activeHackathon = await getActiveHackathon();

  if (!activeHackathon) {
    return null;
  }

  return db
    .select()
    .from(scheduleEvents)
    .where(eq(scheduleEvents.hackathonId, activeHackathon.id));
}
