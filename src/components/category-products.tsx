"use client";

import { useMemo, useState } from "react";
import { fmt } from "@/i18n/format";
import { useI18n } from "@/i18n/provider";
import { localizeDigits } from "@/lib/format";
import type { Product } from "@/types";
import ProductCard from "./product-card";

type SortKey = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const { lang, dict } = useI18n();
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    // compare the numeric price, not the formatted string
    if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
        <p className="text-sm" aria-live="polite">
          {fmt(dict.home.totalShown, { n: localizeDigits(sorted.length, lang) })}
        </p>
        <label className="flex items-center gap-2 text-sm">
          {dict.home.sortLabel}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-8 rounded-lg border border-base-content bg-base-100 px-3 text-xs"
          >
            <option value="default">{dict.home.sortDefault}</option>
            <option value="asc">{dict.home.sortAsc}</option>
            <option value="desc">{dict.home.sortDesc}</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
