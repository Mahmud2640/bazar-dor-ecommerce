import Link from "next/link";
import { formatChange, formatNumber, unitLabel } from "@/lib/format";
import type { Product } from "@/types";

const changeColor = {
  up: "text-error",
  down: "text-success",
  flat: "text-base-content",
} as const;

export default function ProductCard({ product }: { product: Product }) {
  const { slug, nameBn, image, unit, today, change } = product;

  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-px transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
            {image}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base leading-6 font-semibold">{nameBn}</p>
            <p className="text-xs leading-4">প্রতি {unitLabel(unit)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs leading-4">আজকের দাম</span>
            <span className="leading-7">
              <span className="text-xl font-bold">{formatNumber(today)} </span>
              <span className="text-sm font-medium">টাকা</span>
            </span>
          </div>
          <span
            className={`flex items-center rounded-xl bg-base-200 px-2 py-1 text-xs leading-4 font-semibold ${changeColor[change.dir]}`}
          >
            {formatChange(change)}
          </span>
        </div>
      </div>
    </Link>
  );
}
