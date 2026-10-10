import type { Locale } from "./config";
import { CATEGORIES_EN, DIVISIONS_EN, MARKETS_EN, PRODUCTS_EN } from "./data-en";

export function productName(p: { slug: string; nameBn: string }, lang: Locale): string {
  return lang === "bn" ? p.nameBn : (PRODUCTS_EN[p.slug] ?? p.nameBn);
}

export function categoryName(slug: string, nameBn: string, lang: Locale): string {
  return lang === "bn" ? nameBn : (CATEGORIES_EN[slug] ?? nameBn);
}

export function marketName(nameBn: string, lang: Locale): string {
  return lang === "bn" ? nameBn : (MARKETS_EN[nameBn] ?? nameBn);
}

export function divisionName(nameBn: string, lang: Locale): string {
  return lang === "bn" ? nameBn : (DIVISIONS_EN[nameBn] ?? nameBn);
}
