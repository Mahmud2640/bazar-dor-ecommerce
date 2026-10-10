import {
  categoryNamesEn,
  divisionNamesEn,
  marketNamesEn,
  productNamesEn,
} from "@/data/english-names";
import type { Lang } from "@/data/texts";
import type { Category, Product } from "@/types";

export function getProductName(product: Product, lang: Lang) {
  if (lang === "bn") return product.nameBn;
  return productNamesEn[product.slug] || product.nameBn;
}

export function getCategoryName(category: Category, lang: Lang) {
  if (lang === "bn") return category.nameBn;
  return categoryNamesEn[category.slug] || category.nameBn;
}

// a product has the category slug and the Bangla category name
export function getProductCategoryName(product: Product, lang: Lang) {
  if (lang === "bn") return product.categoryNameBn;
  return categoryNamesEn[product.category] || product.categoryNameBn;
}

export function getMarketName(nameBn: string, lang: Lang) {
  if (lang === "bn") return nameBn;
  return marketNamesEn[nameBn] || nameBn;
}

export function getDivisionName(nameBn: string, lang: Lang) {
  if (lang === "bn") return nameBn;
  return divisionNamesEn[nameBn] || nameBn;
}
