import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import MarketTable from "@/components/market-table";
import { getProducts } from "@/lib/api";
import { formatChange, formatNumber, toBn, unitLabel } from "@/lib/format";
import { getSession } from "@/lib/session";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = (await getProducts()).find((p) => p.slug === slug);
  return { title: product ? `${product.nameBn} | বাজার দর` : "পাওয়া যায়নি | বাজার দর" };
}

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="লোড হচ্ছে">
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
}: {
  label: string;
  value: number;
  hint: string;
  tone: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-base-300 bg-base-100 px-[25px] py-[17px]">
      <p className="text-xs leading-[18px]">{label}</p>
      <p className={`font-bold ${tone}`}>
        <span className="text-2xl leading-8">{formatNumber(value)}</span>
        <span className="text-sm font-medium"> টাকা</span>
      </p>
      <p className="text-xs leading-[18px]">{hint}</p>
    </div>
  );
}

async function ProductContent({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;

  // detail pages are for signed-in users only
  const session = await getSession();
  if (!session) {
    redirect(`/signin?notice=login&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = (await getProducts()).find((p) => p.slug === slug);
  if (!product) notFound();

  const { nameBn, image, unit, today, yesterday, change, markets, categoryNameBn, category } = product;
  const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
  const average = Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length);
  const diff = today - yesterday;
  const trend = diff > 0 ? "বেড়েছে" : diff < 0 ? "কমেছে" : "অপরিবর্তিত";
  const changeTone = change.dir === "up" ? "text-error" : change.dir === "down" ? "text-success" : "";

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="breadcrumb" className="py-2 pl-1 text-sm leading-5">
        <ol className="flex flex-wrap items-center">
          <li>
            <Link href="/" className="hover:text-primary">হোম</Link>
          </li>
          <li className="flex items-center gap-3 pl-2">
            <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
            <Link href={`/category/${category}`} className="hover:text-primary">{categoryNameBn}</Link>
          </li>
          <li className="flex items-center gap-3 pl-2" aria-current="page">
            <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
            <span>{nameBn}</span>
          </li>
        </ol>
      </nav>

      <header className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
            {image}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl leading-9 font-bold">{nameBn}</h1>
            <p className="text-sm leading-5">
              প্রতি {unitLabel(unit)} · {categoryNameBn}
            </p>
            <p className="mt-2 text-sm leading-5">
              গতকালের তুলনায় আজ দাম <span className="font-semibold">{trend}</span>
              {diff !== 0 && ` · ${toBn(Math.abs(diff))} টাকা`}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 pt-4 pb-[17px] text-center sm:w-[118px]">
            <p className="text-sm leading-5">আজকের দাম</p>
            <p className="text-3xl leading-9 font-bold">{formatNumber(today)}</p>
            <p className="text-sm leading-5">টাকা / {unitLabel(unit)}</p>
            <p className={`mt-[3px] text-sm leading-5 font-semibold ${changeTone}`}>{formatChange(change)}</p>
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Stat label="সর্বনিম্ন দাম" value={lowest.min} hint="সবচেয়ে কম দামের বাজার" tone="text-success" />
            <Stat label="সর্বাধিক দাম" value={highest.max} hint="সবচেয়ে বেশি দামের বাজার" tone="text-error" />
            <Stat label="গড় দাম" value={average} hint={`প্রতি ${unitLabel(unit)}-এর হিসাবে`} tone="text-primary" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">বাজারভিত্তিক আজকের দাম</h2>
          <MarketTable markets={markets} />
        </div>
      </section>
    </div>
  );
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <div className="mx-auto w-full max-w-[1152px] px-4 py-6">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}
