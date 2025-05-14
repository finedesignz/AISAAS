import {
  pgTable,
  foreignKey,
  pgPolicy,
  uuid,
  timestamp,
  text,
  unique,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const profiles = pgTable(
  "profiles",
  {
    id: uuid().primaryKey().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    fullName: text("full_name"),
    companyName: text("company_name"),
    avatarUrl: text("avatar_url"),
    website: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [users.id],
      name: "profiles_id_fkey",
    }).onDelete("cascade"),
    pgPolicy("Users can update own profile.", {
      as: "permissive",
      for: "update",
      to: ["public"],
      using: sql`(auth.uid() = id)`,
    }),
    pgPolicy("Users can insert their own profile.", {
      as: "permissive",
      for: "insert",
      to: ["public"],
    }),
    pgPolicy("Profiles are viewable by self.", {
      as: "permissive",
      for: "select",
      to: ["public"],
    }),
  ],
)

export const stripeCustomers = pgTable(
  "stripe_customers",
  {
    userId: uuid("user_id").primaryKey().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    stripeCustomerId: text("stripe_customer_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
      name: "stripe_customers_user_id_fkey",
    }).onDelete("cascade"),
    unique("stripe_customers_stripe_customer_id_key").on(
      table.stripeCustomerId,
    ),
  ],
)

export const contactRequests = pgTable("contact_requests", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text(),
  phone: text(),
  companyName: text("company_name"),
  messageBody: text("message_body"),
})
