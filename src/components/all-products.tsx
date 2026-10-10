"use client";

import { useMemo, useState } from "react";
import { fmt } from "@/i18n/format";
import { productName, categoryName } from "@/i18n/localize";
import { useI18n } from "@/i18n/provider";
import { localizeDigits } from "@/lib/format";
import type { Category, Product } from "@/types";
import ProductCard from "./product-card";

type SortKey = "default" | "asc" | "desc";

type Props = {
  products: Product[];
  categories: Category[];
};

export default function AllProducts({ products, categories }: Props) {
  const { lang, dict } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("default");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      // match the name in either language so typing in one language still finds the other
      return (
        p.nameBn.toLowerCase().includes(q) ||
        productName(p, "en").toLowerCase().includes(q)
      );
    });
    // sort on the numeric price, not the formatted string
    if (sort === "asc") return [...list].sort((a, b) => a.today - b.today);
    if (sort === "desc") return [...list].sort((a, b) => b.today - a.today);
    return list;
  }, [products, query, category, sort]);

  const chipBase =
    "flex h-6 items-center gap-1.5 rounded-lg border px-2 text-[11px] font-semibold whitespace-nowrap transition-colors";
  const chipActive = "border-primary-strong bg-primary text-primary-content";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-4">
        <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-base-content bg-base-100 px-3 sm:w-auto">
          <span aria-hidden>🔍</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.home.searchPlaceholder}
            aria-label={dict.home.searchLabel}
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none sm:w-44 sm:flex-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-1" role="group" aria-label={dict.home.filterLabel}>
          <button
            type="button"
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
            className={`${chipBase} ${category === "all" ? chipActive : "border-transparent hover:bg-base-200"}`}
          >
            {dict.common.all}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
              className={`${chipBase} ${category === c.slug ? chipActive : "border-transparent hover:bg-base-200"}`}
            >
              <span>{c.icon}</span>
              <span>{categoryName(c.slug, c.nameBn, lang)}</span>
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm sm:ml-auto">
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

      <p className="text-sm" aria-live="polite">
        {fmt(dict.home.totalShown, { n: localizeDigits(visible.length, lang) })}
      </p>

      {visible.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
          <p className="text-lg font-semibold">{dict.home.emptyTitle}</p>
          <p className="mt-1 text-sm">{dict.home.emptyMessage}</p>
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
