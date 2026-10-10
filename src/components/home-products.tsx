import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { getCategories, getProducts } from "@/lib/api";
import AllProducts from "./all-products";
import PriceMovers from "./price-movers";

export default async function HomeProducts({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  // top 6 by percentage change (the API sends falls as negative numbers)
  const byChange = [...products].sort((a, b) => b.change.pct - a.change.pct);
  const risers = byChange.filter((p) => p.change.pct > 0).slice(0, 6);
  const fallers = [...byChange].reverse().filter((p) => p.change.pct < 0).slice(0, 6);

  return (
    <>
      <PriceMovers title={dict.home.risers} direction="up" products={risers} />
      <PriceMovers title={dict.home.fallers} direction="down" products={fallers} />
      <section id="all-products" className="scroll-mt-4">
        <h2 className="mb-4 text-xl leading-7 font-bold">{dict.home.allProducts}</h2>
        <AllProducts products={products} categories={categories} />
      </section>
    </>
  );
}
