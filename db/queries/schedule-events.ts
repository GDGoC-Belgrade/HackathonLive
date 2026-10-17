import { and, asc, eq, gt } from "drizzle-orm";

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
    .where(eq(scheduleEvents.hackathonId, activeHackathon.id))
    .orderBy(asc(scheduleEvents.startTime));
}

export async function getNextUpcomingEvent(hackathonId: number) {
  const [event] = await db
    .select()
    .from(scheduleEvents)
    .where(
      and(
        eq(scheduleEvents.hackathonId, hackathonId),
        gt(scheduleEvents.startTime, new Date()),
      ),
    )
    .orderBy(asc(scheduleEvents.startTime))
    .limit(1);

  return event ?? null;
}
