import type { Lang } from "@/data/texts";
import type { Product } from "@/types";
import ProductCard from "./product-card";

type Props = {
  title: string;
  direction: "up" | "down";
  products: Product[];
  lang: Lang;
};

// A title and 6 product cards, used for "prices up today" and "prices down today"
export default function PriceMovers({ title, direction, products, lang }: Props) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={direction === "up" ? "text-danger" : "text-success"}>
          {direction === "up" ? "▲" : "▼"}
        </span>
        <h2 className="text-xl leading-7 font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </section>
  );
}
