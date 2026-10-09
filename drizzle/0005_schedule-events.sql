CREATE TYPE "public"."schedule_event_type" AS ENUM('ceremony', 'workshop', 'meal', 'deadline', 'other');--> statement-breakpoint
CREATE TABLE "schedule_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"location" varchar(255) NOT NULL,
	"type" "schedule_event_type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "schedule_events" ADD CONSTRAINT "schedule_events_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons"("id") ON DELETE no action ON UPDATE no action;