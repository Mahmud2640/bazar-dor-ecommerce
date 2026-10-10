import { createAuthClient } from "better-auth/react";

// No baseURL: the client and the server share one domain, so requests go to the current site.
// (A fixed URL would send Vercel preview deployments to the production domain.)
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
