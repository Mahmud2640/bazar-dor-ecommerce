const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Turns 148 or "2.1" into "১৪৮" / "২.১". Display only, never use it for sorting.
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitLabel(unit: string): string {
  return UNIT_LABELS[unit] ?? unit;
}

// 1290 -> "১,২৯০"
export function formatNumber(value: number): string {
  return toBn(value.toLocaleString("en-US"));
}

export function formatPrice(value: number, unit: string): string {
  return `${formatNumber(value)} টাকা/${unitLabel(unit)}`;
}

export function formatChange(change: { dir: string; pct: number }): string {
  const arrow = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "–";
  return `${arrow} ${toBn(Math.abs(change.pct))}%`;
}
