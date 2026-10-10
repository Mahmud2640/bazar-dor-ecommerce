import { getProducts } from "@/lib/api";
import { formatChange, formatPrice } from "@/lib/format";

export default async function Ticker() {
  const products = await getProducts();

  // Rendered twice so the loop looks seamless when the track slides by 50%.
  const items = [...products, ...products];

  return (
    <div className="group overflow-hidden border-b border-base-300 bg-base-100">
      <div
        className="animate-ticker flex w-max group-hover:[animation-play-state:paused]"
        aria-label="আজকের দামের তালিকা"
      >
        {items.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex shrink-0 items-center gap-1.5 border-r border-base-200 py-2 pr-[17px] pl-4 text-sm whitespace-nowrap"
            aria-hidden={i >= products.length}
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>{formatPrice(p.today, p.unit)}</span>
            <span
              className={`font-semibold ${p.change.dir === "up" ? "text-error" : "text-success"}`}
            >
              {formatChange(p.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
