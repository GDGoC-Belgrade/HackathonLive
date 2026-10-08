CREATE TABLE "mentors" (
	"id" serial PRIMARY KEY NOT NULL,
	"hackathon_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"company" varchar(255),
	"bio" text,
	"image_url" text,
	"phone_number" varchar(20),
	"email" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mentors" ADD CONSTRAINT "mentors_hackathon_id_hackathons_id_fk" FOREIGN KEY ("hackathon_id") REFERENCES "public"."hackathons"("id") ON DELETE cascade ON UPDATE no action;