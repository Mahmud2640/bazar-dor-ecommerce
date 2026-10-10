"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/format";
import type { Product } from "@/types";
import ProductCard from "./product-card";

type SortKey = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    // compare the numeric price, not the Bengali string
    if (sort === "asc") return [...products].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...products].sort((a, b) => b.today - a.today);
    return products;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
        <p className="text-sm" aria-live="polite">
          মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <label className="flex items-center gap-2 text-sm">
          সাজান
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-8 rounded-lg border border-base-content bg-base-100 px-3 text-xs"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
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
