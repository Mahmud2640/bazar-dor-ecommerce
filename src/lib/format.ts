import type { Lang } from "@/data/texts";

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 148 -> "১৪৮"  (only for showing a number, never use it for sorting)
export function toBangla(value: number | string) {
  return String(value).replace(/\d/g, (digit) => banglaDigits[Number(digit)]);
}

// Bangla digits in Bangla, normal digits in English
export function showNumber(value: number | string, lang: Lang) {
  return lang === "bn" ? toBangla(value) : String(value);
}

// 1290 -> "১,২৯০" or "1,290"
export function formatPrice(value: number, lang: Lang) {
  return showNumber(value.toLocaleString("en-US"), lang);
}

// 63.5 -> "63.50", 62 -> "62"
export function formatDecimal(value: number, lang: Lang) {
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return showNumber(text, lang);
}

// the API sends units like "kg" and "litre"
export function unitName(unit: string, lang: Lang) {
  const bangla: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };
  return lang === "bn" ? bangla[unit] || unit : unit;
}

// { dir: "up", pct: 2.1 } -> "▲ ২.১%"
export function changeText(change: { dir: string; pct: number }, lang: Lang) {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "–";
  return `${arrow} ${showNumber(Math.abs(change.pct), lang)}%`;
}

// today's date, for example "শনিবার, ১০ অক্টোবর, ২০২৬"
export function getToday(lang: Lang) {
  return new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}
