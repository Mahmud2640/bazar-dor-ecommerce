// Fills {name} placeholders: fmt("Showing {n} products", { n: 5 })
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
}
