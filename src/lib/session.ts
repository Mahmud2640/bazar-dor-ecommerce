import { headers } from "next/headers";
import { auth } from "./auth";

// Server-side session lookup. Reads cookies, so call it inside a Suspense boundary.
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}
