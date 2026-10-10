import { Skeleton } from "@heroui/react";

// shown while the profile page is loading
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[768px] flex-col gap-6 px-4 py-6">
      <Skeleton className="h-14 w-60 rounded-lg" />
      <Skeleton className="h-[120px] rounded-2xl" />
      <Skeleton className="h-[251px] rounded-2xl" />
    </div>
  );
}
