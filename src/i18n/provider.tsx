"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries";

type Value = { lang: Locale; dict: Dictionary };

const I18nContext = createContext<Value | null>(null);

export function I18nProvider({
  lang,
  dict,
  children,
}: Value & { children: ReactNode }) {
  return <I18nContext.Provider value={{ lang, dict }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");

  // href("/signin") -> "/en/signin", href("/") -> "/en"
  const href = (path: string) => `/${value.lang}${path === "/" ? "" : path}`;
  return { ...value, href };
}
