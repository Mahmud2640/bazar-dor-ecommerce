// Only allow same-site paths so a crafted ?callbackUrl= cannot send people elsewhere.
export function safeRedirect(value: string | null | undefined): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return "/";
}
