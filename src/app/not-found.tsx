import EmptyState from "@/components/empty-state";
import { texts } from "@/data/texts";
import { getLang } from "@/lib/language";

// Next.js shows this page when the address does not exist (404)
export default async function NotFound() {
  const lang = await getLang();
  const t = texts[lang];

  return (
    <div className="mx-auto max-w-[1152px] px-4 py-10">
      <EmptyState code={t.notFoundCode} title={t.notFoundTitle} text={t.notFoundText} lang={lang} />
    </div>
  );
}
