import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { hackathons } from "./hackathons";

export const scheduleEventTypeEnum = pgEnum("schedule_event_type", [
  "ceremony",
  "workshop",
  "meal",
  "deadline",
  "other",
]);

export const scheduleEvents = pgTable("schedule_events", {
  id: serial("id").primaryKey(),

  hackathonId: integer("hackathon_id")
    .notNull()
    .references(() => hackathons.id),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  startTime: timestamp("start_time", {
    withTimezone: true,
  }).notNull(),

  endTime: timestamp("end_time", {
    withTimezone: true,
  }).notNull(),

  location: varchar("location", {
    length: 255,
  }).notNull(),

  type: scheduleEventTypeEnum("type").notNull(),
});
