import type { Lang } from "@/data/texts";
import { texts } from "@/data/texts";
import { formatDecimal } from "@/lib/format";
import { getDivisionName, getMarketName } from "@/lib/names";
import type { Market } from "@/types";

type Props = {
  markets: Market[];
  lang: Lang;
};

// The table "price by market" on the product details page
export default function MarketTable({ markets, lang }: Props) {
  const t = texts[lang];

  // add the average price of each market, then sort from the cheapest to the most expensive
  const rows = markets
    .map((market) => ({ ...market, average: (market.min + market.max) / 2 }))
    .sort((a, b) => a.average - b.average);

  // "62 টাকা"
  function price(value: number) {
    return `${formatDecimal(value, lang)} ${t.currency}`;
  }

  return (
    // overflow-x-auto: the table can be scrolled sideways on a small phone
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-sm leading-[21px]">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left font-bold">{t.marketColumn}</th>
            <th className="px-4 py-3 text-left font-bold">{t.divisionColumn}</th>
            <th className="px-4 py-3 text-right font-bold">{t.minColumn}</th>
            <th className="px-4 py-3 text-right font-bold">{t.maxColumn}</th>
            <th className="px-4 py-3 text-right font-bold">{t.avgColumn}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            // every second row has a gray background
            <tr key={row.market} className={`border-b border-border last:border-b-0 ${index % 2 === 1 ? "bg-background" : ""}`}>
              <td className="px-4 py-3 font-medium">{getMarketName(row.market, lang)}</td>
              <td className="px-4 py-3">{getDivisionName(row.division, lang)}</td>
              <td className="px-4 py-3 text-right">{price(row.min)}</td>
              <td className="px-4 py-3 text-right">{price(row.max)}</td>
              <td className="px-4 py-3 text-right font-semibold">{price(row.average)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
