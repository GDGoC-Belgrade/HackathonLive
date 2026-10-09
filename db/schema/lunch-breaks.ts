import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { hackathons } from "./hackathons";

export const lunchBreaks = pgTable("lunch_breaks", {
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
});