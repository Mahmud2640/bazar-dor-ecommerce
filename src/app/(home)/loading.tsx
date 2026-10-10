import { Skeleton } from "@heroui/react";

// Next.js shows this page while the home page is loading
export default function Loading() {
  return (
    <div className="mx-auto flex max-w-[1152px] flex-col gap-10 px-4 py-6">
      <Skeleton className="h-[283px] rounded-3xl" />

      {/* two rows of 6 cards and one row of 9 cards */}
      {[6, 6, 9].map((count, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="h-7 w-40 rounded-lg" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, cardIndex) => (
              <Skeleton key={cardIndex} className="h-[138px] rounded-2xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
