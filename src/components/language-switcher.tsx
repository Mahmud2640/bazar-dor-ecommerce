"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { rememberLocale } from "@/i18n/cookie";
import { useI18n } from "@/i18n/provider";
import { useSearchString } from "@/lib/use-search-param";

const LABELS: Record<Locale, string> = { bn: "বাংলা", en: "EN" };

export default function LanguageSwitcher() {
  const { lang, dict } = useI18n();
  const pathname = usePathname();
  const search = useSearchString();

  // /bn/product/x -> /en/product/x (keeps the rest of the URL)
  function pathFor(target: Locale) {
    const rest = pathname.replace(/^\/(bn|en)(?=\/|$)/, "");
    return `/${target}${rest}${search}`;
  }

  return (
    <div
      role="group"
      aria-label={dict.nav.language}
      className="flex items-center rounded-lg border border-base-300 bg-base-100 p-0.5 text-xs font-semibold"
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={pathFor(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => rememberLocale(l)}
          className={`rounded-md px-2.5 py-1.5 transition-colors ${
            l === lang ? "bg-primary text-primary-content" : "hover:bg-base-200"
          }`}
        >
          {LABELS[l]}
        </Link>
      ))}
    </div>
  );
}
