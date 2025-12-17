// src/db/schema.ts
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

//days
export const days = sqliteTable("days", {
  id: integer("id").primaryKey({ autoIncrement: true }), // day 1, 2...
  content: text("content").notNull(), // like a hug or smth
  isOpen: integer("is_open").default(0), // 0 = closed, 1 = open
})