import { cacheLife } from "next/cache";
import type { Category, Product } from "@/types";

// The brief lists a second host that serves the same data; we use it if the first one fails.
const BASE_URLS = [
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJson<T>(path: string): Promise<T> {
  let lastError: unknown;

  // the API can be slow, so each host gets two tries with a generous timeout
  for (const base of [...BASE_URLS, ...BASE_URLS]) {
    try {
      const res = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(20000) });
      if (!res.ok) throw new Error(`API request failed: ${path} (${res.status})`);
      return (await res.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return getJson<Category[]>("/categories");
}

export async function getProducts(category?: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return getJson<Product[]>(`/products${query}`);
}
