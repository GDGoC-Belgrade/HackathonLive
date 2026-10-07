CREATE TYPE "public"."hackathon_status" AS ENUM('upcoming', 'active', 'finished');--> statement-breakpoint
CREATE TABLE "hackathons" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"location" varchar(255) NOT NULL,
	"status" "hackathon_status" DEFAULT 'upcoming' NOT NULL
);
--> statement-breakpoint
DROP TABLE "test" CASCADE;--> statement-breakpoint
CREATE UNIQUE INDEX "only_one_active_hackathon" ON "hackathons" USING btree ("status") WHERE "hackathons"."status" = 'active';