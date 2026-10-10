function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-[138px] animate-pulse rounded-2xl border border-base-300 bg-base-100" />
      ))}
    </div>
  );
}

export default function ProductsSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-10" aria-busy="true" aria-label={label}>
      <div className="flex flex-col gap-3">
        <div className="h-7 w-40 animate-pulse rounded bg-base-300" />
        <SkeletonGrid count={6} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-7 w-40 animate-pulse rounded bg-base-300" />
        <SkeletonGrid count={6} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-7 w-24 animate-pulse rounded bg-base-300" />
        <SkeletonGrid count={9} />
      </div>
    </div>
  );
}
