"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/provider";
import { categoryName } from "@/i18n/localize";
import type { Category } from "@/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const { lang, dict, href } = useI18n();

  return (
    <nav aria-label={dict.nav.categories} className="mx-auto w-full max-w-[1152px] px-4">
      <ul className="flex items-center gap-1 overflow-x-auto py-2 text-xs">
        {categories.map((c) => {
          const target = href(`/category/${c.slug}`);
          const active = pathname === target;
          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={target}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-[13px] font-semibold transition-colors ${
                  active ? "bg-primary-soft text-primary" : "hover:bg-base-200"
                }`}
              >
                <span>{c.icon}</span>
                <span>{categoryName(c.slug, c.nameBn, lang)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
