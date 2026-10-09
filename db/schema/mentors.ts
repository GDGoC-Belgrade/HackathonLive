import { integer, pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

import { hackathons } from "./hackathons";

export const mentors = pgTable("mentors", {
  id: serial("id").primaryKey(),

  hackathonId: integer("hackathon_id")
    .notNull()
    .references(() => hackathons.id, { onDelete: "cascade" }),

  name: varchar("name", { length: 255 }).notNull(),

  role: varchar("role", { length: 255 }).notNull(),

  company: varchar("company", { length: 255 }),

  bio: text("bio"),

  imageUrl: text("image_url"),

  phoneNumber: varchar("phone_number", { length: 20 }),

  email: varchar("email", { length: 255 }).notNull(),
});
