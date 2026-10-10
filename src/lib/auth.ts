import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { client, db } from "./mongodb";

// Atlas (mongodb+srv or a replicaSet in the URI) supports transactions, so a sign-up that writes
// the user and the account either fully succeeds or fully rolls back. A standalone local MongoDB
// cannot run transactions, so we leave `client` out there.
const supportsTransactions = /^mongodb\+srv:|[?&]replicaSet=/.test(process.env.MONGODB_URI ?? "");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

export const auth = betterAuth({
  database: mongodbAdapter(db, supportsTransactions ? { client } : undefined),
  emailAndPassword: {
    enabled: true,
  },
  // a provider is only switched on when both of its keys are set
  socialProviders: {
    ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
      ? { google: { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET } }
      : {}),
    ...(GITHUB_CLIENT_ID && GITHUB_CLIENT_SECRET
      ? { github: { clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET } }
      : {}),
  },
  // nextCookies must stay last so server actions can set auth cookies
  plugins: [nextCookies()],
});
