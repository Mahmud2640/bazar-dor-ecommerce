import { divisionName, marketName } from "@/i18n/localize";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { formatDecimal } from "@/lib/format";
import type { Market } from "@/types";

type Props = {
  markets: Market[];
  lang: Locale;
  dict: Dictionary;
};

export default function MarketTable({ markets, lang, dict }: Props) {
  const taka = (value: number) => `${formatDecimal(value, lang)} ${dict.common.currency}`;

  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const head = "border-b border-base-content/15 px-4 pt-3 pb-3 text-sm leading-[21px] font-bold";

  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
      <table className="w-full min-w-[640px] border-collapse text-sm leading-[21px]">
        <thead>
          <tr>
            <th scope="col" className={`${head} text-left`}>{dict.product.market}</th>
            <th scope="col" className={`${head} text-left`}>{dict.product.division}</th>
            <th scope="col" className={`${head} text-right`}>{dict.product.min}</th>
            <th scope="col" className={`${head} text-right`}>{dict.product.max}</th>
            <th scope="col" className={`${head} text-right`}>{dict.product.avg}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.market}
              className={`${i % 2 === 1 ? "bg-base-200" : ""} [&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-base-content/15`}
            >
              <td className="px-4 pt-3 pb-3 font-medium">{marketName(r.market, lang)}</td>
              <td className="px-4 pt-3 pb-3">{divisionName(r.division, lang)}</td>
              <td className="px-4 pt-3 pb-3 text-right">{taka(r.min)}</td>
              <td className="px-4 pt-3 pb-3 text-right">{taka(r.max)}</td>
              <td className="px-4 pt-3 pb-3 text-right font-semibold">{taka(r.avg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
