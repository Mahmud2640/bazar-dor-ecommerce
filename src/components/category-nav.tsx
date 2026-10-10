"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="ক্যাটাগরি" className="mx-auto w-full max-w-[1152px] px-4">
      <ul className="flex items-center gap-1 overflow-x-auto py-2 text-xs">
        {categories.map((c) => {
          const href = `/category/${c.slug}`;
          const active = pathname === href;
          return (
            <li key={c.id} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 items-center gap-1.5 rounded-lg px-[13px] font-semibold transition-colors ${
                  active ? "bg-primary-soft text-primary" : "hover:bg-base-200"
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.nameBn}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
