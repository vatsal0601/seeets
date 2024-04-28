import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  time,
} from "drizzle-orm/pg-core";

export const IntervalTimer = pgTable("interval_timer", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  name: text("name").notNull(),
  sets: numeric("sets").notNull(),
  prepare: time("prepare").notNull(),
  work: time("work").notNull(),
  rest: time("rest").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type InsertInetervalTimer = typeof IntervalTimer.$inferInsert;
export type SelectIntervalTimer = typeof IntervalTimer.$inferSelect;
