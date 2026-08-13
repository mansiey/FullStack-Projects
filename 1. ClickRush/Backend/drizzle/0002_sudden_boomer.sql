ALTER TABLE "users" ADD COLUMN "user_name" varchar(30);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_name_unique" UNIQUE("user_name");