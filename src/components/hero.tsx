import { buttonVariants } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { texts } from "@/data/texts";
import { getToday } from "@/lib/format";
import { getLang } from "@/lib/language";

export default async function Hero() {
  const lang = await getLang();
  const t = texts[lang];

  return (
    <section className="rounded-3xl border border-border bg-surface">
      <div className="flex flex-col items-center justify-between gap-8 px-4 py-10 md:flex-row md:items-start md:py-[9px]">
        {/* text on the left */}
        <div className="flex max-w-xl flex-col items-start gap-2">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
            {getToday(lang)}
          </span>
          <h1 className="text-3xl leading-tight font-bold md:text-4xl md:leading-[45px]">{t.heroTitle}</h1>
          <p className="mt-3 leading-6">{t.heroSubtitle}</p>

          {/* #all-products is the id of the products section, the page scrolls down to it */}
          <Link href="#all-products" className={`${buttonVariants({ variant: "primary" })} mt-5 h-10`}>
            {t.heroButton}
          </Link>
        </div>

        {/* image on the right */}
        <Image
          src="/images/bazar-hero.svg"
          alt={t.heroImageAlt}
          width={315}
          height={263}
          priority
          className="h-auto w-[240px] md:w-[315px]"
        />
      </div>
    </section>
  );
}
