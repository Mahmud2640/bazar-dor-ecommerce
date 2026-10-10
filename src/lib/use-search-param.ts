"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Reads one query-string value in the browser. Returns null on the server and on the first render,
// so it needs no Suspense boundary (unlike useSearchParams on a statically rendered page).
export function useSearchParam(name: string): string | null {
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  return new URLSearchParams(search).get(name);
}
