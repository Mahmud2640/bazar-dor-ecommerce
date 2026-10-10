import { Suspense } from "react";
import Hero from "@/components/hero";
import HomeProducts from "@/components/home-products";
import ProductsSkeleton from "@/components/products-skeleton";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-10 px-4 py-6">
      <Hero />
      <Suspense fallback={<ProductsSkeleton />}>
        <HomeProducts />
      </Suspense>
    </div>
  );
}
