import{
index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

import { hackathons } from "./hackathons";

export const announcementsTypeEnum = pgEnum("announcement_type", [
  "info",
  "warning",
  "important",
]);

export const announcements = pgTable("announcements", {

    id: serial("id").primaryKey(),

    hackathonId: integer("hackathon_id")
      .notNull()
      .references(() => hackathons.id, { onDelete: "cascade" }),

    title: varchar("title", { length: 255 }).notNull(),

    message: text("message").notNull(),

    type: announcementsTypeEnum("type").notNull().default("info"),
    
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

    expiresAt: timestamp("expires_at", { withTimezone: true }), 
    // potencijano može da se doda notnull ako baš svako obaveštenje mora da ima datum isteka, ostavio sam ovako čisto ako postoje obavešenja 
    // koja su stalna i ne ističu, npr. neko obaveštenje o pravilima ili slično.
},
(table) => [index("announcements_hackathon_id_idx").on(table.hackathonId)]
);

export const announcementsRelations = relations(announcements, ({ one }) => ({
    hackathon: one(hackathons, {
    fields: [announcements.hackathonId],
    references: [hackathons.id],
    }),
}));