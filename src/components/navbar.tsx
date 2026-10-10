import Link from "next/link";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/format";
import CategoryNav from "./category-nav";
import UserMenu from "./user-menu";

export default async function Navbar() {
  const [categories, date] = await Promise.all([getCategories(), getBanglaDate()]);

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex w-full max-w-[1152px] items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex flex-col">
            <span className="text-xl leading-7 font-bold tracking-[-0.5px]">বাজার দর</span>
            <span className="text-xs leading-4">{date}</span>
          </span>
        </Link>
        <UserMenu />
      </div>
      <div className="border-t border-base-200">
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}
