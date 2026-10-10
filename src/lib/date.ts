import { cacheLife } from "next/cache";

// Cached so the date does not make the whole page dynamic. Refreshes every hour.
export async function getBanglaDate(): Promise<string> {
  "use cache";
  cacheLife("hours");
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}
