export const locales = ["bn", "en"] as const;
export type Locale = (typeof locales)[number];

// The design is Bangla-first, so Bangla is the fallback language.
export const defaultLocale: Locale = "bn";

// Cookie that remembers the language the visitor picked.
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
