"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// The raw query string ("?a=1") in the browser, "" on the server and on the first render.
// Reading it this way needs no Suspense boundary (unlike useSearchParams on a statically rendered page).
export function useSearchString(): string {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}

export function useSearchParam(name: string): string | null {
  return new URLSearchParams(useSearchString()).get(name);
}
