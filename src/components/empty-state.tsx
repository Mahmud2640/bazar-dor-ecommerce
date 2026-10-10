import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";

type Props = {
  code: string; // the big text, for example 404
  title: string;
  text: string;
  lang: Lang;
};

// A message with a button that goes back to the home page.
// Used for the 404 page and when a category is empty or missing.
export default function EmptyState({ code, title, text, lang }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-16 text-center">
      <p className="text-6xl font-bold text-accent">{code}</p>
      <h1 className="text-2xl leading-8 font-bold">{title}</h1>
      <p className="text-sm">{text}</p>
      <Link href="/" className={`${buttonVariants({ variant: "primary" })} mt-2 h-10`}>
        {texts[lang].backHomeButton}
      </Link>
    </div>
  );
}
