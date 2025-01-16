// HABITS
// id, name, description, created_at, updated_at, habitLogs
// HABITSLOG

import { sql, relations } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
// import dayjs from 'dayjs'

// id, name, description, created_at, updated_at, habitLogs
export const habits = t.sqliteTable("habits", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  color: t.text().default("#0099cc"),
  description: t.text().default(""),
  created_at: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const habitLogs = t.sqliteTable("habitLogs", {
  id: t.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  //   DD/MM/YYYY
  date: t.text().notNull(),
  // .integer({ mode: "timestamp" })
  // .notNull()
  // .default(sql`(CURRENT_DATE)`)
  completed: t.integer({ mode: "boolean" }).default(true),
  habit_id: t.integer().references(() => habits.id, { onDelete: "cascade" }),
  created_at: t.text().default(sql`(CURRENT_TIMESTAMP)`),
});

export const habitRelations = relations(habits, ({ many }) => ({
  logs: many(habitLogs),
}));

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habit: one(habits, {
    fields: [habitLogs.id],
    references: [habits.id],
  }),
}));
