import { cacheLife } from "next/cache";
import type { Category, Product } from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://api.api-store.workers.dev/api/bazardor";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API request failed: ${path} (${res.status})`);
  }
  return res.json() as Promise<T>;
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
