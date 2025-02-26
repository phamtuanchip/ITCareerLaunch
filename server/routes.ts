import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertServiceSchema, insertTeamSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Services routes
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(Number(req.params.id));
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  });

  app.post("/api/services", async (req, res) => {
    try {
      const service = insertServiceSchema.parse(req.body);
      const result = await storage.createService(service);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put("/api/services/:id", async (req, res) => {
    try {
      const service = insertServiceSchema.parse(req.body);
      const result = await storage.updateService(Number(req.params.id), service);
      if (!result) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    const deleted = await storage.deleteService(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(204).send();
  });

  // Team members routes
  app.get("/api/team", async (_req, res) => {
    const members = await storage.getTeamMembers();
    res.json(members);
  });

  app.get("/api/team/:id", async (req, res) => {
    const member = await storage.getTeamMember(Number(req.params.id));
    if (!member) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(member);
  });

  app.post("/api/team", async (req, res) => {
    try {
      const member = insertTeamSchema.parse(req.body);
      const result = await storage.createTeamMember(member);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.put("/api/team/:id", async (req, res) => {
    try {
      const member = insertTeamSchema.parse(req.body);
      const result = await storage.updateTeamMember(Number(req.params.id), member);
      if (!result) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/team/:id", async (req, res) => {
    const deleted = await storage.deleteTeamMember(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.status(204).send();
  });

  // Contact routes
  app.get("/api/contacts", async (_req, res) => {
    const contacts = await storage.getContacts();
    res.json(contacts);
  });

  app.get("/api/contacts/:id", async (req, res) => {
    const contact = await storage.getContact(Number(req.params.id));
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const contact = insertContactSchema.parse(req.body);
      const result = await storage.createContact(contact);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}