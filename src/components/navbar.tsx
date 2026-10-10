import { headers } from "next/headers";
import Link from "next/link";
import { texts } from "@/data/texts";
import { getCategories } from "@/lib/api";
import { auth } from "@/lib/auth";
import { getToday } from "@/lib/format";
import { getLang } from "@/lib/language";
import CategoryLinks from "./category-links";
import LanguageToggle from "./language-toggle";
import UserMenu from "./user-menu";

export default async function Navbar() {
  const lang = await getLang();
  const t = texts[lang];
  const categories = await getCategories();

  // who is signed in? session is null when nobody is signed in
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session
    ? { name: session.user.name, email: session.user.email, image: session.user.image }
    : null;

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1152px] flex-wrap items-center justify-between gap-2 px-4 py-3">
        {/* logo and today's date */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-lg text-accent-foreground">
            🛒
          </span>
          <span className="flex flex-col whitespace-nowrap">
            <span className="text-xl leading-7 font-bold">{t.siteName}</span>
            <span className="text-xs leading-4">{getToday(lang)}</span>
          </span>
        </Link>

        {/* language buttons and sign in / user menu */}
        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle lang={lang} />
          <UserMenu user={user} lang={lang} />
        </div>
      </div>

      {/* category links */}
      <div className="border-t border-separator">
        <CategoryLinks categories={categories} lang={lang} />
      </div>
    </header>
  );
}
