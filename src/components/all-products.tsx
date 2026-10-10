"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/format";
import type { Category, Product } from "@/types";
import ProductCard from "./product-card";

type SortKey = "default" | "asc" | "desc";

type Props = {
  products: Product[];
  categories: Category[];
};

export default function AllProducts({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || p.nameBn.toLowerCase().includes(q)),
    );
    // sort on the numeric price, not the Bengali string
    if (sort === "asc") return [...list].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...list].sort((a, b) => b.today - a.today);
    return list;
  }, [products, query, category, sort]);

  const chipBase =
    "flex h-6 items-center gap-1.5 rounded-lg px-[9px] text-[11px] font-semibold whitespace-nowrap transition-colors";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
        <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-base-content bg-base-100 px-[13px] sm:w-auto">
          <span aria-hidden>🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
            aria-label="পণ্য খুঁজুন"
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none sm:w-40 sm:flex-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="ক্যাটাগরি ফিল্টার">
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
            className={`${chipBase} ${
              category === "all"
                ? "border border-primary-strong bg-primary text-primary-content"
                : "hover:bg-base-200"
            }`}
          >
            সব
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={`${chipBase} ${
                category === c.slug
                  ? "border border-primary-strong bg-primary text-primary-content"
                  : "hover:bg-base-200"
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.nameBn}</span>
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm sm:ml-auto">
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

      <p className="text-sm" aria-live="polite">
        মোট {toBn(visible.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">কোনো পণ্য পাওয়া যায়নি</p>
          <p className="mt-1 text-sm">অন্য নাম বা ক্যাটাগরি দিয়ে খুঁজে দেখুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
