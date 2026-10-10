import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getCategories } from "@/lib/api";
import { getLocalizedDate } from "@/lib/date";
import CategoryNav from "./category-nav";
import LanguageSwitcher from "./language-switcher";
import UserMenu from "./user-menu";

export default async function Navbar({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const [categories, date] = await Promise.all([getCategories(), getLocalizedDate(lang)]);

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-[1152px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col whitespace-nowrap">
            <span className="text-xl leading-7 font-bold tracking-[-0.5px]">{dict.meta.siteName}</span>
            <span className="text-xs leading-4">{date}</span>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
      <div className="border-t border-base-200">
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}
