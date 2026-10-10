import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";

// Reads and validates the [lang] route param. Anything but a supported language is a 404.
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
