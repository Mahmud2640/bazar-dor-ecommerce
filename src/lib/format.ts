import type { Locale } from "@/i18n/config";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Turns 148 or "2.1" into "১৪৮" / "২.১". Display only, never use it for sorting.
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// Bengali digits for Bangla, normal digits for English
export function localizeDigits(value: number | string, lang: Locale): string {
  return lang === "bn" ? toBn(value) : String(value);
}

// 1290 -> "১,২৯০" (bn) or "1,290" (en)
export function formatNumber(value: number, lang: Locale): string {
  return localizeDigits(value.toLocaleString("en-US"), lang);
}

// 63.5 -> "63.50", 62 -> "62"
export function formatDecimal(value: number, lang: Locale): string {
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return localizeDigits(text, lang);
}

const UNIT_LABELS: Record<Locale, Record<string, string>> = {
  bn: { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" },
  en: { kg: "kg", litre: "litre", dozen: "dozen", piece: "piece" },
};

export function unitLabel(unit: string, lang: Locale): string {
  return UNIT_LABELS[lang][unit] ?? unit;
}

// "148 BDT/kg" or "১৪৮ টাকা/কেজি"
export function formatPrice(value: number, unit: string, lang: Locale, currency: string): string {
  return `${formatNumber(value, lang)} ${currency}/${unitLabel(unit, lang)}`;
}

export function formatChange(change: { dir: string; pct: number }, lang: Locale): string {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "–";
  return `${arrow} ${localizeDigits(Math.abs(change.pct), lang)}%`;
}
