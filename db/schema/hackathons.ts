import { sql } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const hackathonStatusEnum = pgEnum("hackathon_status", [
  "upcoming",
  "active",
  "finished",
]);

export const hackathons = pgTable(
  "hackathons",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description"),

    startDate: timestamp("start_date", {
      withTimezone: true,
    }).notNull(),

    endDate: timestamp("end_date", {
      withTimezone: true,
    }).notNull(),

    location: varchar("location", {
      length: 255,
    }).notNull(),

    status: hackathonStatusEnum("status")
      .notNull()
      .default("upcoming"),
  },
  (table) => [
    uniqueIndex("only_one_active_hackathon")
      .on(table.status)
      .where(sql`${table.status} = 'active'`),
  ],
);