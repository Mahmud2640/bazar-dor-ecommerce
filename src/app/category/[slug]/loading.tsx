import { Skeleton } from "@heroui/react";

// shown while the category page is loading
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-6 px-4 py-6">
      <Skeleton className="h-[94px] rounded-2xl" />
      <Skeleton className="h-[66px] rounded-2xl" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[138px] rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
