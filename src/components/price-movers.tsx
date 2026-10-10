import type { Product } from "@/types";
import ProductCard from "./product-card";

type Props = {
  title: string;
  direction: "up" | "down";
  products: Product[];
};

export default function PriceMovers({ title, direction, products }: Props) {
  const isUp = direction === "up";

  return (
    <section aria-labelledby={`movers-${direction}`} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={isUp ? "text-error" : "text-success"} aria-hidden>
          {isUp ? "▲" : "▼"}
        </span>
        <h2 id={`movers-${direction}`} className="text-xl leading-7 font-bold">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
