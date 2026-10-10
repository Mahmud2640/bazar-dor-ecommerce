import type { Category, Product } from "@/types";

// The assignment gives two API links. If the first one does not work, we try the second one.
const API_URLS = [
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// get data from the API, for example fetchData("/products")
async function fetchData(path: string) {
  for (const apiUrl of API_URLS) {
    try {
      // revalidate: keep the data for 1 hour so we do not call the API on every page view
      const res = await fetch(`${apiUrl}${path}`, { next: { revalidate: 3600 } });
      if (res.ok) return res.json();
    } catch {
      // the link did not work, try the next one
    }
  }
  throw new Error("Could not load data from the API");
}

// get all categories (rice, lentils, oil...)
export async function getCategories(): Promise<Category[]> {
  return fetchData("/categories");
}

// get all products, or only the products of one category
export async function getProducts(category?: string): Promise<Product[]> {
  if (category) return fetchData(`/products?category=${category}`);
  return fetchData("/products");
}
