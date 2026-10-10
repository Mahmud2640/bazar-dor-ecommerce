import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import MarketTable from "@/components/market-table";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fmt } from "@/i18n/format";
import { categoryName, productName } from "@/i18n/localize";
import { resolveLang } from "@/i18n/server";
import { getProducts } from "@/lib/api";
import { formatChange, formatNumber, localizeDigits, unitLabel } from "@/lib/format";
import { getSession } from "@/lib/session";

type Params = PageProps<"/[lang]/product/[slug]">["params"];

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lang = await resolveLang(params);
  const product = (await getProducts()).find((p) => p.slug === slug);
  return { title: product ? productName(product, lang) : getDictionary(lang).notFound.title };
}

function ProductSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label={label}>
      <div className="h-9 w-64 animate-pulse rounded bg-base-300" />
      <div className="h-[174px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
      <div className="h-[600px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
  lang,
  currency,
}: {
  label: string;
  value: number;
  hint: string;
  tone: string;
  lang: Locale;
  currency: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-base-300 bg-base-100 px-[25px] py-[17px]">
      <p className="text-xs leading-[18px]">{label}</p>
      <p className={`font-bold ${tone}`}>
        <span className="text-2xl leading-8">{formatNumber(value, lang)}</span>
        <span className="text-sm font-medium"> {currency}</span>
      </p>
      <p className="text-xs leading-[18px]">{hint}</p>
    </div>
  );
}

async function ProductContent({ params, lang }: { params: Params; lang: Locale }) {
  const { slug } = await params;
  const dict = getDictionary(lang);
  const t = dict.product;
  const currency = dict.common.currency;

  // detail pages are for signed-in users only, so everything below runs per request
  await connection();
  const session = await getSession();
  if (!session) {
    redirect(`/${lang}/signin?notice=login&callbackUrl=${encodeURIComponent(`/${lang}/product/${slug}`)}`);
  }

  const product = (await getProducts()).find((p) => p.slug === slug);
  if (!product) notFound();

  const { image, unit, today, yesterday, change, markets, categoryNameBn, category } = product;
  const name = productName(product, lang);
  const catName = categoryName(category, categoryNameBn, lang);
  const unitText = unitLabel(unit, lang);

  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length);
  const diff = today - yesterday;
  const trend = diff > 0 ? t.rose : diff < 0 ? t.fell : t.same;
  const changeTone = change.dir === "up" ? "text-error" : change.dir === "down" ? "text-success" : "";

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="breadcrumb" className="py-2 pl-1 text-sm leading-5">
        <ol className="flex flex-wrap items-center">
          <li>
            <Link href={`/${lang}`} className="hover:text-primary">{t.home}</Link>
          </li>
          <li className="flex items-center gap-3 pl-2">
            <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
            <Link href={`/${lang}/category/${category}`} className="hover:text-primary">{catName}</Link>
          </li>
          <li className="flex items-center gap-3 pl-2" aria-current="page">
            <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
            <span>{name}</span>
          </li>
        </ol>
      </nav>

      <header className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {image}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl leading-9 font-bold">{name}</h1>
            <p className="flex flex-wrap items-center gap-2 text-sm leading-5">
              <span>{fmt(dict.common.perUnit, { unit: unitText })}</span>
              <span aria-hidden>·</span>
              <Link
                href={`/${lang}/category/${category}`}
                className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary hover:text-primary-content"
              >
                {product.categoryIcon} {catName}
              </Link>
            </p>
            <p className="mt-2 text-sm leading-5">
              {t.comparedToYesterday} <span className="font-semibold">{trend}</span>
              {diff !== 0 &&
                fmt(t.amountSuffix, { n: localizeDigits(Math.abs(diff), lang), currency })}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 pt-4 pb-[17px] text-center sm:min-w-[118px]">
            <p className="text-sm leading-5">{t.todayPrice}</p>
            <p className="text-3xl leading-9 font-bold">{formatNumber(today, lang)}</p>
            <p className="text-sm leading-5">{fmt(t.currencyPerUnit, { currency, unit: unitText })}</p>
            <p className={`mt-[3px] text-sm leading-5 font-semibold ${changeTone}`}>
              {formatChange(change, lang)}
            </p>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">{t.summary}</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Stat label={t.lowest} value={lowest.min} hint={t.lowestHint} tone="text-success" lang={lang} currency={currency} />
            <Stat label={t.highest} value={highest.max} hint={t.highestHint} tone="text-error" lang={lang} currency={currency} />
            <Stat
              label={t.average}
              value={average}
              hint={fmt(t.averageHint, { unit: unitText })}
              tone="text-primary"
              lang={lang}
              currency={currency}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">{t.byMarket}</h2>
          <MarketTable markets={markets} lang={lang} dict={dict} />
        </div>
      </section>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps<"/[lang]/product/[slug]">) {
  const lang = await resolveLang(params);

  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-6">
      <Suspense fallback={<ProductSkeleton label={getDictionary(lang).common.loading} />}>
        <ProductContent params={params} lang={lang} />
      </Suspense>
    </div>
  );
}
