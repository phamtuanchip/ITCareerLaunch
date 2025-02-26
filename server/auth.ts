import { Express } from "express";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { compare, hash } from "bcryptjs";
import session from "express-session";
import { z } from "zod";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function setupAuth(app: Express) {
  // Session middleware
  app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Create admin user if it doesn't exist
  const adminEmail = "admin@5minutes.edu.vn";
  const adminUser = await storage.getUserByEmail(adminEmail);
  
  if (!adminUser) {
    const hashedPassword = await hash("0902318580", 10);
    await storage.createUser({
      email: adminEmail,
      password: hashedPassword,
      isAdmin: "true",
    });
  }

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByEmail(email);

      if (!user || !(await compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Failed to logout" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json(user);
  });
}
