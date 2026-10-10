import { Skeleton } from "@heroui/react";

// shown while the product page is loading
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-6 px-4 py-6">
      <Skeleton className="h-9 w-64 rounded-lg" />
      <Skeleton className="h-[174px] rounded-2xl" />
      <Skeleton className="h-[600px] rounded-2xl" />
    </div>
  );
}
