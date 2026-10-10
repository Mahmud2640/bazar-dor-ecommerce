import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm md:flex-row md:text-left">
        <p>{dict.footer.left}</p>
        <p>{dict.footer.right}</p>
      </div>
    </footer>
  );
}
