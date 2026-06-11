import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    url: text("url").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .$defaultFn(() => new Date()),
});
