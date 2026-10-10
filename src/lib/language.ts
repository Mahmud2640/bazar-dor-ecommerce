import { cookies } from "next/headers";
import type { Lang } from "@/data/texts";

// Reads the language the visitor chose (saved in a cookie by the language button).
// Use it in server components:  const lang = await getLang();
export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const saved = cookieStore.get("lang")?.value;

  // Bangla is the default language
  return saved === "en" ? "en" : "bn";
}
