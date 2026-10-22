import { and, asc, eq, gt } from "drizzle-orm";

import { db } from "../index";
import { scheduleEvents, scheduleEventTypeEnum } from "../schema";
import { getActiveHackathon } from "./hackathons";

type ScheduleEventRow = typeof scheduleEvents.$inferSelect;

const VALID_EVENTS: string[] = scheduleEventTypeEnum.enumValues;

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function isValidScheduleEvent(event: ScheduleEventRow): boolean {
  if (!isValidDate(event.startTime) || !isValidDate(event.endTime)){
    return false;
  }

  if (event.endTime < event.startTime){
    return false;
  }

  if (!event.title || event.title.trim() === ""){
    return false;
  }

  return VALID_EVENTS.includes(event.type);
}

export async function getScheduleEventsForActiveHackathon() {
  const activeHackathon = await getActiveHackathon();

  if (!activeHackathon) {
    return null;
  }

  const events = await db
    .select()
    .from(scheduleEvents)
    .where(eq(scheduleEvents.hackathonId, activeHackathon.id))
    .orderBy(asc(scheduleEvents.startTime), asc(scheduleEvents.id));

  return events.filter((event) => {
    if(isValidScheduleEvent(event)){
      return true;
    }

    console.warn(`Skipping invalid schedule event (id: ${event.id})`);
    return false;
  });
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
