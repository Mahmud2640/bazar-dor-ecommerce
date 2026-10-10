import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { client, db } from "./mongodb";

// Better Auth saves users, sessions and accounts in MongoDB
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  // sign in with email and password
  emailAndPassword: {
    enabled: true,
  },

  // sign in with Google and GitHub (the keys are in .env.local)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // this plugin must be the last one
  plugins: [nextCookies()],
});
