// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `yhack2024_${name}`);

export const slides = createTable(
  "slide",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    status: varchar("status",{ length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
);
export const items = createTable(
  "item",
  {
    page: varchar("page", { length: 1024 }).notNull(),
    audio_url: varchar("audio_url", { length: 1024 }).notNull(),
    pdf_url: varchar("pdf_url", { length: 1024 }).notNull(),
    image_url: varchar("image_url", { length: 1024 }).notNull(),
    
    trasncription: varchar("transcription", { length: 10256 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  
  (table) => ({
    primaryKey: [table.page, table.pdf_url],
  })
);
