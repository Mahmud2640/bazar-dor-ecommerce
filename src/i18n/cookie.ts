import { LOCALE_COOKIE, type Locale } from "./config";

// Remembers the chosen language for a year so "/" opens in it next time (the proxy reads this cookie).
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
