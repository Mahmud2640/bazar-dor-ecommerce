import { Card } from "@heroui/react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";

type Props = {
  title: string;
  subtitle: string;
  lang: Lang;
  children: ReactNode; // the form
};

// The box used by the sign in and sign up pages
export default function AuthCard({ title, subtitle, lang, children }: Props) {
  return (
    <div className="mx-auto flex max-w-[448px] flex-col gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="text-sm leading-5">{subtitle}</p>
      </div>

      <Card className="rounded-2xl border border-border p-6 shadow-none">{children}</Card>

      <Link href="/" className="text-center text-sm hover:text-accent">
        {texts[lang].backHome}
      </Link>
    </div>
  );
}
