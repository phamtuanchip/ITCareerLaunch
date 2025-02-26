import { text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { pgTable } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const team = pgTable("team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  image: text("image").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

// Service schemas
export const insertServiceSchema = createInsertSchema(services);
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Team member schemas
export const insertTeamSchema = createInsertSchema(team);
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof team.$inferSelect;

// Contact schemas
export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true,
}).extend({
  email: z.string().email(),
  message: z.string().min(10),
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;