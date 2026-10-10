import { texts } from "@/data/texts";
import { getLang } from "@/lib/language";

export default async function Footer() {
  const lang = await getLang();
  const t = texts[lang];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-[1152px] flex-col items-center justify-between gap-2 px-4 py-6 text-center text-sm md:flex-row">
        <p>{t.footerLeft}</p>
        <p>{t.footerRight}</p>
      </div>
    </footer>
  );
}
