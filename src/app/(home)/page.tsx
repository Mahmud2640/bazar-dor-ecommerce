import AllProducts from "@/components/all-products";
import Hero from "@/components/hero";
import PriceMovers from "@/components/price-movers";
import { texts } from "@/data/texts";
import { getCategories, getProducts } from "@/lib/api";
import { getLang } from "@/lib/language";

export default async function HomePage() {
  const lang = await getLang();
  const t = texts[lang];

  // get the data from the API
  const products = await getProducts();
  const categories = await getCategories();

  // sort by the change percent, the biggest rise is first
  const sorted = [...products].sort((a, b) => b.change.pct - a.change.pct);

  // top 6 products where the price went up
  const risers = sorted.filter((product) => product.change.pct > 0).slice(0, 6);

  // top 6 products where the price went down (reverse: the biggest fall is first)
  const fallers = sorted
    .filter((product) => product.change.pct < 0)
    .reverse()
    .slice(0, 6);

  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-10 px-4 py-6">
      <Hero />

      <PriceMovers title={t.risersTitle} direction="up" products={risers} lang={lang} />
      <PriceMovers title={t.fallersTitle} direction="down" products={fallers} lang={lang} />

      {/* id="all-products": the hero button scrolls to this place */}
      <section id="all-products" className="scroll-mt-4">
        <h2 className="mb-4 text-xl leading-7 font-bold">{t.allProducts}</h2>
        <AllProducts products={products} categories={categories} lang={lang} />
      </section>
    </div>
  );
}
