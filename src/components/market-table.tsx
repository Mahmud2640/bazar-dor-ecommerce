import { toBn } from "@/lib/format";
import type { Market } from "@/types";

// 63.5 -> "৬৩.৫০", 62 -> "৬২"
function taka(value: number): string {
  const text = Number.isInteger(value) ? String(value) : value.toFixed(2);
  return `${toBn(text)} টাকা`;
}

export default function MarketTable({ markets }: { markets: Market[] }) {
  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const head = "border-b border-base-content/15 px-4 pt-3 pb-[13px] text-sm leading-[21px] font-bold";

  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
      <table className="w-full min-w-[640px] border-collapse text-sm leading-[21px]">
        <thead>
          <tr>
            <th scope="col" className={`${head} text-left`}>বাজার</th>
            <th scope="col" className={`${head} text-left`}>বিভাগ</th>
            <th scope="col" className={`${head} text-right`}>সর্বনিম্ন</th>
            <th scope="col" className={`${head} text-right`}>সর্বাধিক</th>
            <th scope="col" className={`${head} text-right`}>গড়</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.market}
              className={`${i % 2 === 1 ? "bg-base-200" : ""} [&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-base-content/15`}
            >
              <td className="px-4 pt-3 pb-[13px] font-medium">{r.market}</td>
              <td className="px-4 pt-3 pb-[13px]">{r.division}</td>
              <td className="px-4 pt-3 pb-[13px] text-right">{taka(r.min)}</td>
              <td className="px-4 pt-3 pb-[13px] text-right">{taka(r.max)}</td>
              <td className="px-4 pt-3 pb-[13px] text-right font-semibold">{taka(r.avg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
