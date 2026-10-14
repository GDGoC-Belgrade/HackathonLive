import { and, asc, eq } from "drizzle-orm";
import { db } from "../index";
import { mentors } from "../schema";
import { getActiveHackathon } from "./hackathons";

export async function getActiveHackathonMentors() {
  const activeHackathon = await getActiveHackathon();

  if (!activeHackathon) {
    return null;
  }

  return db
    .select()
    .from(mentors)
    .where(eq(mentors.hackathonId, activeHackathon.id))
    .orderBy(asc(mentors.name));
}

export async function getMentorByIdAndHackathonId(
  id: number,
  hackathonId: number,
) {
  const [mentor] = await db
    .select()
    .from(mentors)
    .where(and(eq(mentors.id, id), eq(mentors.hackathonId, hackathonId)))
    .limit(1);

  return mentor ?? null;
}

export async function getActiveHackathonMentorById(id: number) {
  const activeHackathon = await getActiveHackathon();

  if (!activeHackathon) {
    return { error: "NO_ACTIVE_HACKATHON" } as const;
  }

  // A mentor from another hackathon is treated the same as a missing one
  const mentor = await getMentorByIdAndHackathonId(id, activeHackathon.id);

  if (!mentor) {
    return { error: "MENTOR_NOT_FOUND" } as const;
  }

  return { mentor };
}
