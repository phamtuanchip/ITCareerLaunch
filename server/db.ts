import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Enable logging for database queries in development
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
  max: 20
};

export const pool = new Pool(poolConfig);
export const db = drizzle(pool, { schema });

// Test the connection
pool.connect().then(() => {
  console.log('Successfully connected to database');
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});