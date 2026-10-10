import { cacheLife } from "next/cache";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Turns 148 or "2.1" into "১৪৮" / "২.১". Display only, never use it for sorting.
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatPrice(value: number, unit: string): string {
  const unitBn = unit === "kg" ? "কেজি" : unit;
  return `${toBn(value)} টাকা/${unitBn}`;
}

export function formatChange(change: { dir: string; pct: number }): string {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "–";
  return `${arrow} ${toBn(Math.abs(change.pct))}%`;
}

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
