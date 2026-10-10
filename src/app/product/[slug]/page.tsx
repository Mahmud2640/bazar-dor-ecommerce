import { Card, Chip } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import MarketTable from "@/components/market-table";
import { texts } from "@/data/texts";
import { getProducts } from "@/lib/api";
import { auth } from "@/lib/auth";
import { changeText, formatPrice, showNumber, unitName } from "@/lib/format";
import { getLang } from "@/lib/language";
import { getProductCategoryName, getProductName } from "@/lib/names";

type Props = {
  // slug is the last part of the address, for example "miniket-chal" in /product/miniket-chal
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const lang = await getLang();
  const t = texts[lang];

  // 1) this page is only for signed in users. If nobody is signed in, go to the sign in page.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?message=login&callbackUrl=/product/${slug}`);
  }

  // 2) find the product
  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();

  // 3) calculate the numbers
  const unit = unitName(product.unit, lang);
  const categoryName = getProductCategoryName(product, lang);

  // the lowest and the highest price in all markets
  const lowest = Math.min(...product.markets.map((market) => market.min));
  const highest = Math.max(...product.markets.map((market) => market.max));

  // average of all markets (the average of one market is (min + max) / 2)
  let total = 0;
  for (const market of product.markets) {
    total = total + (market.min + market.max) / 2;
  }
  const average = Math.round(total / product.markets.length);

  // how much the price changed since yesterday
  const difference = product.today - product.yesterday;
  let trend = t.noChange;
  if (difference > 0) trend = t.wentUp;
  if (difference < 0) trend = t.wentDown;

  let changeColor = "";
  if (product.change.dir === "up") changeColor = "text-danger";
  if (product.change.dir === "down") changeColor = "text-success";

  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-6 px-4 py-6">
      {/* Home > Category > Product */}
      <nav className="flex flex-wrap items-center gap-3 py-2 pl-1 text-sm">
        <Link href="/" className="hover:text-accent">
          {t.home}
        </Link>
        <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
        <Link href={`/category/${product.category}`} className="hover:text-accent">
          {categoryName}
        </Link>
        <Image src="/icons/chevron.svg" alt="" width={6} height={8} />
        <span>{getProductName(product, lang)}</span>
      </nav>

      {/* emoji, name and today's price */}
      <Card className="rounded-2xl border border-border p-5 shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-background text-4xl">
            {product.image}
          </span>

          <div className="min-w-0 flex-1">
            <h1 className="text-3xl leading-9 font-bold">{getProductName(product, lang)}</h1>
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span>{t.perUnit(unit)}</span>
              <span>·</span>
              {/* category tag, it opens the category page */}
              <Link href={`/category/${product.category}`}>
                <Chip color="accent" variant="soft" size="sm">
                  {product.categoryIcon} {categoryName}
                </Chip>
              </Link>
            </p>
            <p className="mt-2 text-sm">
              {t.comparedToYesterday} <span className="font-semibold">{trend}</span>
              {difference !== 0 && ` · ${showNumber(Math.abs(difference), lang)} ${t.currency}`}
            </p>
          </div>

          <div className="rounded-2xl bg-background px-5 pt-4 pb-[17px] text-center">
            <p className="text-sm">{t.todayPrice}</p>
            <p className="text-3xl leading-9 font-bold">{formatPrice(product.today, lang)}</p>
            <p className="text-sm">{t.priceUnit(unit)}</p>
            <p className={`mt-[3px] text-sm font-semibold ${changeColor}`}>{changeText(product.change, lang)}</p>
          </div>
        </div>
      </Card>

      <Card className="gap-6 rounded-2xl border border-border p-5 shadow-none">
        {/* lowest, highest and average price */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">{t.priceSummary}</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Card className="gap-0 rounded-2xl border border-border px-6 py-4 shadow-none">
              <p className="text-xs leading-[18px]">{t.lowestPrice}</p>
              <p className="text-2xl leading-8 font-bold text-success">
                {formatPrice(lowest, lang)} <span className="text-sm font-medium">{t.currency}</span>
              </p>
              <p className="text-xs leading-[18px]">{t.lowestHint}</p>
            </Card>

            <Card className="gap-0 rounded-2xl border border-border px-6 py-4 shadow-none">
              <p className="text-xs leading-[18px]">{t.highestPrice}</p>
              <p className="text-2xl leading-8 font-bold text-danger">
                {formatPrice(highest, lang)} <span className="text-sm font-medium">{t.currency}</span>
              </p>
              <p className="text-xs leading-[18px]">{t.highestHint}</p>
            </Card>

            <Card className="gap-0 rounded-2xl border border-border px-6 py-4 shadow-none">
              <p className="text-xs leading-[18px]">{t.averagePrice}</p>
              <p className="text-2xl leading-8 font-bold text-accent">
                {formatPrice(average, lang)} <span className="text-sm font-medium">{t.currency}</span>
              </p>
              <p className="text-xs leading-[18px]">{t.averageHint(unit)}</p>
            </Card>
          </div>
        </div>

        {/* the price in every market */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg leading-7 font-semibold">{t.marketPrices}</h2>
          <MarketTable markets={product.markets} lang={lang} />
        </div>
      </Card>
    </div>
  );
}
