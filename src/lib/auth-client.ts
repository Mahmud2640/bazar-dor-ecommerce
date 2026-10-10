import { createAuthClient } from "better-auth/react";

// the client talks to /api/auth on the same website
export const authClient = createAuthClient();
