import { users, type User, type InsertUser } from "@shared/schema";
import { type Contact, type InsertContact } from "@shared/schema";
import { type Service, type InsertService } from "@shared/schema";
import { type Team, type InsertTeam } from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private team: Map<number, Team>;
  private contacts: Map<number, Contact>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.team = new Map();
    this.contacts = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentId++;
    const service = { id, ...insertService };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: number, updateService: InsertService): Promise<Service | undefined> {
    if (!this.services.has(id)) return undefined;
    const service = { id, ...updateService };
    this.services.set(id, service);
    return service;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Team members
  async getTeamMembers(): Promise<Team[]> {
    return Array.from(this.team.values());
  }

  async getTeamMember(id: number): Promise<Team | undefined> {
    return this.team.get(id);
  }

  async createTeamMember(insertMember: InsertTeam): Promise<Team> {
    const id = this.currentId++;
    const member = { id, ...insertMember };
    this.team.set(id, member);
    return member;
  }

  async updateTeamMember(id: number, updateMember: InsertTeam): Promise<Team | undefined> {
    if (!this.team.has(id)) return undefined;
    const member = { id, ...updateMember };
    this.team.set(id, member);
    return member;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.team.delete(id);
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact = { id, ...insertContact };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();