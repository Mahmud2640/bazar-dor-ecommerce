import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getLocalizedDate } from "@/lib/date";

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const date = await getLocalizedDate(lang);

  return (
    <section className="overflow-hidden rounded-[28px] border border-base-300 bg-base-100">
      <div className="flex flex-col items-center justify-between gap-8 px-4 py-10 md:flex-row md:px-8">
        <div className="flex w-full max-w-xl flex-col items-start gap-2">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-medium text-primary">
            {date}
          </span>
          <h1 className="text-3xl leading-tight font-bold md:text-4xl md:leading-[45px]">
            {dict.hero.title}
          </h1>
          <p className="mt-1 text-base leading-6">{dict.hero.subtitle}</p>
          <Link
            href="#all-products"
            className={`${buttonVariants({ variant: "primary", size: "md" })} mt-3`}
          >
            {dict.hero.cta}
          </Link>
        </div>
        <Image
          src="/images/bazar-hero.svg"
          alt={dict.hero.imageAlt}
          width={315}
          height={263}
          priority
          className="h-auto w-[240px] shrink-0 md:w-[315px]"
        />
      </div>
    </section>
  );
}
