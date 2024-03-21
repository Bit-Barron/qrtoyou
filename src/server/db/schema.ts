import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const UserModel = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type UserModel = typeof UserModel.$inferInsert;
