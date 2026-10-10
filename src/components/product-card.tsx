import { Card, Chip } from "@heroui/react";
import Link from "next/link";
import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { changeText, formatPrice, unitName } from "@/lib/format";
import { getProductName } from "@/lib/names";
import type { Product } from "@/types";

type Props = {
  product: Product;
  lang: Lang;
};

export default function ProductCard({ product, lang }: Props) {
  const t = texts[lang];

  // price up = red, price down = green
  let color: "danger" | "success" | "default" = "default";
  if (product.change.dir === "up") color = "danger";
  if (product.change.dir === "down") color = "success";

  return (
    // the whole card opens the product details page
    <Link href={`/product/${product.slug}`}>
      <Card className="gap-3 rounded-2xl border border-border p-4 shadow-none hover:shadow-md">
        {/* emoji, name and unit */}
        <div className="flex items-start gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-2xl">
            {product.image}
          </span>
          <div className="min-w-0">
            <p className="truncate text-base leading-6 font-semibold">{getProductName(product, lang)}</p>
            <p className="text-xs leading-4">{t.perUnit(unitName(product.unit, lang))}</p>
          </div>
        </div>

        {/* price and change */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs leading-4">{t.todayPrice}</p>
            <p className="flex h-7 items-baseline gap-1">
              <span className="text-xl font-bold">{formatPrice(product.today, lang)}</span>
              <span className="text-sm font-medium">{t.currency}</span>
            </p>
          </div>
          <Chip size="sm" color={color} variant="soft">
            {changeText(product.change, lang)}
          </Chip>
        </div>
      </Card>
    </Link>
  );
}
