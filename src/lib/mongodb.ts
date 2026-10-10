import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not set in .env.local");
}

// Reuse one client across hot reloads in dev so we don't open a new connection each time.
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

export const client = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

export const db = client.db();
