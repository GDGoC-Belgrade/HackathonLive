import {
  index,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

import { hackathons } from "./hackathons";

export const quests = pgTable(
  "quests",
  {
    id: serial("id").primaryKey(),

    hackathonId: integer("hackathon_id")
      .notNull()
      .references(() => hackathons.id, { onDelete: "cascade" }),

    title: varchar("title", { length: 255 }).notNull(),

    description: text("description"),

    category: varchar("category", { length: 100 }).notNull(),

    googleFormUrl: text("google_form_url").notNull(),
  },
  (table) => [index("quests_hackathon_id_idx").on(table.hackathonId)],
);

export type Quest = typeof quests.$inferSelect;
export type NewQuest = typeof quests.$inferInsert;