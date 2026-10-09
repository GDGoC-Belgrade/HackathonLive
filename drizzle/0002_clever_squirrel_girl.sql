CREATE TABLE "lunch_breaks" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"location" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lunch_breaks" ADD CONSTRAINT "lunch_breaks_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons"("id") ON DELETE no action ON UPDATE no action;