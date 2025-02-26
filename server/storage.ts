import { users, type User, type InsertUser } from "@shared/schema";
import { type Contact, type InsertContact, contacts } from "@shared/schema";
import { type Service, type InsertService, services } from "@shared/schema";
import { type Team, type InsertTeam, team } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: InsertService): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  // Team members
  getTeamMembers(): Promise<Team[]>;
  getTeamMember(id: number): Promise<Team | undefined>;
  createTeamMember(member: InsertTeam): Promise<Team>;
  updateTeamMember(id: number, member: InsertTeam): Promise<Team | undefined>;
  deleteTeamMember(id: number): Promise<boolean>;

  // Contacts
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateService(id: number, updateService: InsertService): Promise<Service | undefined> {
    const [service] = await db
      .update(services)
      .set(updateService)
      .where(eq(services.id, id))
      .returning();
    return service;
  }

  async deleteService(id: number): Promise<boolean> {
    const [deleted] = await db.delete(services).where(eq(services.id, id)).returning();
    return !!deleted;
  }

  // Team members
  async getTeamMembers(): Promise<Team[]> {
    return await db.select().from(team);
  }

  async getTeamMember(id: number): Promise<Team | undefined> {
    const [member] = await db.select().from(team).where(eq(team.id, id));
    return member;
  }

  async createTeamMember(insertMember: InsertTeam): Promise<Team> {
    const [member] = await db.insert(team).values(insertMember).returning();
    return member;
  }

  async updateTeamMember(id: number, updateMember: InsertTeam): Promise<Team | undefined> {
    const [member] = await db
      .update(team)
      .set(updateMember)
      .where(eq(team.id, id))
      .returning();
    return member;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    const [deleted] = await db.delete(team).where(eq(team.id, id)).returning();
    return !!deleted;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db.insert(contacts).values(insertContact).returning();
    return contact;
  }
}

export const storage = new DatabaseStorage();