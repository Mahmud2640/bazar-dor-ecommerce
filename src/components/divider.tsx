export default function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4" role="separator">
      <span className="h-0.5 flex-1 bg-base-content/10" />
      <span className="text-xs leading-4">{label}</span>
      <span className="h-0.5 flex-1 bg-base-content/10" />
    </div>
  );
}
