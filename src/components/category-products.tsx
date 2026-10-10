"use client";

import { useState } from "react";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { showNumber } from "@/lib/format";
import { sortProducts, type SortType } from "@/lib/sort";
import type { Product } from "@/types";
import ProductCard from "./product-card";
import SortSelect from "./sort-select";

type Props = {
  products: Product[];
  lang: Lang;
};

// The product cards of one category, with the sort dropdown
export default function CategoryProducts({ products, lang }: Props) {
  const t = texts[lang];
  const [sortType, setSortType] = useState<SortType>("default");

  const visibleProducts = sortProducts(products, sortType);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4">
        <p className="text-sm">{t.showing(showNumber(visibleProducts.length, lang))}</p>
        <SortSelect value={sortType} onChange={setSortType} lang={lang} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} lang={lang} />
        ))}
      </div>
    </div>
  );
}
