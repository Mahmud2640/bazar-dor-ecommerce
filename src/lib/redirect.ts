import { locales, type Locale } from "@/i18n/config";

const LOCALE_PREFIX = new RegExp(`^/(${locales.join("|")})(?=/|$|\\?)`);

// Only allow same-site paths so a crafted ?callbackUrl= cannot send people elsewhere.
// The result always starts with the current language, so switching language mid-flow keeps working.
export function safeRedirect(value: string | null | undefined, lang: Locale): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return `/${lang}`;
  if (LOCALE_PREFIX.test(value)) return value.replace(LOCALE_PREFIX, `/${lang}`);
  return `/${lang}${value}`;
}
