CREATE TABLE "quests" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(100) NOT NULL,
	"google_form_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quests" ADD CONSTRAINT "quests_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "quests_hackathon_id_idx" ON "quests" USING btree ("hackathon_id");