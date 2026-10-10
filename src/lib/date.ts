import { cacheLife } from "next/cache";
import type { Locale } from "@/i18n/config";

// Cached per language so the date does not make the whole page dynamic. Refreshes every hour.
export async function getLocalizedDate(lang: Locale): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}
