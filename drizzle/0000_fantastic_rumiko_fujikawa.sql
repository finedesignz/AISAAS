-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone,
	"full_name" text,
	"company_name" text,
	"avatar_url" text,
	"website" text
);
--> statement-breakpoint
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "stripe_customers" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone,
	"stripe_customer_id" text,
	CONSTRAINT "stripe_customers_stripe_customer_id_key" UNIQUE("stripe_customer_id")
);
--> statement-breakpoint
ALTER TABLE "stripe_customers" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "contact_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"updated_at" timestamp with time zone,
	"first_name" text,
	"last_name" text,
	"email" text,
	"phone" text,
	"company_name" text,
	"message_body" text
);
--> statement-breakpoint
ALTER TABLE "contact_requests" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stripe_customers" ADD CONSTRAINT "stripe_customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Users can update own profile." ON "profiles" AS PERMISSIVE FOR UPDATE TO public USING ((auth.uid() = id));--> statement-breakpoint
CREATE POLICY "Users can insert their own profile." ON "profiles" AS PERMISSIVE FOR INSERT TO public;--> statement-breakpoint
CREATE POLICY "Profiles are viewable by self." ON "profiles" AS PERMISSIVE FOR SELECT TO public;
*/