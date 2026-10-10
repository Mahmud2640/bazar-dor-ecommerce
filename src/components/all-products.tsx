"use client";

import { Button, Input, TextField } from "@heroui/react";
import { useState } from "react";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { showNumber } from "@/lib/format";
import { getCategoryName, getProductName } from "@/lib/names";
import { sortProducts, type SortType } from "@/lib/sort";
import type { Category, Product } from "@/types";
import ProductCard from "./product-card";
import SortSelect from "./sort-select";

type Props = {
  products: Product[];
  categories: Category[];
  lang: Lang;
};

// The "All products" section: search box, category buttons, sort and the product cards
export default function AllProducts({ products, categories, lang }: Props) {
  const t = texts[lang];

  // what the visitor typed or clicked
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortType, setSortType] = useState<SortType>("default");

  // 1) keep only the products that match the category and the search text
  const text = search.toLowerCase();
  const filtered = products.filter((product) => {
    const sameCategory = category === "all" || product.category === category;
    // the search works with the Bangla name and with the English name
    const sameName =
      product.nameBn.toLowerCase().includes(text) ||
      getProductName(product, "en").toLowerCase().includes(text);
    return sameCategory && sameName;
  });

  // 2) sort them
  const visibleProducts = sortProducts(filtered, sortType);

  return (
    <div className="flex flex-col gap-4">
      {/* search, category buttons and sort */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-surface p-4">
        <TextField aria-label={t.searchPlaceholder} value={search} onChange={setSearch} className="w-full sm:w-56">
          <Input className="h-10" placeholder={`🔍 ${t.searchPlaceholder}`} />
        </TextField>

        <div className="flex flex-wrap gap-1">
          <Button
            size="sm"
            variant={category === "all" ? "primary" : "ghost"}
            className="h-6 min-w-0 px-2 text-[11px]"
            onPress={() => setCategory("all")}
          >
            {t.all}
          </Button>
          {categories.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={category === item.slug ? "primary" : "ghost"}
              className="h-6 min-w-0 gap-1 px-2 text-[11px]"
              onPress={() => setCategory(item.slug)}
            >
              {item.icon} {getCategoryName(item, lang)}
            </Button>
          ))}
        </div>

        <div className="sm:ml-auto">
          <SortSelect value={sortType} onChange={setSortType} lang={lang} />
        </div>
      </div>

      <p className="text-sm">{t.showing(showNumber(visibleProducts.length, lang))}</p>

      {/* the cards, or a message when nothing was found */}
      {visibleProducts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <p className="text-lg font-semibold">{t.noProductTitle}</p>
          <p className="mt-1 text-sm">{t.noProductText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
