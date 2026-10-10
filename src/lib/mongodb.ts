import { MongoClient } from "mongodb";

// the connection string is in the .env.local file
const uri = process.env.MONGODB_URI as string;

// connect to MongoDB Atlas and use the database name written inside the uri
export const client = new MongoClient(uri);
export const db = client.db();
