import { relations } from "drizzle-orm/relations"
import { usersInAuth, profiles, stripeCustomers } from "./schema"

export const profilesRelations = relations(profiles, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [profiles.id],
    references: [usersInAuth.id],
  }),
}))

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  profiles: many(profiles),
  stripeCustomers: many(stripeCustomers),
}))

export const stripeCustomersRelations = relations(
  stripeCustomers,
  ({ one }) => ({
    usersInAuth: one(usersInAuth, {
      fields: [stripeCustomers.userId],
      references: [usersInAuth.id],
    }),
  }),
)
