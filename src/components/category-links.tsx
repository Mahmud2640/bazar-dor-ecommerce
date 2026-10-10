"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { getCategoryName } from "@/lib/names";
import type { Category } from "@/types";

type Props = {
  categories: Category[];
  lang: Lang;
};

export default function CategoryLinks({ categories, lang }: Props) {
  // pathname is the current page, for example "/category/chal"
  const pathname = usePathname();

  return (
    <nav aria-label={texts[lang].categories} className="mx-auto max-w-[1152px] px-4">
      <ul className="flex items-center gap-1 overflow-x-auto py-2 text-xs">
        {categories.map((category) => {
          const link = `/category/${category.slug}`;
          const isActive = pathname === link;

          return (
            <li key={category.id} className="shrink-0">
              <Link
                href={link}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-3 font-semibold ${
                  isActive ? "bg-accent-soft text-accent" : "hover:bg-background"
                }`}
              >
                <span>{category.icon}</span>
                <span>{getCategoryName(category, lang)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
