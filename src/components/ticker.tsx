import { texts } from "@/data/texts";
import { getProducts } from "@/lib/api";
import { changeText, formatPrice, unitName } from "@/lib/format";
import { getLang } from "@/lib/language";
import { getProductName } from "@/lib/names";

// The moving price list under the navbar.
export default async function Ticker() {
  const lang = await getLang();
  const t = texts[lang];
  const products = await getProducts();

  return (
    <div className="ticker overflow-hidden border-b border-border bg-surface" aria-label={t.tickerLabel}>
      {/* the list is shown two times, so when the first one has moved away the second one follows it */}
      <div className="ticker-track flex w-max">
        {[...products, ...products].map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 border-r border-separator py-2 pr-4 pl-4 text-sm whitespace-nowrap"
          >
            <span>{product.image}</span>
            <span className="font-medium">{getProductName(product, lang)}</span>
            <span>
              {formatPrice(product.today, lang)} {t.currency}/{unitName(product.unit, lang)}
            </span>
            <span className={`font-semibold ${product.change.dir === "up" ? "text-danger" : "text-success"}`}>
              {changeText(product.change, lang)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
