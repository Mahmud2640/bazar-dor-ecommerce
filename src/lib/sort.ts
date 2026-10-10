import type { Product } from "@/types";

export type SortType = "default" | "low" | "high";

// Sort by the real number (today), not by the Bangla text,
// because "৯৯" and "১০০" as text would sort in the wrong order.
export function sortProducts(products: Product[], sortType: SortType) {
  if (sortType === "low") return [...products].sort((a, b) => a.today - b.today);
  if (sortType === "high") return [...products].sort((a, b) => b.today - a.today);
  return products;
}
